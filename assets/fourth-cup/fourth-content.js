
(()=>{
 'use strict';
 const DATA={"images":{"cover":"assets/fourth-cup/fourth_001.webp","ep01":"assets/fourth-cup/fourth_002.webp","ep02":"assets/fourth-cup/fourth_003.webp","ep03":"assets/fourth-cup/fourth_004.webp","ep04":"assets/fourth-cup/fourth_005.webp","ep05":"assets/fourth-cup/fourth_006.webp","ep06":"assets/fourth-cup/fourth_007.webp","jae":"assets/fourth-cup/fourth_008.webp","yoon":"assets/fourth-cup/fourth_009.webp","min":"assets/fourth-cup/fourth_010.webp","ian":"assets/fourth-cup/fourth_011.webp","family":"assets/fourth-cup/fourth_012.webp","firstshift":"assets/fourth-cup/fourth_013.webp","rain":"assets/fourth-cup/fourth_014.webp","cafe":"assets/fourth-cup/fourth_015.webp"},"episodes":[["01","THE JOB ADVERTISEMENT FROM HELL","November 2025","He needed a job. The dead needed a barista.","ep01"],["02","THE REFRIGERATOR INCIDENT","November 2025","Eleven minutes into his first shift.","ep02"],["03","THE BEAUTIFUL RED FLAG","December 2025","Nine tails. Infinite rizz. Zero shame.","ep03"],["04","THE MAN WHO ADOPTED A TRAFFIC LIGHT","February 2026","He collects broken things. Including laws.","ep04"],["05","DEATH’S MOST DISGRUNTLED EMPLOYEE","September 2026","He came for a soul. He found four HR violations.","ep05"],["06","THE REAL OLDER SIBLING","2026","She’s 23. She’s everyone’s legal guardian.","ep06"],["07","THE ROMANCE TRAINING MONTAGE","2026","He has the face. Unfortunately, that’s all.",null],["08","LOVE. BETRAYAL. CITRUS.","2026","Four men. One tangerine. Absolutely no dignity.",null],["09","THE INFAMOUS RAIN SCENE","Before the café","Some love stories end in tears. His also involved a puddle.",null],["10","THE FAMILY NOBODY ORDERED","October 2026","They came for different reasons. Somehow, they stayed.",null],["11","THE MISSING NAME","November 2026","Some things aren’t supposed to be forgotten.",null],["12","WELCOME TO YOUR FIRST SHIFT","November 2026","The dead are restless. The staff are worse.",null],["13","THE OFFICIAL CAST POSTER","November 2026","And Jae is still in charge.",null]],"cast":[{"name":"PARK JAE-MIN","alias":"JAE","icon":"☕","role":"Human caretaker · 27 · 196 cm","quote":"Looks terrifying. Screams in several languages when scared.","image":"jae","bio":"The spectacularly tattooed night-shift caretaker who has actually kept this haunted café running since 2025. He is competent, protective, painfully sincere and blessed with absolutely no intentional romantic charisma."},{"name":"YOON HAE-SOL","alias":"YOON","icon":"🦊","role":"Gumiho · appears late twenties","quote":"Nine tails. Infinite rizz. Unreasonable smugness.","image":"yoon","bio":"A centuries-old fox spirit, collector of antiquities and keeper of very old promises. Beautiful, cunning and effortlessly flirtatious, with deep affection for the sanctuary Mrs Hong built."},{"name":"KANG MIN-WOO","alias":"MIN","icon":"🔔","role":"Dokkaebi · cinema-bell spirit","quote":"He has never met an abandoned object he could not adopt.","image":"min","bio":"A warm-hearted spirit from a demolished cinema bell, now a repairer and collector of discarded things. His powers can recover memories from objects, but doing so comes at a private cost."},{"name":"KWON I-AN","alias":"IAN","icon":"🥀","role":"Jeoseung-saja · guide of the dead","quote":"Has requested a transfer in spirit, if not in writing.","image":"ian","bio":"A severe guide of the dead tracking names that have vanished from the ledgers. Sardonic, meticulous and quietly protective, he is drawn into a mystery tangled with the memory of his former life."}],"about":"Euljiro, Seoul. November 2026. You are the Fourth Cup’s newest night-shift coworker. The regulars are dead, the fox is negotiating, the repairman has adopted another cursed appliance, and the guide of the dead wants a transfer. Your supervisor is a 6′5″ tattooed man who just shouted ‘BONJOUR!’ at a haunted storeroom. Welcome to your first shift."};
 const SLUG='fourth-cup', IMG=DATA.images;
 const escapeCup=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
 if(typeof BOT_CATALOG==='undefined'){console.warn('Fourth Cup: bot catalogue not available');return;}
 if(typeof KAOS_LINKS!=='undefined'&&KAOS_LINKS.bots&&!KAOS_LINKS.bots[SLUG])KAOS_LINKS.bots[SLUG]='';
 if(typeof KAOS_COVER_ART!=='undefined')KAOS_COVER_ART[SLUG]=IMG.cover;
 const darkGallery=[{"character":"Jae","title":"The Apple That Started a Disaster","category":"After Dark","src":"assets/fourth-cup/fourth_016.webp"},{"character":"Jae","title":"Midnight, No Romantic Skills","category":"After Dark","src":"assets/fourth-cup/fourth_017.webp"},{"character":"Jae","title":"Twenty-Four Kilos of Trouble","category":"After Dark","src":"assets/fourth-cup/fourth_018.webp"},{"character":"Jae","title":"After the Last Set","category":"After Dark","src":"assets/fourth-cup/fourth_019.webp"},{"character":"Jae","title":"Ink in Amber Light","category":"After Dark","src":"assets/fourth-cup/fourth_020.webp"},{"character":"Jae","title":"The Wall Lean That Almost Worked","category":"After Dark","src":"assets/fourth-cup/fourth_021.webp"},{"character":"Jae","title":"A Rainy Window and Bad Decisions","category":"After Dark","src":"assets/fourth-cup/fourth_022.webp"},{"character":"Jae","title":"The Longest Night Shift","category":"After Dark","src":"assets/fourth-cup/fourth_023.webp"},{"character":"Yoon","title":"A Fox Among Crimson Blossoms","category":"After Dark","src":"assets/fourth-cup/fourth_024.webp"},{"character":"Yoon","title":"Nine Tails After Midnight","category":"After Dark","src":"assets/fourth-cup/fourth_025.webp"},{"character":"Yoon","title":"Plum-Kissed Opulence","category":"After Dark","src":"assets/fourth-cup/fourth_026.webp"},{"character":"Yoon","title":"Tea with a Beautiful Problem","category":"After Dark","src":"assets/fourth-cup/fourth_027.webp"},{"character":"Yoon","title":"The Golden Alley Whisper","category":"After Dark","src":"assets/fourth-cup/fourth_028.webp"},{"character":"Yoon","title":"A Neon Seoul Invitation","category":"After Dark","src":"assets/fourth-cup/fourth_029.webp"},{"character":"Yoon","title":"The Opulent Crimson Lounge","category":"After Dark","src":"assets/fourth-cup/fourth_030.webp"},{"character":"Yoon","title":"The Fox Never Asks Twice","category":"After Dark","src":"assets/fourth-cup/fourth_031.webp"},{"character":"Min","title":"Neon Cinema Loft Charm","category":"After Dark","src":"assets/fourth-cup/fourth_032.webp"},{"character":"Min","title":"After Hours at the Old Cinema","category":"After Dark","src":"assets/fourth-cup/fourth_033.webp"},{"character":"Min","title":"The Brass Bell Collector","category":"After Dark","src":"assets/fourth-cup/fourth_034.webp"},{"character":"Min","title":"Golden Hour, Terrible Judgement","category":"After Dark","src":"assets/fourth-cup/fourth_035.webp"},{"character":"Ian","title":"Beneath Seoul’s Moonlight","category":"After Dark","src":"assets/fourth-cup/fourth_036.webp"},{"character":"Ian","title":"Death’s Last Appointment","category":"After Dark","src":"assets/fourth-cup/fourth_037.webp"}];
 const gallery=[
  {src:IMG.cover,title:'The Fourth Cup · Meet the night shift',category:'Cast'},
  ...DATA.episodes.filter(e=>e[4]).map(e=>({src:IMG[e[4]],title:'EP. '+e[0]+' · '+e[1],category:'Episode Art'})),
  {src:IMG.jae,title:'Jae · Human caretaker',category:'Portrait'},
  {src:IMG.yoon,title:'Yoon · Foxfire and old promises',category:'Portrait'},
  {src:IMG.min,title:'Min · Cinema-bell scavenger',category:'Portrait'},
  {src:IMG.ian,title:'Ian · The guide of the dead',category:'Portrait'},
  {src:IMG.family,title:'A very unusual family supper',category:'Café Life'},
  {src:IMG.firstshift,title:'First shift · Storeroom situation',category:'Café Life'}
 ];
 BOT_CATALOG[SLUG]={
  id:SLUG,title:'The Fourth Cup',short:'The regulars are dead. The staff are worse.',group:'Originals',
  genre:'Supernatural K-drama · haunted café · horror-comedy · AnyPOV',accent:'#dfb280',
  tagline:'WELCOME TO THE NIGHT SHIFT FROM HELL.',
  intro:[DATA.about,
   'Jae is the human anchor and first face you meet. Yoon, Min and Ian each have their own history, motives and optional slow-burn romance route. Between ghosts, impossible rooms and a growing mystery of erased names, the café slowly becomes an unlikely found family.',
   'One rule matters: your character belongs to you. Romantic connections and story discoveries are earned in play, not decided for you.'],
  cast:[['Park Jae-min · Jae','27 · 6′5″ · Tattooed human caretaker · Absolutely zero rizz'],['Yoon Hae-sol','Gumiho · Centuries old · Antiquities, bargains and effortless charm'],['Kang Min-woo · Min','Dokkaebi · Salvage collector · Golden retriever with a haunted traffic light'],['Kwon I-an · Ian','Jeoseung-saja · Guide of the dead · Spectacularly unimpressed'],['Mrs Hong','The original teahouse proprietor · Founding resident ghost'],['Park Ji-ah','Jae’s 23-year-old sister · Financial analyst · Everyone’s reluctant adult supervisor']],
  lore:[
   'Euljiro, Seoul, November 2026. Madam Seo runs the café; Mrs Hong once ran the teahouse that became its supernatural sanctuary.',
   'Jae started work in late 2025 and is genuinely capable at running the café. He fears unfamiliar ghosts, not the regulars he already knows.',
   'A gumiho’s bargains, a dokkaebi’s memories and a death-guide’s ledger are powerful, but none is omnipotent. The café has rules and boundaries.',
   'The mystery starts with names disappearing from records and places that should no longer exist. The answers emerge gradually through choices.',
   'Each lead has a life beyond the café. They are a found family, not a forced love quadrangle.'
  ],
  scenes:['Jae’s first disastrous shift','The fox on the café table','Min adopts a traffic light','Ian arrives with an impossible ledger','The last tangerine','The storeroom that remembers a demolished station','Your first shift · November 2026'],
  tracks:[],notes:'Original KAOSTWINS supernatural-romantic comedy. Ghosts, unsettling scenes, grief, strong language and optional adult slow-burn romance. AnyPOV; no forced player reactions, identity or relationships.',gallery,afterDark:darkGallery
 };
 function createCard(){
  const grid=document.querySelector('#worlds .projects');
  if(!grid||grid.querySelector('[data-world="'+SLUG+'"]'))return;
  const btn=document.createElement('button');btn.type='button';btn.className='project';btn.dataset.cat='original';btn.dataset.world=SLUG;
  btn.style.setProperty('--img',`url("${IMG.cover}")`);btn.style.setProperty('--theme','#cda77a');
  btn.innerHTML=`<div class="contents"><div class="tag">☕ NEW ORIGINAL / SUPERNATURAL K-DRAMA</div><h3>THE<br>FOURTH CUP</h3><p>The regulars are dead. The staff are worse. Four beautiful men, one haunted Seoul café, and absolutely no overtime pay.</p><div class="project-foot"><span class="mini-label">4 OPTIONAL ROUTES</span><span class="mini-label">13 EPISODES</span><span class="mini-label">ANYPOV</span></div></div>`;
  btn.addEventListener('click',()=>openEntry(SLUG));
  grid.insertAdjacentElement('afterbegin',btn);
 }
 const mkPerson=c=>`<article class="cup-person"><span class="cup-portrait-kicker">${c.icon} ${escapeCup(c.alias)}</span><img src="${IMG[c.image]}" loading="lazy" alt="${escapeCup(c.name)}"/><div class="cup-person-content"><b>${escapeCup(c.name)}</b><span>${escapeCup(c.role)}</span><em>“${escapeCup(c.quote)}”</em><p>${escapeCup(c.bio)}</p></div></article>`;
 function renderExtras(){
  const page=document.querySelector('#bot-page-inner');if(!page||page.dataset.cupEnriched==='yes')return;page.dataset.cupEnriched='yes';
  const body=page.querySelector('.bot-body');if(!body)return;
  const opening=document.createElement('section');opening.className='cup-shell';
  opening.innerHTML=`<div class="cup-overline">KAOSTWINS ORIGINAL SERIES · SEOUL, NOVEMBER 2026</div><h2 class="cup-header">The regulars are dead.<br>The staff are <i>worse.</i></h2><p class="cup-sub">Four impossibly pretty men. One café on the wrong side of the Veil. Your first night on the job.</p><div class="cup-intro-note"><p class="cup-micro">A warm supernatural sanctuary tucked into a rainy Euljiro alley, where ghosts drink tea, a nine-tailed fox tests everyone’s patience, and one human caretaker is somehow still employed.</p><p class="cup-micro">Found family · supernatural mystery · comedy · K-drama nonsense · optional slow-burn romance · full player agency</p></div><div class="cup-callout"><b>NOTICE TO NEW HIRES:</b> Do not open unfamiliar doors. Do not sign unknown bargains. And, for the love of every living thing, do not let Min bring another traffic light inside.</div>`;
  const firstSection=body.querySelector('.bot-sect');if(firstSection)firstSection.after(opening);else body.prepend(opening);
  const castSect=[...body.querySelectorAll('.bot-sect')].find(x=>x.querySelector('.bot-eyebrow')?.textContent.includes('The cast'));
  const people=document.createElement('section');people.className='cup-shell';people.innerHTML=`<div class="cup-overline">PERSONNEL FILES / EMPLOYEE INCIDENT REPORT</div><h2 class="cup-header">Meet the night shift.</h2><p class="cup-sub">One competent human, one outrageous fox, one optimistic menace and a death guide who is definitely reconsidering his life choices.</p><div class="cup-cast-grid">${DATA.cast.map(mkPerson).join('')}</div><div class="cup-callout">👻 <b>MRS HONG:</b> The ghostly grandmother running the unofficial emotional-support department. 💻 <b>JI-AH:</b> Jae’s younger sister, who has somehow become everyone’s supervisor.</div>`;
  if(castSect)castSect.after(people);else body.append(people);
  const ep=document.createElement('section');ep.className='cup-shell';ep.id='fourth-cup-red-thread';
  ep.innerHTML=`<div class="cup-overline">A STORY IN THIRTEEN INCIDENT REPORTS</div><h2 class="cup-header">Follow the red thread.</h2><p class="cup-sub">Every bad decision leads somewhere. Sometimes it leads directly to the refrigerator.</p><p class="cup-micro">The first six full-size K-drama posters are available to explore now. Episodes 07–13 are storyboarded and marked as awaiting their final artwork.</p><div class="cup-episode-grid">${DATA.episodes.map((e,i)=>e[4]?`<article class="cup-episode"><img src="${IMG[e[4]]}" loading="lazy" alt="Episode ${e[0]}: ${escapeCup(e[1])}"/><button type="button" class="cup-btn" style="position:absolute;bottom:12px;right:12px" data-cup-episode="${i}" aria-label="Enlarge episode ${e[0]}">VIEW EP. ${e[0]} ↗</button></article>`:`<article class="cup-episode standby"><div><span class="cup-episode-top">EP. ${e[0]} · ART IN PRODUCTION</span></div><div><h3 class="cup-episode-title">${escapeCup(e[1])}</h3><p class="cup-episode-caption">${escapeCup(e[3])}</p></div><div><span class="cup-coming">The thread continues ↓</span></div></article>`).join('')}</div><div class="cup-note-section"><div class="cup-overline">THE THREAD NEVER BREAKS</div><p class="cup-micro">Crimson silk winds from the job advertisement through each increasingly questionable shift, then finally binds an unexpected family together. Seven more pieces of artwork are still being prepared. No fake images; no spoilers.</p></div>`;
  const gallerySect=page.querySelector('#bot-gallery');if(gallerySect)gallerySect.before(ep);else body.append(ep);
  const endNote=document.createElement('section');endNote.className='cup-shell';endNote.innerHTML=`<div class="cup-overline">WELCOME TO YOUR FIRST SHIFT</div><h2 class="cup-header">The café is hiring.<br><i>Unfortunately.</i></h2><p class="cup-sub">11:53 PM. Jae has a badminton racket. Someone is knocking from the wrong side of the storeroom door.</p><div class="cup-note-grid"><article><strong>☕ The human</strong><p>“SSIBAL! FUCK! SCHEISSE! MERDE! BONJOUR! HAKUNA MATATA!”</p></article><article><strong>👻 The grandmother</strong><p>“Jae, dear, some of those are not languages.”</p></article><article><strong>🫖 The response</strong><p>“I’M CASTING A WIDE NET, HALMEONI!”</p></article></div><p class="cup-micro" style="margin-top:24px">The regulars are dead. The staff are worse. And Jae is still, somehow, in charge.</p></section>`;
  if(gallerySect)gallerySect.before(endNote);else body.append(endNote);
  ep.querySelectorAll('[data-cup-episode]').forEach(btn=>btn.addEventListener('click',()=>{if(typeof renderBotGallery==='function')renderBotGallery('All');if(typeof showBotImage==='function')showBotImage(Number(btn.dataset.cupEpisode)+1);}));
 }
 const lastRender=typeof renderBot==='function'?renderBot:null;
 if(lastRender){renderBot=function(id){lastRender(id);if(id===SLUG)renderExtras();};}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{createCard(); if(location.hash==='#bot/'+SLUG){renderBot(SLUG);}}, {once:true});
 else {createCard();if(location.hash==='#bot/'+SLUG)renderBot(SLUG);}
})();


