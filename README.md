# Berlin Network — Web oficial

Web estática de una sola página lista para GitHub Pages. Usa Inter y Libre Baskerville, las mismas familias tipográficas de la web de Auric Turrets. Sin frameworks, sin backend y sin tokens de acceso. No incluye secciones publicitarias, noticias o anuncios.

## Publicación

Repositorio: `MIDASYT/BerlinNetwork`. GitHub → Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

## Información establecida

- IP de conexión: `berlin.hidenplay.net`
- Discord ID: `1566195525961785505`
- Invitación Discord: `https://discord.gg/UeGzQjRebw`
- Survival y Box PvP aún están en desarrollo.
- En la web aparecen todos los apartados, incluyendo el reglamento entero, desplazándose verticalmente. El menú navega por anclas.
- El primer screenshot se utiliza íntegro en el área de lobby/modalidades, nunca como fondo. Los otros tres alternan de forma suave en la portada, sin segunda animación de salida.

## Estado de la red

El sitio consulta `mcstatus.io` para verificar la IP principal y cada modalidad pública, y el widget público de Discord para su contador de conectados. La consulta a Discord requiere activar el **widget del servidor** en los ajustes de Discord. Si no está habilitado, se muestra «No disponible».

**Direcciones configuradas:** Survival = `survival-b.hidenplay.net`; Box PvP = `boxpvp-b.hidenplay.net`. Se consultan por separado y el total de Berlin Network es la suma de sus jugadores conectados, sin contar otra vez la IP principal `berlin.hidenplay.net`. Cuando las modalidades no respondan, la web mostrará el estado correspondiente sin inventar cifras. Al estar todavía en desarrollo, pueden aparecer desconectadas hasta su lanzamiento.

## Recursos

- `index.html`: web completa, reglamento incluido.
- `reglas.html`: redirige enlaces antiguos al reglamento dentro de la página principal.
- `styles.css`: diseño y animaciones.
- `script.js`: menú, fondos, copiar IP y estado.
- `site-config.js`: IP general, Discord y direcciones independientes de ambas modalidades.
- `assets/`: recursos aportados para Berlin Network.

No es necesario ejecutar scripts de compilación ni introducir claves.