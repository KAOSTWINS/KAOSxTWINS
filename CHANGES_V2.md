# Blood Moon Court website | Final add-on V2

**Content:** Replaced the two broken Ansel explicit gallery images and removed the duplicated stag image. Added the creator's new Rasmus, Renato, Esmond and Ansel images. Final age-gated gallery: **12 entries**, all new images optimised to WebP with matching thumbnails.

**Fourth Seal:** Uses the exact creator-provided wax-and-parchment illustration rather than a generated beige canvas. Includes epithet selection, reactive on-page typography, player name, ABO designation, personalised oath, independent Fourth Seal wording, chosen first act, and a high-resolution browser-generated PNG download. Certificate design remains faithful to the player's political agency and does not presume marriage, romance or guilt at Blackwater Ford.

**Fixes and checks:** Removed orphaned gallery files, grouped portraits by character, added dynamic scaling/wrapping to downloadable text, kept age gate and lightbox, checked all local asset references, JavaScript syntax and browser interactions. Tested generated PNG download, 12-image gallery, desktop/mobile previews and zero page JavaScript errors. Tested homepage installer once and on repeated execution against an archived homepage fixture.

**Backend:** Existing Supabase project and deployed function remain unchanged, to avoid affecting other universes. Court verdicts and moderated whispers remain available through the same Edge Function.

**Deployment:** Add `blood-moon-court/` to the **current** live repository. Run `INSTALL_IN_EXISTING_SITE.py` in its root once to add navigation and the featured home card. No homepage replacement is shipped. Set the real Dreamjourney bot URL in `blood-moon-court/config.js` when available.
