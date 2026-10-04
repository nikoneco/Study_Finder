from __future__ import annotations

import argparse
from pathlib import Path

from extract_question_bank import extract_rows, normalize_text, preserve_existing_question_identity, read_existing_rows


EXPECTED_COUNTS = {
    "00": 20,
    "21": 39,
    "22": 39,
    "23": 52,
    "24": 35,
    "25": 17,
    "26": 40,
    "27": 65,
    "28": 40,
    "29": 30,
    "30": 24,
    "31": 27,
    "32": 67,
    "33": 23,
    "34": 105,
    "35": 11,
    "36": 19,
    "38": 25,
    "47": 17,
    "49": 24,
    "5X": 17,
    "7X": 68,
}

EXPECTED_QUESTIONS = {
    "26": {
        "q_26_d38b89bc4e4e": "APU Fire Extinguishing BTLから噴射されたハロンがAPUのどこに噴射されるか記入しなさい。",
        "q_26_57068b577893": "P8 PNLのAPU Fire HNDLを引くと機体としてどのような状態になるか、ATA別に整理して説明しなさい。",
        "q_26_5a6f52295abc": "CGO Electronic Unitの機能を記入しなさい。",
    },
    "38": {
        "q_38_d1cbf6e5aa80": "Potable Water Systemの構成及び作動概要を記入しなさい。",
        "q_38_a0429924c283": "（F0-02）図面の空欄10箇所に名称を記入しなさい。",
    },
    "7X": {
        "q_7X_fefc40bbc708": "Engine Fuel & Control Systemで、Fuel Spar ValveからFuel Nozzleまでにある各Componentの作動概要とLocationを記入しなさい。",
        "q_7X_b4cf96f37399": "Engine Lubrication Systemの主要Component、Locationおよび機能を説明しなさい。",
    },
}


ALLOWED_SOURCE_DUPLICATES = {
    # ATA25 repeats wording across different subsections, so it is not a contextual duplicate.
    "25": set(),
    "32": {
        (
            normalize_text("TIRE & WHL"),
            normalize_text("Tire & WHLの取扱い上の注意事項を7つ簡潔に記入しなさい。"),
        ),
    },
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate question extraction boundaries and preserved IDs.")
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--data-dir", type=Path, required=True)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    for ata, expected_count in EXPECTED_COUNTS.items():
        rows = extract_rows(args.pdf, ata, f"src_question_bank_{ata}")
        existing_path = args.data_dir / f"question_bank_ata{ata}.csv"
        existing_rows = read_existing_rows(existing_path)
        rows = preserve_existing_question_identity(rows, existing_rows)

        if len(rows) != expected_count:
            raise AssertionError(f"ATA{ata}: expected {expected_count} questions, got {len(rows)}")
        ids = [row["question_id"] for row in rows]
        if len(ids) != len(set(ids)):
            raise AssertionError(f"ATA{ata}: duplicate question IDs")
        contextual_questions = [
            (normalize_text(row["subsection_name"]), normalize_text(row["question_text"]))
            for row in rows
        ]
        duplicate_questions = {
            key for key in contextual_questions if contextual_questions.count(key) > 1
        }
        unexpected_duplicates = duplicate_questions - ALLOWED_SOURCE_DUPLICATES.get(ata, set())
        if unexpected_duplicates:
            raise AssertionError(
                f"ATA{ata}: unexpected duplicate questions within the same subsection: {unexpected_duplicates}"
            )

        by_id = {row["question_id"]: row["question_text"] for row in rows}
        for question_id, expected_text in EXPECTED_QUESTIONS.get(ata, {}).items():
            actual = by_id.get(question_id)
            if actual != expected_text:
                raise AssertionError(
                    f"ATA{ata}: {question_id} mismatch\nexpected: {expected_text}\nactual: {actual}"
                )

        existing_ids = {row["question_id"] for row in existing_rows}
        if set(ids) != existing_ids:
            raise AssertionError(f"ATA{ata}: preserved question ID set changed")
        print(f"ATA{ata},questions={len(rows)},ids_preserved=yes,boundaries=ok")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
