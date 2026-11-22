#!/usr/bin/env python3
"""Add the PIRATES menu tab to an existing KAOSTWINS homepage.
This script edits exactly ONE existing file (index.html), inserts only ONE link,
backs up that file first, and refuses to run on an unrecognized homepage.
No Eden, site styles, images, or other project files are altered.
"""
from pathlib import Path
from datetime import datetime
import re, shutil, sys

repo = Path(__file__).resolve().parent
index = repo / 'index.html'
pirate = repo / 'the-bloody-nuisance' / 'index.html'
if not index.is_file():
    sys.exit('STOP: No KAOSTWINS index.html found beside this script. Unzip the add-on INSIDE your existing KAOSxTWINS repository folder, then try again.')
if not pirate.is_file():
    sys.exit('STOP: Missing the-bloody-nuisance/index.html. Extract the entire add-on first.')
html = index.read_text(encoding='utf-8')
if 'KAOS' not in html.upper():
    sys.exit('STOP: This does not look like the existing KAOSTWINS homepage. No changes made.')
nav_re = re.compile(r'(<nav\b(?=[^>]*(?:id=["\']navlinks["\']))[^>]*>)(.*?)(</nav>)', re.I|re.S)
match = nav_re.search(html)
if not match:
    sys.exit('STOP: Could not safely find the KAOSTWINS navlinks menu. No changes made. Please send the current index.html to Gage.')
inside = match.group(2)
if 'the-bloody-nuisance/' in inside.lower():
    print('The PIRATES menu tab is already installed. No changes needed.')
    sys.exit(0)
eden_re = re.compile(r'(<a\b(?=[^>]*href\s*=\s*["\']eden-mall/?["\'])[^>]*>.*?</a>)',re.I|re.S)
if not eden_re.search(inside):
    sys.exit('STOP: Could not find the Eden Mall link in the nav. No changes made. Please send the current index.html to Gage.')
link = '<a href="the-bloody-nuisance/" aria-label="Explore The Bloody Nuisance pirate world" style="color:#e9c08a">PIRATES ☠</a>'
new_inside = eden_re.sub(lambda m:m.group(1)+link,inside,count=1)
new_html = html[:match.start(2)] + new_inside + html[match.end(2):]
backup = repo / ('index.BACKUP_BEFORE_PIRATES_'+datetime.now().strftime('%Y%m%d_%H%M%S')+'.html')
shutil.copy2(index, backup)
index.write_text(new_html, encoding='utf-8')
print('SUCCESS! The PIRATES ☠ tab was added beside Eden Mall.')
print('UNCHANGED: all other KAOSTWINS HTML, Eden Mall, scripts, assets and project files.')
print('BACKUP:',backup.name)
print('PAGE: the-bloody-nuisance/index.html')
print('Next: Check that the site works locally, then commit/push only the changed index.html and the-bloody-nuisance/ folder.')
