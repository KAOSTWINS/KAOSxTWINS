/* EDEN MALL COMMUNITY REGISTRY — interactive demo + optional Supabase backend.
   Public characters are fictional, approved-only, and not tied to a real person's account. */
(() => {
'use strict';
const byId=id=>document.getElementById(id);
const config=window.EDEN_CONFIG || {};
const url=(config.supabaseUrl||'').trim().replace(/\/$/,'');
const key=(config.publishableKey||'').trim();
const siteKey=(config.turnstileSiteKey||'').trim();
const connected=/^https:\/\/[\w.-]+\.supabase\.co$/.test(url)&&key.startsWith('sb_publishable_')&&!!siteKey;
const tokens={token:'',widget:null};
const status=byId('edenSubmitFeedback');
const form=byId('edenIntakeForm');
const inputs=['personaName','personaAge','personaPronouns','personaOccupation','personaArrival','personaTrait','personaFlaw','personaKeepsake','personaRole','personaTone','personaAvatar','personaPatrol'];
let generated=null,cardFlipped=false,residents=[],entryMade=false;
 let portraitImage=null,portraitDataUrl="";
const demos=[
  {resident_number:841,character_name:'Rowan Vale',age:27,pronouns:'They/Them',old_world_occupation:'Aquarium maintenance technician',arrival_story:'Followed a radio signal through the city',strength:'Quick-thinking',flaw:'Dangerously curious',keepsake:'A cracked cassette player',division:'Maintenance',tone:'Grounded',avatar_style:'green',incident:'Restored an old fountain without asking. Gabriel has questions. Ilya privately admired the filtration work.',persona_text:'Rowan Vale, 27, worked on aquarium filtration systems before the fall. Clever and dangerously curious, they followed a radio signal to Eden Mall carrying a cracked cassette player. The fountain was their first mistake. Their assigned post is Maintenance.',gabe_comment:"Resident has restored a fountain, endangered a filtration system, and somehow earned the gardener's approval. Assigned to Maintenance. Do not leave unsupervised with plumbing. — G. Thorne",status:'approved'},
  {resident_number:842,character_name:'Cass Finch',age:25,pronouns:'She/Her',old_world_occupation:'Tattoo artist',arrival_story:'Escaped a hostile settlement',strength:'Keeping people calm',flaw:'Hates following orders',keepsake:'A little red sketchbook',division:'Medical',tone:'Chaotic',avatar_style:'rust',incident:'Declared the infirmary wall too depressing and drew a cheerful sun on it. The sun is anatomically incorrect. Emmett thinks it is wonderful.',persona_text:'Cass Finch was a tattoo artist before the outbreak, and still finds ways to make things beautiful. She came from a hostile settlement with a battered sketchbook. Now helping in Medical, she has a natural gift for calming frightened people and an equally natural allergy to orders.',gabe_comment:"The infirmary does not require murals, but morale has improved. Keep the art supplies. Stop drawing on the emergency exits. — G. Thorne",status:'approved'},
  {resident_number:843,character_name:'Morgan Pike',age:28,pronouns:'He/Him',old_world_occupation:'Delivery driver',arrival_story:'Was rescued during a supply run',strength:'Stealth',flaw:'Dry humour at bad moments',keepsake:'A keychain shaped like a duck',division:'Scouting',tone:'Grounded',avatar_style:'slate',incident:'Returned from patrol with six spare batteries, two packets of biscuits and no explanation for the traffic cone.',persona_text:'Morgan Pike used to be a delivery driver. He knows the old roads better than most, moves quietly and makes deeply inappropriate jokes when things get tense. Rescued on a supply run, he keeps a ridiculous duck keychain close.',gabe_comment:"Useful supplies returned from patrol. The traffic cone remains unexplained. I have stopped asking. — G. Thorne",status:'approved'},
  {resident_number:844,character_name:'Ari Solis',age:24,pronouns:'Any pronouns',old_world_occupation:'Cinema projectionist',arrival_story:'Had been hiding in a locked shop',strength:'Negotiation',flaw:'Trusts too easily',keepsake:'A strip of old film',division:'Trade',tone:'Haunted',avatar_style:'gold',incident:'Talked Mal into accepting a handwritten poem as payment for candles. Gabe has yet to understand how this happened.',persona_text:'Ari Solis once operated the cinema projectors. They hid alone inside an old shop through the worst of the outbreak, saving a piece of film from their favourite movie. They are gentle, persuasive, trusting, and now work with the traders.',gabe_comment:"Trading poetry for candles is not an approved economic policy. Unfortunately, Mal has already filed it under 'business'. — G. Thorne",status:'approved'},
];
const encounters={"gabe":"Gabriel reviews the newcomer's registration before anyone lends them a weapon, a key or Mal's credit.","ilya":"Ilya hands the newcomer gardening gloves and quietly assesses whether they are useful or a menace.","emmett":"Emmett is singing to a pot of soup when the newcomer arrives. He offers them the last unbroken biscuit.","mal":"Mal offers the newcomer a glass, a chair and three perfectly calculated questions.","beck":"Beck notices the newcomer holding a wrench backwards and silently adjusts their grip.","jun":"Jun is on watch. He makes room for the newcomer beside the binoculars without making a fuss.","rowan":"Rowan catches a beam before it falls, then asks whether the newcomer came to help or watch.","vex":"Vex opens a locked door for the newcomer, although nobody asked him to. He insists it was for security.","toby":"Toby assigns the newcomer a training slot and pretends not to notice their grin.","jasper":"Jasper asks the newcomer to hold a wire, assures them it is harmless, then reconsiders.","milo":"The newcomer hears their name through radio static and finds Milo looking suspiciously innocent.","aiden":"Aiden offers the newcomer a chair and water, then asks whether they need medical attention.","santino":"Santino unrolls a map and asks the newcomer whether they are brave, lucky, or both."};
const incidents={
  Maintenance:['Got the fountain running again. Security would like to know why the water was blue.','Fixed the automatic doors, which promptly locked Gabriel outside for seventeen very long minutes.','Restored the escalator for precisely eight seconds. The entire food court applauded.'],
  Security:['Accidentally triggered the evacuation alarm while practising the alarm sequence.','Reorganised the perimeter checkpoint and caused three veteran guards to lose their favourite chairs.','Caught two residents sneaking into the cinema. Neither would admit whose idea it was.'],
  Gardens:['Declared the old shoe shop a seed nursery and produced actual tomatoes.','Overwatered the rooftop beds and temporarily flooded the stairwell. Ilya was impressed despite himself.','Discovered a working sprinkler system behind an advertising poster.'],
  Kitchen:['Made soup from ingredients nobody could identify. Emmett asked for the recipe.','Repaired the old popcorn machine. The queue for popcorn interfered with the guard rotation.','Tried to start a baking competition during a fuel shortage. Gabe was not consulted.'],
  Medical:['Reorganised the first-aid cupboard by colour, then had to reorganise it again by actual usefulness.','Invented a bedtime story for frightened children. Half the adults stayed to hear the ending.','Used the last clean bedsheet to patch the infirmary window before the storm.'],
  Scouting:['Returned from a supply run with medicine, batteries and an inexplicable garden gnome.','Located a shortcut through the parking structure. Unfortunately, it led to Mal’s secret storage room.','Left perfect trail markers and completely forgot where they put their own boots.'],
  Trade:['Negotiated an excellent deal for canned peaches. Mal suspects witchcraft.','Started an informal lost-and-found exchange. Somehow it now has a waiting list.','Discovered six missing lanterns in a booth that was supposed to be empty.'],
  Records:['Catalogued the old mall maps and discovered three rooms not shown on the current directory.','Introduced a proper filing system. Gabe stared at it in reverent silence.','Found a twelve-year-old complaint about the food court and insisted it deserved an official reply.']
};
function currentValues(){return {
 character_name:byId('personaName').value.trim(),age:Number(byId('personaAge').value),pronouns:byId('personaPronouns').value,
 old_world_occupation:byId('personaOccupation').value.trim(),arrival_story:byId('personaArrival').value,strength:byId('personaTrait').value,flaw:byId('personaFlaw').value,keepsake:byId('personaKeepsake').value.trim(),division:byId('personaRole').value,tone:byId('personaTone').value,avatar_style:byId('personaAvatar').value,patrol:byId('personaPatrol').value};}
function safe(v){return String(v??'').replace(/[<>]/g,'').trim();}
function setMessage(msg,type=''){status.textContent=msg;status.className='registry-feedback'+(type?' '+type:'');}
function initialLetters(name){return name.split(/\s+/).map(x=>x[0]||'').join('').slice(0,2).toUpperCase();}
function randomIndex(n){if (window.crypto?.getRandomValues) {const v=new Uint32Array(1);window.crypto.getRandomValues(v);return v[0]%n;}return Math.floor(Math.random()*n);}
function buildPersona(reroll=false){
 if(!form.reportValidity())return;
 const v=currentValues();
 if(v.age<18||v.age>99){setMessage('Resident personas must be fictional adults aged 18 or over.','error');return;}
 if(/[\w.+-]+@[\w.-]+\.[a-z]{2,}|https?:\/\/|\+?\d[\d\s.-]{8,}/i.test(v.character_name+' '+v.old_world_occupation+' '+v.keepsake)){
 setMessage('Only fictional character details here, please. Remove contact information or links.','error');return;
 }
 let ind=randomIndex(incidents[v.division].length);
 if(reroll&&generated&&generated.division===v.division){ind=(generated._incidentIndex+1+randomIndex(incidents[v.division].length-1))%incidents[v.division].length;}
 const situation=incidents[v.division][ind];
 const toneText=v.tone==='Chaotic'?'They have a gift for making a disaster memorable.':v.tone==='Haunted'?'Some parts of their journey remain difficult to talk about.':'They are doing their best to make ordinary life possible again.';
 const intro=`${v.character_name}, ${v.age}, used to work as ${v.old_world_occupation} before the outbreak. They reached Eden Mall after they ${v.arrival_story.charAt(0).toLowerCase()+v.arrival_story.slice(1)}. Their greatest strength is ${v.strength.toLowerCase()}, though ${v.flaw.toLowerCase()} tends to complicate things. They still keep ${v.keepsake}. Now a provisional member of ${v.division}, they are trying to build a life inside the mall. ${toneText} Their first encounter: ${encounters[v.patrol]}`;
 generated={...v,incident:situation,persona_text:intro,_incidentIndex:ind};
 entryMade=true;cardFlipped=false;renderCard();byId('rerollIncident').disabled=false;byId('copyPersona').disabled=false;byId('downloadPersonaCard').disabled=false;byId('submitToGabe').disabled=false;
 setMessage(connected?'FILE GENERATED. Review the details and consent, then submit to Gabe for approval.':'PREVIEW MODE. Supabase is available, but public submissions are paused until Turnstile and the secure submission endpoint are configured.');
}
function renderCard(){if(!generated)return;const v=generated;byId('idName').textContent=v.character_name.toUpperCase();byId('cardBackName').textContent=v.character_name.toUpperCase();byId('cardSub').textContent=`AGE ${v.age} · ${v.pronouns.toUpperCase()}`;byId('idRole').textContent=v.division.toUpperCase();byId('idTrait').textContent=v.strength.toUpperCase();byId('cardFlaw').textContent=v.flaw.toUpperCase();byId('cardAvatar').firstChild.textContent=initialLetters(v.character_name);byId('cardAvatar').dataset.theme=v.avatar_style;syncCardPortrait();byId('cardBio').textContent=v.persona_text;byId('idQuote').textContent='INCIDENT 001: '+v.incident;byId('cardStatus').textContent='AWAITING GABE’S REVIEW';byId('cardFront').hidden=cardFlipped;byId('cardBack').hidden=!cardFlipped;}
function syncCardPortrait(){const avatar=byId('cardAvatar'),preview=byId('cardAvatarImage');if(!avatar||!preview)return;
 preview.hidden=!portraitDataUrl;if(portraitDataUrl)preview.src=portraitDataUrl;else preview.removeAttribute('src');
 avatar.classList.toggle('has-portrait',!!portraitDataUrl);const label=avatar.querySelector('small');if(label)label.hidden=!!portraitDataUrl;
}
function clearPortrait(){portraitImage=null;portraitDataUrl='';byId('personaPortrait').value='';byId('clearPortrait').disabled=true;syncCardPortrait();setMessage('Character photo removed. Initials will appear on your ID. Your character file is unchanged.');}
byId('clearPortrait').addEventListener('click',clearPortrait);
byId('personaPortrait').addEventListener('change',event=>{
 const f=event.target.files&&event.target.files[0];if(!f)return;
 if(!['image/png','image/jpeg','image/webp'].includes(f.type)||f.size>6*1024*1024||f.size===0){event.target.value='';setMessage('Please choose a valid PNG, JPG or WEBP character portrait under 6 MB.','error');return;}
 const reader=new FileReader();reader.onerror=()=>setMessage('Cannot read that portrait. Try another file.','error');
 reader.onload=()=>{const im=new Image();im.onerror=()=>setMessage('That portrait file could not be decoded.','error');
  im.onload=()=>{if(im.naturalWidth<64||im.naturalHeight<64||im.naturalWidth>8192||im.naturalHeight>8192){event.target.value='';setMessage('Your character portrait must be between 64 and 8192 pixels wide/tall.','error');return;}
   const canvas=document.createElement('canvas');canvas.width=500;canvas.height=640;const ctx=canvas.getContext('2d');if(!ctx){setMessage('Portrait preview is not supported here.','error');return;}
   const scale=Math.max(500/im.naturalWidth,640/im.naturalHeight);const w=im.naturalWidth*scale,h=im.naturalHeight*scale;
   ctx.fillStyle='#192921';ctx.fillRect(0,0,500,640);ctx.drawImage(im,(500-w)/2,(640-h)/2,w,h);
   portraitDataUrl=canvas.toDataURL('image/png');portraitImage=new Image();portraitImage.onload=()=>{syncCardPortrait();byId('clearPortrait').disabled=false;setMessage('Character portrait added to your ID preview. It stays in this browser only and will be included in your downloaded PNG.','success');};portraitImage.src=portraitDataUrl;
  };im.src=String(reader.result);
 };reader.readAsDataURL(f);
});
function copyPersona(){navigator.clipboard?.writeText(generated.persona_text).then(()=>setMessage('Persona description copied. Ready to paste into Dreamjourney.','success')).catch(()=>setMessage('Clipboard unavailable. Turn your card over to copy the text manually.','error'));}
function savePNG(){if(!generated)return;const g=generated,canvas=document.createElement('canvas');canvas.width=1120;canvas.height=680;const c=canvas.getContext('2d');if(!c)return;
 c.fillStyle='#d7d6ba';c.fillRect(0,0,1120,680);c.fillStyle='#314b3a';c.fillRect(14,14,1092,92);c.fillStyle='#f6efd9';c.font='bold 40px monospace';c.fillText('✚ EDEN MALL / SURVIVOR REGISTRY',50,72);
 c.fillStyle='#b8c5aa';c.fillRect(50,143,238,284);c.fillStyle='#355843';c.fillRect(60,153,218,264);if(portraitImage?.complete&&portraitImage.naturalWidth){c.save();c.beginPath();c.rect(60,153,218,264);c.clip();const scale=Math.max(218/portraitImage.naturalWidth,264/portraitImage.naturalHeight);const w=portraitImage.naturalWidth*scale,h=portraitImage.naturalHeight*scale;c.drawImage(portraitImage,60+(218-w)/2,153+(264-h)/2,w,h);c.restore();}else{c.fillStyle='#f7efcc';c.font='bold 92px Georgia';c.textAlign='center';c.fillText(initialLetters(g.character_name),169,303);c.textAlign='left';}
 c.fillStyle='#2b3b2d';c.font='bold 23px monospace';c.fillText('RESIDENT NAME',340,180);c.font='55px Georgia';c.fillText(g.character_name.slice(0,30),340,248);c.font='24px monospace';c.fillText('AGE '+g.age+'  /  '+g.pronouns.toUpperCase(),340,291);
 c.font='bold 20px monospace';c.fillText('ASSIGNED DIVISION',340,354);c.font='34px Georgia';c.fillText(g.division.toUpperCase(),340,400);
 c.fillStyle='#627861';c.fillRect(50,478,1020,2);c.fillStyle='#2b3b2d';c.font='bold 21px monospace';c.fillText('STRENGTH: '+g.strength.toUpperCase(),50,526);c.fillText('LIABILITY: '+g.flaw.toUpperCase(),50,570);
 c.fillStyle='#4d654e';c.fillRect(14,615,1092,50);c.fillStyle='#eef2de';c.font='bold 18px monospace';c.fillText('PROVISIONAL • GABE APPROVAL REQUIRED',50,647);
 const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download='EDEN-MALL-'+g.character_name.replace(/[^a-z0-9]+/gi,'-').slice(0,40)+'.png';a.click();setMessage('Your provisional ID has been saved as a PNG.','success');}
function updateUnsaved(){if(!generated)return;const vals=currentValues();const keys=['character_name','age','pronouns','old_world_occupation','arrival_story','strength','flaw','keepsake','division','tone','avatar_style','patrol'];if(keys.some(k=>String(vals[k])!==String(generated[k]))){generated=null;byId('submitToGabe').disabled=true;byId('rerollIncident').disabled=true;byId('copyPersona').disabled=true;byId('downloadPersonaCard').disabled=true;setMessage('Your intake details changed. Generate your file again before submitting.');}}
form.addEventListener('submit',e=>{e.preventDefault();buildPersona();});
for(const id of inputs)byId(id).addEventListener('change',updateUnsaved);
byId('rerollIncident').addEventListener('click',()=>buildPersona(true));
byId('turnCard').addEventListener('click',()=>{cardFlipped=!cardFlipped;if(generated)renderCard();else {byId('cardFront').hidden=cardFlipped;byId('cardBack').hidden=!cardFlipped;} });
byId('copyPersona').addEventListener('click',copyPersona);byId('downloadPersonaCard').addEventListener('click',savePNG);
function setupTurnstile(){if(!connected)return;const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.onload=()=>{if(!window.turnstile)return;tokens.widget=window.turnstile.render('#edenTurnstile',{sitekey:siteKey,theme:'dark',callback:t=>{tokens.token=t;},'expired-callback':()=>{tokens.token='';},'error-callback':()=>{tokens.token='';}})};script.onerror=()=>setMessage('Security verification could not load. Please check your connection.','error');document.head.appendChild(script);}
byId('submitToGabe').addEventListener('click',async()=>{
 if(!generated){setMessage('Generate a valid character file first.','error');return;}
 if(!byId('edenPublicConsent').checked){setMessage('Please tick the consent box to submit your fictional persona.','error');return;}
 if(!connected){setMessage('DEMO ONLY: Your character was NOT submitted. Turnstile and the secure submission endpoint must be activated before Gabe can receive applications.','error');return;}
 if(!tokens.token){setMessage('Please complete the security check before submitting.','error');return;}
 const btn=byId('submitToGabe');btn.disabled=true;btn.textContent='FILING PERSONNEL RECORD…';
 try{
  const {patrol,_incidentIndex,...record}=generated;
  const response=await fetch(url+'/functions/v1/eden-submit',{method:'POST',headers:{'content-type':'application/json','apikey':key},body:JSON.stringify({...record,website:byId('edenWebsite').value,turnstileToken:tokens.token})});
  const result=await response.json();if(!response.ok)throw new Error(result.error||'Submission failed');
  byId('cardNumber').textContent='E-'+String(result.resident_number).padStart(5,'0');byId('cardStatus').textContent='PENDING GABE’S APPROVAL';
  setMessage('FILED SUCCESSFULLY AS E-'+String(result.resident_number).padStart(5,'0')+'. Your file is pending Gabe’s review and is NOT publicly visible yet.','success');
  btn.textContent='✓ FILE SENT TO GABE';entryMade=false;
 }catch(err){setMessage(err.message||'Unable to submit this record. Try again.','error');btn.disabled=false;btn.textContent='📁 SUBMIT TO GABE’S DESK';}
 finally{tokens.token='';if(window.turnstile&&tokens.widget!==null)window.turnstile.reset(tokens.widget);}
});
const demoLabel='ILLUSTRATIVE DEMO FILES • NOT REAL COMMUNITY SUBMISSIONS';
const liveLabel='LIVE PUBLIC REGISTRY • APPROVED SUBMISSIONS ONLY';
async function loadCabinet(){
 const folder=byId('residentFolders');folder.replaceChildren();const loading=document.createElement('div');loading.className='cabinet-empty';loading.textContent='Checking the resident filing cabinet…';folder.appendChild(loading);
 if(!connected){residents=demos;byId('cabinetFoot').textContent=demoLabel+' • Live admissions will appear here once server verification is configured.';renderFolders();return;}
 try{const select='id,resident_number,character_name,age,pronouns,old_world_occupation,arrival_story,strength,flaw,keepsake,division,tone,incident,persona_text,avatar_style,gabe_comment,approved_at';
 const endpoint=url+'/rest/v1/eden_residents?select='+encodeURIComponent(select)+'&status=eq.approved&order=approved_at.desc&limit=100';
 const response=await fetch(endpoint,{headers:{apikey:key}});if(!response.ok)throw new Error('Registry fetch failed: '+response.status);
 residents=await response.json();byId('cabinetFoot').textContent=liveLabel+' • If your record is missing, it may still be awaiting Gabe’s review.';renderFolders();
 }catch(err){residents=[];byId('cabinetCount').textContent='—';folder.replaceChildren();const msg=document.createElement('div');msg.className='cabinet-empty';msg.textContent='The filing cabinet is unavailable at present. Check Supabase settings or try again.';folder.appendChild(msg);byId('cabinetFoot').textContent='Unable to connect to the live registry.';console.warn('Eden registry:',err.message);}}
function renderFolders(){const q=byId('cabinetSearch').value.toLocaleLowerCase().trim(),d=byId('cabinetDivision').value;const matches=residents.filter(r=>(!d||r.division===d)&&(!q||[r.character_name,r.old_world_occupation,r.division].some(t=>String(t||'').toLocaleLowerCase().includes(q))));byId('cabinetCount').textContent=String(residents.length).padStart(2,'0');const parent=byId('residentFolders');parent.replaceChildren();if(!matches.length){const empty=document.createElement('div');empty.className='cabinet-empty';empty.textContent='No approved files match your search. Try a different drawer.';parent.appendChild(empty);return;}
 for(const r of matches){const card=document.createElement('button');card.type='button';card.className='resident-folder';const num=document.createElement('small');num.textContent='FILE E-'+String(r.resident_number).padStart(5,'0')+' / APPROVED';const name=document.createElement('h4');name.textContent=r.character_name;const role=document.createElement('p');role.textContent=r.division+' Division · '+r.old_world_occupation;const tap=document.createElement('span');tap.textContent='OPEN PERSONNEL FILE ↗';card.append(num,name,role,tap);card.addEventListener('click',()=>openFile(r));parent.appendChild(card);}}
function openFile(r){const dlg=byId('residentFileDialog');byId('fileNumber').textContent='FILE E-'+String(r.resident_number).padStart(5,'0')+' / APPROVED';byId('fileName').textContent=r.character_name;const list=byId('fileDetails');list.replaceChildren();for(const [k,v] of [['Age',r.age],['Pronouns',r.pronouns],['Division',r.division],['Former work',r.old_world_occupation],['Arrival',r.arrival_story],['Strength',r.strength],['Flaw',r.flaw],['Keepsake',r.keepsake]]){const box=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=k.toUpperCase();dd.textContent=String(v);box.append(dt,dd);list.appendChild(box);}byId('fileIncident').textContent='INCIDENT 001: '+r.incident;byId('fileStory').textContent=r.persona_text;const note=(r.gabe_comment||'').trim();byId('fileGabeSection').hidden=!note;byId('fileGabeNote').textContent=note;dlg.showModal();}
byId('fileClose').addEventListener('click',()=>byId('residentFileDialog').close());byId('residentFileDialog').addEventListener('click',e=>{if(e.target===byId('residentFileDialog'))byId('residentFileDialog').close()});
byId('cabinetSearch').addEventListener('input',renderFolders);byId('cabinetDivision').addEventListener('change',renderFolders);byId('refreshCabinet').addEventListener('click',loadCabinet);
byId('edenPublicConsent').addEventListener('change',()=>{if(!byId('edenPublicConsent').checked&&connected)setMessage('Public display consent is required before submitting.');});
setupTurnstile();loadCabinet();
})();
