from __future__ import annotations

import argparse
import csv
import re
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader


TEXTBOOK_PAGE_HEADERS = [
    "page_id",
    "ata",
    "source_id",
    "pdf_name",
    "pdf_page",
    "page_code",
    "page_type",
    "section_code",
    "section_title",
    "title",
    "body_text",
    "normalized_text",
    "keywords",
    "related_page_code",
    "related_page_id",
    "drive_url",
    "created_at",
    "updated_at",
]

TEXTBOOK_SECTION_HEADERS = [
    "section_id",
    "ata",
    "section_name",
    "start_page_code",
    "end_page_code",
    "source_id",
    "display_order",
    "keywords",
]

PAGE_CODE_RE = re.compile(r"\b([DF])\s*(\d+)\s*-\s*(\d)\s*(\d)?")
INDEX_ENTRY_RE = re.compile(
    r"\b(?P<code>[DF]\d+-\d{2})\s+(?P<date>\d{4})\s*(?P<title>.*?)(?=\s+[DF]\d+-\d{2}\s+\d{4}\b|$)"
)
SECTION_NAME_MAP = {
    "24": {
        "24-00": "Electrical Power",
        "24-10": "Generator Drive",
        "24-20": "AC Generation",
        "24-30": "DC Generation",
        "24-31": "Battery and Battery Charger",
        "24-34": "Standby Power System",
        "24-40": "External Power",
        "24-50": "AC Electrical Load Distribution",
    }
}


