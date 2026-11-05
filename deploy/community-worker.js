/** KAOSTWINS Community Ballot (Cloudflare Worker + D1). Deploy separately before activating the form. */
const POLL_CHOICES=new Set(['fable','motel','vampirehr','pirates','monsters']);
function reply(body,status=200,origin='*') {
 return new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Cache-Control':'no-store','Vary':'Origin'}});
}
export default {
 async fetch(request,env) {
   // Set ALLOWED_ORIGIN to the final public site origin when deploying; the star is for first tests only.
   const configured=(env.ALLOWED_ORIGIN||'*').trim();
   const origin=request.headers.get('Origin')||'';
   const allow=configured==='*'?'*':configured;
   if(configured!=='*'&&origin&&origin!==configured)return reply({error:'Origin not allowed'},403,allow);
   if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':allow,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'86400','Vary':'Origin'}});
   if(!env.DB)return reply({error:'Database not configured'},503,allow);
   const path=new URL(request.url).pathname;
   if(request.method==='GET'&&path==='/results') {
     const result=await env.DB.prepare('SELECT choice, COUNT(*) AS count FROM votes GROUP BY choice').all();
     const tallies=Object.fromEntries([...POLL_CHOICES].map(k=>[k,0]));
     for(const row of result.results||[])if(POLL_CHOICES.has(row.choice))tallies[row.choice]=Number(row.count)||0;
     return reply({total:Object.values(tallies).reduce((a,b)=>a+b,0),tallies},200,allow);
   }
   if(request.method==='POST'&&(path==='/vote'||path==='/request')) {
     if(Number(request.headers.get('Content-Length')||0)>4096)return reply({error:'Payload too large'},413,allow);
     let body;try{body=await request.json()}catch{return reply({error:'Invalid JSON'},400,allow)}
     if(path==='/vote') {
       const choice=String(body?.choice||''), voter=String(body?.voter||'');
       if(!POLL_CHOICES.has(choice)||!/^browser-[a-z0-9]{8,80}$/.test(voter))return reply({error:'Invalid ballot'},400,allow);
       await env.DB.prepare('INSERT INTO votes (voter_id,choice) VALUES (?,?) ON CONFLICT(voter_id) DO UPDATE SET choice=excluded.choice,updated_at=CURRENT_TIMESTAMP').bind(voter,choice).run();
       return reply({ok:true,message:'Ballot saved (one browser ID, editable vote)'},200,allow);
     }
     const title=String(body?.title||'').trim(),pitch=String(body?.pitch||'').trim();
     if(title.length<3||title.length>90||pitch.length<8||pitch.length>600)return reply({error:'Title or description out of range'},400,allow);
     // Optional protection for public deployment: Turnstile and/or rate-limiting should be added before wide sharing.
     await env.DB.prepare('INSERT INTO requests (title,pitch) VALUES (?,?)').bind(title,pitch).run();
     return reply({ok:true,message:'Request received'},201,allow);
   }
   return reply({error:'Not found'},404,allow);
 }
};
