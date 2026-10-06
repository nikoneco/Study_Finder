"""Small synthetic local fixtures; no private source PDF is required or published."""
import contextlib
import hashlib
import io
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

import prepare_oral_sources as corpus


class OralSourcePreparationTests(unittest.TestCase):
    def setUp(self):
        # Windows sandbox TEMP may allow the initial mkdir but reject children.
        # Keep the disposable fixture under this project's private corpus.
        corpus.OUT.mkdir(parents=True, exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(prefix='test-fixture-', dir=corpus.OUT)
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.out = self.root / 'data' / 'oral' / 'corpus'
        self.texts = {}

    def fixture(self, relative, text):
        file = self.root / relative
        file.parent.mkdir(parents=True, exist_ok=True)
        # PdfReader is mocked; content is synthetic and hashes still cover bytes.
        file.write_bytes(b'%PDF-1.4\n' + text.encode('utf-8'))
        self.texts[file] = text
        return file

    def run_prepare(self):
        def reader(file):
            return SimpleNamespace(pages=[SimpleNamespace(extract_text=lambda: self.texts[file])])
        with patch.object(corpus, 'PdfReader', side_effect=reader), contextlib.redirect_stdout(io.StringIO()):
            return corpus.main(self.root, self.out)

    def test_legacy_ids_and_same_name_additional_pdf_are_independent(self):
        old = self.fixture('標準問題集/口頭MM/12-12-00-610-801.pdf', 'TASK 12-12-00-610-801\n' + 'legacy ' * 30)
        sg = self.fixture('Study_Guide/24_REF.pdf', 'study guide ' * 30)
        before = self.run_prepare()
        old_bytes = {s['source_id']: (self.out / (s['source_id'] + '.json')).read_bytes() for s in before['sources']}
        added = self.fixture(corpus.ADDITIONAL_DIR / old.name, 'TASK 12-12-00-610-801\nRev 90 - 15 Jun 2026\n' + 'new ' * 40)
        after = self.run_prepare()
        self.assertEqual(after['source_count'], 3)
        self.assertEqual(corpus.make_source_id('AMM', old, self.root), 'amm_' + hashlib.sha256(old.name.encode()).hexdigest()[:12])
        self.assertEqual(corpus.make_source_id('SG', sg, self.root), 'sg_' + hashlib.sha256(sg.name.encode()).hexdigest()[:12])
        added_id = corpus.make_source_id('AMM', added, self.root)
        self.assertEqual(added_id, 'amm_' + hashlib.sha256(added.relative_to(self.root).as_posix().encode()).hexdigest()[:12])
        self.assertNotEqual(added_id, corpus.make_source_id('AMM', old, self.root))
        for source_id, content in old_bytes.items():
            self.assertEqual((self.out / (source_id + '.json')).read_bytes(), content)
        self.assertEqual(next(s for s in after['sources'] if s['source_id'] == added_id)['file'], added.relative_to(self.root).as_posix())
        self.assertNotEqual(next(s for s in after['sources'] if s['source_id'] == added_id)['sha256'], hashlib.sha256(old.read_bytes()).hexdigest())
        self.assertTrue(old.exists() and added.exists())

    def test_ignores_images_past_materials_and_unrelated_folder(self):
        expected = self.fixture(corpus.ADDITIONAL_DIR / '32-00-00.pdf', 'primary')
        self.fixture(corpus.ADDITIONAL_DIR / 'screenshot.png', 'image')
        self.fixture(corpus.ADDITIONAL_DIR / 'nested' / 'extra.pdf', 'nested')
        self.fixture('標準問題集/口頭MM/過去資料/extra.pdf', 'auxiliary')
        self.fixture('標準問題集/unrelated.pdf', 'unrelated')
        self.assertEqual(corpus.discover_inputs(self.root), [('AMM', expected)])

    def metadata(self, name, head, repaired=''):
        return corpus.additional_metadata(Path(name), [{'text': head, 'repaired_text': repaired, 'needs_visual_check': bool(repaired)}])

    def test_original_task_wins_over_misspelled_filename(self):
        meta = self.metadata('2-41-41-700-801.pdf', 'Rev 90 - 15 Jun 2026\nTASK 32-41-41-700-801\n')
        self.assertEqual(meta['reference'], '32-41-41-700-801')
        self.assertIn('filename_reference_mismatch', meta['metadata_warnings'])

    def test_epm_eqm_are_not_mssm_cards_and_revision_table_is_used(self):
        for kind, reference in [('EPM', '31-708-001'), ('EQM', '31-708C')]:
            name = f'{kind}31-708 MSSM.pdf'
            head = f'制定日 改定日 実施日 Rev. No. {kind} {reference}\n2000-01-01 2020-02-03 2020-03-04 7\n'
            self.assertEqual(corpus.source_type('AMM', Path(name)), kind)
            meta = self.metadata(name, head)
            self.assertEqual(meta['reference'], kind + reference)
            self.assertEqual(meta['revision'], 'Rev. No. 7; 改定日 2020-02-03; 実施日 2020-03-04')
            self.assertEqual(meta['metadata_warnings'], [])
        self.assertEqual(corpus.source_type('AMM', Path('MSSM check.pdf')), 'CARD')

    def test_bulletin_own_header_precedes_cited_task(self):
        meta = self.metadata('12-13-31-3 B0267.pdf', '737-800 AMM 12-13-31-3 B0267 / Rev(BCA): -- / Rev(JAL): 2020-01-01\nRef TASK 49-11-00-710-802')
        self.assertEqual(meta['reference'], '12-13-31-3 B0267')
        self.assertEqual(meta['revision'], 'Rev(BCA): -- / Rev(JAL): 2020-01-01')

    def test_fim_reference_retains_task_number(self):
        meta = self.metadata('FIM29-10 TASK 806.pdf', 'Rev 90 - 15 Jun 2026\nTASK 29-10 TASK 806 Test\n')
        self.assertEqual(meta['reference'], '29-10 TASK 806')

    def test_missing_metadata_not_inferred_from_filename(self):
        meta = self.metadata('EPM31-708-001 MSSM.pdf', 'No identifiable header')
        self.assertEqual(meta['reference'], '')
        self.assertEqual(meta['revision'], '')
        self.assertIn('reference_not_extracted', meta['metadata_warnings'])
        self.assertIn('revision_not_extracted', meta['metadata_warnings'])

    def test_shifted_header_revision_without_corrupting_normal_task(self):
        original = 'Rev 65 - 15 Feb 2018'
        shifted = ''.join(chr(ord(c) - 29) for c in original)
        meta = self.metadata('32-21-00-200-801.pdf', shifted + '\nTASK 32-21-00-200-801\n', 'requires review')
        self.assertEqual(meta['revision'], original)
        self.assertEqual(meta['reference'], '32-21-00-200-801')
        self.assertIn('extraction_requires_visual_check', meta['metadata_warnings'])

    def test_changed_original_refuses_all_writes(self):
        file = self.fixture('Study_Guide/24_REF.pdf', 'original')
        self.run_prepare()
        before = {p.name: p.read_bytes() for p in self.out.glob('*.json')}
        self.fixture(corpus.ADDITIONAL_DIR / 'new.pdf', 'new file')
        file.write_bytes(b'changed')
        with self.assertRaisesRegex(ValueError, 'Source changed'):
            self.run_prepare()
        self.assertEqual({p.name: p.read_bytes() for p in self.out.glob('*.json')}, before)

    def test_duplicate_ids_refuse_writes(self):
        self.fixture('Study_Guide/24_REF.pdf', 'guide')
        self.fixture(corpus.ADDITIONAL_DIR / 'new.pdf', 'new file')
        with patch.object(corpus, 'make_source_id', return_value='amm_collision'):
            with self.assertRaisesRegex(ValueError, 'Duplicate source ID'):
                self.run_prepare()
        self.assertFalse(self.out.exists())

    def test_later_pdf_parse_error_does_not_write_first_pdf(self):
        self.fixture(corpus.ADDITIONAL_DIR / 'aaa.pdf', 'valid fixture')
        self.fixture(corpus.ADDITIONAL_DIR / 'zzz.pdf', 'invalid fixture')
        def reader(file):
            if file.name == 'zzz.pdf':
                raise ValueError('Invalid PDF fixture')
            return SimpleNamespace(pages=[SimpleNamespace(extract_text=lambda: self.texts[file])])
        with patch.object(corpus, 'PdfReader', side_effect=reader):
            with self.assertRaisesRegex(ValueError, 'Invalid PDF'):
                corpus.main(self.root, self.out)
        self.assertFalse(self.out.exists())

    def test_cross_collection_collision_does_not_write_pdf(self):
        file = self.fixture(corpus.ADDITIONAL_DIR / 'new.pdf', 'valid fixture')
        collision = {'source_id': corpus.make_source_id('AMM', file, self.root)}
        with patch.object(corpus, 'prepare_past_sources', return_value=[collision]):
            with self.assertRaisesRegex(ValueError, 'PAST/PDF source ID collision'):
                self.run_prepare()
        self.assertFalse(self.out.exists())


if __name__ == '__main__':
    unittest.main()
