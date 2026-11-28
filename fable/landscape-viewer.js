'use strict';
(function(){
const dialog=document.getElementById('landscapeViewer');
if(!dialog||typeof dialog.showModal!=='function')return;
const links=[...document.querySelectorAll('a.landscape-open')];
const full=document.getElementById('landscapeFull'), caption=document.getElementById('landscapeCaption'), counter=document.getElementById('landscapeCounter'), original=document.getElementById('landscapeOriginal'), prev=document.getElementById('landscapePrev'), next=document.getElementById('landscapeNext'), close=document.getElementById('landscapeClose');
let index=0,opener=null;
function show(i){
index=(i+links.length)%links.length;
const a=links[index], img=a.querySelector('img'), fig=a.closest('figure'), info=fig.querySelector('figcaption');
full.src=a.href;full.alt=img.alt;
const details=info?Array.from(info.children).map(x=>x.textContent.trim()).filter(Boolean).join(' · ')||info.textContent.trim():'';
caption.textContent=details?(details.startsWith(img.alt)?details:img.alt+' · '+details):img.alt;
counter.textContent=(index+1)+' / '+links.length;
original.href=a.href; original.setAttribute('aria-label','Open full image: '+img.alt);
}
links.forEach((a,i)=>{a.setAttribute('aria-label','Enlarge '+a.querySelector('img').alt);a.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();opener=a;show(i);dialog.showModal();close.focus();});});
prev.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));close.addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(index-1)}if(e.key==='ArrowRight'){e.preventDefault();show(index+1)}});
dialog.addEventListener('close',()=>{full.removeAttribute('src');if(opener)opener.focus({preventScroll:true});});
})();