# Plan de fase 02 — las 10 páginas de I1 sobre AstroWind

Rama base: `cliente/telectrich`. Autor del plan: Claude (diseño e integración). Implementan: workers OpenCode, uno por bloque, coordinados con Orca. Nadie implementa sin este plan.

## 0. Qué se construye y qué no
Recrear el prototipo aprobado de I1 (`docs/referencia/prototipo/`, copia de `repos/telectrich-web/prototipo/`) usando AstroWind: Tailwind 4, widgets y layouts de la plantilla, retocados a la marca. Nivel "alta gama": mucho aire, jerarquía fuerte, fotos reales bien recortadas, movimiento sobrio, cero cosas genéricas de plantilla.

**Fuente de verdad (en este orden):**
1. `docs/referencia/direccion-ux-i1.md` — bandas por página (§4), componentes (§3), movimiento (§2), fotos (§6), criterios (§7).
2. `docs/referencia/prototipo/<ruta>/index.html` — **el texto**. Se porta tal cual, sin reescribir, sin agregar cifras ni datos. Si algo no está ahí, no se inventa: se deja un `TODO` visible y se avisa.
3. `docs/referencia/contacto-copy.md` para el formulario.
4. `.agents/skills/telectrich.md` y el resto de skills de `.agents/skills/` (cómo se arma cada cosa en AstroWind).

**Fuera de alcance:** envío real del formulario (queda el atributo `action` vacío con la variante solo WhatsApp), Sanity, redirecciones 301, medición/GA4, JSON-LD, despliegue, retoque de fotos (difuminar IP; ver §6).

## 1. Decisiones de este plan (por confirmar por el operador)
| # | Decisión | Por qué |
|---|---|---|
| A | **Sin GSAP.** El movimiento se hace con CSS (`@supports animation-timeline`, `view-transition`) y un `<script>` vanilla pequeño, como el prototipo (`site.js` 8 KB). | El prototipo aprobado ya funciona así; GSAP no está instalado ni medido. |
| B | **El texto vive en el frontmatter de cada página `.astro`** como datos tipados (constantes arriba del archivo), no en colección de contenido. | Fase 02 es ver cómo queda. La migración a Sanity (T32) lee esas constantes. |
| C | **Tokens de marca en Tailwind** (`@theme`): `noche #101F2C`, `noche-2 #152C3D`, `acento #FFCB08`, `fondo #F3F6F8`, `cuerpo #586A78`, `borde #E3E8EC`, radio 6 px. Los componentes usan tokens, nunca hex. | Skill `styling` de AstroWind. |
| D | Se reutilizan widgets de AstroWind **solo** cuando encajan sin deformarlos (`FAQs`, `Header`, `Contact`/`Form`, `Brands` como base). Lo demás son componentes propios en `src/components/telectrich/`. | Regla de `use-widgets`: no se forkea un widget por una clase, pero tampoco se fuerza. |

## 2. Reglas para todos los workers
1. Trabajas **solo** en los archivos de tu bloque (§4). Lo compartido (F0) no se edita: si falta algo, escríbelo en `docs/pedidos-f0.md` (una línea: archivo, qué falta, por qué) y sigue con lo demás.
2. Texto: del prototipo, palabra por palabra. Una palabra acento por título (`<mark>`/clase `acento`, amarillo solo sobre noche; nunca amarillo como texto sobre claro).
3. Colores y fuentes: tokens. Fuentes: Plex Sans 400/600, Plex Mono 500 (ya cargadas). Sin Google Fonts, sin CDN, sin imágenes remotas.
4. Una `<h1>` por página, `alt` real en cada imagen (decorativas `alt=""`), CTA principal visible sin scroll en 360×640, controles ≥44 px, foco visible de 3 px.
5. Sin JS no se rompe nada: el contenido y los CTA están en el HTML; los estados iniciales ocultos solo existen con `html.js` y `prefers-reduced-motion: no-preference`.
6. Fotos: solo las de `src/assets/img/` y `src/assets/hero/` (las del prototipo). Con `~/components/common/Image.astro` y `widths`/`sizes`. La foto LCP lleva `fetchpriority="high"`; las demás, lazy.
7. Al terminar: `npm run build && npx astro check` sin errores, y mirar la página a 375 y 1280 px con Playwright CLI (`npx playwright screenshot`). Commit en tu rama con mensaje `P-<bloque>: …`. No hacer push a `cliente/telectrich`; no mergear.
8. Nada de credenciales. Si algo bloquea, escribirlo en `docs/bloqueos-<bloque>.md` y parar esa parte.

