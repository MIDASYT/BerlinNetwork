'use strict';
const cfg = window.BERLIN_CONFIG || {};
const $ = (q) => document.querySelector(q);
const header = $('#site-header');
const updateNav = () => header?.classList.toggle('scrolled', window.scrollY > 15 || document.body.classList.contains('rules-page'));
addEventListener('scroll', updateNav, {passive: true}); updateNav();
const menu = $('#menu-toggle'); const nav = $('#site-nav');
menu?.addEventListener('click', () => {const open = !nav.classList.contains('open');nav.classList.toggle('open', open);menu.setAttribute('aria-expanded', String(open));menu.setAttribute('aria-label', open?'Cerrar menú':'Abrir menú');});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Abrir menú');}));
$('#copyright-year') && ($('#copyright-year').textContent = String(new Date().getFullYear()));
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionQuery.matches) {
  const obs = new IntersectionObserver(entries => entries.forEach(e => {if (e.isIntersecting) {e.target.classList.add('visible');obs.unobserve(e.target);}}), {threshold: .1, rootMargin: '0px 0px -15px 0px'});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
} else {document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));}
document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('motion-paused',document.hidden));

// The public site only fetches read-only status from public APIs; never expose credentials here.
const mcStat = $('#mc-network-status');
const mcOnline = $('#mc-online');
const discordStat = $('#discord-online');
const discordCard = $('#discord-panel-count');
const serverAddress = $('#server-address');
const ipButton = $('#copy-ip');
const feedback = $('#connect-feedback');
const validHost = (s) => typeof s === 'string' && /^[a-zA-Z0-9._-]+(?::[0-9]{1,5})?$/.test(s) && s.length < 260;
const hostIp = (typeof cfg.minecraftIp === 'string' ? cfg.minecraftIp.trim() : '');
if (validHost(hostIp)) {
  if (serverAddress) serverAddress.textContent = hostIp;
  if (feedback) feedback.textContent = 'Copia la IP, abre Minecraft Java Edition y añádela en Multijugador.';
  if (ipButton) ipButton.disabled = false;
}
ipButton?.addEventListener('click', async () => {
  if (!validHost(hostIp)) return;
  try {await navigator.clipboard.writeText(hostIp);ipButton.textContent='Copiada';if(feedback)feedback.textContent='Dirección copiada. Ya puedes pegarla en Minecraft.';}
  catch {if(feedback)feedback.textContent=`Copia esta dirección manualmente: ${hostIp}`;}
});
const refreshMs = Math.max(60, Number(cfg.refreshSeconds) || 90) * 1000;
async function requestJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);
  try {const response=await fetch(url, {signal:controller.signal, cache:'no-store'});if(!response.ok)throw Error(`HTTP ${response.status}`);return await response.json();} finally {clearTimeout(timeout);}
}
async function refreshMinecraft() {
  if (!mcStat || !mcOnline) return;
  const named = Array.isArray(cfg.servers) ? cfg.servers.filter(s=>s && validHost(s.host)) : [];
  const hosts = [...new Set(named.length ? named.map(s=>s.host) : validHost(hostIp) ? [hostIp] : [])];
  if (!hosts.length) return;
  const responses = await Promise.all(hosts.map(async host => {try{return await requestJson(`https://api.mcstatus.io/v2/status/java/${encodeURIComponent(host)}?query=false`)}catch{return null}}));
  if (responses.every(r=>r===null)) {mcStat.innerHTML='<i class="status-dot unknown" aria-hidden="true"></i> No disponible';mcOnline.textContent='—';return;}
  const online = responses.filter(r => r?.online === true);
  mcStat.innerHTML = online.length ? '<i class="status-dot online" aria-hidden="true"></i> En línea' : '<i class="status-dot offline" aria-hidden="true"></i> Sin conexión';
  const players = online.reduce((sum,r)=>sum + (Number.isFinite(Number(r?.players?.online))?Number(r.players.online):0),0);
  mcOnline.textContent = online.length ? String(players) : '0';
}
async function refreshDiscord() {
  if (!discordStat && !discordCard) return;
  const id = String(cfg.discordGuildId || '').trim();
  if (!/^\d{17,22}$/.test(id)) return;
  try {const data=await requestJson(`https://discord.com/api/guilds/${id}/widget.json`);const number=Number(data?.presence_count);if(!Number.isFinite(number))throw Error('Sin datos');if(discordStat)discordStat.textContent=String(number);if(discordCard)discordCard.textContent=`${number} conectados`;}
  catch {if(discordStat)discordStat.textContent='No disponible';if(discordCard)discordCard.textContent='No disponible';}
}
async function refreshStats() {if(document.hidden)return;await Promise.allSettled([refreshMinecraft(), refreshDiscord()]);}
refreshStats();setInterval(refreshStats,refreshMs);
if(cfg.discordInvite && /^https:\/\/discord\.(gg|com)\//.test(cfg.discordInvite)){
  document.querySelectorAll('a[href="https://discord.gg/GJRXZk8jEn"]').forEach(a=>a.href=cfg.discordInvite);
}
