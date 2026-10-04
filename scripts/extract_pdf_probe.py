from __future__ import annotations

import sys
from pathlib import Path

from pypdf import PdfReader


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: extract_pdf_probe.py <pdf_path>")
        return 2

    pdf_path = Path(sys.argv[1])
    reader = PdfReader(str(pdf_path))
    print(f"file,{pdf_path.name}")
    print(f"pages,{len(reader.pages)}")
    for index in range(min(5, len(reader.pages))):
        text = " ".join((reader.pages[index].extract_text() or "").split())
        print(f"page,{index + 1},{text[:500]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
