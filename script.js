'use strict';
(() => {
 const cfg = window.BERLIN_CONFIG || {};
 const el = (id) => document.getElementById(id);
 const nav = el('nav-links'), toggle = el('menu-toggle'), header = el('site-header');
 const syncNav = () => header?.classList.toggle('scrolled', window.scrollY > 18);
 addEventListener('scroll', syncNav, {passive:true}); syncNav();
 toggle?.addEventListener('click', () => {const open = !nav.classList.contains('open');nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Abrir menú');}));
 if (el('year')) el('year').textContent=String(new Date().getFullYear());
 // One transition per change, no stacked timelines or double animation.
 const slides=[...document.querySelectorAll('.hero-scene')];
 const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let active=0;
 if (slides.length>1 && !reduceMotion) setInterval(()=>{
   if (document.hidden) return;
   const next=(active+1)%slides.length;
   slides[next].classList.add('active');
   slides[active].classList.remove('active');
   active=next;
 },9000);
 const host=String(cfg.minecraftIp||'').trim();
 if(el('server-address')) el('server-address').textContent=host;
 const copy=el('copy-ip');
 copy?.addEventListener('click',async()=>{
   if (!host) return;
   try {await navigator.clipboard.writeText(host);copy.textContent='IP copiada';el('copy-feedback').textContent='Dirección copiada al portapapeles.';}
   catch{el('copy-feedback').textContent='Selecciona y copia la dirección que aparece arriba.';}
 });
 const validHost = (h)=>typeof h==='string'&&h.length<255&&/^[A-Za-z0-9._-]+(?::\d{1,5})?$/.test(h);
 const statusText=(id,label,type='neutral')=>{const node=el(id);if(!node)return;node.replaceChildren();const dot=document.createElement('span');dot.className='state-dot '+type;node.append(dot,document.createTextNode(' '+label));};
 const numberOrNull=(x)=>typeof x==='number'&&Number.isInteger(x)&&x>=0?x:null;
 async function getJson(url){const ctrl=new AbortController();const id=setTimeout(()=>ctrl.abort(),8000);try{const r=await fetch(url,{cache:'no-store',signal:ctrl.signal});if(!r.ok)throw Error('HTTP '+r.status);return await r.json();}finally{clearTimeout(id);}}
 const ping=(h)=>getJson('https://api.mcstatus.io/v2/status/java/'+encodeURIComponent(h)+'?query=false');
 async function updateStatus(){
   if(validHost(host)){
     try{const r=await ping(host);el('gateway-status').textContent=r.online===true?'En línea':'Sin conexión';}
     catch{el('gateway-status').textContent='No disponible';}
   }
   const modes=cfg.modalities||{}, keys=['survival','box'];
   const entries=await Promise.all(keys.map(async key=>{
     const node=modes[key]||{};
     if(!validHost(node.host))return {key,state:'development'};
     try{
       const r=await ping(node.host);
       if(r.online!==true)return {key,state:'offline'};
       const n=numberOrNull(r.players?.online);
       return n===null?{key,state:'unknown'}:{key,state:'online',players:n};
     }catch{return {key,state:'unknown'};}
   }));
   for(const x of entries){
     const value=el(x.key+'-players');
     if(value)value.textContent=x.state==='online'?String(x.players):x.state==='offline'?'0':'—';
     const message={development:'En desarrollo',offline:'Sin conexión',unknown:'No disponible',online:'En línea'}[x.state];
     statusText(x.key+'-state',message,x.state==='online'?'online':x.state==='offline'?'offline':'neutral');
   }
   const fullyConfigured=keys.every(k=>validHost(modes[k]?.host));
   const hosts=keys.map(k=>modes[k]?.host);
   // Refuse to sum a gateway or duplicate addresses: both would double-count players.
   const distinct=new Set(hosts.map(h=>typeof h==='string'?h.toLowerCase():h)).size===2;
   const bothKnown=entries.every(e=>e.state==='online'||e.state==='offline');
   if(fullyConfigured&&distinct&&bothKnown){
     el('network-players').textContent=String(entries.reduce((n,e)=>n+(e.players||0),0));
     statusText('network-state','Suma de modalidades','online');
   }else{
     el('network-players').textContent='—';
     statusText('network-state',!fullyConfigured?'Pendiente de modalidades':!distinct?'Direcciones duplicadas':'Datos incompletos');
   }
 }
 async function updateDiscord(){
   const id=String(cfg.discordGuildId||'');
   if(!/^\d{17,22}$/.test(id)){el('discord-online').textContent='No disponible';return;}
   try{
     const r=await getJson(`https://discord.com/api/guilds/${id}/widget.json`);
     const n=numberOrNull(r?.presence_count);
     el('discord-online').textContent=n===null?'No disponible':n+' conectados';
   }catch{el('discord-online').textContent='No disponible';}
 }
 async function refresh(){if(document.hidden)return;await Promise.allSettled([updateStatus(),updateDiscord()]);}
 refresh();setInterval(refresh,Math.max(60,Number(cfg.refreshSeconds)||90)*1000);
})();