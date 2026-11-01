/* Berlin Network · configuración pública (nunca colocar tokens ni secretos aquí).
   Las modalidades se consultan mediante direcciones independientes.
   El total de la red es Survival + Box PvP; la IP general NO se suma.
   Los servidores aún están en desarrollo y pueden aparecer desconectados.
*/
window.BERLIN_CONFIG = Object.freeze({
  minecraftIp: 'berlin.hidenplay.net',
  discordGuildId: '1566195525961785505',
  discordInvite: 'https://discord.gg/UeGzQjRebw',
  modalities: {
    survival: { name: 'Survival', host: 'survival-b.hidenplay.net' },
    box: { name: 'Box PvP', host: 'boxpvp-b.hidenplay.net' }
  },
  refreshSeconds: 90
});