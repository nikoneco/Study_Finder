from __future__ import annotations

import csv
from datetime import datetime, timezone
from pathlib import Path

from extract_study_guide import (
    TEXTBOOK_PAGE_HEADERS,
    TEXTBOOK_SECTION_HEADERS,
    build_rows,
    write_csv,
)


ENGINE_ATAS = [str(ata) for ata in range(71, 81)]
ENGINE_KEY = "7X"


def prefixed_page_code(source_ata: str, page_code: str) -> str:
    return f"{source_ata}-{page_code}" if page_code else ""


def transform_page_rows(rows: list[dict[str, str]], source_ata: str) -> list[dict[str, str]]:
    transformed = []
    id_by_old_code = {}

    for row in rows:
        old_page_id = row["page_id"]
        old_page_code = row["page_code"]
        new_row = dict(row)
        new_row["ata"] = ENGINE_KEY
        new_row["page_id"] = old_page_id.replace(f"pg_{source_ata}_", f"pg_{ENGINE_KEY}_{source_ata}_", 1)
        new_row["page_code"] = prefixed_page_code(source_ata, old_page_code)
        new_row["related_page_code"] = prefixed_page_code(source_ata, row["related_page_code"])
        new_row["source_id"] = f"src_sg_{ENGINE_KEY}_{source_ata}_ref"
        if old_page_code:
            id_by_old_code[old_page_code] = new_row["page_id"]
        transformed.append(new_row)

    for row in transformed:
        related_code = row["related_page_code"]
        if related_code:
            old_related_code = related_code.split("-", 1)[1]
            row["related_page_id"] = id_by_old_code.get(old_related_code, "")
        else:
            row["related_page_id"] = ""

    return transformed


def transform_section_rows(rows: list[dict[str, str]], source_ata: str) -> list[dict[str, str]]:
    transformed = []
    for row in rows:
        new_row = dict(row)
        new_row["ata"] = ENGINE_KEY
        new_row["section_id"] = row["section_id"].replace(f"sec_{source_ata}_", f"sec_{ENGINE_KEY}_{source_ata}_", 1)
        new_row["source_id"] = f"src_sg_{ENGINE_KEY}_{source_ata}_ref"
        new_row["start_page_code"] = prefixed_page_code(source_ata, row["start_page_code"])
        new_row["end_page_code"] = prefixed_page_code(source_ata, row["end_page_code"])
        transformed.append(new_row)
    return transformed


def write_source_files(path: Path, question_bank_pdf_name: str) -> None:
    now = datetime.now(timezone.utc).isoformat()
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "source_id",
                "source_type",
                "ata",
                "file_name",
                "drive_file_id",
                "local_path",
                "version",
                "note",
                "imported_at",
            ],
        )
        writer.writeheader()
        for source_ata in ENGINE_ATAS:
            file_name = f"{source_ata} REF.pdf"
            writer.writerow(
                {
                    "source_id": f"src_sg_{ENGINE_KEY}_{source_ata}_ref",
                    "source_type": "study_guide_pdf",
                    "ata": ENGINE_KEY,
                    "file_name": file_name,
                    "drive_file_id": "",
                    "local_path": f"Study_Guide/{file_name}",
                    "version": "local",
                    "note": f"Prepared from local ATA {source_ata} PDF extraction for Engine 7X",
                    "imported_at": now,
                }
            )
        writer.writerow(
            {
                "source_id": f"src_question_bank_{ENGINE_KEY}",
                "source_type": "question_bank_pdf",
                "ata": ENGINE_KEY,
                "file_name": question_bank_pdf_name,
                "drive_file_id": "",
                "local_path": f"標準問題集/{question_bank_pdf_name}",
                "version": "local",
                "note": "Prepared from local PDF extraction for Engine 7X",
                "imported_at": now,
            }
        )


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    if not (root / "gas" / "StudyService.gs").is_file():
        root = root / "737_Study_Finder"
    study_guide_dir = root / "Study_Guide"
    data_dir = root / "data"
    question_bank_pdf = root / "標準問題集" / "737-800標準問題集(2012.03.13).pdf"

    all_page_rows: list[dict[str, str]] = []
    all_section_rows: list[dict[str, str]] = []
    for source_ata in ENGINE_ATAS:
        pdf_path = study_guide_dir / f"{source_ata} REF.pdf"
        page_rows, section_rows = build_rows(pdf_path, source_ata, f"src_sg_{ENGINE_KEY}_{source_ata}_ref")
        all_page_rows.extend(transform_page_rows(page_rows, source_ata))
        all_section_rows.extend(transform_section_rows(section_rows, source_ata))

    write_csv(data_dir / f"textbook_pages_ata{ENGINE_KEY}.csv", TEXTBOOK_PAGE_HEADERS, all_page_rows)
    write_csv(data_dir / f"textbook_sections_ata{ENGINE_KEY}.csv", TEXTBOOK_SECTION_HEADERS, all_section_rows)
    write_source_files(data_dir / f"source_files_ata{ENGINE_KEY}.csv", question_bank_pdf.name)

    print(f"textbook_pages,{len(all_page_rows)}")
    print(f"textbook_sections,{len(all_section_rows)}")
    print(f"source_files,{len(ENGINE_ATAS) + 1}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
