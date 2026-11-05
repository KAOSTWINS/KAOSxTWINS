KAOSTWINS | Turn On Real Community Voting
=========================================

The website is PREPARED for voting. It is not live until you deploy the
Google Apps Script and connect its URL in index.html.

WHAT YOU NEED
- Google account (the one you use for the private voting spreadsheet)
- The files Code.gs and Poll.html in the voting setup ZIP
- Your GitHub Pages repository for the KAOSTWINS website

STEP 1: CREATE THE GOOGLE VOTING APP
1. Visit https://script.google.com/ and click New project.
2. Rename it "KAOSTWINS Voting".
3. In the default Code.gs file, remove the sample code. Paste in all contents
   of KAOSTWINS_V15_GOOGLE_VOTING_Code.gs.
4. Click + next to Files, select HTML, and name it Poll (not Poll.html in the
   name field). Replace the new template with all contents of
   KAOSTWINS_V15_GOOGLE_VOTING_Poll.html.
5. Save the project.

STEP 2: CREATE YOUR PRIVATE SPREADSHEET
1. In the Apps Script function menu, select setupPoll.
2. Click Run and grant Google permissions when prompted. The script will
   create "KAOSTWINS Community Ballot — Season 01" in your Google Drive.
3. The private Sheet holds the vote totals. It does NOT need to be shared.
   Google may warn that this is an unverified personal script; review the
   permissions and proceed only if the code is the code you intended to run.

STEP 3: PUBLISH THE VOTING APP
1. Deploy > New deployment.
2. Deployment type: Web app.
3. Execute as: Me.
4. Who has access: Anyone (required for anonymous website visitors).
5. Click Deploy and copy the Web App URL ending in /exec.
   (If "Anyone" is unavailable, your Google organisation may restrict it.)

STEP 4: CONNECT YOUR GITHUB WEBSITE
1. Open the KAOSTWINS V15 index.html file in a text editor.
2. Search for this EXACT line:
   window.KAOS_POLL_WEBAPP_URL = '';
3. Paste your public Web App URL between the quotes, like this:
   window.KAOS_POLL_WEBAPP_URL = 'https://script.google.com/macros/s/XXXXX/exec';
4. Save index.html.
5. Replace the old index.html in your GitHub Pages repository with this one.
   Keep the assets folder and the rest of the site beside it, as before.
6. Commit and push to GitHub. When Pages redeploys, the ballot turns live.

STEP 5: TEST IT
- Open your live KAOSTWINS site.
- The ballot should now show a Google-hosted voting panel.
- Vote once; the real shared results should appear afterwards.
- Choose a new option and vote again; your vote should switch, not double-count.
- Check your Google Sheet for the recorded anonymous vote hash.
- Ask a friend to vote on their own browser to verify the shared totals.

IMPORTANT LIMITATIONS
- The site is static GitHub Pages. Google serves the voting panel in a secure
  iframe to avoid cross-origin AJAX/CORS problems.
- One-vote protection is by random browser ID, not verified identity. A user
  can get another vote by clearing browser storage or using a new device.
- Browser privacy settings or extensions may block third-party embedded apps.
  Test in your normal browser and on mobile after deployment.
- Results are hidden until each visitor votes, as requested.
- The bot-request and fan-art forms are separate. They currently open EMAIL
  DRAFTS; visitors must press Send. This update does not silently mail ideas.
- You can change ballot choices later by editing BOTH the Apps Script's
  Code.gs CHOICES and Poll.html labels, then updating the deployment.

If you send me the final /exec URL after deployment, I can insert it into your
index.html and hand you an upload-ready copy with no editing required.
