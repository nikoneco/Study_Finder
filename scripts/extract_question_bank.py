from __future__ import annotations

import argparse
import csv
import hashlib
import re
import unicodedata
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

import pdfplumber
from pypdf import PdfReader


QUESTION_HEADERS = [
    "question_id",
    "ata",
    "source_id",
    "pdf_page",
    "section_name",
    "subsection_name",
    "question_text",
    "normalized_question",
    "question_type",
    "expected_answer_style",
    "check_status",
    "confirmed_answer_id",
    "created_at",
    "updated_at",
]

ATA_PAGE_RE = re.compile(
    r"737-800\s*標準問題\s+JHZ/T\s+737\s+Team\s+(?P<ata>(?:\d{2}|[7７][XxＸｘ]))\s+(?P<title>.+?)\s+Check\s+(?P<body>.*)"
)
CONTINUATION_PAGE_RE = re.compile(r"737-800\s*標準問題\s+JHZ/T\s+737\s+Team\s+(?P<body>.*)")
LAYOUT_ATA_HEADER_RE = re.compile(
    r"^(?P<ata>(?:\d{2}|[5７7][XxＸｘ]))\s+(?P<title>.+?)\s+Check$",
    re.IGNORECASE,
)
QUESTION_END_RE = re.compile(
    r"(.*?(?:答えなさい。?|説明しなさい。?|記入しなさい。?|答えられる。?|説明できる。?|述べなさい。?))"
)
QUESTION_COMPLETE_RE = re.compile(
    r"(?:答えなさい|説明しなさい|記入しなさい|答えられる|説明できる|述べなさい|分かりますか|わかりますか)[。．]?$|[?？]$"
)

DEFAULT_STOP_MARKERS = [
    "AIR CONDITIONING SYSTEM",
    "ELECTRICAL POWER SYSTEM",
    "DC GENERATION SYSTEM",
    "EXTERNAL POWER",
    "GENERATOR DRIVE",
    "AC GENERATION SYSTEM",
    "AC ELECTRICAL LOAD DISTRIBUTION",
    "HYDRAULIC POWER SYSTEM",
    "FUEL SYSTEM",
    "STRUCTURES",
    "DOOR",
]

STOP_MARKERS_BY_ATA = {
    "30": [
        "31 INDICATION & RECORDING",
        "INDICATION & RECORDING",
    ],
    "29": [
        "WING THERMAL ANTI ICE SYSTEM",
        "ANTI ICE SYSTEM",
    ],
    "49": [
        "5X STRUCTURES",
        "STRUCTURES",
    ],
    "5X": [
        "７X ENGINE",
        "7X ENGINE",
        "71 POWER PLANT",
    ],
}


def normalize_ata_key(value: str) -> str:
    text = unicodedata.normalize("NFKC", value or "").strip().upper()
    if text == "5X":
        return "5X"
    if text == "7X":
        return "7X"
    return re.sub(r"\D", "", text)


