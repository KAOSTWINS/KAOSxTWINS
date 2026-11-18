(() => {
'use strict';
const $=id=>document.getElementById(id),config=window.EDEN_CONFIG||{};
const url=(config.supabaseUrl||'').trim().replace(/\/$/,'');
const key=(config.publishableKey||'').trim();
let client=null,session=null;
const show=(id,msg)=>$(id).textContent=msg;
if(!url||!key||!window.supabase){
  show('loginFeedback','PREVIEW MODE: Connect your Supabase URL and publishable key in eden-config.js to enable Gabe’s approval desk. No real records can be approved yet.');
  $('sendLogin').disabled=true;return;
}
client=window.supabase.createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storageKey:'kaostwins-eden-gabe-auth-v1'}});
async function start(){const res=await client.auth.getSession();session=res.data?.session||null;await display();}
async function display(){
 if(!session){$('loginBox').classList.remove('hide');$('queueBox').classList.add('hide');show('loginFeedback','Enter your invited email address. First-time sign-in creates your account after you verify the email link.');return;}
 try {const check=await client.rpc('eden_is_moderator');
  if(check.error||check.data!==true){$('loginBox').classList.remove('hide');$('queueBox').classList.add('hide');show('loginFeedback','This account has no moderator clearance. Request access from the site owner.');return;}
  $('loginBox').classList.add('hide');$('queueBox').classList.remove('hide');show('modLabel','SIGNED IN AS '+session.user.email);await refresh();
 }catch(e){show('loginFeedback','Could not verify moderator permissions. '+(e.message||''));}}
async function refresh(){const container=$('pendingQueue');container.replaceChildren();let result=await client.from('eden_residents').select('id,resident_number,character_name,age,pronouns,old_world_occupation,arrival_story,strength,flaw,keepsake,division,tone,incident,persona_text,status,created_at').eq('status','pending').order('created_at',{ascending:true}).limit(75);
 if(result.error){show('queueFeedback','Unable to load queue: '+result.error.message);return;}
 $('pendingCount').textContent=result.data.length;
 if(!result.data.length){const empty=document.createElement('div');empty.className='empty';empty.textContent='No pending files. Miraculously, the paperwork is under control.';container.append(empty);return;}
 for(const r of result.data){const card=document.createElement('article');card.className='card';const head=document.createElement('div');head.className='card-head';const num=document.createElement('strong');num.textContent='FILE E-'+String(r.resident_number).padStart(5,'0');const date=document.createElement('small');date.textContent='RECEIVED '+new Date(r.created_at).toLocaleString();head.append(num,date);const name=document.createElement('h3');name.textContent=r.character_name;const fields=document.createElement('div');fields.className='details';for(const [k,v] of [['AGE',r.age],['PRONOUNS',r.pronouns],['DIVISION',r.division],['FORMER JOB',r.old_world_occupation],['ARRIVAL',r.arrival_story],['STRENGTH',r.strength],['FLAW',r.flaw],['KEEPSAKE',r.keepsake],['TONE',r.tone]]){const d=document.createElement('div'),l=document.createElement('small'),p=document.createElement('p');l.textContent=k;p.textContent=String(v);d.append(l,p);fields.append(d);}const incident=document.createElement('div');incident.className='incident';incident.textContent='INCIDENT 001: '+r.incident;const story=document.createElement('p');story.textContent=r.persona_text;const noteBox=document.createElement('div');noteBox.className='gabe-note-box';const noteLabel=document.createElement('label');noteLabel.textContent='GABRIEL THORNE / OFFICIAL PERSONNEL NOTE';const note=document.createElement('textarea');note.maxLength=420;note.minLength=12;note.placeholder='Gabe’s comment about this resident, written together with the site owner. Keep it fictional, personal, and under 420 characters.';note.value=r.gabe_comment||'';const noteHelp=document.createElement('small');noteHelp.textContent='12–420 characters. Publicly visible ONLY if this file is approved. The site owner approves every decision.';noteBox.append(noteLabel,note,noteHelp);const actions=document.createElement('div');actions.className='actions';const yes=document.createElement('button'),no=document.createElement('button');yes.className='btn';yes.textContent='✓ APPROVE WITH GABE’S NOTE';no.className='btn warn';no.textContent='✕ REJECT';yes.onclick=()=>setReview(r.id,'approved',r.character_name,note.value);no.onclick=()=>setReview(r.id,'rejected',r.character_name,'');actions.append(yes,no);card.append(head,name,fields,incident,story,noteBox,actions);container.append(card);}}
async function setReview(id,status,name,note){if(status==='approved'&&(note.trim().length<12||note.trim().length>420)){show('queueFeedback','Write a 12–420 character personnel note from Gabe before approving '+name+'.');return;}if(!confirm((status==='approved'?'APPROVE AND PUBLICLY PUBLISH ':'REJECT ')+name+'? This decision should already be agreed with the site owner.'))return;
 show('queueFeedback','Updating '+name+'…');const changes=status==='approved'?{status,gabe_comment:note.trim()}:{status};const result=await client.from('eden_residents').update(changes).eq('id',id).select('id').single();
 if(result.error){show('queueFeedback','Could not update: '+result.error.message);return;}
 show('queueFeedback',name+(status==='approved'?' APPROVED. This record is now publicly visible.':' REJECTED. This record remains private.'));await refresh();}
$('sendLogin').addEventListener('click',async()=>{const email=$('moderatorEmail').value.trim();if(!email||!/^\S+@\S+\.\S+$/.test(email)){show('loginFeedback','Enter a valid moderator email.');return;}
 show('loginFeedback','Sending sign-in link…');const result=await client.auth.signInWithOtp({email,options:{shouldCreateUser:true,emailRedirectTo:location.origin+location.pathname}});
 show('loginFeedback',result.error?'Could not request sign-in: '+result.error.message:'If this email can receive Supabase sign-in messages, check your inbox for a secure one-time link. Only invited, verified accounts can access the queue.');});
$('refreshQueue').addEventListener('click',refresh);$('signOut').addEventListener('click',async()=>{await client.auth.signOut();session=null;await display();});
client.auth.onAuthStateChange((_event,newSession)=>{session=newSession;if(newSession)setTimeout(display,0);});start();
})();
