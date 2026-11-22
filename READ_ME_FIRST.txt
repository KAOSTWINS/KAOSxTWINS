KAOSTWINS + THE BLOODY NUISANCE • SAFE SUBPAGE ADD-ON
====================================================
THIS IS NOT A REPLACEMENT FOR YOUR KAOSTWINS SITE.
DO NOT DELETE OR REPLACE YOUR EXISTING index.html OR assets/ OR eden-mall/.

THE EXACT RESULT
  KAOSTWINS homepage: https://kaostwins.github.io/KAOSxTWINS/
  Pirate mini-site:   https://kaostwins.github.io/KAOSxTWINS/the-bloody-nuisance/
  New navigation tab: PIRATES ☠ (next to EDEN MALL)
  Pirate page header: ← KAOSTWINS (returns to the original homepage)

INSTALL WITH GITHUB DESKTOP (RECOMMENDED)
1. In GitHub Desktop, open your existing KAOSxTWINS repository.
   Ensure your original homepage is showing correctly after the revert.
2. Choose Repository → Show in Explorer, then make a COPY of the repository folder
   before changing anything.
3. Extract THIS zip into the existing KAOSxTWINS repository folder.
   The result MUST be:
       KAOSxTWINS/index.html                  [YOUR EXISTING FILE, KEEP IT!]
       KAOSxTWINS/eden-mall/                   [YOUR EXISTING FOLDER, KEEP IT!]
       KAOSxTWINS/assets/                      [YOUR EXISTING FOLDER, KEEP IT!]
       KAOSxTWINS/the-bloody-nuisance/index.html  [NEW FOLDER]
       KAOSxTWINS/ADD_PIRATES_TAB.py           [NEW HELPER]
4. Double-click ADD_PIRATES_TAB_WINDOWS.bat. It edits only the nav in the existing
   index.html and first creates index.BACKUP_BEFORE_PIRATES_*.html.
   If the tool says STOP, DO NOT make random replacements. Send Gage index.html.
5. Check your changed-files list in GitHub Desktop. You should see:
     M  index.html
     ?  the-bloody-nuisance/  [new files only]
   The helper scripts and backup can be kept locally but do not need to be committed.
6. Commit and push the modified index.html and the new the-bloody-nuisance/ folder.
   Do NOT replace the root folder with the pirate site's contents.
7. Visit the pirate URL above and check the first Port Vesper game step.

MANUAL METHOD (NO PYTHON NEEDED)
1. Copy the FULL the-bloody-nuisance/ folder into your existing repository.
2. Open your existing ROOT index.html and find the section:
      <nav class="navlinks" id="navlinks">
   Add this link immediately AFTER the existing Eden Mall <a>...</a> link:
      <a href="the-bloody-nuisance/" aria-label="Explore The Bloody Nuisance pirate world" style="color:#e9c08a">PIRATES ☠</a>
   Save only the existing root index.html, leaving every other line intact.
3. Commit the tiny menu change and the new folder.

IMPORTANT ABOUT AFTER DARK
The supplied FULL edition includes user-supplied adult images among its static
assets. When this addon is placed on a PUBLIC GitHub Pages repository, those
files will be PUBLICLY ACCESSIBLE even if the webpage has an 18+ acknowledgment.
A popup is NOT real access control. Publish only if you intend the files to be public.
If not, remove the 2 assets/private-*.webp files from the pirate folder, and edit
  the-bloody-nuisance/config.js:  privateGallery: false
before committing. The other 16 non-explicit After Dark images remain included.

Known caveats: The bot/Discord links in the pirate config.js are blank until you
supply them. The certificate and secret lore are downloadable after the vault.
The puzzle progress is saved locally in each visitor's browser, not via Eden Supabase.
The main site is NOT published or edited from this chat. This is an install package.

If anything breaks: In GitHub Desktop use History → Revert Changes in Commit
on the new pirates integration commit (not earlier working KAOSTWINS commits).
