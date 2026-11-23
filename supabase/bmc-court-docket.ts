// KAOSTWINS • Blood Moon Court: public poll + moderated fictional court whisper box.
// No browser-visible secrets. No public table privileges. No IPs stored, only keyed SHA-256 fingerprints.
// Deploy as public Edge Function (verify_jwt=false) for anonymous visitors.
const PROJECT_URL = Deno.env.get('SUPABASE_URL') || '';
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const choices = ['rasmus','renato','esmond','all_three','nobody'] as const;
const origins = /^https:\/\/kaostwins\.github\.io$|^http:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/i;
function headers(req: Request) {
 const origin = req.headers.get('origin');
 return {
  'Access-Control-Allow-Origin': origin && (origins.test(origin) || origin === 'null') ? origin : 'https://kaostwins.github.io',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Max-Age': '3600',
  'Vary': 'Origin',
  'Content-Type':'application/json; charset=utf-8',
  'Cache-Control':'no-store',
 };
}
function answer(req:Request, data:unknown, status=200) {return new Response(JSON.stringify(data),{status,headers:headers(req)})}
function trimControl(v:unknown,max:number){return String(v??'').replace(/[\u0000-\u001F\u007F]/g,' ').trim().slice(0,max)}
async function fingerprint(req:Request){
 const ip=(req.headers.get('cf-connecting-ip') || req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim().slice(0,96);
 const agent=(req.headers.get('user-agent')||'unknown').slice(0,150);
 const data=new TextEncoder().encode(SERVICE_KEY.slice(-48)+'|'+ip+'|'+agent);
 const hash=await crypto.subtle.digest('SHA-256',data);
 return Array.from(new Uint8Array(hash)).map(v=>v.toString(16).padStart(2,'0')).join('');
}
async function rest(path:string, init:RequestInit={}){
 const response=await fetch(PROJECT_URL+'/rest/v1/'+path,{
  ...init,headers:{apikey:SERVICE_KEY,Authorization:'Bearer '+SERVICE_KEY,Prefer:init.method==='POST'?'return=minimal':'count=exact',...(init.headers||{})},
 });
 if(!response.ok)throw new Error('Database operation failed ('+response.status+')');
 return response;
}
async function totals(){
 const counts:Record<string,number>={};
 await Promise.all(choices.map(async choice=>{
  const r=await rest('bmc_verdict_votes?select=id&choice=eq.'+choice+'&limit=0');
  counts[choice]=Number((r.headers.get('content-range')||'*/0').split('/').pop())||0;
 }));
 return {counts,total_votes:Object.values(counts).reduce((a,b)=>a+b,0)};
}
async function state(req:Request){
 const [voteState,whispersResponse]=await Promise.all([
  totals(),rest('bmc_court_whispers?select=pen_name,message,created_at&status=eq.approved&order=created_at.desc&limit=8')
 ]);
 const whispers=await whispersResponse.json();
 return answer(req,{...voteState,whispers});
}
Deno.serve(async req=>{
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers:headers(req)});
 const origin=req.headers.get('origin');
 if(origin && !origins.test(origin) && origin!=='null')return answer(req,{error:'This court door is reserved for the KAOSTWINS website.'},403);
 if(!PROJECT_URL||!SERVICE_KEY)return answer(req,{error:'Court docket configuration unavailable.'},503);
 if(req.method==='GET'){
  try{return await state(req)}catch{return answer(req,{error:'The court docket is resting. Please try again later.'},503)}
 }
 if(req.method!=='POST')return answer(req,{error:'Unsupported request.'},405);
 const size=Number(req.headers.get('content-length')||0);
 if(size>1800)return answer(req,{error:'That letter is much too long.'},413);
 let body:Record<string,unknown>;
 try{body=await req.json()}catch{return answer(req,{error:'Invalid request.'},400)}
 const fp=await fingerprint(req);
 try{
  if(body.action==='vote'){
   const choice=trimControl(body.choice,20);
   if(!choices.includes(choice as typeof choices[number]))return answer(req,{error:'That is not a valid court verdict.'},400);
   const day=new Date().toISOString().slice(0,10);
   const r=await fetch(PROJECT_URL+'/rest/v1/bmc_verdict_votes',{
    method:'POST',headers:{apikey:SERVICE_KEY,Authorization:'Bearer '+SERVICE_KEY,'Content-Type':'application/json',Prefer:'return=minimal'},
    body:JSON.stringify({choice,fingerprint_hash:fp,vote_day:day})
   });
   if(r.status===409)return answer(req,{error:'You have already cast a court verdict today. Lady Knell remembers.'},429);
   if(!r.ok)throw new Error('Vote write failed');
   return answer(req,{success:true,...await totals()});
  }
  if(body.action==='whisper'){
   const pen_name=trimControl(body.pen_name,36),message=trimControl(body.message,280);
   if(pen_name.length<2 || message.length<5)return answer(req,{error:'Please provide an alias and a proper whisper.'},400);
   if(/(?:https?:\/\/|www\.|@\w{3,})/i.test(pen_name+' '+message))return answer(req,{error:'No links or contact details in the royal postbox, please.'},400);
   const since=encodeURIComponent(new Date(Date.now()-24*60*60*1000).toISOString());
   const recent=await rest('bmc_court_whispers?select=id&fingerprint_hash=eq.'+fp+'&created_at=gte.'+since+'&limit=0');
   const count=Number((recent.headers.get('content-range')||'*/0').split('/').pop())||0;
   if(count>=3)return answer(req,{error:'Your courier has delivered three letters today. Come back tomorrow, darling.'},429);
   await rest('bmc_court_whispers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pen_name,message,fingerprint_hash:fp,status:'pending'})});
   return answer(req,{success:true,moderation:'pending'});
  }
  return answer(req,{error:'Unknown court request.'},400);
 }catch{return answer(req,{error:'The royal postbox is temporarily unavailable. Please try again.'},503)}
});