## 3. Bloque F0 — fundación (primero, solo; todos los demás dependen de él)
Rama `telectrich/f0`. Entregables:
1. **Assets:** copiar de `C:\Users\alvea\freelance_trabajo\repos\telectrich-web\prototipo\assets\` → `img/` y `hero/` a `src/assets/img/` y `src/assets/hero/`; `marcas/` a `src/assets/marcas/`; `tablero/tablero-armado.html` a `public/tablero/`. Los logos y fuentes ya están.
2. **Tokens:** `@theme` en `src/assets/styles/tailwind.css` (decisión C) + utilidades `acento` (palabra destacada), `etiqueta` (marcaje: fondo acento, texto noche, Mono 500 13 px, radio 2 px), `canaleta` (fondo de bandas noche), viñeta cuadrada amarilla. Escala tipográfica: H1 32 px celular / 56–64 escritorio, números Mono 64–88 px.
3. **Layout `src/layouts/TelectrichLayout.astro`:** envuelve `Layout.astro`; "Saltar al contenido", Header, `<slot/>`, Footer, barra fija, flotante, banner. Prop `bar` (false en Contacto y Privacidad). `@view-transition { navigation: auto }` 200 ms con `view-transition-name` en header y barra; reduced-motion sin animación.
4. **Header** (ajustar `Header.astro`): 64 px, noche sólido, sticky, logo `TLT_H_Diapo.png`, menú de `navigation.ts`, "Cotizar" amarillo; celular: logo + Cotizar + menú, panel con `clip-path` 200 ms.
5. **Footer** (reemplazar `Footer.astro`): `noche-2`, Privacidad, "Preferencias de cookies" (→ `/privacidad/#cookies`), contacto, "© Telectrich · Una empresa de AT Ingeniería", "AT Ingeniería SpA · RUT 76.303.133-0", y, en su propia línea centrada, 12 px, **texto plano sin enlace**: "Diseñado con amor por Norte Studio".
6. **Datos:** `src/data/sitio.ts` con WhatsApp (`https://wa.me/56935935595?text=Hola%2C%20los%20contacto%20desde%20telectrich.cl`), correo `ventas@atingenieria.com`, teléfono `+56 9 3593 5595`, taller (Parcelación Victoria de Viluco, Buin, RM), horario (lunes a viernes 09:00 a 18:00), las 4 soluciones (número, nombre, resumen, ruta, foto) y la lista de marcas — todo tomado de `docs/referencia/prototipo/index.html`.
7. **Componentes en `src/components/telectrich/`** (props simples, tokens, accesibles):
   `Banda` (variante `noche|blanco|fondo`, `canaleta`), `Boton` (primario/secundario/WhatsApp; el color depende de la banda; foco y barrido CSS solo con hover real), `Etiqueta`, `Hero` (variantes: `home` con foto 4:5, `corto` con unifilar, `solucion` con foto y ramal iluminado), `Unifilar` (SVG con `lit` 1–4 y `estatico`; se dibuja con CSS `stroke-dashoffset`), `BandaFinal` (CTA + datos rápidos), `Faq` (`<details>`, ícono que gira 180 ms), `Riel` (proceso estático), `Badges` (normas), `TarjetaSolucion` (número Mono, foto con recorte y revelado, enlace estirado), `ListaAlcance` (etiquetas Mono), `Marcas` (grilla 5×2 monocromo `cuerpo`).
8. **Scripts** `src/scripts/` (vanilla, `html.js` al inicio con script inline): `barra.ts` (oculta barra/flotante con IntersectionObserver), `cookies.ts` (banner Aceptar/Rechazar idénticos, `localStorage` con try/catch, evento `consent` en `dataLayer`, `scroll-padding-bottom`), `carrusel.ts` (hero, pausable, sin autoplay con reduced-motion), `reveal.ts` (revelado de tarjetas), `whatsapp.ts` (`dataLayer.push({event:'whatsapp_click', ubicacion, pagina})`).
9. **Página de muestra** `src/pages/_demos/telectrich-kit.astro` con todos los componentes (para que los demás workers vean cómo se usan; no se publica).
10. **Hecho cuando:** build y check limpios; `/` y `/soluciones/` muestran header, footer, barra y banner correctos a 375 y 1280 px; el kit se ve bien; 0 errores de consola.

