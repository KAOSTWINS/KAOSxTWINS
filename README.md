# ☠ THE BLOODY NUISANCE | KAOSTWINS

## Launch edition • 22 November 2026

A fully self-contained static website for **The Bloody Nuisance**. No backend, paid hosting, JavaScript framework, database or external CDN required.

### What's aboard

- Cinematic homepage and the original kidnapping-contract premise.
- **A Most Unfortunate Voyage**: five interactive story panels (cropped from supplied storyboard artwork) and two short, playable cinematic reels (Lucky's torn contract and Tom in the rain).
- **The Shattered Reaches**, a precise original SVG chart with **21 navigable locations in seven canonical territories**. The chart's 21 map markers follow the world bible's map coordinates, not the geographically inaccurate AI illustration.
- **The Debtkeeper's Chart treasure game**, seven puzzle stages plus the Firstfall Sink vault: Port Vesper's customs registry, Galebreak's beacon, King's Anchorage's forged records, Reef of Bells' silent bell, Caerwyn's forge, Widowmaker's memorial, and Blacktide's compass.
- A voyage animation, optional hints, a Captain's Journal with local browser save and export/import recovery code, and the gold path of completed voyages.
- **The real digital prize**: the *approved illustrated gold-and-teal Certificate of Discovery* (`assets/certificate.png`) plus a downloadable secret lore document. The prize is fictional / digital, not money.
- Eight official WANTED posters, eight explorable ship rooms, and Bastard's eight stolen-object scavenger hunt (with an actual seagull illustration).
- **After Dark**, now organized into two non-explicit collections: eight cinematic portraits and eight moonlit beach portraits. The *complete/private edition* also includes the two user-supplied additional nude images. No rejected Neron anatomy images are included. Neron's beach portrait is the final **thigh-up** version.
- Mobile-responsive layout, keyboard-focus states, screenreader labels on main interactions, reduced-motion CSS, no autoplaying audio and no tracking.

### Which download should I deploy?

1. **PUBLIC SAFE** ZIP: suitable starting point for publishing on GitHub Pages / Cloudflare Pages. Includes all the game, cinema, story, treasure, and the 16 non-explicit After Dark portraits. **Does not include explicit user-supplied images**.
2. **COMPLETE / PRIVATE** ZIP: contains every feature above plus two nude images in the optional self-declared 18+ gallery. **Do not assume the 18+ acknowledgment protects the images**. Any file hosted as part of a publicly accessible static website remains directly accessible by its asset URL. Check hosting terms, age/content laws, and whether you genuinely want those files on a public URL before deploying. This package is best used locally or in a genuinely access-controlled private environment.
3. **PHONE PREVIEW** HTML: a self-contained offline HTML document embedding images/videos/code; handy for mobile previews, but due its size some mobile file viewers may struggle. It includes the complete edition's optional adult gallery.

### Start the website locally

Extract your chosen ZIP and **keep all the files together**. Open `index.html` in a browser. If local browser rules block progress storage or file playback, start a local HTTP server in that folder (e.g. `python -m http.server 8080`) or deploy to a static host. The first treasure clue is at **Port Vesper / West Quay**.

### Publish with GitHub Pages

1. Create or select a repository. Public repositories work with the simplest GitHub Pages deployment; other visibility options depend on plan and configuration.
2. **Upload the extracted contents** of the **PUBLIC SAFE** package into the repository root. The `index.html`, `app.js`, `data.js`, `config.js`, `extras.js`, CSS files, and `assets` folder must all be present at the top level.
3. Under repository **Settings → Pages**, choose deployment from a branch, select `main` and `/(root)` and save. Wait for GitHub to publish the URL.
4. Paste real, approved links into `config.js`, then upload the modified file. Blank entries remain hidden automatically.
5. Test the published URL on a phone: start Port Vesper, inspect the registry, sail to Galebreak, and verify the certificate can be downloaded after opening the final vault.

### Connecting your real links

Open `config.js` and edit only these fields:

```js
window.SITE_LINKS = {
  dreamjourney: '', // Your Dreamjourney bot URL
  discord: '',      // Your Discord invitation URL
  creator: ''       // Your KAOSTWINS profile URL
};
```

The public-safe package also sets `window.SITE_CONTENT = { privateGallery: false }` and omits the additional artwork. The complete package sets it to true.

### Updating assets

- Full prize certificate: `assets/certificate.png` (provided final artwork), and optimized on-screen thumbnail `assets/certificate-preview.webp`.
- Original scenic After Dark: `assets/night-*.webp`.
- Approved beach After Dark: `assets/shore-*.webp`.
- Additional user-supplied artwork only in the private package: `assets/private-*.webp`.
- Short, muted preview movies: `assets/video/lucky-contract.mp4` and `assets/video/tom-watch.mp4`.
- Source assets supplied with this chat remain the user's original source files. WebP copies have been optimized for site loading.

### Privacy and known limits

- Game progress remains in each visitor's browser only; the site does not sync devices automatically. Journal recovery codes allow manual transfer.
- No analytics, account signup, personal data collection, payment service, or cloud database.
- The 18+ gateway is only a self-declared acknowledgment. It is **not** cryptographic authentication, reliable age verification, or a file-access-control system.
- A public static website cannot truly keep downloadable assets secret. The certificate is **shown as a reward** after the correct vault answer, but technically its static URL can be guessed or viewed in the site files. True exclusive access would require server-side access control and a backend.
- The interactive map uses correctly plotted island markers over the canonical SVG illustration, not the older printed AI map that placed territories in the wrong positions.
- The original working game already passed a full seven-stage browser playthrough. This launch-edition upgrade has undergone source and asset verification, but the current container's browser is restricted, so a new real-browser end-to-end verification is still recommended after publishing.

### Footer / credits

KAOSTWINS | Come for the pretty men. Stay for the lore. Leave with emotional damage.