(function(){
'use strict';
const CUP='fourth-cup';
const origRenderBot=renderBot;
const origGallery=renderBotGallery;
const origUnlock=unlockAfterDark;
const cupFeatured=['Jae','Yoon','Min','Ian'];
let activeCupDark='Highlights';
let currentCupDark=[];
function compactGallery(filter){
 origGallery(filter);
 const slot=document.getElementById('bot-gallery-dynamic');
 if(!slot)return;
 const items=[...slot.querySelectorAll('.bot-photo')];
 if(items.length<=12)return;
 items.slice(12).forEach(el=>el.classList.add('kaos-gallery-hidden'));
 const more=document.createElement('button');more.type='button';more.className='kaos-gallery-more';more.textContent='Show all '+items.length+' images';more.setAttribute('aria-expanded','false');
 let expanded=false;
 more.addEventListener('click',()=>{
  expanded=!expanded;items.slice(12).forEach(el=>el.classList.toggle('kaos-gallery-hidden',!expanded));
  more.textContent=expanded?'Show fewer images':'Show all '+items.length+' images';
  more.setAttribute('aria-expanded',String(expanded));
 });
 slot.appendChild(more);
}
renderBotGallery=compactGallery;
function collapseCanon(section){
 if(!section||section.querySelector('.kaos-notes-details'))return;
 const detail=document.createElement('details');detail.className='kaos-notes-details';
 const summary=document.createElement('summary');summary.textContent='Open world notes and canon details';
 detail.appendChild(summary);
 while(section.firstChild)detail.appendChild(section.firstChild);
 section.appendChild(detail);
}
function sectionByEyebrow(body,txt){return [...body.querySelectorAll('.bot-sect')].find(el=>(el.querySelector('.bot-eyebrow')?.textContent||'').includes(txt));}
function trimEmptySections(id){
 const d=BOT_CATALOG[id],page=document.getElementById('bot-page-inner');if(!d||!page)return;
 if(!d.tracks||!d.tracks.length){document.getElementById('bot-soundtrack')?.remove();page.querySelector('.bot-head-actions a[href="#bot-soundtrack"]')?.remove();}
 if(!d.afterDark||!d.afterDark.length){document.getElementById('bot-afterdark')?.remove();page.querySelector('.bot-head-actions a[href="#bot-afterdark"]')?.remove();}
 if(!d.scenes||!d.scenes.length)sectionByEyebrow(page,'06 / Places to begin')?.remove();
 collapseCanon(sectionByEyebrow(page,'03 / World notes'));
}
function simplifyCup(){
 const page=document.getElementById('bot-page-inner');if(!page||page.classList.contains('cup-simplified'))return;
 page.classList.add('cup-simplified');
 const body=page.querySelector('.bot-body');if(!body)return;
 // Keep the immersive custom introduction in full width and retire the duplicated template intro.
 const first=body.querySelector(':scope > .bot-grid-two');
 const bespoke=first?.querySelector('.cup-shell');
 if(bespoke&&first){first.before(bespoke);first.remove();}
 const people=[...body.querySelectorAll('.cup-shell')].find(el=>el.querySelector('.cup-cast-grid'));
 if(people){people.id='cup-meet-the-night-shift';}
 sectionByEyebrow(body,'02 / The cast')?.remove();
 sectionByEyebrow(body,'06 / Places to begin')?.remove();
 // Short biographies are expandable so the cast remains readable on mobile.
 page.querySelectorAll('.cup-person-content').forEach(card=>{
  const p=card.querySelector('p');if(!p)return;
  const detail=document.createElement('details');detail.className='cup-bio-details';
  const summary=document.createElement('summary');summary.textContent='Read their story';detail.append(summary,p);card.append(detail);
 });
 // The six finished posters stay prominent; 07–13 are available in one compact disclosure.
 const grid=page.querySelector('.cup-episode-grid');if(grid){
  const pending=[...grid.querySelectorAll('.cup-episode.standby')];
  if(pending.length){
   const details=document.createElement('details');details.className='cup-upcoming';
   const summary=document.createElement('summary');summary.textContent=pending.length+' more episodes · open the storyboards';
   const pendingGrid=document.createElement('div');pendingGrid.className='cup-upcoming-grid';pending.forEach(p=>pendingGrid.append(p));
   details.append(summary,pendingGrid);grid.after(details);
  }
 }
 const opening=[...body.querySelectorAll('.cup-shell')].find(el=>el.querySelector('.cup-intro-note'));
 if(opening){
  const nav=document.createElement('nav');nav.className='cup-quicklinks';nav.setAttribute('aria-label','The Fourth Cup sections');
  nav.innerHTML='<a href="#cup-meet-the-night-shift">Meet the staff</a><a href="#fourth-cup-red-thread">Story posters</a><a href="#bot-gallery">Visual archive</a><a href="#bot-afterdark">After Dark ✦</a>';
  opening.append(nav);
 }
 // Put the end-of-shift joke after the gallery, rather than before it.
 const ending=[...body.querySelectorAll('.cup-shell')].find(el=>el.querySelector('.cup-note-grid'));
 const dark=document.getElementById('bot-afterdark');if(ending&&dark)dark.after(ending);
 const section=document.getElementById('bot-afterdark');if(section){
  const h=section.querySelector('.afterdark-head h3');if(h)h.textContent='FOUR MEN. ABSOLUTELY NO OVERTIME.';
  const p=section.querySelector('.afterdark-head p');if(p)p.textContent='A separate, optional collection of sensual cinematic portraits. Explore Jae, Yoon, Min and Ian by character, away from the main story gallery.';
  const gate=section.querySelector('#afterdark-ack');if(gate)gate.textContent='I AM 18+ · VIEW AFTER DARK ↗';
 }
}
renderBot=function(id){
 // Original Cup enhancement used a persistent data-attribute guard. The bot template
 // replaces the innerHTML on every navigation; reset the guard so direct links and
 // hashchange re-renders never lose cast/episode sections.
 const container=document.getElementById('bot-page-inner');
 if(container){delete container.dataset.cupEnriched;container.classList.remove('cup-simplified');}
 origRenderBot(id);
 trimEmptySections(id);
 if(id===CUP)simplifyCup();
};
function currentPhotos(){
 const all=BOT_CATALOG[CUP]?.afterDark||[];
 if(activeCupDark==='Highlights')return cupFeatured.map(ch=>all.find(x=>x.character===ch)).filter(Boolean);
 if(activeCupDark==='All')return all;
 return all.filter(x=>x.character===activeCupDark);
}
function renderCupDark(){
 const el=document.getElementById('afterdark-dynamic');if(!el||detailId!==CUP)return;
 const all=BOT_CATALOG[CUP]?.afterDark||[];
 currentCupDark=currentPhotos();
 const groups=['Highlights','Jae','Yoon','Min','Ian','All'];
 const titles={Highlights:'Four little reasons to stay after closing.',Jae:'No rizz, unfortunately. Every other advantage, yes.',Yoon:'Nine tails. One extremely dangerous smile.',Min:'Somebody tell him the cinema closed hours ago.',Ian:'He requested a transfer. Nobody approved it.',All:'The entire After Dark archive, if you insist.'};
 const buttons=groups.map(g=>{
  const label=(g==='Highlights'?'Highlights':g==='All'?'All photos':g)+' ('+(g==='Highlights'?4:g==='All'?all.length:all.filter(x=>x.character===g).length)+')';
  return '<button class="cup-dark-filter" type="button" data-cup-dark="'+g+'" aria-pressed="'+(activeCupDark===g?'true':'false')+'">'+label+'</button>';
 }).join('');
 const cards=currentCupDark.map((g,i)=>'<button type="button" class="bot-photo" data-cup-dark-photo="'+i+'" aria-label="View '+escapeHTML(g.character+' · '+g.title)+'"><img src="'+g.src+'" alt="'+escapeHTML(g.character+' · '+g.title)+'" loading="lazy" decoding="async"><div class="bot-photo-cap"><span class="bot-photo-tag">'+escapeHTML(g.character)+' · AFTER DARK</span>'+escapeHTML(g.title)+' ↗</div></button>').join('');
 el.innerHTML='<div class="cup-dark-filters" role="group" aria-label="Choose a character">'+buttons+'</div><p class="cup-dark-brief">'+titles[activeCupDark]+'</p><p class="cup-dark-count">'+currentCupDark.length+' photograph'+(currentCupDark.length===1?'':'s')+' in this collection</p><div class="bot-gallery-grid afterdark-grid cup-dark-cards">'+cards+'</div><p class="cup-age-note">Artistic, mature-themed portrait gallery. All featured characters are adults; this is a voluntary visual extra.</p>';
 el.querySelectorAll('[data-cup-dark]').forEach(btn=>btn.addEventListener('click',()=>{activeCupDark=btn.dataset.cupDark;renderCupDark();}));
 el.querySelectorAll('[data-cup-dark-photo]').forEach(btn=>btn.addEventListener('click',()=>{
  window.KAOS_DARK_OPEN=true;
  selectedImages=currentCupDark;showBotImage(Number(btn.dataset.cupDarkPhoto));
  window.KAOS_DARK_OPEN=false;
 }));
}
unlockAfterDark=function(){
 if(detailId!==CUP)return origUnlock();
 const btn=document.getElementById('afterdark-ack');if(!btn)return;
 btn.textContent='AFTER DARK UNLOCKED';btn.disabled=true;btn.setAttribute('aria-pressed','true');
 activeCupDark='Highlights';renderCupDark();
};
})();
