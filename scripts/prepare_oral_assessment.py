"""Index the local REV-3 assessment without generating questions or answers.

The PDF and every output remain local-only. Preserve original numbering,
parent context, explicit LEVEL changes, conditions, REF text and PDF pages.
"""

import argparse
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_PDF = ROOT / "標準問題集" / "737-800 評価シート (REV-3).pdf"
GROUP_PAGES = {
    3: "点検要領Ⅰ",
    9: "点検要領Ⅱ",
    15: "交換・調整",
    21: "Servicing",
    29: "Open / Close・Override・Deactivate",
    35: "SYSTEM：機体",
    43: "SYSTEM：通信・航法・計器",
    49: "SYSTEM：装備",
    55: "SYSTEM：発動機",
}
PANEL_START = re.compile(r"^\s*(\d+)\s+737-800\s+技能照査評価シート\s*$")
ROW_START = re.compile(r"^\s*(\d+)\s+([ⅠⅡ])\s+(.+)$")
LEVEL_CHANGE = re.compile(r"^\s*([ⅠⅡ])\s+(.+)$")


def compact(value):
    return re.sub(r"\s+", " ", value).strip()


def parse_panel(lines, page, panel_index, group):
    header_index = next(i for i, line in enumerate(lines) if "照査項目:" in line)
    header = lines[header_index]
    title = compact(header.split("照査項目:", 1)[1].split("REV-3", 1)[0])
    ata_index = next(i for i, line in enumerate(lines) if re.search(r"ATA\s*-", line))
    ata_match = re.search(r"ATA\s*-\s*([0-9Xx()]+)\s*(.*)$", lines[ata_index])
    if not ata_match:
        raise ValueError(f"Unrecognized ATA on PDF page {page}")
    ata_raw = ata_match[1].upper()
    title = compact(title + " " + ata_match[2])
    body_index = next(i for i, line in enumerate(lines) if "評価項目" in line)
    ref_lines = [line for line in lines[ata_index + 1:body_index] if line.strip()]
    refs_raw = "\n".join(ref_lines)
    ref_text = compact(re.sub(r"REF\s*:", " ", refs_raw))
    section_id = f"oral_rev3_p{page:02}_s{panel_index:02}"
    rows = []
    subheading = ""
    for line in lines[body_index + 1:]:
        if re.match(r"^\s*LEVEL\s*[ⅠⅡ]", line):
            break
        if not line.strip():
            continue
        if re.match(r"^\s*-{3,}", line):
            subheading = compact(line).strip("- ")
            continue
        match = ROW_START.match(line)
        if match:
            rows.append({
                "assessment_id": f"{section_id}_r{len(rows) + 1:02}",
                "source_item_number": match[1],
                "source_row_order": len(rows) + 1,
                "primary_level": match[2],
                "levels": [match[2]],
                "subheading": subheading,
                "source_lines": [line],
                "content_lines": [{"level": match[2], "text": match[3].strip(), "explicit_level": True}],
                "answer_status": "awaiting_reference_manual",
            })
        elif rows:
            change = LEVEL_CHANGE.match(line)
            level = change[1] if change else rows[-1]["primary_level"]
            text = change[2].strip() if change else line.strip()
            rows[-1]["source_lines"].append(line)
            rows[-1]["content_lines"].append({"level": level, "text": text, "explicit_level": bool(change)})
            if level not in rows[-1]["levels"]:
                rows[-1]["levels"].append(level)
        else:
            raise ValueError(f"Unattached assessment text on PDF page {page}: {line}")
    if not rows:
        raise ValueError(f"No assessment rows on PDF page {page}")
    counts = Counter(row["source_item_number"] for row in rows)
    warnings = []
    if any(count > 1 for count in counts.values()):
        warnings.append("duplicate_source_item_number_preserved")
    if any(len(row["levels"]) > 1 for row in rows):
        warnings.append("mixed_levels_within_assessment_row")
    if not ref_text:
        warnings.append("source_ref_blank_do_not_invent")
    if page in (12, 19, 27, 33):
        warnings.append("ref_layout_or_shorthand_requires_visual_manual_review")
    numbers = [int(row["source_item_number"]) for row in rows]
    if sorted(set(numbers)) != list(range(1, max(numbers) + 1)):
        warnings.append("source_item_number_gap_preserved")
    return {
        "section_id": section_id,
        "group": group,
        "source_pdf_page": page,
        "source_panel_on_page": panel_index,
        "source_section_number": PANEL_START.match(lines[0])[1],
        "source_category": compact(header.split("照査項目:", 1)[0]),
        "title": title,
        "ata_raw": ata_raw,
        "atas": re.findall(r"\d{2}|[57]X", ata_raw),
        "ref_lines": ref_lines,
        "ref_text": ref_text,
        "reference_status": "manual_collection_pending" if ref_text else "reference_selection_pending",
        "source_lines": lines,
        "warnings": warnings,
        "assessment_rows": rows,
    }