def normalize_text(value: str) -> str:
    text = unicodedata.normalize("NFKC", value or "")
    text = re.sub(r"[‐-‒–—―]", "-", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip().upper()


def compact_text(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def repair_shifted_ascii_text(value: str) -> str:
    repaired = []
    for char in value or "":
        code = ord(char)
        if code == 0x20:
            repaired.append(" ")
        elif 0x02 <= code <= 0x60:
            repaired.append(chr(code + 30))
        else:
            repaired.append(char)
    return "".join(repaired)


def canonical_page_code(match: re.Match[str]) -> str:
    letter = match.group(1)
    major = match.group(2)
    minor = (match.group(3) or "") + (match.group(4) or "")
    return f"{letter}{int(major)}-{int(minor):02d}"


def related_page_code(page_code: str) -> str:
    if not page_code:
        return ""
    prefixed = re.match(r"^(\d{2})-([DF].+)$", page_code)
    if prefixed:
        prefix, child_code = prefixed.groups()
        child_related = related_page_code(child_code)
        return f"{prefix}-{child_related}" if child_related else ""
    if page_code.startswith("D"):
        return "F" + page_code[1:]
    if page_code.startswith("F"):
        return "D" + page_code[1:]
    return ""


def page_type(page_code: str, text: str) -> str:
    prefixed = re.match(r"^\d{2}-([DF].+)$", page_code or "")
    if prefixed:
        return page_type(prefixed.group(1), text)
    if not page_code:
        if "INDEX" in text[:100]:
            return "index"
        if "BLANK INTENTIONALLY BLANK" in text:
            return "blank"
        return "unknown"
    if page_code.startswith("D"):
        return "text"
    if page_code.startswith("F"):
        return "figure"
    return "unknown"


def page_id(ata: str, page_code: str, pdf_page: int) -> str:
    suffix = page_code.lower().replace("-", "_") if page_code else f"pdf_{pdf_page:03d}"
    return f"pg_{ata}_{suffix}"


def section_id(ata: str, section_code: str) -> str:
    suffix = section_code.replace("-", "_").lower() if section_code else "unknown"
    return f"sec_{ata}_{suffix}"


def section_title_from_code(ata: str, section_code: str, title: str) -> str:
    section_names = SECTION_NAME_MAP.get(ata, {})
    return section_names.get(section_code, title.split(" - ")[0].strip() if title else "")


def extract_page_codes(text: str) -> list[str]:
    return [canonical_page_code(match) for match in PAGE_CODE_RE.finditer(text)]


def infer_page_code(text: str, ata: str) -> str:
    footer_re = re.compile(
        rf"737-\s*\d\s*\d\s*\d\s+{re.escape(ata)}-\d{{2}}\s+\d{{4}}\s+([DF]\s*\d+\s*-\s*\d\s*\d?)",
        re.IGNORECASE,
    )
    footer_codes = []
    for match in footer_re.finditer(text):
        code_match = PAGE_CODE_RE.search(match.group(1))
        if code_match:
            footer_codes.append(canonical_page_code(code_match))
    if footer_codes:
        return footer_codes[-1]

    codes = extract_page_codes(text)
    if not codes:
        return ""
    return codes[-1]


def extract_section_code(text: str, ata: str) -> str:
    if ata.upper() == "5X":
        matches_5x = re.findall(r"\b(5[1-7])-(\d{2})\b", text)
        if matches_5x:
            major, minor = matches_5x[-1]
            return f"{major}-{minor}"
    section_re = re.compile(rf"\b{re.escape(ata)}-(\d{{2}})\b")
    matches = section_re.findall(text)
    if not matches:
        return ""
    return f"{ata}-{matches[-1]}"


def build_index_title_map(reader: PdfReader, start_page: int = 1, end_page: int | None = None, max_index_pages: int = 4) -> dict[str, str]:
    last_page = end_page or len(reader.pages)
    indexes = range(start_page - 1, min(start_page - 1 + max_index_pages, last_page, len(reader.pages)))
    index_text = " ".join(compact_text(reader.pages[i].extract_text() or "") for i in indexes)
    title_map: dict[str, str] = {}
    for match in INDEX_ENTRY_RE.finditer(index_text):
        code = match.group("code")
        title = cleanup_title(match.group("title"))
        if title:
            title_map[canonical_page_code(PAGE_CODE_RE.search(code))] = title
    return title_map


def cleanup_title(title: str) -> str:
    title = compact_text(title)
    title = re.sub(r"\bR\b$", "", title).strip()
    title = title.replace("（", "(").replace("）", ")")
    return title


def looks_like_title(title: str) -> bool:
    if not title or len(title) > 100:
        return False
    if "INDEX" in title or "BLANK INTENTIONALLY BLANK" in title:
        return False
    if re.search(r"[ぁ-んァ-ヶ一-龠]", title):
        return False
    if re.search(r"[a-z]", title):
        return False
    return bool(re.search(r"[A-Z]", title))


def infer_footer_title(text: str, page_code: str, ata: str) -> str:
    if not page_code:
        return ""
    letter = page_code[0]
    major, minor = page_code[1:].split("-")
    code_pattern = rf"{letter}\s*{int(major)}\s*-\s*{minor[0]}\s*{minor[1]}"
    pattern = re.compile(
        rf"([A-Z0-9][A-Z0-9\s(),/&\-–]+?)\s+737-\s*8\s*0\s*0\s+{re.escape(ata)}-\d{{2}}\s+\d{{4}}\s+{code_pattern}"
    )
    matches = pattern.findall(text)
    if not matches:
        return ""
    return cleanup_title(matches[-1])


def infer_title(text: str, page_code: str, title_map: dict[str, str], ata: str) -> str:
    if not page_code:
        return "INDEX" if "INDEX" in text[:100] else ""

    footer_title = infer_footer_title(text, page_code, ata)
    if looks_like_title(footer_title):
        return footer_title

    if page_code in title_map and looks_like_title(title_map[page_code]):
        return title_map[page_code]

    code_pos = text.rfind(page_code)
    before_code = text[:code_pos] if code_pos >= 0 else text
    marker = "737-800"
    marker_pos = before_code.rfind(marker)
    if marker_pos >= 0:
        candidate = before_code[:marker_pos].split(". ")[-1]
        title = cleanup_title(candidate[-120:])
        if looks_like_title(title):
            return title
    return cleanup_title(before_code[-120:])


def keywords_for(title: str, body_text: str) -> str:
    source = normalize_text(f"{title} {body_text}")
    terms = sorted(set(re.findall(r"\b[A-Z][A-Z0-9/-]{1,}\b", source)))
    return ",".join(terms[:40])


def build_rows(
    pdf_path: Path,
    ata: str,
    source_id: str,
    start_page: int = 1,
    end_page: int | None = None,
) -> tuple[list[dict[str, str]], list[dict[str, str]]]:
    reader = PdfReader(str(pdf_path))
    last_page = end_page or len(reader.pages)
    title_map = build_index_title_map(reader, start_page=start_page, end_page=last_page)
    now = datetime.now(timezone.utc).isoformat()
    rows: list[dict[str, str]] = []

    for index in range(start_page, min(last_page, len(reader.pages)) + 1):
        page = reader.pages[index - 1]
        raw_text = page.extract_text() or ""
        body_text = compact_text(raw_text)
        if ata.upper() == "5X":
            repaired_text = compact_text(repair_shifted_ascii_text(raw_text))
            if repaired_text and repaired_text != body_text:
                body_text = compact_text(f"{body_text} {repaired_text}")
        is_index_page = index < start_page + 4
        section_code = extract_section_code(body_text, ata)
        code = "" if is_index_page else infer_page_code(body_text, ata)
        title = "INDEX" if is_index_page else infer_title(body_text, code, title_map, ata)
        if ata.upper() == "5X" and code and section_code:
            code = f"{section_code.split('-', 1)[0]}-{code}"
        row_page_id = page_id(ata, code, index)
        related_code = related_page_code(code)
        rows.append(
            {
                "page_id": row_page_id,
                "ata": ata,
                "source_id": source_id,
                "pdf_name": pdf_path.name,
                "pdf_page": str(index),
                "page_code": code,
                "page_type": "index" if is_index_page else page_type(code, body_text),
                "section_code": section_code,
                "section_title": section_title_from_code(ata, section_code, title),
                "title": title,
                "body_text": body_text,
                "normalized_text": normalize_text(body_text),
                "keywords": keywords_for(title, body_text),
                "related_page_code": related_code,
                "related_page_id": page_id(ata, related_code, index) if related_code else "",
                "drive_url": "",
                "created_at": now,
                "updated_at": now,
            }
        )

    page_id_by_code = {row["page_code"]: row["page_id"] for row in rows if row["page_code"]}
    for row in rows:
        related_code = row["related_page_code"]
        row["related_page_id"] = page_id_by_code.get(related_code, "")

    sections = build_sections(rows, ata, source_id)
    return rows, sections


def build_sections(rows: list[dict[str, str]], ata: str, source_id: str) -> list[dict[str, str]]:
    sections: dict[str, dict[str, str]] = {}
    for row in rows:
        section_code = row["section_code"]
        if not section_code:
            continue
        current = sections.get(section_code)
        if not current:
            sections[section_code] = {
                "section_id": section_id(ata, section_code),
                "ata": ata,
                "section_name": row["section_title"],
                "start_page_code": row["page_code"],
                "end_page_code": row["page_code"],
                "source_id": source_id,
                "display_order": str(len(sections) + 1),
                "keywords": row["section_title"],
            }
        else:
            current["end_page_code"] = row["page_code"] or current["end_page_code"]
    return list(sections.values())


def write_csv(path: Path, headers: list[str], rows: list[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Extract Study Guide pages into CSV files.")
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--out-dir", type=Path, default=Path("data"))
    parser.add_argument("--ata", default="24")
    parser.add_argument("--source-id", default="")
    parser.add_argument("--page-start", type=int, default=1)
    parser.add_argument("--page-end", type=int, default=0)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    source_id = args.source_id or f"src_sg_{args.ata}_ref"
    page_rows, section_rows = build_rows(
        args.pdf,
        args.ata,
        source_id,
        start_page=args.page_start,
        end_page=args.page_end or None,
    )
    suffix = f"ata{args.ata}"
    write_csv(args.out_dir / f"textbook_pages_{suffix}.csv", TEXTBOOK_PAGE_HEADERS, page_rows)
    write_csv(args.out_dir / f"textbook_sections_{suffix}.csv", TEXTBOOK_SECTION_HEADERS, section_rows)
    print(f"textbook_pages,{len(page_rows)}")
    print(f"textbook_sections,{len(section_rows)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
