"""Private, hash-addressed page corpus for human-reviewed oral answers."""
from __future__ import annotations
import hashlib
import json
import re
from pathlib import Path
from pypdf import PdfReader
from extract_study_guide import infer_page_code, repair_shifted_ascii_text
from prepare_oral_past_sources import prepare_past_sources

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'data' / 'oral' / 'corpus'
ADDITIONAL_DIR = Path('標準問題集') / '追加MM,EPM資料'
ANNOTATED_SG_DIR = Path('Study_Guide') / 'Hコース後'


def discover_inputs(root):
    """Only primary PDF collections; no recursive auxiliary/image ingestion."""
    inputs = [('SG', p) for p in sorted((root / 'Study_Guide').glob('*.pdf'))]
    inputs += [('SG', p) for p in sorted((root / ANNOTATED_SG_DIR).glob('*.pdf'))]
    inputs += [('AMM', p) for p in sorted((root / '標準問題集' / '口頭MM').glob('*.pdf'))]
    inputs += [('AMM', p) for p in sorted((root / ADDITIONAL_DIR).glob('*.pdf'))]
    return inputs


def make_source_id(kind, file, root):
    # Legacy filename IDs are referenced by reviewed answers and must not change.
    key = file.relative_to(root).as_posix() if file.parent in (root / ADDITIONAL_DIR, root / ANNOTATED_SG_DIR) else file.name
    return kind.lower() + '_' + hashlib.sha256(key.encode('utf-8')).hexdigest()[:12]

def source_type(kind, file):
    if kind == 'SG':
        return 'SG'
    name = file.stem.upper()
    if 'MCM' in name:
        return 'MCM'
    if 'EQM' in name:
        return 'EQM'
    if 'EPM' in name:
        return 'EPM'
    if 'FIM' in name:
        return 'FIM'
    if 'AIPC' in name:
        return 'AIPC'
    if any(word in name for word in ('MSSM', 'CLEANING', 'DEPARTURE', 'DEP CARD')):
        return 'CARD'
    return 'AMM'


def additional_metadata(file, pages):
    """Use the document's own header, never filename guesses or cited tasks."""
    head = pages[0]['text'] if pages else ''
    source_kind = source_type('AMM', file)
    reference = revision = ''
    warnings = []
    if source_kind in ('EPM', 'EQM'):
        match = re.search(r'\b' + source_kind + r'\s*(\d{2}-\d{3}(?:-\d{3}|[A-Z])?)\b', head[:500])
        reference = source_kind + match.group(1) if match else ''
        # The first table row is creation date / revision date / effective date / Rev.No.
        dates = re.search(r'(\d{4}-\d{2}-\d{2})\s+(\d{4}-\d{2}-\d{2})\s+'
                          r'(\d{4}-\d{2}-\d{2})\s+(\d+)\b', head[:500])
        if dates:
            revision = f'Rev. No. {dates.group(4)}; 改定日 {dates.group(2)}; 実施日 {dates.group(3)}'
    else:
        # AMM bulletins identify themselves before body references to other AMM tasks.
        bulletin = re.search(r'\bAMM(?:\s+SUP)?\s+(\d{2}-\d{2}-\d{2}-\d\s+B\d+)\b', head[:300])
        task = re.search(r'\bTASK\s+(\d{2}-\d{2}\s+TASK\s+\d+|[\dA-Z-]+)', head)
        reference = re.sub(r'\s+', ' ', bulletin.group(1)) if bulletin else task.group(1) if task else ''
        rev = re.search(r'Rev\s+\d+\s*-\s*[^\r\n]+', head)
        if not rev and pages and pages[0].get('repaired_text'):
            # Repair only the encoded header lines: mixed normal/shifted pages exist.
            for line in head.splitlines()[:8]:
                if any(ord(c) < 32 for c in line):
                    # These additional exports can use a 29-codepoint font shift,
                    # while the existing SG repair uses 30. Accept only a complete
                    # literal revision header, not arbitrary repaired body text.
                    for offset in (29, 30):
                        repaired_line = ''.join(chr(ord(c) + offset) if 2 <= ord(c) <= 96 and c != ' ' else c for c in line)
                        rev = re.fullmatch(r'Rev\s+\d+\s*-\s*\d{1,2}\s+[A-Za-z]{3}\s+\d{4}\s*', repaired_line)
                        if rev:
                            break
                    if rev:
                        break
        if not rev:
            rev = re.search(r'Rev\(BCA\):\s*[^/\r\n]+/\s*Rev\(JAL\):\s*[^\r\n]+', head[:300])
        revision = rev.group(0).strip() if rev else ''
        filename_task = re.match(r'(\d{1,2}-\d{2}-\d{2}-\d{3}-\d{3}[A-Z]*)', file.stem)
        if filename_task and reference and filename_task.group(1) != reference:
            warnings.append('filename_reference_mismatch')
    if not reference:
        warnings.append('reference_not_extracted')
    if not revision:
        warnings.append('revision_not_extracted')
    if any(p['needs_visual_check'] for p in pages):
        warnings.append('extraction_requires_visual_check')
    return {'reference': reference, 'revision': revision, 'metadata_warnings': warnings}


