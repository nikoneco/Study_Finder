# PDF and CSV preparation scripts

These scripts create local CSV files for the GAS import pipeline.

Run the commands below from `D:\アプリ開発\737-800勉強`. The scripts were moved here on 2026-10-04 and are tracked by the independent `Study_Finder` repository. The old HobbyHUB compatibility junction has been removed. The extractors use Python with `pypdf` and `pdfplumber`.

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

## Oral assessment preparation (local only)

```powershell
python -X utf8 scripts\prepare_oral_assessment.py
python -X utf8 scripts\test_oral_assessment.py
python -X utf8 scripts\audit_oral_prompts.py
node scripts\audit_oral_presentation.js
```

The exact input is `標準問題集/737-800 評価シート (REV-3).pdf`, not the written question collection. It indexes all 58 pages: 55 main questions (照査項目 / sections), each containing its numbered subquestions (279 assessment rows in total). Supplements and conditions remain inside the same subquestion; the index does not generate question wording or answers. Original item numbers, duplicate numbers, mixed LEVEL I/II, subheadings, conditions, REF text and PDF-page context are preserved. Do not expand shorthand REF values or invent blank references before manual verification.

Output `data/oral/assessment_rev3.json` and preparation notes are ignored and local-only. Never embed them in `docs`, public `web` assets or the written `PreparedAtaData.gs`.

`audit_oral_prompts.py` independently compares every numbered child's text through pypdf and pdfplumber, allowing only whitespace and list-marker placement differences. It is read-only, prints IDs/counts rather than source text, and requires the current source hash/index to agree. `audit_oral_presentation.js` checks that the UI retains all meaningful source characters and answer-point ownership without mutating original prompt indexes. It uses private initial-registration files as a local regression fixture, not as authority to overwrite live Sheets. Before production edits, compare the latest Sheet separately. The original four bullet-only lines are retained in data but not rendered; 47 same-level wrapped continuations are joined in the current REV-3 display.

## Oral sources, reviewed answers and initial registration

```powershell
python -X utf8 scripts\prepare_oral_sources.py
node scripts\build_oral_data.js --partial
node scripts\build_oral_data.js
```

`prepare_oral_sources.py` indexes collected PDFs in `Study_Guide/`, the separate annotated `Study_Guide/Hコース後/`, `標準問題集/口頭MM/` and `標準問題集/追加MM,EPM資料/` directories into private `data/oral/corpus/`. It never moves or edits originals. Annotated SG and additional same-named PDFs have path-derived IDs; existing source IDs remain stable. Only PDFs directly in these directories are indexed, without recursively mixing other folders. AMM/SG/EPM/EQM/FIM types, document hashes, page text and extraction flags are recorded. A false flag is not proof that numbers or conditions are correct: visually inspect garbled or ambiguous pages and verify applicability.

Under the user's 2026-10-06 instruction, past examinees' Word materials in `標準問題集/口頭MM/過去資料/` may provisionally supply a learning answer where primary manuals are unavailable. Primary manuals still take precedence; do not silently generalize conflicting, different-aircraft or unknown-applicability material. `prepare_oral_past_sources.py` indexes nonempty body/table paragraphs as type `PAST`, preserving original XML paragraph numbers in `page_code`. Its `pdf_page` is a logical locator index, not a PDF page; the UI displays the paragraph label. No image OCR is invented. A PAST-based answer point must be `partial` with `裏付け中` in its gap; runtime and UI prevent it from appearing verified. Originals, paragraph extracts, embedded images and review quotes remain private. Only whitelisted source metadata/locators are exposed.

Reviewed batches are private `data/oral/answers_procedures_*.json` and `answers_systems_*.json`. Every original child keeps its stable assessment ID. Each answer point binds all relevant original `content_lines` via zero-based `prompt_indexes`, records precise page anchors, and explains any unsupported part. `insufficient` points cannot carry an invented summary. This is human-reviewed source-based authoring, not an external AI API call.

`--partial` validates authored entries without exporting incomplete production data. The full command requires 55 parents, 279 children, complete one-time prompt coverage, valid source IDs/pages, exact private evidence anchors, truthful status/gaps, visual verification of flagged pages and unchanged source PDF hashes. It produces private `compiled.json` and `validation.json` only when all checks pass. Semantic independent review is still required: a text anchor alone does not prove the summary.

`oral-contract.js` defines the four dedicated Sheet schemas. `makeSheetRequests` builds literal-only, bounded 40-row `updateCells` batches for grounded Sheet IDs; it does not send them. Compiled rows exclude source quotes and local paths. Runtime `gas/OralService.gs` exposes read-only, whitelisted oral payloads, not this review corpus.

These generated files are for the first approved registration. Once Sheets becomes canonical, do not replay all generated rows over direct Sheet corrections. Read/export and back up the current four oral tabs, compare IDs, and update only the approved cells. Preserve every written tab. Always distinguish structural validation, semantic source review, Sheet write/readback, GAS deployment and public PWA checks.

`plan_oral_sheet_patch.js` plans (but never sends) an existing-Sheet update against a fresh canonical snapshot. It rejects any question/parent change, preserves unchanged timestamps and registered sources, appends newly used source metadata, and emits exact-row literal-only answer/source requests. Ground sheet IDs and capacities from current metadata, recheck for concurrent edits before sending, and verify values plus unaffected rows/formatting afterward. `tools/check-oral-sheet-patch.js` covers these safeguards; source preparation tests are `scripts/test_oral_sources.py` and `scripts/test_oral_past_sources.py`.
