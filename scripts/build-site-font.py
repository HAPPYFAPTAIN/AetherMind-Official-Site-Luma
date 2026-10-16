"""Build a variable WOFF2 subset from a locally installed Noto Sans SC font.

Usage: python scripts/build-site-font.py path/to/NotoSansSC-VF.ttf
Requires fonttools and brotli. Re-run when adding site copy; missing glyphs
continue to render through the CSS system-font fallback.
"""
from pathlib import Path
import sys
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
text = ''.join(p.read_text(encoding='utf-8') for p in (root / 'src').rglob('*')
               if p.suffix in {'.tsx', '.ts', '.json', '.css'})
characters = set(text) | {chr(i) for i in range(32, 127)}
font = TTFont(sys.argv[1])
options = subset.Options()
options.flavor = 'woff2'
options.name_IDs = ['*']  # Retain copyright and OFL license metadata.
options.name_legacy = True
options.name_languages = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=''.join(sorted(characters)))
subsetter.subset(font)
font.flavor = 'woff2'
output = root / 'src' / 'app' / 'fonts' / 'noto-sans-sc-site.woff2'
output.parent.mkdir(parents=True, exist_ok=True)
font.save(output)
print(f'{output.name}: {output.stat().st_size:,} bytes, {len(font.getBestCmap()):,} characters')
