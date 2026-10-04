"""Local source-integrity checks; never uploads assessment content."""
import unittest

from prepare_oral_assessment import DEFAULT_PDF, prepare


class AssessmentPreparationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.index = prepare(DEFAULT_PDF)
        cls.sections = cls.index["sections"]

    def section(self, page, panel=1):
        return next(s for s in self.sections if s["source_pdf_page"] == page and s["source_panel_on_page"] == panel)

    def test_complete_source_and_unique_ids(self):
        self.assertEqual(self.index["source_page_count"], 58)
        self.assertEqual(len(self.index["source_pages"]), 58)
        self.assertEqual(len(self.sections), 55)
        self.assertEqual(self.index["assessment_row_count"], 279)
        rows = [row for s in self.sections for row in s["assessment_rows"]]
        self.assertEqual(len({r["assessment_id"] for r in rows}), 279)
        self.assertTrue(all(r["source_lines"] and r["content_lines"] for r in rows))
        self.assertTrue(all(r["answer_status"] == "awaiting_reference_manual" for r in rows))
        self.assertTrue(all("answer_text" not in r for r in rows))
        self.assertFalse(any("\ufffd" in page["layout_text"] for page in self.index["source_pages"]))

    def test_groups_and_original_context(self):
        self.assertEqual([g["sections"] for g in self.index["groups"]], [9, 7, 6, 6, 7, 8, 4, 6, 2])
        self.assertEqual([g["assessment_rows"] for g in self.index["groups"]], [32, 39, 29, 46, 23, 43, 24, 32, 11])
        self.assertIn("JOB CARD", self.section(4)["title"])
        self.assertEqual(self.section(5, 1)["ata_raw"], "31")
        self.assertEqual(self.section(5, 2)["ata_raw"], "7X")

    def test_duplicate_numbers_remain_separate(self):
        fire = self.section(7)["assessment_rows"]
        self.assertEqual([r["source_item_number"] for r in fire], ["1", "2", "3", "3"])
        self.assertEqual([r["primary_level"] for r in fire[-2:]], ["Ⅰ", "Ⅱ"])
        self.assertNotEqual(fire[-1]["assessment_id"], fire[-2]["assessment_id"])
        wheels = self.section(17)["assessment_rows"]
        self.assertEqual([r["source_item_number"] for r in wheels], ["1", "2", "3", "4", "5", "6", "6"])
        self.assertNotEqual(wheels[-1]["assessment_id"], wheels[-2]["assessment_id"])

    def test_mixed_levels_stay_with_their_parent(self):
        for page, row_index in [(10, 1), (22, 2), (27, 7)]:
            row = self.section(page)["assessment_rows"][row_index]
            self.assertEqual(row["primary_level"], "Ⅰ")
            self.assertEqual(row["levels"], ["Ⅰ", "Ⅱ"])
            self.assertTrue(any(line["level"] == "Ⅱ" and line["explicit_level"] for line in row["content_lines"]))

    def test_conditions_refs_and_subheadings(self):
        first_fire = self.section(7)["assessment_rows"][0]
        self.assertIn("CODC", "\n".join(first_fire["source_lines"]))
        self.assertIn("24-34-00-710-801", self.section(7, 2)["ref_text"])
        fuel = self.section(38)
        self.assertEqual(fuel["atas"], ["28", "47"])
        self.assertEqual(fuel["assessment_rows"][0]["subheading"], "ATA 28")
        self.assertEqual(fuel["assessment_rows"][4]["subheading"], "ATA 47")

    def test_blank_refs_gaps_and_local_only_policy(self):
        self.assertEqual(sum(not s["ref_text"] for s in self.sections), 20)
        self.assertTrue(all("source_ref_blank_do_not_invent" in s["warnings"] for s in self.sections if not s["ref_text"]))
        self.assertIn("source_item_number_gap_preserved", self.section(40)["warnings"])
        self.assertEqual(self.index["visibility"], "local_only_do_not_publish")
        self.assertIn("ref_layout_or_shorthand_requires_visual_manual_review", self.section(12)["warnings"])


if __name__ == "__main__":
    unittest.main()
