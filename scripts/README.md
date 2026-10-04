# PDF and CSV preparation scripts

These scripts create local CSV files for the GAS import pipeline.

Run the commands below from `D:\アプリ開発\737-800勉強`. The scripts were moved here on 2026-10-04; the old HobbyHUB `scripts` path is only a local compatibility junction. The extractors use Python with `pypdf` and `pdfplumber`.

Scripts with implicit paths detect both the new standalone layout and the legacy `hobby-hub/737_Study_Finder/` checkout. Explicit PDF and output arguments are relative to the working directory; the examples below use the new root.

`build_engine_7x_data.py` uses the exact standard-question PDF name shown below, so other `737-800` assessment PDFs placed in the same folder are not selected accidentally.

```powershell
$py = "C:\Users\aqua_\AppData\Local\Programs\Python\Python314\python.exe"
& $py scripts\extract_study_guide.py "Study_Guide\24_REF.pdf" --out-dir data
& $py scripts\extract_question_bank.py "標準問題集\737-800標準問題集(2012.03.13).pdf" --out-dir data
node scripts\generate_answer_drafts.js 24
node scripts\build_prepared_gas_data.js 24
```

If a reviewed answer file exists, `generate_answer_drafts.js` uses it before the extractive draft. Verify answers against SG. The public app displays the latest `answer_notes` as the main answer, not as a draft. Do not regenerate over reviewed Sheet edits: sync the affected ATA first.
Use one file per ATA so future chapters stay separate, for example:

- `scripts/reviewed_answers_ata24.js`

Outputs are ATA-scoped, for example:

- `data/textbook_pages_ata24.csv`
- `data/textbook_sections_ata24.csv`
- `data/question_bank_ata24.csv`
- `data/question_bank_ata24_prepared.csv`
- `data/candidate_links_ata24.csv`
- `data/answer_notes_ata24.csv`
- `gas/PreparedAtaData.gs`

Generated CSV files are intentionally ignored by Git.
`PreparedAtaData.gs` is generated from those CSVs and is committed so the Study app can import prepared ATA data without manual CSV upload. The builder preserves existing embedded ATA blocks when adding selected ATAs.

## Question boundary validation

After changing `extract_question_bank.py`, validate the layout exceptions and preserved question IDs against the standard problem collection:

```powershell
$py = "C:\Users\aqua_\AppData\Local\Programs\Python\Python314\python.exe"
& $py scripts\validate_question_extractor.py "標準問題集\737-800標準問題集(2012.03.13).pdf" --data-dir data
```

The validation covers ATA26 duplicate/line-wrap handling, ATA38 parenthetical question boundaries, and the 7X section header plus contextual questions.

## Sync reviewed Sheet data back to local CSV

The public `Study737_DB` is the canonical copy after questions or answers are reviewed directly in Sheets. Export `source_files`, `question_bank`, `answer_notes`, and `candidate_links` as CSV into `tmp/sheet-sync/`, using these file names:

- `source_files_all.csv`
- `question_bank_all.csv`
- `answer_notes_all.csv`
- `candidate_links_all.csv`

Then sync selected ATA files and rebuild embedded GAS prepared data:

```powershell
node scripts\sync_study_csv_from_sheet_export.js 22 24
node scripts\build_prepared_gas_data.js 22 24
node scripts\validate_study_data.js
```

The sync refuses missing questions, duplicate IDs, duplicate canonical answers, or question/answer count differences.
