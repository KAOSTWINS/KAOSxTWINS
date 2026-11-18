/* KAOSTWINS V42 — REAL AUDIO + CURATED ART ARCHIVE. Additive, no autostart, no remote asset dependency. */
(() => {
'use strict';
const $=id=>document.getElementById(id);
const tracks={
  morning:{src:'../assets/eden/radio/stay-inside-eden.mp3',label:'STAY INSIDE, EDEN',speaker:'EDEN MALL / COMMAND FREQUENCY',notes:'The settlement anthem, recovered from the original Eden audio uploads.'},
  curfew:{src:'../assets/eden/radio/thorne-in-my-side.mp3',label:'THORNE IN MY SIDE',speaker:'EDEN MALL / AFTER HOURS',notes:'Rules, curfews, and the ongoing household argument over who gets to enforce them.'},
  mal:{src:'../assets/eden/radio/get-off-the-frequency.mp3',label:'GET OFF THE FREQUENCY',speaker:'MALACHI BROOKS / FREQUENCY NINE',notes:'An unauthorised broadcast. Gabe is definitely not amused.'},
  milo:{src:'../assets/eden/radio/please-stop-calling-me.mp3',label:'PLEASE STOP CALLING ME',speaker:'MILO TAN / THE RADIO DESK',notes:'Milo insists the next song is NOT dedicated to anyone. Absolutely nobody. Stop calling.'},
  scandal:{src:'../assets/eden/radio/the-real-drama-is-indoors.mp3',label:'THE REAL DRAMA IS INDOORS',speaker:'EDEN MALL / RUMOUR CONTROL',notes:'The zombies are outside. The scandal is inside.'},
  rafe:{src:'../assets/eden/radio/grounded-at-the-end-of-the-world.mp3',label:'GROUNDED AT THE END OF THE WORLD',speaker:'RAFE / MANAGEMENT COMPLAINT DEPARTMENT',notes:'“This one’s dedicated to Eden Mall management.” A full-length rebellion against Gabe’s curfew, with guitars.'},
  singalong:{src:'../assets/eden/radio/kiss-me-like-were-still-alive.mp3',label:'KISS ME LIKE WE’RE STILL ALIVE',speaker:'EDEN MALL / AFTER-HOURS PLAYLIST',notes:'The last song before the generator dies. Unless Milo can fix the wiring again.'},
  hydrate:{src:'../assets/eden/radio/stay-hydrated-malachi.mp3',label:'STAY HYDRATED, MALACHI',speaker:'EDEN MALL / EMERGENCY REMINDER',notes:'An urgent public-service announcement about Malachi’s very questionable beverage choices.'}
};
const player=$('edenRadioPlayer'),listen=$('radioListen'),stop=$('radioStop'),volume=$('radioVolume');
const status=$('radioAudioStatus'),word=$('radioWords'),name=$('radioStationTitle'),signature=$('radioSignature'),clock=$('radioTime'),wave=$('radioWave');
if(player&&listen&&stop&&volume&&status){
 let current='morning';
 player.volume=Number(volume.value)/100;
 player.autoplay=false;
 const duration=t=>{if(!Number.isFinite(t)||t<=0)return '00:00'; const s=Math.floor(t);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');};
 function setStatus(message){status.textContent=message;}
 function visuals(playing){
   wave?.classList.toggle('wave-live',playing);
   listen.textContent=playing?'⏸ PAUSE BROADCAST':'▶ LISTEN / RESUME';
   stop.disabled=!playing && (!Number.isFinite(player.currentTime)||player.currentTime===0);
 }
 function tune(k,autoPlay=false){
  if(!tracks[k])return;
  current=k;
  player.pause();
  player.src=tracks[k].src;
  player.load();
  name.textContent=tracks[k].label;
  signature.textContent='SIGNAL ORIGIN: '+tracks[k].speaker;
  word.textContent=tracks[k].notes;
  clock.textContent='00:00';
  document.querySelectorAll('[data-radio]').forEach(b=>{const active=b.dataset.radio===k;b.classList.toggle('on-air',active);b.setAttribute('aria-pressed',String(active));});
  visuals(false);
  setStatus('📻 LOADED • '+tracks[k].label+' • Press Listen for the original recording.');
  if(autoPlay)start();
 }
 async function start(){
  try{
   // Called exclusively from user-initiated button clicks, never on page load.
   await player.play();
  }catch(err){setStatus('⚠ Audio could not start. Open the extracted website folder, or use the audio player above. '+(err?.message||''));visuals(false);}
 }
 listen.onclick=()=>{if(player.paused)start();else player.pause();};
 stop.onclick=()=>{player.pause();player.currentTime=0;visuals(false);setStatus('🔇 Broadcast stopped. Select another frequency or press Listen.');};
 document.querySelectorAll('[data-radio]').forEach(b=>{b.onclick=()=>tune(b.dataset.radio,!player.paused);});
 volume.oninput=()=>{player.volume=Number(volume.value)/100;};
 player.addEventListener('volumechange',()=>{volume.value=String(Math.round(player.volume*100));});
 player.addEventListener('play',()=>{visuals(true);setStatus('◉ NOW PLAYING • '+tracks[current].label+' • ORIGINAL SUNO AUDIO');});
 player.addEventListener('pause',()=>{visuals(false);if(player.currentTime>0&&player.currentTime<player.duration)setStatus('⏸ PAUSED • '+tracks[current].label);});
 player.addEventListener('loadedmetadata',()=>{clock.textContent=duration(player.duration);});
 player.addEventListener('timeupdate',()=>{if(Number.isFinite(player.duration))clock.textContent=duration(player.currentTime)+' / '+duration(player.duration);});
 player.addEventListener('ended',()=>{visuals(false);setStatus('✓ TRANSMISSION COMPLETE • Select a frequency for another recording.');});
 player.addEventListener('error',()=>{setStatus('⚠ The audio file is missing or unreadable. Make sure the assets/eden/radio folder was extracted along with the website.');visuals(false);});
 document.addEventListener('visibilitychange',()=>{if(document.hidden && !player.paused)player.pause();});
 tune('morning');
}

// The archive is populated only AFTER the visitor explicitly opts in to the adult gallery.
const photos=Array.isArray(window.EDEN_CURFEW_SHOTS)?window.EDEN_CURFEW_SHOTS:[];
const outer=$('afterPhotos'),unlock=$('afterBtn'),grid=$('v42GalleryGrid'),person=$('v42GalleryPerson'),count=$('v42GalleryCount');
if(!outer||!unlock||!grid||!person||!count||!photos.length)return;
const order=['GABE','ILYA','EMMETT','MAL','BECK','JUN','MILO','SANTINO','ROWAN','JASPER','VEX','AIDEN','TOBY','WORLD'];
const labels={'GABE':'Gabe Thorne','ILYA':'Ilya Morren','EMMETT':'Emmett Quinn','MAL':'Malachi Brooks','BECK':'Beck Rourke','JUN':'Jun Seo','MILO':'Milo Tan','SANTINO':'Santino Reyes','ROWAN':'Rowan Hale','JASPER':'Jasper Solis','VEX':'Little Vex','AIDEN':'Aiden Walsh','TOBY':'Toby Varga','WORLD':'The World Outside'};
for(const code of order){const n=photos.filter(x=>x.person===code).length;if(!n)continue;const option=document.createElement('option');option.value=code;option.textContent=labels[code]+' · '+n+' images';person.append(option);}
let kind='all',visible=[],lightboxIndex=0,unlocked=false;
const lb=$('v42GalleryLightbox'),lbImg=$('v42LightboxImage'),lbName=$('v42LightboxTitle');
function txt(s){return String(s||'').trim();}
function matches(photo){return (person.value==='ALL'||photo.person===person.value)&&(kind==='all'||photo.kind===kind);}
function render(){if(!unlocked)return;
 visible=photos.filter(matches);grid.replaceChildren();
 const frag=document.createDocumentFragment();
 visible.forEach((shot,i)=>{
  const button=document.createElement('button');button.type='button';button.className='v42-art-card';button.setAttribute('aria-label','View '+shot.title+' by '+shot.personName);
  const frame=document.createElement('div');frame.className='v42-art-frame';
  const img=document.createElement('img');img.src=shot.src;img.alt=shot.title;img.loading='lazy';img.decoding='async';
  frame.append(img);
  const meta=document.createElement('div');meta.className='v42-art-meta';
  const personName=document.createElement('strong');personName.textContent=labels[shot.person]||shot.personName;
  const description=document.createElement('span');description.textContent=txt(shot.title);
  meta.append(personName,description);button.append(frame,meta);button.addEventListener('click',()=>openImage(i));frag.append(button);
 });
 grid.append(frag);
 count.textContent=visible.length+' / '+photos.length+' PHOTOGRAPHS';
 if(!visible.length){const n=document.createElement('p');n.className='v42-gallery-empty';n.textContent='No images in this filter. Try All Photographs.';grid.append(n);}
}
function openImage(i){if(!unlocked||!visible.length)return;lightboxIndex=(i+visible.length)%visible.length;const shot=visible[lightboxIndex];lbImg.src=shot.src;lbImg.alt=shot.title;lbName.textContent=(labels[shot.person]||shot.personName)+' · '+shot.title+' ('+(lightboxIndex+1)+'/'+visible.length+')';lb.hidden=false;document.body.style.overflow='hidden';}
function closeLightbox(){lb.hidden=true;lbImg.removeAttribute('src');document.body.style.overflow='';}
$('v42LightboxClose')?.addEventListener('click',closeLightbox);
$('v42LightboxPrev')?.addEventListener('click',()=>openImage(lightboxIndex-1));
$('v42LightboxNext')?.addEventListener('click',()=>openImage(lightboxIndex+1));
lb?.addEventListener('click',e=>{if(e.target===lb)closeLightbox();});
document.addEventListener('keydown',e=>{if(lb?.hidden!==false)return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowRight')openImage(lightboxIndex+1);if(e.key==='ArrowLeft')openImage(lightboxIndex-1);});
person.addEventListener('change',render);
document.querySelectorAll('[data-gallery-kind]').forEach(b=>b.addEventListener('click',()=>{kind=b.dataset.galleryKind;document.querySelectorAll('[data-gallery-kind]').forEach(c=>{const yes=c===b;c.classList.toggle('active',yes);c.setAttribute('aria-pressed',String(yes));});render();}));
unlock.addEventListener('click',()=>{
 unlocked=outer.classList.contains('visible');
 if(unlocked){render();unlock.textContent='LOCK THE ARCHIVE 🔒';}
 else{closeLightbox();grid.replaceChildren();count.textContent='ARCHIVE LOCKED';unlock.textContent="I'M 18+ • UNLOCK THE ARCHIVE 🔓";}
});
})();