def normalize_text(value: str) -> str:
    text = unicodedata.normalize("NFKC", value or "")
    text = re.sub(r"[窶・窶停凪披評]", "-", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip().upper()


def compact_text(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def clean_layout_text(value: str) -> str:
    text = unicodedata.normalize("NFKC", value or "")
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\s+([、。?？)])", r"\1", text)
    text = re.sub(r"([(])\s+", r"\1", text)
    return text.strip()


def stable_question_id(ata: str, text: str, order: int) -> str:
    digest = hashlib.sha1(f"{ata}:{order}:{normalize_text(text)}".encode("utf-8")).hexdigest()[:12]
    return f"q_{ata}_{digest}"


def classify_question(text: str) -> str:
    normalized = normalize_text(text)
    if "COMPONENT LOCATION" in normalized or ("LOCATION" in normalized and ("FUNCTION" in normalized or "機能" in text)):
        return "component_location_function"
    if any(term in normalized for term in ["LIGHT", "SWITCH", "CONDITION"]) or any(term in text for term in ["点灯条件", "作動条件"]):
        return "condition_list"
    if any(term in normalized for term in ["KVA", "VOLT", "AMP", "HZ"]) or "定格" in text:
        return "rating"
    if any(term in normalized for term in ["SERVICE", "PROCEDURE"]) or any(term in text for term in ["要領", "手順"]):
        return "procedure"
    if "FUNCTION" in normalized or "機能" in text:
        return "function_list"
    if any(term in normalized for term in ["LOCATION", "PANEL", "MODULE", "COMPONENT"]):
        return "component_location_function"
    return "explanation"


def expected_answer_style(question_type: str, text: str) -> str:
    if question_type in {"function_list", "condition_list"}:
        return "list"
    if question_type == "rating":
        return "component_table"
    if question_type == "procedure":
        return "procedure_steps"
    if "説明" in text:
        return "detailed_explanation"
    return "short_explanation"


def split_questions(body: str, stop_markers: list[str]) -> list[str]:
    stop_at = len(body)
    for marker in stop_markers:
        pos = body.find(marker)
        if pos != -1:
            stop_at = min(stop_at, pos)
    body = body[:stop_at].strip()

    questions: list[str] = []
    cursor = body
    while cursor:
        match = QUESTION_END_RE.match(cursor)
        if not match:
            break
        question = re.sub(r"^[、。・\s]+", "", match.group(1).strip())
        if question and not question.endswith("。"):
            question += "。"
        if question:
            questions.append(question)
        cursor = cursor[match.end() :].strip()
    return questions


def clean_question_text(question: str, ata: str, section_name: str) -> str:
    cleaned = question.strip()
    prefix = f"{ata} {section_name} "
    if cleaned.startswith(prefix):
        cleaned = cleaned[len(prefix) :].strip()
    return cleaned


def is_layout_noise(text: str) -> bool:
    normalized = normalize_text(text)
    return (
        not normalized
        or normalized in {"737-800 標準問題", "737-800標準問題", "JHZ/T", "737 TEAM"}
    )


def is_layout_question_complete(text: str) -> bool:
    value = clean_layout_text(text)
    value = re.sub(r"\s*[（(][^()（）]*[）)]\s*$", "", value)
    return bool(QUESTION_COMPLETE_RE.search(value))


def is_parenthetical_continuation(text: str) -> bool:
    value = clean_layout_text(text)
    return value.startswith(("(", "（"))


def contextualize_question(question: str, subsection_name: str) -> str:
    question = clean_layout_text(question)
    subsection = clean_layout_text(subsection_name)
    if not subsection:
        return question

    normalized = normalize_text(question)
    normalized_subsection = normalize_text(subsection)
    if normalized.startswith("各COMPONENTの作動の概要") and "ENG FUEL" in normalized_subsection:
        return "Engine Fuel & Control Systemで、Fuel Spar ValveからFuel Nozzleまでにある各Componentの作動概要とLocationを記入しなさい。"
    if "主要COMPONENT" in normalized and normalized_subsection == "79 ENGINE OIL":
        return "Engine Lubrication Systemの主要Component、Locationおよび機能を説明しなさい。"
    if re.match(r"^主要\s*COMPONENT", normalized):
        suffix = re.sub(r"^主要\s*Component\s*", "", question, flags=re.IGNORECASE)
        return f"{subsection}の主要Component {suffix}".replace("  ", " ")
    if normalized in {"目的が答えられる。", "目的が答えられる"}:
        return f"{subsection}の目的を答えなさい。"
    if re.match(r"^構成\s*COMPONENT", normalized):
        return f"{subsection}の{question}"
    if "関連COMPONENT" in normalized and subsection.upper() not in normalized:
        return f"{subsection}に関連するComponentを答えなさい。"
    return question


def extract_layout_question_records(pdf_path: Path, target_ata: str) -> list[dict[str, str]]:
    target_ata = normalize_ata_key(target_ata)
    records: list[dict[str, str]] = []
    current_ata = ""
    current_section_name = ""
    current_subsection_name = ""
    pending_question = ""
    pending_page = 0
    pending_subsection = ""

    def flush_pending() -> None:
        nonlocal pending_question, pending_page, pending_subsection
        question = clean_layout_text(pending_question)
        if not question:
            return
        records.append(
            {
                "pdf_page": str(pending_page),
                "section_name": current_section_name,
                "subsection_name": pending_subsection,
                "question_text": contextualize_question(question, pending_subsection),
            }
        )
        pending_question = ""
        pending_page = 0
        pending_subsection = ""

    with pdfplumber.open(str(pdf_path)) as pdf:
        for page_number, page in enumerate(pdf.pages, start=1):
            layout_text = page.extract_text(layout=True, x_tolerance=2, y_tolerance=2) or ""
            raw_lines = [line.rstrip() for line in layout_text.splitlines() if line.strip()]
            page_header_seen = False

            for raw_line in raw_lines:
                indent = len(raw_line) - len(raw_line.lstrip())
                text = clean_layout_text(raw_line)
                if is_layout_noise(text):
                    continue

                header_match = LAYOUT_ATA_HEADER_RE.match(text)
                if header_match and indent <= 10:
                    flush_pending()
                    current_ata = normalize_ata_key(header_match.group("ata"))
                    current_section_name = clean_layout_text(header_match.group("title"))
                    current_subsection_name = ""
                    page_header_seen = True
                    continue

                if current_ata != target_ata:
                    continue

                if indent <= 10:
                    flush_pending()
                    current_subsection_name = text
                    continue

                if not pending_question:
                    pending_question = text
                    pending_page = page_number
                    pending_subsection = current_subsection_name
                    continue

                if is_parenthetical_continuation(text):
                    pending_question = clean_layout_text(pending_question + " " + text)
                    continue

                if is_layout_question_complete(pending_question):
                    flush_pending()
                    pending_question = text
                    pending_page = page_number
                    pending_subsection = current_subsection_name
                    continue

                if not is_layout_question_complete(pending_question):
                    pending_question = clean_layout_text(pending_question + " " + text)
                    continue

            if current_ata == target_ata and pending_question and is_layout_question_complete(pending_question):
                flush_pending()

            if page_header_seen and current_ata != target_ata:
                current_subsection_name = ""

    flush_pending()
    return records


def expand_target_specific_questions(question: str, target_ata: str) -> list[str]:
    if target_ata == "49" and "APU CONTROL" in question and "Lub Modle" in question:
        before, after = question.split("APU CONTROL", 1)
        return [
            before.strip(),
            "APU CONTROL " + after.strip(),
        ]
    if target_ata == "30":
        return expand_ata30_questions(question)
    if target_ata == "26":
        return expand_ata26_questions(question)
    if target_ata == "27":
        return [normalize_ata27_question(question)]
    if target_ata == "31":
        return expand_ata31_questions(question)
    if target_ata == "32":
        return expand_ata32_questions(question)
    if target_ata == "23":
        return expand_ata23_questions(question)
    if target_ata == "34":
        return expand_ata34_questions(question)
    if target_ata == "38":
        return expand_ata38_questions(question)
    return [question]


ATA31_REPAIRED_QUESTION_IDS = {
    "P5のFLT REC/Mach Air SPD WARN Test MODのOFF L'Tの点灯条件を記入しなさい。": "q_31_b1ac7a4725c4",
    "FDAUの機能を大別して2つ記入しなさい。": "q_31_6d2a91f4c8e3",
    "AWMが関係しているSYS、それに対応した発する音の種類、および優先順位を記入しなさい。": "q_31_4c484c182d44",
    "AWMのLocationを記入しなさい。": "q_31_8e4b17c2d6a9",
    "T C'Kにおいて必ずACMSを用いて実施する作業を記入しなさい。（具体的に）": "q_31_dc669a9d45ad",
    "ACMSに関するSYSの不具合を知る方法を記入しなさい。": "q_31_bbb42ceb5f56",
    "PFDに表示される情報を記入しなさい。（大別して）": "q_31_ce74a15a0ab9",
    "NDに表示される情報を記入しなさい。（大別して（Modeなども含む））": "q_31_8c941c7ee08e",
    "UPR/LWR DUに表示される情報を記入しなさい。": "q_31_056eeaf9bbe9",
}


ATA26_REPAIRED_QUESTION_IDS = {
    "P8 PNLのENG Fire HNDLを引く事による Systemの作動を ATA別に整理して説明しなさい。": "q_26_0622a375459c",
    "CGO COMP'T Fire Extinguishing SYSの主要構成ComponentおよびLocation を記入しなさい。(FWD/AFTで個数が違う場合にはその個数も記入すること)": "q_26_02b05956d429",
    "LavatoryのSmoke Detectorの作動原理について説明しなさい。 (イオン化式とPhotoelectric式分別して)": "q_26_c379903baaf1",
    "LavatoryのFire Extinguishing Bottleの作動及びLocationついて記入しなさい。": "q_26_e5dc4ada18bb",
    "W/WELL DET SYSの主要構成ComponentおよびLocationを記入しなさい。": "q_26_94117fc1a69d",
    "737-800型機に機内に装備されている消火器のType(種類)について記入しなさい。": "q_26_6ea304fdfab7",
}


ATA38_REPAIRED_QUESTION_IDS = {
    "Potable Water Systemの構成及び作動概要を記入しなさい。": "q_38_d1cbf6e5aa80",
    "POTABLE WATER SYSTEMの主要Component (Service Panelを含む)のLocation及び概要を説明しなさい。": "q_38_9d1fcc63d100",
    "FWD Gray Water Drain Valveの目的及びLocationと作動を記入しなさい。": "q_38_508730e5e139",
}


ATA7X_REPAIRED_QUESTION_IDS = {
    "各Componentの作動の概要とLocationについて記入しなさい。": "q_7X_fefc40bbc708",
    "79 ENGINE OILの主要Component のLocationと機能を説明しなさい。": "q_7X_b4cf96f37399",
}


def expand_ata31_questions(question: str) -> list[str]:
    text = clean_layout_text(question)
    upper = text.upper()
    if "OFF L'Tの点灯条件" in text and "FDAUの機能" in text:
        return ["P5のFLT REC/Mach Air SPD WARN Test MODのOFF L'Tの点灯条件を記入しなさい。", "FDAUの機能を大別して2つ記入しなさい。"]
    if "AWMが関係" in text and "AWMのLOCATION" in upper:
        return ["AWMが関係しているSYS、それに対応した発する音の種類、および優先順位を記入しなさい。", "AWMのLocationを記入しなさい。"]
    if "NDに表示される情報" in text and "UPR/LWR DU" in text:
        return ["NDに表示される情報を記入しなさい。（大別して（Modeなども含む））", "UPR/LWR DUに表示される情報を記入しなさい。"]
    replacements = {
        "PFDに表示される情報を記入しなさい。(大別して)": "PFDに表示される情報を記入しなさい。（大別して）",
        "(具体的に) ACMSに関するSYSの不具合を知る方法を記入しなさい。": "ACMSに関するSYSの不具合を知る方法を記入しなさい。",
    }
    return [replacements.get(text, text)]


ATA32_REPAIRED_QUESTION_IDS = {
    "Main L/G Manual EXT SYSの主要構成Componentを挙げなさい。": "q_32_1248004fb6d7",
    "Nose L/G Manual EXT SYSの主要構成Componentを挙げなさい。": "q_32_6a1f24c8d3e7",
    "Manual EXT用Access PanelをOpenした時の作動について説明しなさい。": "q_32_9c4e17b2a6d8",
    "Nose WHL STRG SYSの主要構成Componentを挙げなさい。（機械的な流れ、油圧的な流れを含めて）": "q_32_c7846db4e5ee",
    "Nose WHL STRG SYSの角度についてRUD PDLおよびSTRG WHLの角度を記入しなさい。": "q_32_3e8a61d7c2b5",
    "ALT Nose WHL STRG SWが装備されている目的について記入しなさい。": "q_32_8b2d57a4e1c9",
    "T C'KにおいてTail SkidのINSPをする際に、何かIndicationのようなものはありますか？ どのようなINDがあるのか説明しなさい。": "q_32_2c9dfc84f99d",
    "Air/GND SYSに用いられているSNSRをMainおよびNoseに分類して挙げなさい。": "q_32_95afd7c716bf",
    "PSEUの前面に記載されている6項目を記入しなさい。": "q_32_5d9a23e7b4c1",
    "L/G POSI IND SYSに用いられているSNSRをMainおよびNoseに分類して挙げなさい。": "q_32_5e32c40a6a31",
    "FLT CompartでのL/G Position Indicationを説明しなさい。": "q_32_7f1c46a9d2e8",
    "Manual Braking SYSの主要Componentを挙げ、BRK PDLを踏んでBRKが掛かるまでの過程を説明しなさい。（NML/ALT/ACC各々かつ機械的と油圧的な流れも踏まえて）": "q_32_204a2cdafd09",
    "Brake Press IND（P3）は、どこのPressureをMonitorしていますか？": "q_32_204db17de426",
    "Retraction BRKの作動を説明しなさい。": "q_32_4a7d19c6e3b2",
}


def expand_ata32_questions(question: str) -> list[str]:
    text = clean_layout_text(question)
    upper = text.upper()
    if "MAIN L/G MANUAL EXT SYS" in upper and "NOSE L/G MANUAL EXT SYS" in upper:
        return ["Main L/G Manual EXT SYSの主要構成Componentを挙げなさい。", "Nose L/G Manual EXT SYSの主要構成Componentを挙げなさい。", "Manual EXT用Access PanelをOpenした時の作動について説明しなさい。"]
    if "NOSE WHL STRG SYSの主要構成" in upper and "ALT NOSE WHL STRG SW" in upper:
        return ["Nose WHL STRG SYSの主要構成Componentを挙げなさい。（機械的な流れ、油圧的な流れを含めて）", "Nose WHL STRG SYSの角度についてRUD PDLおよびSTRG WHLの角度を記入しなさい。", "ALT Nose WHL STRG SWが装備されている目的について記入しなさい。"]
    if "AIR/GND SYSに用いられているSNSR" in upper and "PSEUの前面" in text:
        return ["Air/GND SYSに用いられているSNSRをMainおよびNoseに分類して挙げなさい。", "PSEUの前面に記載されている6項目を記入しなさい。"]
    if "L/G POSI IND SYSに用いられているSNSR" in upper and "FLT COMPART" in upper:
        return ["L/G POSI IND SYSに用いられているSNSRをMainおよびNoseに分類して挙げなさい。", "FLT CompartでのL/G Position Indicationを説明しなさい。"]
    if "BRAKE PRESS IND" in upper and "RETRACTION BRK" in upper:
        return ["Brake Press IND（P3）は、どこのPressureをMonitorしていますか？", "Retraction BRKの作動を説明しなさい。"]
    if "MANUAL BRAKING SYSの主要COMPONENT" in upper:
        return ["Manual Braking SYSの主要Componentを挙げ、BRK PDLを踏んでBRKが掛かるまでの過程を説明しなさい。（NML/ALT/ACC各々かつ機械的と油圧的な流れも踏まえて）"]
    return [text]


ATA23_REPAIRED_QUESTION_IDS = {
    "FI SYSの目的、構成ComponentおよびLocation、作動概要について説明しなさい。": "q_23_d0f057bd346f",
    "機体のSI JACK Locationを全て記入しなさい。": "q_23_709bc1feb618",
    "CBN to CBNの呼出し時の作動について説明しなさい。": "q_23_b55819d2f5f9",
    "ATT PNLの中のCard名称を記入しなさい。": "q_23_32e5be43f528",
    "PAのGain CONT'Lについて説明しなさい。": "q_23_0e4df080c2cd",
    "CPTからCBNにむけてアナウンスをする場合のFollowを記入しなさい。（SPKRまでの経路）": "q_23_2f14945bd648",
    "VHFおよびHF ANTのLocationを示しなさい。": "q_23_4830dd957c66",
    "RCPが故障した場合の現象について記入しなさい。": "q_23_07c949aa27ac",
    "機体の識別はどのように設定しているか記入しなさい。": "q_23_5d5419c3366e",
    "Voice RECの音は、どこの音声を何時間記録するか記入しなさい。": "q_23_b63c14ea4033",
    "Voice RECの「OFF」L'Tの点灯について説明しなさい。": "q_23_c8c2293bfc89",
    "ELT SYSの目的、主要構成ComponentおよびLocationについて記入しなさい。": "q_23_3e6e83d619cd",
    "ELTから発射される電波の種類、その特徴について記入しなさい。": "q_23_d3860b5a7039",
    "Static Dischargerが機体に取付いている目的を記入しなさい。": "q_23_9ab5dd8fcb63",
    "Video Surveillance SYSの主要構成ComponentおよびLocationを記入しなさい。": "q_23_3f4cfd02c8ea",
    "Video Surveillance SYSが表示される場所と表示させる方法を説明しなさい。": "q_23_60ffdf58f819",
}


def expand_ata23_questions(question: str) -> list[str]:
    text = clean_layout_text(question)
    upper = text.upper()
    if "FI SYSの目的" in text and "REUの機能" in text:
        return [
            "FI SYSの目的、構成ComponentおよびLocation、作動概要について説明しなさい。",
            "REUの機能について記入しなさい。",
        ]
    if "FI SYSの目的" in text and "SI SYSの目的" in text:
        return [
            "FI SYSの目的、構成ComponentおよびLocation、作動概要について説明しなさい。",
            "REUの機能について記入しなさい。",
            "ACPのEmergency Operationについて記入しなさい。",
            "Navigation Alert Audioの4つを記入しなさい。",
            "SI SYSの目的、構成ComponentおよびLocation、作動概要について説明しなさい。",
        ]
    if "SI JACK" in upper and "GND CREW CALL" in upper:
        return [
            "機体のSI JACK Locationを全て記入しなさい。",
            "P5のSI SWの働きについて記入しなさい。",
            "GND Crew Callをした時の作動について記入しなさい。",
            "FLT CrewをGNDおよびCBNから呼び出した時の作動を説明しなさい。",
        ]
    if "ATT PNL" in upper and "PAのPRIORITY" in upper:
        return [
            "ATT PNLの中のCard名称を記入しなさい。",
            "PA Systemの機能を4つ記入しなさい。",
            "PA Systemの主要構成ComponentおよびLocationについて記入しなさい。",
            "PA AMPの機能について全て記入しなさい。",
            "PAのPriorityについて説明しなさい。",
        ]
    if "CPTからCBN" in text and "VHF SYSの目的" in text:
        return [
            "CPTからCBNにむけてアナウンスをする場合のFollowを記入しなさい。（SPKRまでの経路）",
            "VHF SYSの目的、主要構成ComponentおよびLocationについて説明しなさい。",
        ]
    if "VHFおよびHF ANT" in text and "HF SYSの目的" in text:
        return [
            "VHFおよびHF ANTのLocationを示しなさい。",
            "HF SYSの目的、主要構成ComponentおよびLocationについて説明しなさい。",
        ]
    if "RCPが故障" in text and "HF COUPLER" in upper:
        return [
            "RCPが故障した場合の現象について記入しなさい。",
            "HF Couplerの機能について説明しなさい。",
            "OFF Side Controlについて記入しなさい。",
            "HF SYSを送信するまでの作動を簡単に記入しなさい。",
            "SELCAL SYSの目的、主要構成ComponentおよびLocationについて記入しなさい。",
        ]
    if "機体の識別" in text and "BULK ERASE" in upper:
        return [
            "機体の識別はどのように設定しているか記入しなさい。",
            "機体が呼出された時のCPTでの表示について記入しなさい。",
            "SATCOM SYSの目的、主要構成ComponentおよびLocationについて記入しなさい。",
            "HGAの特徴を記入しなさい。",
            "LNA/Diplexerの働きを記入しなさい。",
            "ACARS SYSの目的、主要構成ComponentおよびLocationについて記入しなさい。",
            "Voice REC SYSの目的、作動、構成Componentについて記入しなさい。",
            "Voice RECの作動時期を記入しなさい。",
            "Voice RECの「Bulk Erase」について説明しなさい。",
        ]
    if "どこの音声を何時間" in text and "モニター" in text:
        return [
            "Voice RECの音は、どこの音声を何時間記録するか記入しなさい。",
            "Voice RECへ記録される音声のモニターについて説明しなさい。",
        ]
    if "ELT SYSの目的" in text and "自動/手動" in text:
        return [
            "ELT SYSの目的、主要構成ComponentおよびLocationについて記入しなさい。",
            "ELTの作動について、自動/手動各々について説明しなさい。",
        ]
    if "ELTから発射" in text and "停止方法" in text:
        return [
            "ELTから発射される電波の種類、その特徴について記入しなさい。",
            "ELTを取り扱う際の注意事項および手動作動後の停止方法を説明しなさい。",
        ]
    if "STATIC DISCHARGER" in upper and "PES AUDIO" in upper:
        return [
            "Static Dischargerが機体に取付いている目的を記入しなさい。",
            "PES Audio SYSの主要構成Component、Locationおよび機能を説明しなさい。",
            "Audio BITE PNLの機能について記入しなさい。",
            "DIUの機能について記入しなさい。",
        ]
    if "VIDEO SURVEILLANCE SYSの主要構成" in upper and "不可欠" in text:
        return [
            "737-800型機のIFEの特徴を9つ挙げて記入しなさい。",
            "IFEの主要構成ComponentおよびLocationについて記入しなさい。",
            "IFEのお客様への音および映像の形式を記入しなさい。",
            "IFE立ち上げ時の注意事項を記入しなさい。",
            "Video Surveillance SYSの主要構成ComponentおよびLocationを記入しなさい。",
            "Video Surveillance SYSの作動に不可欠なSystemについて説明しなさい。",
        ]
    replacements = {
        "機体のSI JACK Location を全て記入しなさい。": "機体のSI JACK Locationを全て記入しなさい。",
        "CPTからCBNにむけてアナウンスをする場合のFollowを記入しなさい。 (SPKRまでの経路)": "CPTからCBNにむけてアナウンスをする場合のFollowを記入しなさい。（SPKRまでの経路）",
        "PES Audio SYSの主要構成Component Location、および機能を説明しなさい。": "PES Audio SYSの主要構成Component Location、および機能を説明しなさい。",
    }
    return [replacements.get(text, text)]


ATA34_REPAIRED_QUESTION_IDS = {
    "ADIRUの機能について説明しなさい。": "q_34_bf722f01b039",
    "ADIRUおよび関連ComponentのLocationを記入しなさい。": "q_34_e579f9a28714",
    "MSUの「ALIGN」、「NAV」、「ATT」の各Positionの意味を説明しなさい。": "q_34_94bc7bede788",
    "MSUの「FAULT」Lightが示す内容を説明しなさい。": "q_34_6c1d7e90a2b4",
    "WXRのRadar EchoとGPWCのTerrain Dataを同じNDに同時表示できるか説明しなさい。": "q_34_e21066425fda",
    "WXR R/T Mount Fanの作動を説明しなさい。": "q_34_1f8a6d43c2e7",
    "TCAS Control Panelの「TA ONLY」はどのような時に使用するか説明しなさい。": "q_34_9215eeb6b503",
    "TCASの不具合はどこに表示されるか答えなさい。": "q_34_7b2e9c51d4a8",
    "FMCSの機能の1つである「BITE」ができるSystemを7つ答えなさい。": "q_34_e5e1332b37ce",
    "FMCSの主要構成ComponentおよびLocationを記入しなさい。": "q_34_5981bc9572b5",
    "FMCSの機能の中で、「Navigation」について説明しなさい。": "q_34_4d7a2c96e1f3",
}


def expand_ata34_questions(question: str) -> list[str]:
    text = clean_layout_text(question)
    upper = text.upper()
    if "ADIRUの機能" in text and "LOCATION" in upper:
        return [
            "ADIRUの機能について説明しなさい。",
            "ADIRUおよび関連ComponentのLocationを記入しなさい。",
        ]
    if 'MSUの「ALIGN」' in text and '「FAULT」' in text:
        return [
            "MSUの「ALIGN」、「NAV」、「ATT」の各Positionの意味を説明しなさい。",
            "MSUの「FAULT」Lightが示す内容を説明しなさい。",
        ]
    if "RADAR ECHO" in upper and "FAN" in upper:
        return [
            "WXRのRadar EchoとGPWCのTerrain Dataを同じNDに同時表示できるか説明しなさい。",
            "WXR R/T Mount Fanの作動を説明しなさい。",
        ]
    if "TA ONLY" in upper and "TCASの不具合" in text:
        return [
            "TCAS Control Panelの「TA ONLY」はどのような時に使用するか説明しなさい。",
            "TCASの不具合はどこに表示されるか答えなさい。",
        ]
    if "BITE" in upper and "NAVIGATION" in upper:
        return [
            "FMCSの機能の1つである「BITE」ができるSystemを7つ答えなさい。",
            "FMCSの機能の中で、「Navigation」について説明しなさい。",
        ]
    if "BITE" in upper and "FMCSの主要構成COMPONENT" in upper:
        return [
            "FMCSの機能の1つである「BITE」ができるSystemを7つ答えなさい。",
            "FMCSの主要構成ComponentおよびLocationを記入しなさい。",
        ]
    return [text]


def expand_ata30_questions(question: str) -> list[str]:
    if "TAT Test SW" in question and "Window Anti-Ice System" in question:
        before, after = question.split("Cockpit Window Anti-Ice System", 1)
        return [
            before.strip(),
            "Cockpit Window Anti-Ice System" + after.strip(),
        ]
    if "737でProbe Anti-Ice" in question and "Cockpit Window Anti-Ice System" in question:
        before, after = question.split("Cockpit Window Anti-Ice System", 1)
        return [
            before.strip(),
            "Cockpit Window Anti-Ice System" + after.strip(),
        ]
    return [question]


def normalize_ata27_question(question: str) -> str:
    replacements = {
        "下記の操舵角を答えなさい。":
            "Aileron、Elevator、Rudderの操舵角を答えなさい。",
        "Spoilet Mixer&Ratio Changerの機能を説明しなさい。":
            "Spoiler Mixer & Ratio Changerの機能を説明しなさい。",
        "FLT Spoiler ActuatorのＳolenoid Operated Valveを作動について説明しなさい。":
            "FLT Spoiler ActuatorのSolenoid Operated Valveの作動について説明しなさい。",
        "Manual Reversion OperationにおいてControl Cloumnを操作した時Elevatorが作動 するまでの流れについて説明しなさい。":
            "Manual Reversion OperationにおいてControl Columnを操作した時Elevatorが作動するまでの流れについて説明しなさい。",
        "Balance ModeとAnti Blance Modeの作動と目的について説明しなさい。":
            "Balance ModeとAnti-Balance Modeの作動と目的について説明しなさい。",
        "T/E ＦalpのＰrotectionについて説明しなさい。":
            "T/E FlapのProtectionについて説明しなさい。",
        "T/E ＦalpのIndication Systemの構成、Locationを説明しなさい。":
            "T/E FlapのIndication Systemの構成、Locationを説明しなさい。",
        "Auto Speed Brake ModuleのＬocationを記入しなさい。":
            "Auto Speed Brake ModuleのLocationを記入しなさい。",
        "Cap ContwheelがJammingしたときのRoll Controlを説明しなさい。":
            "Captain Control WheelがJammingしたときのRoll Controlを説明しなさい。",
        "Cap Control ColumnがJammingしたときのPitch Controlについて説明しなさい。":
            "Captain Control ColumnがJammingしたときのPitch Controlについて説明しなさい。",
        "下記図面番号のComponentについて、正式名称、Location、機能を答えなさい。":
            "Aileron and Aileron Trim Control System図の番号Componentについて、正式名称、Location、機能を答えなさい。",
    }
    return replacements.get(question, question)


def expand_ata26_questions(question: str) -> list[str]:
    replacements = {
        "P8 PNLのAPU Fire HNDLを引くと機体としてどのような状態になるか？ ATA別に整理して説明しなさい。":
            "P8 PNLのAPU Fire HNDLを引くと機体としてどのような状態になるか、ATA別に整理して説明しなさい。",
        "（P8 PNLのAPU Fire HNDLを引く事による Systemの作動を ATA別に整理して説明しなさい。":
            "",
        "） APU Fire Extinguishing Bottleの取扱い注意事項を記入しなさい。":
            "APU Fire Extinguishing Bottleの取扱い注意事項を記入しなさい。",
        "APU Remote Control Panelの機能（できること全て）を記入しなさい。":
            "APU Remote Control Panelの機能（できること全て）を記入しなさい。",
        "分かりますか。 を記入しなさい。":
            "",
    }
    if question in replacements:
        replacement = replacements[question]
        return [replacement] if replacement else []

    if "Engine Fire Extinguishing SYSの主要構成Component" in question and "ENG Fire Extinguishing BTLから" in question:
        return [
            "Engine Fire Extinguishing SYSの主要構成ComponentおよびLocationを記入しなさい。",
            "ENG Fire Extinguishing BTLから噴射されたハロンがENGのどこに噴射されるか記入しなさい。",
        ]
    if "P8 PNLのENG Fire HNDL" in question and "ENG Fire Extinguishing BTLの取扱い注意事項" in question:
        return [
            "P8 PNLのENG Fire HNDLを引く事によるSystemの作動を説明しなさい。",
            "ENG Fire Extinguishing BTLの取扱い注意事項を記入しなさい。",
        ]
    if "APU Fire Extinguishing SYSの主要構成Component" in question and "APU Fire Extinguishing BTLから" in question:
        return [
            "APU Fire Extinguishing SYSの主要構成ComponentおよびLocationを記入しなさい。",
            "APU Fire Extinguishing BTLから噴射されたハロンがAPUのどこに噴射されるか記入しなさい。",
        ]
    if "APU Fire Extinguishing SYSの主要構成Component" in question:
        return ["APU Fire Extinguishing SYSの主要構成ComponentおよびLocationを記入しなさい。"]
    upper = normalize_text(question)
    if "CGO COMP'T SMOKE DET SYS" in upper and "CGO ELECTRONIC UNIT" in upper:
        return [
            "CGO COMP'T Smoke DET SYSの主要構成ComponentおよびLocationを記入しなさい。（FWD/AFTで個数が違う場合にはその個数も記入すること）",
            "CGO Electronic Unitの機能を記入しなさい。",
        ]
    if "APU Fire Extinguishing BTLから" in question:
        return ["APU Fire Extinguishing BTLから噴射されたハロンがAPUのどこに噴射されるか記入しなさい。"]
    if "CARGO COMPARTMENT FIRE EXTINGUISHING SYSTEM" in question and "国内線機/国際線機" in question:
        return [
            "CGO COMP'T Fire Extinguishing SYSの主要構成ComponentおよびLocationを記入しなさい。",
            "Cargo COMP'T Fire Extinguishing SYSの国内線機/国際線機の違いを説明しなさい。",
        ]
    if "LAVATORY SMOKE DETECTION" in question and "Smoke Detector" in question:
        return ["LavatoryのSmoke Detectorの作動原理について、イオン化式とPhotoelectric式を分けて説明しなさい。"]
    if "（イオン化式とPhotoelectric式分別して）" in question and "Fire Extinguishing Bottle" in question:
        return ["LavatoryのFire Extinguishing Bottleの作動及びLocationについて記入しなさい。"]
    if "Wing & Body Duct OVHT DET SYS" in question and "SensorのType" in question:
        return [
            "Wing & Body Duct OVHT DET SYSの主要構成ComponentおよびLocationを記入しなさい。",
            "Wing & Body Duct OVHT DET SensorのTypeおよび検知する原理を記入しなさい。",
        ]
    if "Wing & Body Duct OVHT DET SNSRに不具合" in question:
        return ["Wing & Body Duct OVHT DET SNSRに不具合が発生した場合には、どこで分かりますか。"]
    return [question]


def expand_ata38_questions(question: str) -> list[str]:
    text = clean_layout_text(question)
    upper = normalize_text(text)
    if "POTABLE WATER SYSTEMの構成及び作動概要" in upper and "F0-02" in upper:
        return [
            "Potable Water Systemの構成及び作動概要を記入しなさい。",
            "（F0-02）図面の空欄10箇所に名称を記入しなさい。",
        ]
    return [text]


def repair_ata26_rows(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    repaired: list[dict[str, str]] = []
    seen: set[tuple[str, str, str]] = set()
    index = 0

    while index < len(rows):
        row = rows[index]
        question = row["question_text"]
        if (
            "P8 PNLのAPU Fire HNDLを引くと機体としてどのような状態になるか" in question
            and index + 1 < len(rows)
            and rows[index + 1]["question_text"].startswith("ATA別に整理して説明しなさい")
        ):
            question = "P8 PNLのAPU Fire HNDLを引くと機体としてどのような状態になるか、ATA別に整理して説明しなさい。"
            index += 2
        else:
            index += 1

        duplicate_key = (
            row["pdf_page"],
            normalize_text(row["subsection_name"]),
            normalize_text(question),
        )
        if duplicate_key in seen:
            continue
        seen.add(duplicate_key)

        order = len(repaired) + 1
        row["question_id"] = stable_question_id("26", question, order)
        row["question_text"] = question
        row["normalized_question"] = normalize_text(question)
        row["question_type"] = classify_question(question)
        row["expected_answer_style"] = expected_answer_style(row["question_type"], question)
        repaired.append(row)

    return repaired


def extract_rows(pdf_path: Path, target_ata: str, source_id: str) -> list[dict[str, str]]:
    now = datetime.now(timezone.utc).isoformat()
    rows: list[dict[str, str]] = []
    target_ata = normalize_ata_key(target_ata)

    for record in extract_layout_question_records(pdf_path, target_ata):
        questions = expand_target_specific_questions(record["question_text"], target_ata)
        for question in questions:
            if not question:
                continue
            question_type = classify_question(question)
            order = len(rows) + 1
            rows.append(
                {
                    "question_id": stable_question_id(target_ata, question, order),
                    "ata": target_ata,
                    "source_id": source_id,
                    "pdf_page": record["pdf_page"],
                    "section_name": record["section_name"],
                    "subsection_name": record["subsection_name"],
                    "question_text": question,
                    "normalized_question": normalize_text(question),
                    "question_type": question_type,
                    "expected_answer_style": expected_answer_style(question_type, question),
                    "check_status": "unlinked",
                    "confirmed_answer_id": "",
                    "created_at": now,
                    "updated_at": now,
                }
            )
    if target_ata == "32":
        repaired_rows: list[dict[str, str]] = []
        index = 0
        while index < len(rows):
            row = rows[index]
            question = row["question_text"]
            if (
                "Tail SkidのINSPをする際に、何かIndication" in question
                and index + 1 < len(rows)
                and rows[index + 1]["question_text"].startswith("どのようなINDがあるのか")
            ):
                merged = clean_layout_text(question.rstrip("?？") + "？ " + rows[index + 1]["question_text"])
                row["question_id"] = stable_question_id(target_ata, merged, len(repaired_rows) + 1)
                row["question_text"] = merged
                row["normalized_question"] = normalize_text(merged)
                row["question_type"] = classify_question(merged)
                row["expected_answer_style"] = expected_answer_style(row["question_type"], merged)
                repaired_rows.append(row)
                index += 2
                continue
            row["question_id"] = stable_question_id(target_ata, question, len(repaired_rows) + 1)
            repaired_rows.append(row)
            index += 1
        rows = repaired_rows
    if target_ata == "26":
        rows = repair_ata26_rows(rows)
    return rows


def read_existing_rows(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8-sig") as handle:
        return list(csv.DictReader(handle))


def preserve_existing_question_identity(
    rows: list[dict[str, str]],
    existing_rows: list[dict[str, str]],
) -> list[dict[str, str]]:
    if not existing_rows:
        return rows

    target_ata = normalize_ata_key(rows[0].get("ata", "")) if rows else ""
    if target_ata in {"23", "26", "31", "32", "34", "38", "7X"}:
        old_by_normalized: dict[str, list[dict[str, str]]] = defaultdict(list)
        old_by_id = {row.get("question_id", ""): row for row in existing_rows}
        for old_row in existing_rows:
            old_by_normalized[normalize_text(old_row.get("question_text", ""))].append(old_row)

        repaired_ids = {
            "23": ATA23_REPAIRED_QUESTION_IDS,
            "26": ATA26_REPAIRED_QUESTION_IDS,
            "31": ATA31_REPAIRED_QUESTION_IDS,
            "32": ATA32_REPAIRED_QUESTION_IDS,
            "34": ATA34_REPAIRED_QUESTION_IDS,
            "38": ATA38_REPAIRED_QUESTION_IDS,
            "7X": ATA7X_REPAIRED_QUESTION_IDS,
        }[target_ata]
        overrides = {
            normalize_text(question): question_id
            for question, question_id in repaired_ids.items()
        }
        assigned_ids: set[str] = set()
        matched_row_indexes: set[int] = set()
        for row_index, row in enumerate(rows):
            normalized = normalize_text(row.get("question_text", ""))
            override_id = overrides.get(normalized)
            matches = old_by_normalized.get(normalized, [])
            if override_id:
                row["question_id"] = override_id
                matched_row_indexes.add(row_index)
                old_row = old_by_id.get(override_id)
                if old_row:
                    row["created_at"] = old_row.get("created_at") or row["created_at"]
            elif len(matches) == 1:
                row["question_id"] = matches[0]["question_id"]
                row["created_at"] = matches[0].get("created_at") or row["created_at"]
                matched_row_indexes.add(row_index)
            if row_index in matched_row_indexes:
                if row["question_id"] in assigned_ids:
                    raise ValueError(f"Duplicate question identity after ATA{target_ata} repair: {row['question_id']}")
                assigned_ids.add(row["question_id"])

        unmatched_new_by_page: dict[str, list[tuple[int, dict[str, str]]]] = defaultdict(list)
        unmatched_old_by_page: dict[str, list[dict[str, str]]] = defaultdict(list)
        for row_index, row in enumerate(rows):
            if row_index not in matched_row_indexes:
                unmatched_new_by_page[str(row["pdf_page"])].append((row_index, row))
        for old_row in existing_rows:
            if old_row.get("question_id", "") not in assigned_ids:
                unmatched_old_by_page[str(old_row["pdf_page"])].append(old_row)

        pages = sorted(
            set(unmatched_new_by_page) | set(unmatched_old_by_page),
            key=lambda value: int(value or 0),
        )
        mismatches = [
            f"page {page}: existing={len(unmatched_old_by_page[page])}, extracted={len(unmatched_new_by_page[page])}"
            for page in pages
            if len(unmatched_old_by_page[page]) != len(unmatched_new_by_page[page])
        ]
        if mismatches:
            raise ValueError(
                f"Question identity preservation failed after ATA{target_ata} exact matching; "
                + "; ".join(mismatches)
            )

        for page in pages:
            for (row_index, new_row), old_row in zip(
                unmatched_new_by_page[page],
                unmatched_old_by_page[page],
                strict=True,
            ):
                new_row["question_id"] = old_row["question_id"]
                new_row["created_at"] = old_row.get("created_at") or new_row["created_at"]
                matched_row_indexes.add(row_index)
                if new_row["question_id"] in assigned_ids:
                    raise ValueError(f"Duplicate question identity after ATA{target_ata} fallback: {new_row['question_id']}")
                assigned_ids.add(new_row["question_id"])
        return rows

    new_by_page: dict[str, list[dict[str, str]]] = defaultdict(list)
    old_by_page: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        new_by_page[str(row["pdf_page"])].append(row)
    for row in existing_rows:
        old_by_page[str(row["pdf_page"])].append(row)

    pages = sorted(set(new_by_page) | set(old_by_page), key=lambda value: int(value or 0))
    mismatches = [
        f"page {page}: existing={len(old_by_page[page])}, extracted={len(new_by_page[page])}"
        for page in pages
        if len(old_by_page[page]) != len(new_by_page[page])
    ]
    if mismatches:
        raise ValueError(
            "Question identity preservation failed; per-page counts differ. "
            + "; ".join(mismatches)
        )

    for page in pages:
        for new_row, old_row in zip(new_by_page[page], old_by_page[page], strict=True):
            new_row["question_id"] = old_row["question_id"]
            new_row["created_at"] = old_row.get("created_at") or new_row["created_at"]
    return rows


def write_csv(path: Path, rows: list[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=QUESTION_HEADERS)
        writer.writeheader()
        writer.writerows(rows)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Extract question bank into CSV.")
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--out-dir", type=Path, default=Path("data"))
    parser.add_argument("--ata", default="24")
    parser.add_argument("--source-id", default="")
    parser.add_argument("--preserve-ids-from", type=Path, default=None)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    source_id = args.source_id or f"src_question_bank_{args.ata}"
    output_path = args.out_dir / f"question_bank_ata{args.ata}.csv"
    preserve_path = args.preserve_ids_from
    if preserve_path is None and output_path.exists():
        preserve_path = output_path
    existing_rows = read_existing_rows(preserve_path) if preserve_path else []
    rows = extract_rows(args.pdf, args.ata, source_id)
    rows = preserve_existing_question_identity(rows, existing_rows)
    write_csv(output_path, rows)
    print(f"question_bank,{len(rows)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
