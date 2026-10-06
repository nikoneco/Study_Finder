"""Private paragraph index of past examinee DOCX aids, not primary evidence.

Read OOXML only. No original edits, Office automation, OCR, or external links.
Logical page numbers identify extracted paragraphs, never rendered DOCX pages.
"""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

PAST_DIR = Path('標準問題集') / '口頭MM' / '過去資料'
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
MAX_ARCHIVE_BYTES = 100 * 1024 * 1024
MAX_MEMBERS = 4096
MAX_MEMBER_BYTES = 64 * 1024 * 1024
MAX_TOTAL_BYTES = 256 * 1024 * 1024
MAX_XML_BYTES = 32 * 1024 * 1024
MAX_COMPRESSION_RATIO = 500


def extract_paragraphs(file):
    """Preserve body/table XML order and original paragraph indices."""
    if file.stat().st_size > MAX_ARCHIVE_BYTES:
        raise ValueError('DOCX archive exceeds size limit')
    with ZipFile(file) as archive:
        members = archive.infolist()
        if len(members) > MAX_MEMBERS or sum(m.file_size for m in members) > MAX_TOTAL_BYTES:
            raise ValueError('DOCX archive exceeds member/expanded-size limit')
        if any(m.file_size > MAX_MEMBER_BYTES or m.file_size > max(m.compress_size, 1) * MAX_COMPRESSION_RATIO for m in members):
            raise ValueError('DOCX archive exceeds expansion limit')
        matches = [m for m in members if m.filename == 'word/document.xml']
        if len(matches) != 1 or matches[0].file_size > MAX_XML_BYTES:
            raise ValueError('DOCX document.xml missing, duplicate, or too large')
        # Do not extract the archive to disk or resolve relationships.
        with archive.open(matches[0]) as stream:
            xml = stream.read(MAX_XML_BYTES + 1)
        if len(xml) > MAX_XML_BYTES:
            raise ValueError('DOCX document.xml exceeds size limit')
    xml_text = xml.decode('utf-8-sig')
    if '\x00' in xml_text or re.search(r'<!\s*(?:DOCTYPE|ENTITY)\b', xml_text, re.I):
        raise ValueError('DTD/entities and unsupported XML encoding are forbidden')
    document = ET.fromstring(xml_text)
    parents = {child: parent for parent in document.iter() for child in parent}
    body = document.find(W + 'body')
    if body is None:
        raise ValueError('DOCX body missing')
    excluded = {W + 'del', W + 'moveFrom'}

    def visible_text(element, paragraph):
        if element.tag in excluded or (element.tag == W + 'p' and element is not paragraph):
            return ''
        if element.tag == W + 't':
            return element.text or ''
        if element.tag == W + 'tab':
            return '\t'
        if element.tag in (W + 'br', W + 'cr'):
            return '\n'
        return ''.join(visible_text(child, paragraph) for child in element)

    pages = []
    for original_number, paragraph in enumerate(body.iter(W + 'p'), 1):
        ancestor = paragraph
        deleted = False
        while ancestor is not None:
            if ancestor.tag in excluded:
                deleted = True
                break
            ancestor = parents.get(ancestor)
        if deleted:
            continue
        text = visible_text(paragraph, paragraph).strip()
        if text:
            pages.append({'pdf_page': len(pages) + 1,
                          'page_code': f'段落 {original_number}', 'text': text,
                          'repaired_text': '', 'needs_visual_check': False})
    return pages


def prepare_past_sources(root, out, *, write=True, include_pages=False):
    """Validate all originals before writing any PAST cache; stable path IDs."""
    items = []
    seen = set()
    for file in sorted((root / PAST_DIR).glob('*.docx')):
        relative = file.relative_to(root).as_posix()
        source_id = 'amm_' + hashlib.sha256(relative.encode('utf-8')).hexdigest()[:12]
        if source_id in seen:
            raise ValueError(f'Duplicate PAST source ID: {source_id}')
        seen.add(source_id)
        digest = hashlib.sha256(file.read_bytes()).hexdigest()
        target = out / (source_id + '.json')
        if target.exists():
            cached = json.loads(target.read_text(encoding='utf-8'))
            if cached.get('sha256') != digest or cached.get('file') != relative:
                raise ValueError(f'PAST source changed/collided; review before replacing: {source_id}')
        pages = extract_paragraphs(file)
        items.append({'source_id': source_id, 'type': 'PAST', 'title': file.stem,
                      'file': relative, 'sha256': digest,
                      'reference': '過去受験資料（暫定）', 'revision': '',
                      'page_count': len(pages), 'pages': pages,
                      'locator_type': 'paragraph',
                      'metadata_warnings': ['past_material_requires_primary_verification',
                                            'images_not_transcribed_or_visually_verified']})
    if items and write:
        out.mkdir(parents=True, exist_ok=True)
    for item in items if write else []:
        target = out / (item['source_id'] + '.json')
        content = json.dumps(item, ensure_ascii=False, indent=2)
        if not target.exists() or target.read_text(encoding='utf-8') != content:
            target.write_text(content, encoding='utf-8')
    return items if include_pages else [{k: v for k, v in item.items() if k != 'pages'} for item in items]
