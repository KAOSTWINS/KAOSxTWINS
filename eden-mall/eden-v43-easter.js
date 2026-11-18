/* KAOSTWINS V43 · The missing guitar pick. No autoplay. */
(()=>{'use strict';
 const pick=document.getElementById('rafePick'),note=document.getElementById('rafeNote'),tune=document.getElementById('rafeTune');
 if(!pick||!note||!tune)return;
 pick.addEventListener('click',()=>{const open=note.hidden;note.hidden=!open;pick.setAttribute('aria-expanded',String(open));});
 tune.addEventListener('click',()=>{document.querySelector('[data-radio="rafe"]')?.click();document.getElementById('radio-station')?.scrollIntoView({behavior:'smooth',block:'center'});});
})();
