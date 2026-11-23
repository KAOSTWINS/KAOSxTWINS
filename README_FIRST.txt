KAOSTWINS | BLOOD MOON COURT | FINAL GITHUB ADD-ON V2
23 November 2026

WHAT THIS IS
A GitHub-ready self-contained page for your EXISTING main KAOSTWINS website.
This is not a replacement for the homepage and does not overwrite Ashbourne, The Vow He Broke, Eden Mall, Pirates, or any other universe.

The project is designed for the existing KAOSxTWINS GitHub Pages structure:
https://kaostwins.github.io/KAOSxTWINS/
Expected new page after deployment:
https://kaostwins.github.io/KAOSxTWINS/blood-moon-court/

WHAT CHANGED SINCE V1
1. REMOVED broken Ansel portraits previously called "The Forest Remembers" (ad-10) and "The Chieftain Unbound" (ad-11).
2. REMOVED exact accidental Ansel duplicate (ad-08).
3. ADDED four author-supplied approved After Dark portraits: Rasmus, Renato, Esmond and Ansel.
4. Gallery now contains 12 unique, curated portrait entries grouped by character. All thumbnails and full-sized images are included.
5. REPLACED plain beige Fourth Seal placeholder with the actual red wax + parchment artwork provided by the creator.
6. ENHANCED the certificate creator: court epithet, ABO designation, personalised oath, first act, live parchment preview, full-resolution downloadable PNG, and copyable Dreamjourney roleplay opener.
7. Fixed preview overflows on narrow mobile widths; tested desktop and 390-pixel mobile form and certificate.
8. Additional validation: asset manifest, unique gallery IDs, SVG/JS syntax, download export, and homepage installer idempotence.

WHAT'S IN THE WEBSITE
- Canon-accurate Blood Moon Court page with approved cast artwork
- The four beast dossiers + interactive before/after promises
- Real illustrated Valedorn map with eight clickable story locations
- Lady Knell's 30 original Bell Tower remarks and optional synthesised bell sound
- Six scandal clippings, Silvergrove letters, and supporting cast
- Personalised Fourth Seal generator on original red wax parchment with exportable PNG
- After Dark 18+ opt-in gallery with 12 portraits and full-screen lightbox
- Supabase-backed Court Verdict poll and moderated Court Whispers, using the existing project

HOW TO ADD TO THE LIVE GITHUB WEBSITE (SAFE METHOD)
1. Download or clone the CURRENT, live KAOSxTWINS repository. Do not use an older website ZIP.
2. Copy the WHOLE 'blood-moon-court/' folder from this archive into the repository root, beside its CURRENT index.html.
3. Copy 'INSTALL_IN_EXISTING_SITE.py' into that same root folder.
4. From that root directory run:
     python INSTALL_IN_EXISTING_SITE.py
   It adds one Blood Moon navigation link and featured card to the CURRENT homepage. It creates a timestamped backup of index.html before writing and refuses unknown homepage structures.
5. Inspect the updated index.html, then commit and push the new folder and updated index.html to the usual GitHub Pages branch.
6. For future updates, replace only the files inside blood-moon-court/. The existing homepage installer is idempotent and can be run a second time safely.

BOT LINK
The real Dreamjourney URL was not provided. When it is available, edit:
     blood-moon-court/config.js
Set BOT_URL to the real public bot URL and save. The site deliberately shows a pending message until configured rather than linking to the wrong bot.

SUPABASE
Existing project: wpnsfvfrejykxccmdomi (KAOSTWINS's Project).
Already deployed in the prior build:
- public.bmc_verdict_votes (RLS enabled, no direct anonymous access)
- public.bmc_court_whispers (RLS enabled, no direct anonymous access)
- Edge Function bmc-court-docket
The backend source and initial SQL are included under supabase/ for reference. Do not re-deploy or re-run the migration just to update the frontend pictures and certificate.
Moderation: new whispers enter as pending; review and set status to approved before they appear publicly.

LOCAL PREVIEW
Serve the repository root with:
    python -m http.server 8000
Visit:
    http://localhost:8000/blood-moon-court/
Use an 18+ test browser session to inspect the private artwork gallery.

NOTES
- No completed wedding or mate bond is assumed. Blackwater remains defined by the player. The Fourth Seal is independently {{user}}'s.
- The After Dark gallery is opt-in and an age-confirmation gate, not identity verification. Asset files themselves are public on GitHub Pages.
- Author identities and declarations for the certificate stay in the browser and are not submitted to Supabase.
- The example certificate is just a test sample, not a real political document.
- This ZIP is prepared for GitHub but HAS NOT been pushed or published from ChatGPT.
