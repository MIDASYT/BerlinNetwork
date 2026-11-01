# Berlin Network — Web oficial

Web estática de una sola página lista para GitHub Pages. Usa Inter y Libre Baskerville, las mismas familias tipográficas de la web de Auric Turrets. Sin frameworks, sin backend y sin tokens de acceso. No incluye secciones publicitarias, noticias o anuncios.

## Publicación

Repositorio: `MIDASYT/BerlinNetwork`. GitHub → Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

## Información establecida

- IP de conexión: `berlin.hidenplay.net`
- Discord ID: `1566195525961785505`
- Invitación Discord: `https://discord.gg/GJRXZk8jEn`
- Survival y Box PvP aún están en desarrollo.
- En la web aparecen todos los apartados, incluyendo el reglamento entero, desplazándose verticalmente. El menú navega por anclas.
- El primer screenshot se utiliza íntegro en el área de lobby/modalidades, nunca como fondo. Los otros tres alternan de forma suave en la portada, sin segunda animación de salida.

## Estado de la red

El sitio consulta `mcstatus.io` para verificar la IP principal y cada modalidad pública, y el widget público de Discord para su contador de conectados. La consulta a Discord requiere activar el **widget del servidor** en los ajustes de Discord. Si no está habilitado, se muestra «No disponible».

**Dato que todavía no puede resolverse automáticamente:** las direcciones de acceso público de Survival y Box PvP por separado. No existe una API global de Auric Network. En `site-config.js`, `modalities.survival.host` y `modalities.box.host` deben completarse cuando estén disponibles las direcciones o puertos de consulta de cada servidor. **No introducir la IP pública general en ambos campos**: sumaría duplicados. La web nunca inventa cifras: muestra «En desarrollo» hasta que las modalidades estén configuradas, y solo calcula el total al contar ambos servidores.

## Recursos

- `index.html`: web completa, reglamento incluido.
- `reglas.html`: redirige enlaces antiguos al reglamento dentro de la página principal.
- `styles.css`: diseño y animaciones.
- `script.js`: menú, fondos, copiar IP y estado.
- `site-config.js`: IP, Discord y direcciones de modalidades cuando estén disponibles.
- `assets/`: recursos aportados para Berlin Network.

No es necesario ejecutar scripts de compilación ni introducir claves.