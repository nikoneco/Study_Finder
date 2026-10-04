"""Compare every assessment child against an independent local PDF extraction.

Read-only: do not regenerate the Sheet or local prepared answers. No source text
is printed; report IDs and counts only. The PDF and index stay private.
"""
import json
import re
from pathlib import Path

import pdfplumber

from prepare_oral_assessment import DEFAULT_PDF, PANEL_START, LEVEL_CHANGE, prepare


def normalized(text):
    # pdfplumber can place a list marker on a neighboring line (p.4). Compare
    # every nondecorative character without relying on marker placement.
    return re.sub(r"[\s・]+", "", text)


def audit():
    index = prepare(DEFAULT_PDF)
    saved = json.loads((Path(__file__).resolve().parents[1] / "data/oral/assessment_rev3.json").read_text(encoding="utf-8"))
    assert index["source_sha256"] == saved["source_sha256"], "Source revision changed"
    assert index["sections"] == saved["sections"], "Saved source index differs from current PDF"
    observed = {}
    with pdfplumber.open(DEFAULT_PDF) as pdf:
        for page_number, page in enumerate(pdf.pages, 1):
            panel = 0
            in_body = False
            rows = []
            for line in (page.extract_text() or "").splitlines():
                if PANEL_START.match(line):
                    panel += 1
                    rows = []
                    observed[f"oral_rev3_p{page_number:02}_s{panel:02}"] = rows
                    in_body = False
                elif panel and "項目 LEVEL 評価項目" in line:
                    in_body = True
                elif re.match(r"^LEVEL\s*[ⅠⅡ]", line):
                    in_body = False
                elif in_body and line.strip():
                    if re.match(r"^-{3,}", line):
                        continue
                    # p.13 puts the number/LEVEL and text on separate baselines.
                    numbered = re.match(r"^\s*(\d+)\s+([ⅠⅡ])(?:\s+(.*))?$", line)
                    if numbered:
                        rows.append([numbered[1], [numbered[3] or ""]])
                    elif rows:
                        change = LEVEL_CHANGE.match(line)
                        rows[-1][1].append(change[2] if change else line)
                    else:
                        raise AssertionError(f"Unattached text p.{page_number}")
    mismatches = []
    blank_bullets = []
    for section in index["sections"]:
        rows = observed.get(section["section_id"], [])
        if len(rows) != len(section["assessment_rows"]):
            mismatches.append(section["section_id"])
            continue
        for source, other in zip(section["assessment_rows"], rows):
            if source["source_item_number"] != other[0] or normalized("".join(p["text"] for p in source["content_lines"])) != normalized("".join(other[1])):
                mismatches.append(source["assessment_id"])
            if any(p["text"].strip() == "・" for p in source["content_lines"]):
                blank_bullets.append(source["assessment_id"])
    report = {"sections": len(index["sections"]), "children": index["assessment_row_count"],
              "raw_prompt_lines": sum(len(r["content_lines"]) for s in index["sections"] for r in s["assessment_rows"]),
              "blank_bullet_items": blank_bullets, "independent_extraction_mismatches": mismatches}
    print(json.dumps(report, ensure_ascii=False))
    assert not mismatches, "Review source text discrepancies before changing data"


if __name__ == "__main__":
    audit()
