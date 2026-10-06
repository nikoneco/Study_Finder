"""Synthetic OOXML-only fixtures; no private past document is needed."""
import contextlib
import hashlib
import io
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch
from zipfile import ZIP_DEFLATED, ZipFile

import prepare_oral_sources as corpus
import prepare_oral_past_sources as past


class PastSourcePreparationTests(unittest.TestCase):
    def setUp(self):
        corpus.OUT.mkdir(parents=True, exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(prefix='test-fixture-', dir=corpus.OUT)
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.out = self.root / 'data' / 'oral' / 'corpus'

    def fixture(self, body, name='past.docx', prefix=''):
        file = self.root / past.PAST_DIR / name
        file.parent.mkdir(parents=True, exist_ok=True)
        xml = prefix + '<w:document xmlns:w="' + past.W[1:-1] + '"><w:body>' + body + '</w:body></w:document>'
        with ZipFile(file, 'w', ZIP_DEFLATED) as archive:
            archive.writestr('word/document.xml', xml)
        return file

    def test_paragraphs_tables_order_and_original_indices(self):
        file = self.fixture('<w:p><w:r><w:t>First</w:t></w:r></w:p><w:p/>'
                            '<w:tbl><w:tr><w:tc><w:p><w:r><w:t>Table</w:t></w:r></w:p></w:tc></w:tr></w:tbl>'
                            '<w:p><w:r><w:t>Last</w:t></w:r></w:p>')
        pages = past.extract_paragraphs(file)
        self.assertEqual([p['text'] for p in pages], ['First', 'Table', 'Last'])
        self.assertEqual([p['pdf_page'] for p in pages], [1, 2, 3])
        self.assertEqual([p['page_code'] for p in pages], ['段落 1', '段落 3', '段落 4'])
        self.assertTrue(all(not p['needs_visual_check'] and not p['repaired_text'] for p in pages))

    def test_deleted_text_paragraphs_and_images_excluded_boundaries_preserved(self):
        file = self.fixture('<w:p><w:del><w:r><w:t>deleted</w:t></w:r></w:del><w:ins><w:r><w:t>Keep</w:t>'
                            '<w:tab/><w:t>tab</w:t><w:br/><w:t>line</w:t></w:r></w:ins></w:p>'
                            '<w:del><w:p><w:r><w:t>whole deleted</w:t></w:r></w:p></w:del>'
                            '<w:p><w:r><w:drawing/></w:r></w:p>'
                            '<w:p><w:r><w:t>End</w:t></w:r></w:p>')
        pages = past.extract_paragraphs(file)
        self.assertEqual([p['text'] for p in pages], ['Keep\ttab\nline', 'End'])
        self.assertEqual(pages[1]['page_code'], '段落 4')

    def test_nested_textbox_paragraphs_not_double_counted(self):
        file = self.fixture('<w:p><w:r><w:t>Outer</w:t><w:drawing><w:p><w:r><w:t>Inner</w:t></w:r></w:p></w:drawing></w:r></w:p>')
        self.assertEqual([p['text'] for p in past.extract_paragraphs(file)], ['Outer', 'Inner'])

    def test_dtd_and_external_entities_forbidden(self):
        file = self.fixture('<w:p/>', prefix='<!DOCTYPE w:document [<!ENTITY leak SYSTEM "file:///never-read">]>')
        with self.assertRaisesRegex(ValueError, 'DTD/entities'):
            past.extract_paragraphs(file)

    def test_archive_and_xml_limits(self):
        file = self.fixture('<w:p><w:r><w:t>Text</w:t></w:r></w:p>')
        with patch.object(past, 'MAX_XML_BYTES', 10):
            with self.assertRaisesRegex(ValueError, 'too large'):
                past.extract_paragraphs(file)
        with patch.object(past, 'MAX_COMPRESSION_RATIO', 1):
            with self.assertRaisesRegex(ValueError, 'expansion limit'):
                past.extract_paragraphs(file)

    def test_stable_ids_originals_and_integrated_manifest_across_runs(self):
        file = self.fixture('<w:p><w:r><w:t>Text</w:t></w:r></w:p>')
        original = file.read_bytes()
        with contextlib.redirect_stdout(io.StringIO()):
            first = corpus.main(self.root, self.out)
            before = {p.name: p.read_bytes() for p in self.out.glob('*.json')}
            second = corpus.main(self.root, self.out)
        self.assertEqual(first, second)
        self.assertEqual({p.name: p.read_bytes() for p in self.out.glob('*.json')}, before)
        self.assertEqual(file.read_bytes(), original)
        source = first['sources'][0]
        self.assertEqual(source['source_id'], 'amm_' + hashlib.sha256(file.relative_to(self.root).as_posix().encode()).hexdigest()[:12])
        self.assertEqual(source['type'], 'PAST')
        self.assertEqual(source['locator_type'], 'paragraph')
        self.assertEqual(source['reference'], '過去受験資料（暫定）')
        self.assertEqual(source['revision'], '')
        self.assertEqual(source['sha256'], hashlib.sha256(original).hexdigest())

    def test_changed_original_refuses_past_writes(self):
        file = self.fixture('<w:p><w:r><w:t>Text</w:t></w:r></w:p>')
        past.prepare_past_sources(self.root, self.out)
        before = {p.name: p.read_bytes() for p in self.out.glob('*.json')}
        self.fixture('<w:p><w:r><w:t>New</w:t></w:r></w:p>', name='aaa.docx')
        file.write_bytes(b'changed original')
        with self.assertRaisesRegex(ValueError, 'PAST source changed/collided'):
            past.prepare_past_sources(self.root, self.out)
        self.assertEqual({p.name: p.read_bytes() for p in self.out.glob('*.json')}, before)

    def test_changed_past_refuses_integrated_pdf_and_manifest_writes(self):
        file = self.fixture('<w:p><w:r><w:t>Original</w:t></w:r></w:p>')
        with contextlib.redirect_stdout(io.StringIO()):
            corpus.main(self.root, self.out)
        before = {p.name: p.read_bytes() for p in self.out.glob('*.json')}
        pdf = self.root / corpus.ADDITIONAL_DIR / 'new.pdf'
        pdf.parent.mkdir(parents=True, exist_ok=True)
        pdf.write_bytes(b'new synthetic PDF')
        file.write_bytes(b'changed original')
        reader = SimpleNamespace(pages=[SimpleNamespace(extract_text=lambda:'new PDF text')])
        with patch.object(corpus, 'PdfReader', return_value=reader):
            with self.assertRaisesRegex(ValueError, 'PAST source changed/collided'):
                corpus.main(self.root, self.out)
        self.assertEqual({p.name: p.read_bytes() for p in self.out.glob('*.json')}, before)

    def test_invalid_docx_xml_refuses_new_pdf_writes(self):
        self.fixture('<w:p><w:r><w:t>Text</w:t></w:r></w:p>', prefix='<!DOCTYPE w:document>')
        pdf = self.root / corpus.ADDITIONAL_DIR / 'new.pdf'
        pdf.parent.mkdir(parents=True, exist_ok=True)
        pdf.write_bytes(b'new synthetic PDF')
        reader = SimpleNamespace(pages=[SimpleNamespace(extract_text=lambda:'new PDF text')])
        with patch.object(corpus, 'PdfReader', return_value=reader):
            with self.assertRaisesRegex(ValueError, 'DTD/entities'):
                corpus.main(self.root, self.out)
        self.assertFalse(self.out.exists())


if __name__ == '__main__':
    unittest.main()
