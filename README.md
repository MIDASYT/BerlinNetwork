# Berlin Network — Web oficial

Sitio estático, listo para **GitHub Pages**, sin frameworks ni procesos de compilación. Incluye portada animada, imágenes reales de Berlin Network, modalidades, Discord, reglamento completo y consultas opcionales de estado.

## Publicar con GitHub Pages

1. Sube **todos los archivos y la carpeta `assets/`** a la raíz de la rama `main` del repositorio `MIDASYT/BerlinNetwork`.
2. En GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**. Elige `main` y `/ (root)` y guarda.
3. La dirección prevista para un repositorio de proyecto público es `https://midasyt.github.io/BerlinNetwork/` (salvo que ya hayas configurado otro dominio o la URL cambie).
4. Cuando tengas la IP, edita `site-config.js`.

## Configurar información en directo

Abre **`site-config.js`** y define:
- `minecraftIp`: la IP/host y puerto (si no es 25565) que deben copiar los usuarios. Déjalo vacío si no se ha publicado.
- `servers`: lista opcional de servidores para contar jugadores. **No pongas la misma red y sus subservidores a la vez**, ya que produciría duplicados. Si está vacío, se consulta solo `minecraftIp`.
- `discordGuildId`: ID numérico de Discord. Activa antes el **Widget del servidor** en Ajustes del servidor → Widget (los nombres pueden variar). Si no es compatible, el contador dirá «No disponible».
- `discordInvite`: enlace público de invitación al Discord.

Los datos de Minecraft se consultan en `mcstatus.io` y pueden estar cacheados. En Discord se utiliza el widget público oficial (requiere tenerlo activado). **La web no necesita tokens privados, cuentas de pago ni backend.** Las conexiones del navegador dependen de que las APIs permitan CORS. Si alguna API no responde, muestra un estado neutro, nunca inventa usuarios.

## Editar contenido

- `index.html`: portada, modalidades, comunidad y acceso.
- `reglas.html`: reglamento completo. Se mantiene sin la prohibición del griefing; los demás tipos de sanción y duración respetan las reglas indicadas.
- `styles.css`: aspecto, animaciones, responsive y movimiento de fondos.
- `script.js`: navegación, animación por scroll, botón de copiar IP y estado de red.
- `assets/`: cuatro capturas/imágenes proporcionadas por la comunidad, icono y QR.

La primera captura **solo se usa en la sección de modalidades**, no como fondo. Las otras tres imágenes rotan en la portada con desplazamiento horizontal lento; las animaciones se desactivan si el usuario solicita movimiento reducido.

## Privacidad y seguridad

No introduzcas secretos, contraseñas, token de bot o IP de administración en los archivos públicos. GitHub Pages es alojamiento estático. La página solo realiza solicitudes de lectura a servicios públicos.