def prepare(pdf):
    reader = PdfReader(pdf)
    pages = [page.extract_text(extraction_mode="layout") for page in reader.pages]
    if len(pages) != 58 or "REV.3" not in pages[0] or "2024/03/05" not in pages[0]:
        raise ValueError("Unexpected source revision. Review the new PDF instead of silently re-indexing.")
    sections = []
    group = ""
    for page_number, text in enumerate(pages, 1):
        if page_number in GROUP_PAGES:
            group = GROUP_PAGES[page_number]
        lines = text.splitlines()
        starts = [i for i, line in enumerate(lines) if PANEL_START.match(line)]
        for index, start in enumerate(starts, 1):
            end = starts[index] if index < len(starts) else len(lines)
            sections.append(parse_panel(lines[start:end], page_number, index, group))
    rows = [row for section in sections for row in section["assessment_rows"]]
    assert len(sections) == 55, "Expected 55 assessment sections"
    assert len({row["assessment_id"] for row in rows}) == len(rows), "Duplicate assessment ID"
    counts = [{"name": name, "sections": sum(s["group"] == name for s in sections),
               "assessment_rows": sum(len(s["assessment_rows"]) for s in sections if s["group"] == name)}
              for name in GROUP_PAGES.values()]
    return {
        "schema_version": 1,
        "visibility": "local_only_do_not_publish",
        "source_file": pdf.name,
        "source_sha256": hashlib.sha256(pdf.read_bytes()).hexdigest(),
        "source_revision": "REV-3",
        "source_revision_date": "2024-03-05",
        "source_page_count": len(pages),
        "status": "assessment_index_only_not_question_bank_or_answers",
        "question_hierarchy": {
            "main_question": {"source_label": "照査項目", "collection": "sections"},
            "subquestion": {"source_label": "番号付き項目", "collection": "sections[].assessment_rows"},
            "supplement_policy": "小問内の補足・条件・LEVEL変更は同じ小問に保持し、親の照査項目から切り離さない",
        },
        "level_policy": {"Ⅰ": "記憶して正式名称・適切な語句で口述", "Ⅱ": "最新の技術資料を参照して判断・作業・説明"},
        "groups": counts,
        "assessment_row_count": len(rows),
        "sections": sections,
        "source_pages": [{"pdf_page": i + 1, "layout_text": text} for i, text in enumerate(pages)],
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", type=Path, default=DEFAULT_PDF)
    parser.add_argument("--out", type=Path, default=ROOT / "data" / "oral" / "assessment_rev3.json")
    args = parser.parse_args()
    target = args.out.resolve()
    if not target.is_relative_to((ROOT / "data" / "oral").resolve()):
        raise ValueError("Outputs must remain under ignored data/oral, never web/docs/assets.")
    result = prepare(args.pdf.resolve())
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"source_pages": result["source_page_count"], "sections": len(result["sections"]),
                      "assessment_rows": result["assessment_row_count"], "groups": result["groups"],
                      "answers_generated": 0, "visibility": result["visibility"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
