# Telectrich: reglas de esta rama (`cliente/telectrich`)

Esta skill se suma a las de AstroWind y manda sobre ellas cuando chocan. Las skills originales no se editan: así se pueden traer cambios de `upstream` sin conflictos.

## Marca (fuente: brand kit de Telectrich, estado aprobado)

- Colores: solo los tokens de `src/components/CustomStyles.astro`. Nunca hex en componentes.
- El amarillo `#FFCB08` es acento: no va como fondo de bloques grandes ni como texto sobre blanco. Sí como texto sobre `#101F2C`.
- Tipografía: IBM Plex Sans (400, 600) e IBM Plex Mono (500), WOFF2 local en `src/assets/fonts/`, cargadas con `fontProviders.local()`. Prohibido Google Fonts o `fontsource` remoto. `styling.md` explica Google Fonts: ignorar esa sección. Falta Sans 700 del brand kit; los títulos usan 600 hasta que se agregue el archivo.
- Logo: `public/logo/TLT_H_Color.png` (fondo claro) y `TLT_H_Diapo.png` (fondo oscuro), en `Logo.astro`. No redibujar.

## Contenido

- Nada inventado. Los widgets `Testimonials`, `Stats`, `Pricing`, `Team`, `Brands`, `SocialProof`, `Quote` y `Projects` traen datos de muestra: se usan solo con datos reales del cliente; si no los hay, la sección no va.
- Los textos de página vienen de los copies aprobados del proyecto, no de los demos.
- Una sola `<h1>` por página y `alt` real en cada imagen (como en `use-widgets.md`).

## SEO y redirecciones

- `config.yaml` (`site`, `metadata`, `openGraph`) con datos reales de Telectrich. Nunca el código de verificación de Search Console de otra persona.
- URLs finales y redirecciones 301 siguen el mapa de P008 T4 del vault. Si el blog entra: `/blog/%slug%` y sin rutas `category/` ni `tag/` (`disable-blog.md` permite apagarlas por separado).
- `add-structured-data.md`: completar `Organization` con logo y `sameAs` reales; `LocalBusiness` solo con datos verificados.
- No agregar analítica ni embeds de terceros sin consentimiento definido.

## Formularios

`configure-contact-form.md` es obligatoria: el formulario no sale a producción sin backend probado y sin aviso de privacidad enlazado.

## Verificación antes de dar algo por terminado

1. `npm run build && npm run check`.
2. Playwright CLI sobre `npm run preview`: ver la página a 375 y 1280 px, en claro y oscuro (si el oscuro sigue activo), sin errores en consola ni recursos remotos de fuentes.
3. Lighthouse móvil: CWV ≥ 90 en cada plantilla de página nueva.
4. Si hay redirecciones: comprobar cada 301 del mapa contra el build.
