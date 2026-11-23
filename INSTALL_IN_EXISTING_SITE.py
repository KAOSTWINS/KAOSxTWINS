#!/usr/bin/env python3
"""Idempotently add Blood Moon Court navigation + featured portal to the CURRENT KAOSTWINS index.html.

Never replaces your existing homepage with an older snapshot, and never alters other bot pages.
Run from the root of your current KAOSxTWINS repository after copying blood-moon-court/ into that root.
"""
from pathlib import Path
from datetime import datetime
import re,sys
root=Path.cwd()
index=root/'index.html'
site=root/'blood-moon-court'/'index.html'
if not index.exists() or not site.exists():
 sys.exit('ERROR: Run from the actual KAOSxTWINS repository root. Both index.html and blood-moon-court/index.html must exist.')
s=index.read_text(encoding='utf-8')
if 'BMC-INTEGRATION-MARKER' in s:
 print('Blood Moon Court integration is already installed. Nothing changed.')
 sys.exit(0)
# Require an existing navigation element and worlds section, so no accidental destructive patch.
nav=re.search(r'<nav\b[^>]*class=["\'][^"\']*navlinks[^"\']*["\'][^>]*>.*?</nav>',s,re.I|re.S)
world=s.find('id="worlds"')
if not nav or world<0:
 sys.exit('ERROR: Unknown homepage structure. No changes made. Use the manual snippet in README or update installer to match current HTML.')
backup=root/f'index.before-blood-moon-{datetime.now().strftime("%Y%m%d-%H%M%S")}.bak'
backup.write_text(s,encoding='utf-8')
# Insert only one anchor in existing navigation; preserve all older links unchanged.
part=nav.group(0)
anchor='<a href="blood-moon-court/" style="color:#e8c5a4">BLOOD MOON 🥀</a>'
if 'href="pirates/' in part:
  part=re.sub(r'(<a\b[^>]*href="pirates/"[^>]*>.*?</a>)',r'\1'+anchor,part,count=1,flags=re.S|re.I)
elif 'href="eden-mall/' in part:
  part=re.sub(r'(<a\b[^>]*href="eden-mall/"[^>]*>.*?</a>)',r'\1'+anchor,part,count=1,flags=re.S|re.I)
else:
  part=part.replace('</nav>',anchor+'</nav>',1)
s=s[:nav.start()]+part+s[nav.end():]
# Add a dedicated full-width portal above the existing filter bar, not inside any older cards/scripts.
world=s.find('id="worlds"')
nextfilter=s.find('<div class="filterbar"',world)
if nextfilter<0 or nextfilter-world>35000:
 sys.exit('ERROR: Current worlds layout differs. Homepage backup created, but original index remains unchanged.')
portal='''\n<!-- BMC-INTEGRATION-MARKER: standalone Blood Moon Court world -->
<a class="bmc-home-portal" href="blood-moon-court/" aria-label="Enter Blood Moon Court interactive website">
 <img src="blood-moon-court/assets/cast.webp" alt="The four beast-shifters of Blood Moon Court" loading="lazy">
 <span class="bmc-home-copy"><span class="bmc-kicker">NEW UNIVERSE · DARK FANTASY ABO · 18+ GALLERY</span><strong>BLOOD MOON <em>COURT</em></strong><span>Four beasts. Three broken promises. One wedding that never happened.</span><span class="bmc-go">MEET THE BEASTS · EXPLORE VALEDORN · RING LADY KNELL ↗</span></span>
</a>
'''
s=s[:nextfilter]+portal+s[nextfilter:]
style='''\n<style id="bmc-home-style">
.bmc-home-portal{display:grid;grid-template-columns:230px 1fr;align-items:center;gap:25px;background:linear-gradient(110deg,#260f1f,#130d19 70%,#311421);border:1px solid #bb8d71;min-height:240px;margin:20px 0 30px;overflow:hidden;color:#f4e4d5;text-decoration:none!important;box-shadow:0 14px 38px #0008}.bmc-home-portal img{display:block;width:100%;height:265px;object-fit:cover;object-position:center 32%}.bmc-home-copy{padding:23px 25px 23px 0;display:flex;flex-direction:column;gap:9px}.bmc-home-copy .bmc-kicker{font:700 10px Arial,sans-serif;letter-spacing:2px;color:#dbab83}.bmc-home-copy strong{font:500 clamp(32px,4vw,58px)/.95 Georgia,serif;color:#ffefdc}.bmc-home-copy em{color:#e2b68b;font-weight:400}.bmc-home-copy>span:nth-last-child(2){font:italic 22px/1.2 Georgia,serif}.bmc-home-copy .bmc-go{font:700 10px Arial,sans-serif;letter-spacing:1.3px;color:#e6bf95;margin-top:7px}.bmc-home-portal:hover{border-color:#ffdbad;background:linear-gradient(110deg,#341627,#1c1121 70%,#371728)}@media(max-width:600px){.bmc-home-portal{grid-template-columns:1fr}.bmc-home-portal img{height:210px;object-position:center 36%}.bmc-home-copy{padding:0 19px 24px}.bmc-home-copy strong{font-size:39px}.bmc-home-copy>span:nth-last-child(2){font-size:20px}}
</style>\n'''
pos=s.lower().rfind('</head>')
if pos<0:sys.exit('ERROR: No </head> tag found. No changes written.')
s=s[:pos]+style+s[pos:]
index.write_text(s,encoding='utf-8')
print('SUCCESS: Added the Blood Moon Court navigation link and featured universe card.')
print('Original backed up to:',backup.name)
print('All pre-existing bot pages and site assets were preserved.')
