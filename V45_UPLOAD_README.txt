KAOSTWINS V45 | THE SOCIETY & THE FRONTWOMAN
25 November 2026

UPLOAD INSTRUCTIONS (GitHub Pages, existing KAOSxTWINS repository)
1. Extract this ZIP. It is an OVERLAY update, not a full repository.
2. In your existing repository, merge the assets/v45 folder, vows folder and zea folder first.
3. Replace eden-mall/index.html with the supplied file; keep every other Eden file, including Gabe's admin desk.
4. Replace the root index.html last. Do NOT delete any existing assets, scripts, Eden Mall, Blood Moon Court, pirates or other universe folders.
5. Commit/push and let GitHub Pages deploy. Open the site and hard refresh (Ctrl+F5).

PUBLIC ROUTES
/KAOSxTWINS/               Main site, Zea spotlight and dedicated VOWS tab
/KAOSxTWINS/vows/          The Veyrholm Society
/KAOSxTWINS/zea/           Zea solo dossier and visual archive
/KAOSxTWINS/#bot/vow       Legacy Vows archive remains accessible; has a new Society link

WHAT CHANGED
- The home Vows project card is removed, not the archive. Vows has its own navigation tab.
- Dragon F☆ckers uses the published Dreamjourney URL; obsolete coming-soon badges removed.
- Zea's official solo link, lore-grounded profile, 34 recovered art files, gallery categories and keyboard-accessible image viewer.
- Vows: 30 scene entries, text search and route/expansion filters, 4 character dossiers, 9 charter packs + independent Uncrowned, registry with PNG export, scent inspiration and a playful 3-question route quiz, spoiler-light Gazette.
- Root version, release metadata and stale historical footer labels corrected; Eden Mall title/footer corrected. Blood Moon Court and pirates have no stale release number in the inspected pages and are not overwritten.
- Existing root layout, routes, community configuration, music and artwork preserved. Existing packed assets must remain in the repository.

NOTES / QA
- V45 is chosen because archived V44.1 exists. Root rebuilt from the Nov 22 archived file and the inspected live repository differences. Eden index matches the live repository base blob before the targeted edits.
- JavaScript syntax checked. Offline browser interaction checks passed for 30 scenes, search, filters, registry result, quiz, 34-image gallery, lightbox, and no mobile horizontal overflow at 390 px. Root integration checked offline. Direct hosted browser navigation was blocked by the environment, so the live deploy, remote scene artwork and real external destinations were not tested. PNG export implemented but download not verified in hosted browser.
- First 24 scene images reference the supplied Dreamjourney CDN; six new landscape scene images are packaged locally. Direct scene IDs/URLs are unavailable, so buttons link to the bot and ask players to select the scene there.
- One unrelated blonde image was excluded from Zea's recovered batch. Family and editorial art can contain backstory; gallery labels distinguish categories. Raw private lorebooks are not published.
- Registry and quiz run client-side only. No new backend, public submissions, live community votes or playable archive mystery are enabled.
- This patch does not include existing site assets and must be merged into the existing repository. Keep a backup before replacing the root index.
