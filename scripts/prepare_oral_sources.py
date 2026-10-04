"""Private, hash-addressed page corpus for human-reviewed oral answers."""
from __future__ import annotations
import hashlib
import json
import re
from pathlib import Path
from pypdf import PdfReader
from extract_study_guide import infer_page_code, repair_shifted_ascii_text

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'data' / 'oral' / 'corpus'

def source_type(kind, file):
    if kind == 'SG':
        return 'SG'
    name = file.stem.upper()
    if 'MCM' in name:
        return 'MCM'
    if 'EPM' in name:
        return 'EPM'
    if 'FIM' in name:
        return 'FIM'
    if 'AIPC' in name:
        return 'AIPC'
    if any(word in name for word in ('MSSM', 'CLEANING', 'DEPARTURE', 'DEP CARD')):
        return 'CARD'
    return 'AMM'

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    sources = []
    inputs = [('SG', p) for p in sorted((ROOT / 'Study_Guide').glob('*.pdf'))]
    inputs += [('AMM', p) for p in sorted((ROOT / '標準問題集' / '口頭MM').glob('*.pdf'))]
    for kind, file in inputs:
        digest = hashlib.sha256(file.read_bytes()).hexdigest()
        source_id = kind.lower() + '_' + hashlib.sha256(file.name.encode()).hexdigest()[:12]
        target = OUT / (source_id + '.json')
        if target.exists():
            cached = json.loads(target.read_text(encoding='utf-8'))
            if cached.get('sha256') == digest:
                expected_type = source_type(kind, file)
                changed = cached.get('type') != expected_type
                cached['type'] = expected_type
                if kind == 'SG' and file.stem.lower().startswith('5x'):
                    for page in cached['pages']:
                        page['repaired_text'] = repair_shifted_ascii_text(page['text'])
                        page['needs_visual_check'] = True
                    changed = True
                if file.stem in ('05-51-01-210-801', '05-51-01-210-802', '24-34-00-710-801'):
                    for page in cached['pages']:
                        page['needs_visual_check'] = True
                    changed = True
                if changed:
                    target.write_text(json.dumps(cached,ensure_ascii=False,indent=2),encoding='utf-8')
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
        item = {'source_id':source_id, 'type':source_type(kind, file), 'title':file.stem,
                'file':str(file.relative_to(ROOT)).replace('\\','/'), 'sha256':digest,
                'reference':reference_match.group(1) if reference_match else '',
                'revision':revision_match.group(0) if revision_match else '',
                'page_count':len(pages), 'pages':pages}
        target.write_text(json.dumps(item, ensure_ascii=False, indent=2), encoding='utf-8')
        sources.append({k:v for k,v in item.items() if k != 'pages'})
        print(f'{source_id} {file.name}: {len(pages)} pages', flush=True)
    manifest = {'schema_version':1, 'sources':sources, 'source_count':len(sources),
                'page_count':sum(s['page_count'] for s in sources)}
    (OUT / 'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'sources':len(sources),'pages':manifest['page_count']}))

if __name__ == '__main__':
    main()