def main(root=ROOT, out=None):
    out = out if out is not None else root / 'data' / 'oral' / 'corpus'
    inputs = discover_inputs(root)
    prepared_inputs = []
    seen = set()
    # Check the entire input set before writing anything. A changed source requires
    # deliberate review of applicability/answers, not silent cache replacement.
    for kind, file in inputs:
        source_id = make_source_id(kind, file, root)
        if source_id in seen:
            raise ValueError(f'Duplicate source ID: {source_id}')
        seen.add(source_id)
        digest = hashlib.sha256(file.read_bytes()).hexdigest()
        target = out / (source_id + '.json')
        if target.exists():
            cached = json.loads(target.read_text(encoding='utf-8'))
            if cached.get('sha256') != digest:
                raise ValueError(f'Source changed; review before replacing corpus: {source_id}')
            if cached.get('file') != file.relative_to(root).as_posix():
                raise ValueError(f'Source path collision: {source_id}')
        prepared_inputs.append((kind, file, source_id, digest))
    sources = []
    staged = {}
    messages = []
    for kind, file, source_id, digest in prepared_inputs:
        target = out / (source_id + '.json')
        if target.exists():
            cached = json.loads(target.read_text(encoding='utf-8'))
            if cached.get('sha256') == digest:
                expected_type = source_type(kind, file)
                changed = cached.get('type') != expected_type
                cached['type'] = expected_type
                if file.parent == root / ANNOTATED_SG_DIR:
                    title = file.stem + '（Hコース後・授業追記）'
                    changed = changed or cached.get('title') != title
                    cached['title'] = title
                if kind == 'SG' and file.stem.lower().startswith('5x'):
                    for page in cached['pages']:
                        page['repaired_text'] = repair_shifted_ascii_text(page['text'])
                        page['needs_visual_check'] = True
                    changed = True
                if file.stem in ('05-51-01-210-801', '05-51-01-210-802', '24-34-00-710-801'):
                    for page in cached['pages']:
                        page['needs_visual_check'] = True
                    changed = True
                if file.parent == root / ADDITIONAL_DIR:
                    metadata = additional_metadata(file, cached['pages'])
                    changed = changed or any(cached.get(k) != v for k, v in metadata.items())
                    cached.update(metadata)
                if changed:
                    staged[target] = json.dumps(cached,ensure_ascii=False,indent=2)
                sources.append({k:v for k,v in cached.items() if k != 'pages'})
                continue
        reader = PdfReader(file)
        ata = re.match(r'(\d{2}|5[xX])', file.stem)
        ata = ata.group(1).upper() if ata else ''
        pages = []
        for number, page in enumerate(reader.pages, 1):
            text = page.extract_text() or ''
            control_count = sum(ord(c) < 32 and c not in '\r\n\t' for c in text)
            known_shifted = kind == 'SG' and ata == '5X'
            repaired = repair_shifted_ascii_text(text) if control_count > 15 or known_shifted else ''
            pages.append({'pdf_page':number, 'page_code':infer_page_code(text, ata) if kind == 'SG' else '',
                          'text':text, 'repaired_text':repaired,
                          'needs_visual_check': bool(repaired) or len(text.strip()) < 100 or file.stem in
                          ('05-51-01-210-801', '05-51-01-210-802', '24-34-00-710-801')})
        head = pages[0]['text'] if pages else ''
        revision_match = re.search(r'Rev\s+\d+\s*-\s*[^\r\n]+', head)
        reference_match = re.search(r'TASK\s+([\dA-Z-]+)', head)
        title = file.stem + '（Hコース後・授業追記）' if file.parent == root / ANNOTATED_SG_DIR else file.stem
        item = {'source_id':source_id, 'type':source_type(kind, file), 'title':title,
                'file':file.relative_to(root).as_posix(), 'sha256':digest,
                'reference':reference_match.group(1) if reference_match else '',
                'revision':revision_match.group(0) if revision_match else '',
                'page_count':len(pages), 'pages':pages}
        if file.parent == root / ADDITIONAL_DIR:
            item.update(additional_metadata(file, pages))
        staged[target] = json.dumps(item, ensure_ascii=False, indent=2)
        sources.append({k:v for k,v in item.items() if k != 'pages'})
        messages.append(f'{source_id} {file.name}: {len(pages)} pages')
    # Stage DOCX parsing and all cross-collection checks too. No cache or
    # manifest may change on an input/hash/XML/PDF/collision error.
    past_items = prepare_past_sources(root, out, write=False, include_pages=True)
    if any(s['source_id'] in seen for s in past_items):
        raise ValueError('PAST/PDF source ID collision')
    for item in past_items:
        staged[out / (item['source_id'] + '.json')] = json.dumps(item, ensure_ascii=False, indent=2)
    sources += [{k:v for k,v in item.items() if k != 'pages'} for item in past_items]
    for source in sources:
        if hashlib.sha256((root / source['file']).read_bytes()).hexdigest() != source['sha256']:
            raise ValueError(f"Source changed during preparation: {source['source_id']}")
    manifest = {'schema_version':1, 'sources':sources, 'source_count':len(sources),
                'page_count':sum(s['page_count'] for s in sources)}
    staged[out / 'manifest.json'] = json.dumps(manifest,ensure_ascii=False,indent=2)
    out.mkdir(parents=True, exist_ok=True)
    for target, content in staged.items():
        if not target.exists() or target.read_text(encoding='utf-8') != content:
            target.write_text(content, encoding='utf-8')
    for message in messages:
        print(message, flush=True)
    print(json.dumps({'sources':len(sources),'pages':manifest['page_count']}))
    return manifest

if __name__ == '__main__':
    main()
