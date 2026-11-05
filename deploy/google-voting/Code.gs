/**
 * KAOSTWINS community poll · Google Apps Script backend
 * Bind this script to no particular Sheet. Run setupPoll() once.
 * Deploy as web app: Execute as Me; Access Anyone.
 * The Sheet is kept private to its owner.
 *
 * Vote limit: one vote per browser identifier. Visitors can change a vote.
 * This is not strong person verification (browsers can be reset).
 */
const POLL_ID = 'kaostwins-season-01';
const POLL_SHEET_NAME = 'Ballots';
const CHOICES = Object.freeze({
  fable: 'Fable: The Heroic Complaint Department',
  motel: 'The Last Check-In',
  vampirehr: "The Villain's HR Department",
  pirates: 'Mutiny & Margaritas',
  monsters: 'Monster Support Group'
});

/** Run manually, once, in the Apps Script editor. */
function setupPoll() {
  const props = PropertiesService.getScriptProperties();
  const existing = props.getProperty('POLL_SHEET_ID');
  if (existing) {
    const sheet = SpreadsheetApp.openById(existing);
    Logger.log('Already configured: ' + sheet.getUrl());
    return sheet.getUrl();
  }
  const book = SpreadsheetApp.create('KAOSTWINS Community Ballot — Season 01');
  const tab = book.getSheets()[0];
  tab.setName(POLL_SHEET_NAME);
  tab.appendRow(['Timestamp', 'Anonymous voter hash', 'Vote']);
  tab.getRange(1,1,1,3).setFontWeight('bold');
  tab.setFrozenRows(1);
  props.setProperty('POLL_SHEET_ID', book.getId());
  Logger.log('Private voting spreadsheet: ' + book.getUrl());
  return book.getUrl();
}

/** Public Google-hosted voting panel. */
function doGet(e) {
  const token = e && e.parameter && e.parameter.voter || '';
  const template = HtmlService.createTemplateFromFile('Poll');
  template.clientVoter = validVoter_(token) ? String(token) : '';
  return template.evaluate()
    .setTitle('KAOSTWINS · Vote for the Next Disaster')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Loads a visitor's vote and, only if already voted, shared totals. */
function getViewerState(voterId) {
  try {
    const token = validVoter_(voterId) ? String(voterId) : '';
    if (!token) return {ok:false, error:'Invalid browser identifier'};
    const sheet = getTab_();
    const rows = sheet.getDataRange().getValues();
    const voterHash = hash_(token);
    let choice = null;
    for (let i=1; i<rows.length; i++) {
      if (String(rows[i][1]) === voterHash) { choice = String(rows[i][2]); break; }
    }
    if (!choice) return {ok:true, voted:false};
    return resultsFromRows_(rows, choice);
  } catch (error) {
    console.error(error);
    return {ok:false, error:'Voting service is not configured yet.'};
  }
}

/** Cast or update a vote. Does not add another vote if the same browser changes its mind. */
function castVote(voterId, choice) {
  if (!validVoter_(voterId)) return {ok:false, error:'Invalid browser identifier'};
  if (!Object.prototype.hasOwnProperty.call(CHOICES, choice)) {
    return {ok:false, error:'Please select a valid bot.'};
  }
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sheet = getTab_();
    const rows = sheet.getDataRange().getValues();
    const voterHash = hash_(String(voterId));
    let foundRow = -1;
    for (let i=1; i<rows.length; i++) {
      if (String(rows[i][1]) === voterHash) {foundRow=i+1; break;}
    }
    if (foundRow !== -1) {
      sheet.getRange(foundRow,3).setValue(choice);
      sheet.getRange(foundRow,1).setValue(new Date());
    } else {
      sheet.appendRow([new Date(),voterHash,choice]);
    }
    SpreadsheetApp.flush();
    return resultsFromRows_(sheet.getDataRange().getValues(), choice);
  } catch (error) {
    console.error(error);
    return {ok:false, error:'Unable to record your vote. Please try again.'};
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function resultsFromRows_(rows, choice) {
  const tallies = {fable:0, motel:0, vampirehr:0, pirates:0, monsters:0};
  const seen = {};
  for(let i=1;i<rows.length;i++) {
    const voterHash=String(rows[i][1]);
    const vote=String(rows[i][2]);
    if (voterHash && !seen[voterHash] && Object.prototype.hasOwnProperty.call(tallies,vote)) {
      seen[voterHash]=true;
      tallies[vote]++;
    }
  }
  const total = Object.values(tallies).reduce((a,b)=>a+b,0);
  return {ok:true, voted:true, choice:choice, total:total, tallies:tallies};
}

function getTab_() {
  const id = PropertiesService.getScriptProperties().getProperty('POLL_SHEET_ID');
  if (!id) throw new Error('Run setupPoll() in the Apps Script editor first.');
  const sheet = SpreadsheetApp.openById(id).getSheetByName(POLL_SHEET_NAME);
  if (!sheet) throw new Error('Voting worksheet not found.');
  return sheet;
}
function validVoter_(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{20,100}$/.test(value);
}
function hash_(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value);
  return bytes.map(function(byte){const n=(byte+256)%256;return ('0'+n.toString(16)).slice(-2)}).join('');
}
