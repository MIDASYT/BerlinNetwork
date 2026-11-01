/* Berlin Network · configuración pública (nunca colocar tokens ni secretos aquí).
   Se requiere la DIRECCIÓN DE CADA SERVIDOR para contar por modalidad.
   Los registros Survival y Box PvP están en desarrollo, por eso host=null.
   Cuando existan dos destinos consultables públicamente, rellenar host:
   survival: { host: 'direccion-real-de-survival:puerto' },
   box:      { host: 'direccion-real-de-box:puerto' }
   No utilizar berlin.hidenplay.net para las dos modalidades: duplicaría jugadores.
*/
window.BERLIN_CONFIG = Object.freeze({
  minecraftIp: 'berlin.hidenplay.net',
  discordGuildId: '1566195525961785505',
  discordInvite: 'https://discord.gg/GJRXZk8jEn',
  modalities: {
    survival: { name: 'Survival', host: null },
    box: { name: 'Box PvP', host: null }
  },
  refreshSeconds: 90
});