/* The Bloody Nuisance • cinematic chapters and optional After Dark collection */
(()=>{'use strict';
const $=q=>document.querySelector(q);
const D=window.TBN;
const chapters=[
 {title:'THE APPROACH',eyebrow:'01 / 05 • THE ARRIVAL',img:'assets/scene-arrival.webp',alt:'The Bloody Nuisance approaches through a violent storm',caption:'The Bloody Nuisance did not announce her arrival with a flag. Her black-crimson sails drank the wind.'},
 {title:"THE SURGEON\'S QUARREL",eyebrow:'02 / 05 • BELOW DECK',img:'assets/scene-surgeon.webp',alt:'Mick Byrne and Hugh Bell arguing by the surgical basin',caption:'Mick laughs in the middle of a crisis. Hugh Bell assesses the damage with a surgeon’s entirely unwelcome calm.'},
 {title:'THE COURSE',eyebrow:'03 / 05 • THE CONTRACT',img:'assets/scene-course.webp',alt:'Tom Reed, Kit Price and Pepe Costa planning at a nautical table',caption:'Routes, risks and an unusually valuable captive. The crew disagrees on what the imperial contract is really asking.'},
 {title:"NERON\'S WARNING",eyebrow:'04 / 05 • THE SEA SPEAKS',img:'assets/scene-siren.webp',alt:'Neron, a dark-haired male siren with iridescent shoulder scales',caption:'The markings on the seal belong to the old Court. Neron knows that some debts outlive the people who owe them.'},
 {title:"THE CAPTAIN\'S QUESTION",eyebrow:'05 / 05 • THE CHOICE',img:'assets/scene-captain.webp',alt:'Lucky and the pirates face the viewer across a dimly lit shipboard table',caption:'Lucky cuts one restraint and keeps the other. Then asks the only question nobody wants answered: who paid to deliver you alive?'}
];
function showChapter(i){const c=chapters[i];if(!c)return;$('#sceneFeatureImage').src=c.img;$('#sceneFeatureImage').alt=c.alt;$('#sceneFeatureTitle').textContent=c.title;$('#sceneFeatureNumber').textContent=c.eyebrow;$('#sceneFeatureText').textContent=c.caption;document.querySelectorAll('.scene-pick').forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));}
function initChapters(){const p=$('#scenePicker');if(!p)return;p.innerHTML=chapters.map((c,i)=>`<button class="scene-pick" type="button" data-chapter="${i}" aria-pressed="${i===0}" aria-label="View scene ${i+1}: ${c.title}"><img src="${c.img}" loading="lazy" alt=""><span>${String(i+1).padStart(2,'0')} · ${c.title}</span></button>`).join('');p.addEventListener('click',e=>{const b=e.target.closest('[data-chapter]');if(b)showChapter(Number(b.dataset.chapter))});}
const shoreNames=['lucky','tom','pepe','hugh','kit','mick','nico','neron'];
const extraNames={lucky:'The Captain',hugh:'The Surgeon'};
const privateAllowed=!!(window.SITE_CONTENT&&window.SITE_CONTENT.privateGallery);
const collections=[
 {id:'shore',name:'☾ THE MOONLIT SHORE',caption:'Eight moonlit beach portraits',items:shoreNames.map(id=>({id,name:D.crew.find(c=>c.id===id).name,role:D.crew.find(c=>c.id===id).role,src:`assets/shore-${id}.webp`}))},
 {id:'night',name:'⚓ AFTER HOURS',caption:'Eight original cinematic portraits',items:D.crew.map(c=>({id:c.id,name:c.name,role:c.role,src:`assets/${c.night}`}))},
 ...(privateAllowed?[{id:'private',name:'✦ THE PRIVATE DECK',caption:'Two additional user-supplied adult artworks',items:[{id:'lucky-private',name:'Lucky',role:extraNames.lucky,src:'assets/private-lucky.webp'},{id:'hugh-private',name:'Hugh Bell',role:extraNames.hugh,src:'assets/private-hugh.webp'}]}]:[])
];
let activeCollection='shore',activeIndex=0,consented=false;
function group(){return collections.find(g=>g.id===activeCollection)||collections[0]}
function gallery(){if(!consented)return;const tabs=$('#nightTabs'),grid=$('#nightGrid');tabs.hidden=false;grid.hidden=false;$('#nightGalleryNote').hidden=false;tabs.innerHTML=collections.map(g=>`<button type="button" data-gallery="${g.id}" aria-pressed="${g.id===activeCollection}">${g.name} <small>(${g.items.length})</small></button>`).join('');grid.innerHTML=group().items.map((it,i)=>`<article class="night-card"><button type="button" data-view="${i}" aria-label="View portrait of ${it.name}"><span class="night-image-wrap"><img loading="lazy" src="${it.src}" alt="Adult fantasy pirate portrait of ${it.name}"><span class="night-view">ENLARGE ↗</span></span><h3>${it.name}</h3><p>${it.role}</p></button></article>`).join('')}
function view(i){const g=group();if(!g.items.length)return;activeIndex=(i+g.items.length)%g.items.length;const it=g.items[activeIndex];$('#nightDialogImage').src=it.src;$('#nightDialogImage').alt=`Portrait of adult fictional pirate character ${it.name}`;$('#nightDialogTitle').textContent=it.name;$('#nightDialogSub').textContent=`${it.role.toUpperCase()} • ${g.caption.toUpperCase()} • ${activeIndex+1} / ${g.items.length}`;const d=$('#nightDialog');if(!d.open)d.showModal()}
function initGallery(){const start=$('#showNight');if(!start)return;start.addEventListener('click',()=>{consented=true;gallery()});$('#nightTabs').addEventListener('click',e=>{const b=e.target.closest('[data-gallery]');if(!b)return;activeCollection=b.dataset.gallery;gallery()});$('#nightGrid').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)view(Number(b.dataset.view))});$('#nightPrevious').addEventListener('click',()=>view(activeIndex-1));$('#nightNext').addEventListener('click',()=>view(activeIndex+1));document.addEventListener('keydown',e=>{if(!$('#nightDialog').open)return;if(e.key==='ArrowRight')view(activeIndex+1);if(e.key==='ArrowLeft')view(activeIndex-1)});}
initChapters();initGallery();
})();