## 4. Bloques de páginas (en paralelo, tras F0)
Cada uno parte de `telectrich/f0` en su propia rama y worktree. Bandas, fondos, fotos y movimiento: `direccion-ux-i1.md` §4 y §6.

| Bloque | Rama | Archivos propios | Detalle |
|---|---|---|---|
| **PA · Inicio** | `telectrich/pa` | `src/pages/index.astro` | 8 bandas: hero (H1, bajada con "precisión", Conversemos + WhatsApp, foto `plc-s7-1200` 4:5, unifilar que se dibuja una vez por sesión, **carrusel de 6 fotos** del prototipo pausable), respaldo ("desde 2013" 96 px), 4 soluciones desfasadas con revelado, marcas, normativa + badges + foto `marcaje-frente`, proceso (riel), FAQ, banda final. Incluye la pieza del tablero (`<iframe src="/tablero/tablero-armado.html?embed=1">`, lazy, con la altura que ajusta el script del prototipo). |
| **PB · Soluciones** | `telectrich/pb` | `src/pages/soluciones/*.astro`, `src/components/telectrich/PaginaSolucion.astro` | Hub (hero corto con unifilar de 4 ramales, 4 filas anchas, "cómo trabajamos", diferenciadores, banda final) y las 4 páginas con **una** plantilla `PaginaSolucion` que recibe ramal a iluminar, foto hero y secciones. Control lleva la metodología en riel; Comunicaciones el SVG de 3 niveles que se dibuja con CSS. |
| **PC · Terreno y Empresa** | `telectrich/pc` | `src/pages/pruebas-fat-sat-y-comisionamiento.astro`, `src/pages/empresa.astro`, `src/components/telectrich/LineaFatSat.astro` | Terreno: hero sin foto, "el ciclo" (chips FAT→IFAT→SAT→CAT + tabla), la línea de 5 nodos con riel que se llena por scroll (CSS `animation-timeline` + fallback con IntersectionObserver), tarjetas apiladas con `position: sticky` solo ≥768 px, termina en el botón Conversemos. Empresa: 6 bandas, "desde 2013", `<dl>` de datos, foto con parallax CSS. |
| **PD · Contacto y legales** | `telectrich/pd` | `src/pages/contacto.astro`, `privacidad.astro`, `404.astro`, `410.astro`, `src/scripts/formulario.ts` | Contacto: cabecera compacta, formulario (campos y mensajes de `contacto-copy.md`, validación en cliente con `aria-live`, estado de éxito, `<noscript>` con WhatsApp/teléfono/correo, variante solo WhatsApp cuando `PUBLIC_FORM_ENDPOINT` está vacío) + panel noche sticky. Sin barra inferior ni flotante. Privacidad: texto del prototipo (provisional, marcado), índice sticky, `#cookies` con el botón de preferencias. 404/410 con la marca. |

## 5. Integración (la hago yo)
1. Lanzar F0 → revisar su diff y capturas → mergear a `cliente/telectrich`.
2. Lanzar PA–PD en paralelo desde ese commit (4 worktrees Orca, un agente OpenCode cada uno).
3. Mergear en orden PD, PB, PC, PA (de menos a más acoplado). Los archivos son disjuntos, así que los conflictos esperables son solo `docs/pedidos-f0.md`.
4. Resolver `docs/pedidos-f0.md` yo mismo en un commit "F0.1".
5. **Verificación final:** build y check; Playwright a 375 y 1280 px de las 10 páginas + 404/410; consola sin errores; ninguna petición a dominios externos; una `<h1>` por página; sin clases `dark` activas; Lighthouse móvil en Inicio y Servicios de terreno (meta ≥ 90); recorrido por teclado en header, menú y banner.
6. Se entrega el resultado al operador con capturas y la lista de lo que falta de la §0 y §6.

## 6. Riesgos y huecos conocidos (declarados)
- Fotos con IP de red visibles (`switch-emerson`, `redundancia-alimentacion`, `comunicaciones-fibra`) y SVG de Siemens vacío; Cisco y Emerson sin logo → pendientes del prototipo, no se resuelven aquí. Las fotos retenidas no se usan.
- Privacidad provisional hasta T10; "5 pasos" de Control sujeto a C4 con Gustavo.
- Peso de JS y Lighthouse sin medir hasta la verificación final.
- Si PA resulta demasiado grande para un worker, se parte en componentes (hero, carrusel, tablero) dentro de PA y se compone en `index.astro`; no se divide el archivo entre dos workers.
