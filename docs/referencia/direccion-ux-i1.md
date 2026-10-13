---
tipo: direccion-ux
cliente: Telectrich
proyecto: P007_web
tarea: T7 · segunda vuelta · autor: ux · estado: aprobado · versión: 2 · fecha: 2026-10-13
brandkit: aprobado (2026-09-29), verificado. Sin cambios al brandkit, a los copies ni al alcance de páginas.
---
# Dirección de diseño UI/UX de I1 (10 páginas): "Tablero que se energiza"

Reemplaza la v1. Se mantiene de la v1: estructura por página, formulario, banner de cookies y accesibilidad. Cambian el movimiento (§2), el hero y el ritmo de cada página. Las tres direcciones A/B/C se retiran: el operador eligió C (2026-10-13).

Fuentes: `CONTEXTO.md`, `brandkit.md`, `design.md`, `ficha-tecnica.md` v2, `docs/decisiones.md` (filas 2026-10-13), `PRD.md`, `revision-insumos-i1.md`, copies de `P002_web/sitemap-copy/copies/`, guías `emil-design-eng` y `animate`, y las 33 fotos de `Pictures\Telectrich\Tableros` (abiertas todas) más `Timeline.png`. El Encargo llegó con fragmentos cortados: lo reconstruido está en "Supuestos". Sin cifras nuevas ni estudios citados: es criterio de oficio.

Avisos de la sesión principal (fuera del diseño):
- 6 fotos muestran nombres de clientes, IP de red o placas de otro fabricante (§6).
- `marcas/` tiene 8 logos SVG (más un PNG de Legrand), no 10: faltan Cisco y Emerson.
- El contrato de `whatsapp_click` de la ficha §8 no tiene el valor `barra`; se necesita para el WhatsApp de la barra fija.
- `Timeline.png` es una referencia en inglés con colores turquesa y morado, ajena a la marca: solo se toma su estructura (riel con nodos numerados y tarjetas).

## 1. Decidido (no se reabre)
- Marca: IBM Plex Sans/Mono; `#101F2C` noche, `#152C3D` noche-2, `#FFCB08` acento, `#F3F6F8` fondo, `#586A78` cuerpo, `#E3E8EC` borde; radio 6 px. Una palabra amarilla por título. Amarillo nunca como texto sobre claro ni como bloque grande.
- Dirección C: bandas alternadas (noche / blanco / fondo). Botón amarillo con texto noche sobre fondos oscuros; botón noche con texto blanco sobre claros (axe lo valida). Barra fija inferior en celular con "Cotizar" + WhatsApp; ahí el flotante de WhatsApp se oculta. El "Cotizar" del header va a `/contacto/` aunque no haya formulario.
- Astro estático. Islas con GSAP solo en 3 piezas (§2). El resto, CSS y view transitions. JS propio ≤30 KB gz por página sin contar GSAP; LCP <2,5 s; CLS <0,1. Sin cifras animadas: "desde 2013" va fijo.
- Menú: Inicio, Soluciones, Servicios de terreno, Empresa, Contacto. En I1 ningún enlace va a páginas de I2 (O1). Cookies: sección dentro de `/privacidad/` (`#cookies`). Gama (O8): alta = componentes premium de alta calidad del mercado, de mayor costo; media y económica, en proporción.
- Imágenes: propias de `Pictures\Telectrich\Tableros`. NO se usa `clientes/` (logos de clientes, sin permiso). Los logos de `marcas/` sí.

## 2. Sistema visual y capa de movimiento
**Idea.** El sitio se comporta como un tablero que se energiza. El diagrama unifilar, la canaleta ranurada y las etiquetas de marcaje, tres cosas que ya salen en las fotos reales, pasan a ser el lenguaje visual.
**Motivos fijos (CSS, sin JS):**
- Canaleta: en bandas noche, `repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 6px, transparent 6px 14px)`, estática.
- Etiqueta de marcaje: rótulos y números como etiquetas amarillas (`#FFCB08`, texto noche, Plex Mono 500, 13 px, radio 2 px), como los tags CB-01 de las fotos.
- Números de solución en Plex Mono de 64–88 px; "desde 2013" en 96 px SemiBold. Saltos de tamaño de 3x o más. Layout asimétrico 2/3 + 1/3 y tarjetas de la columna derecha desfasadas 48 px.
- Texto sobre noche: blanco y blanco al 72 % (derivado, no es color nuevo). `#586A78` solo sobre claro (≈5:1 sobre `#F3F6F8`, estimado; confirmar con axe).
**Reglas de movimiento.** Todo movimiento es `transform`/`opacity`/`clip-path`. Entrada: `ease-out` (`--ease-out: cubic-bezier(0.23,1,0.32,1)`; en GSAP `expo.out`). Scrub: lineal. UI ≤300 ms; las 3 piezas de marca pueden llegar a 1 s. Nunca `scale(0)` ni `ease-in`. Cada pieza se juega una vez por sesión (`sessionStorage`, con try/catch) y no se repite al volver. Los textos, los CTA y el LCP no esperan ninguna animación.
**Estados finales.** Los estados iniciales ocultos solo existen con `html.js` y `@media (prefers-reduced-motion: no-preference)`; sin JS o con reduced-motion se ve el estado final:

| Pieza | Sin JS / reduced-motion |
|---|---|
| 1 Hero unifilar | Diagrama completo, opacidad .16, sin pulso |
| 2 Línea FAT→SAT | Riel completo en amarillo, 5 nodos activos, tarjetas apiladas planas (sin sticky), botón final con anillo estático |
| 3 Tarjetas | Foto sin recorte, número final "01", viñetas visibles; hover solo cambia color/línea, sin zoom |
| CSS (badges, parallax, barrido) | Etiquetas visibles; foto fija; el barrido pasa a cambio de color instantáneo |

### Pieza 1 · Hero unifilar (isla GSAP, solo Home)
- Qué: diagrama unifilar SVG detrás del H1: fuente → interruptor general → barra horizontal → 4 ramales, que son las 4 soluciones (símbolos: protección, PLC, pantalla HMI, switch). Líneas de 1,5 px (`vector-effect: non-scaling-stroke`), `pathLength=1`, `aria-hidden`. Rótulos "01 FUERZA…" en Mono, solo ≥1024 px.
- Cuándo y cómo: al cargar, con el texto ya visible. Fuente→barra 0,6 s `expo.out`; barra 0,8 s; ramales con retraso de .12 s cada uno (0,6 s) con su símbolo apareciendo (0,25 s). Un pulso amarillo recorre la barra (0,9 s, lineal) y cada ramal se enciende al 100 % durante 0,3 s. Todo se asienta en opacidad .16 en 0,6 s. Total ≈2,6 s, una vez, sin bucle.
- Seguridad: el SVG llega en estado final desde el servidor; con `html.js` parte "sin dibujar". Si la isla no hidrató a los 1,5 s, un script inline lo pasa al estado final.
- Contraste: el texto blanco queda sobre amarillo .16 sobre noche, por encima de 12:1.
- Otras páginas: versión estática del mismo SVG que se dibuja con CSS (`stroke-dashoffset`, 1,2 s, `ease-out`) y con el ramal de esa página iluminado. 0 JS. Si el costo de isla molesta, esta pieza baja a CSS puro con el mismo resultado; lo decide `fullstack` al planificar.

### Pieza 2 · Línea FAT → SAT (isla GSAP + ScrollTrigger, solo Servicios de terreno)
- Qué: un riel vertical de 2 px con 5 nodos numerados (Plex Mono sobre círculo amarillo): FAT·IFAT (Fábrica), SAT·CAT (Terreno), Pre-comisionamiento, Comisionamiento, Puesta en marcha. Estructura tomada de `Timeline.png` (riel a la izquierda, nodo, tarjeta), con la paleta, el radio y los bordes de la marca, sin sombras.
- Dónde termina: el riel baja hasta el CTA y termina en el botón "Conversemos", que es el nodo final y reemplaza la banda final. El botón "se energiza" una sola vez: anillo `box-shadow 0 0 0 6px rgba(255,203,8,.35)`→0 en 600 ms.
- Cómo se mueve: `scaleY(0→1)` con scrub .3 mientras la sección cruza (start "top 60%", end "bottom 70%"). Cada nodo, al ser alcanzado, se rellena de amarillo (200 ms) y su tarjeta pasa de opacidad .55 a 1. Su etiqueta de marcaje "ETAPA n" se revela con `clip-path` en 220 ms.
- Las 3 etapas "se fijan una a una" con `position: sticky` de CSS (tarjetas apiladas, `top: calc(64px + 16px + n*20px)`), de modo que cada una deja visible la franja de la anterior. Sin pin ni scroll-snap (no secuestra el scroll). Celular: sin sticky, riel a la izquierda y tarjetas en columna. La línea se dibuja igual.
- Sin JS o con reduced-motion: ver la tabla de estados finales.

### Pieza 3 · Tarjetas de soluciones (isla GSAP, Home y Hub)
- Revelado: foto por recorte, `clip-path: inset(0 100% 0 0)`→`inset(0)` en 700 ms `expo.out`. La imagen interior baja de `scale(1.08)` a 1 en 900 ms. Entra al 85 % del viewport, una vez; retraso de .1 s entre tarjetas.
- Número como display: "01"…"04" en Plex Mono; cada dígito es una columna 0–9 que rueda (`translateY`) en 450 ms `expo.out`, con la tarjeta ya visible (retraso .15 s). El texto real ("01") queda para lectores de pantalla; la columna es `aria-hidden`. Es un índice, no una cifra de negocio.
- Hover (solo `@media (hover:hover) and (pointer:fine)`): zoom de foto a 1,04 en 500 ms `ease-out` y línea amarilla bajo el título con `scaleX(0→1)` desde la izquierda en 240 ms. El foco por teclado produce la misma línea. La tarjeta entera es el enlace (stretched link).
- Pesos: GSAP core + ScrollTrigger solo en estas islas, cargados con `client:visible`. Peso sin dato verificado: se mide en T21.

### Movimiento en CSS (0 JS)
- **Badges de normas** (RIC N°2, IEC 61439, FAT, IFAT, SAT, CAT; sin "certificado"): etiquetas de marcaje que se "imprimen" con `clip-path` de izquierda a derecha en 220 ms `ease-out`, con retraso de 60 ms entre ellas. Solo con `@supports (animation-timeline: view())`; si no, aparecen estáticas.
- **Parallax sutil** en las fotos de banda (máx. ±16 px, `translateY` con `animation-timeline: view()`). No va en la foto LCP del hero. Solo `@supports`.
- **Barrido en el botón:** sobre claro, el botón noche recibe un `::before` amarillo con `scaleX(0→1)` desde la izquierda en 220 ms y el texto pasa a noche. Sobre noche, el botón amarillo recibe un barrido blanco. Solo con hover real. El botón "Enviar" del formulario no lleva barrido.
- **View transitions:** CSS nativo `@view-transition { navigation: auto }`, 200 ms. `view-transition-name` en header y barra inferior para que no parpadeen. Si la ClientRouter de Astro cabe en el presupuesto de JS, es equivalente; recomiendo la nativa (0 JS, no reinicia islas). Sin soporte, navegación normal. Reduced-motion: `::view-transition-group(*){animation:none}`.
- **Entradas de sección:** solo fundido de 200 ms con `animation-timeline: view()`. Franja de marcas y FAQ sin movimiento propio salvo ese fundido. Nada se mueve en el formulario ni en el banner de cookies (ni siquiera su aparición).
- **Islas sin React (recomendación):** Astro `<script>` + GSAP, hidratado con `IntersectionObserver`. El runtime de React se contaría como JS propio y se come el presupuesto de 30 KB. Si `fullstack` usa React, tiene que medirlo.

## 3. Componentes transversales
**Header.** 64 px, noche sólido, sticky. Logo `TLT_H_Diapo.png`, menú, "Cotizar" amarillo a la derecha. En celular: logo + "Cotizar" (44 px) + botón de menú (44 px); el panel se despliega con `clip-path` en 200 ms. `scroll-padding-top` igual al header.
**Barra fija (<768 px).** Alto 56 px + `env(safe-area-inset-bottom)`, fondo noche. Dos botones: "Cotizar" (amarillo, a `/contacto/`) y "WhatsApp" (borde blanco, ícono). Se esconde mientras el CTA del hero o la banda final están a la vista (IntersectionObserver) con `translateY(100%)` en 200 ms; con reduced-motion, solo fundido. Sin JS queda siempre visible. No aparece en `/contacto/` ni en `/privacidad/`. El `body` reserva su alto siempre (CLS 0). Ubicación nueva `barra` para `whatsapp_click`.
**Flotante de WhatsApp.** Solo ≥768 px, abajo a la derecha; se oculta con la banda final o el footer a la vista. El banner de escritorio va a la izquierda, así que no chocan.
**Botón.** 48 px de alto (mín. 44). Amarillo sobre noche; noche sobre blanco y `#F3F6F8`. Foco de 3 px, offset 2 px: amarillo sobre noche, `#152C3D` sobre claro. El secundario es de borde (WhatsApp).
**Banner de cookies.** Fijo abajo, sin animación. Celular: ancho completo, máx. 30 % del alto, **encima de la barra**. Escritorio: tarjeta de 420 px a la izquierda. "Aceptar" y "Rechazar" idénticos (borde `#152C3D`, mismo tamaño y peso; ninguno amarillo). Enlace a `/privacidad/#cookies`. Va primero en el DOM tras "Saltar al contenido". Con el banner abierto, `scroll-padding-bottom` = barra + banner, para que el foco no quede tapado (SC 2.4.11).
**Footer.** `#152C3D`: Privacidad, "Preferencias de cookies", contacto, "© Telectrich · Una empresa de AT Ingeniería", AT Ingeniería SpA RUT 76.303.133-0.
**Formulario** (v1 vigente). Una columna, etiqueta visible arriba, 44 px de alto, texto 16 px. Orden: Nombre · Correo · Área · Gama · (teléfono, empresa, ubicación, mensaje, adjunto) · consentimiento · botón. "(opcional)" en los no obligatorios. Selects nativos. Adjunto con botón (sin arrastrar), tipos y 10 MB visibles. Errores junto al campo con `aria-live="polite"`, ícono más texto. Éxito: el panel reemplaza al formulario y recibe el foco. `<noscript>` con WhatsApp, teléfono y correo. Sin movimiento.
- **Ayuda de Gama (propuesta de copy para aprobación del operador y de Gustavo):** "Alta usa componentes premium de alta calidad del mercado y cuesta más; Media y Económica bajan en esa proporción." Va bajo el campo como texto de 14 px, ligado con `aria-describedby`.

## 4. Páginas (bloques en orden · fondo · movimiento y técnica · foto)
Alternancia: nunca dos bandas iguales seguidas; hero y banda final en noche. Cada hero lleva el CTA a la vista en 360×640 (H1 de 32 px en celular). El copy es el de `P002_web/sitemap-copy/` ajustado por T6; aquí no hay textos nuevos. Nombres de archivo nuevos en §6.

### 1 · Inicio `/` (Persuadir)
1. Hero · noche + canaleta · pieza 1 (isla). H1 izquierda, bajada con palabra acento "precisión", [Conversemos] amarillo + [WhatsApp] borde. Columna derecha: foto retrato 4:5 (`plc-s7-1200`, recorte de la fila de PLC y los bornes rotulados). En celular la foto va bajo el CTA. Es LCP en escritorio, con `fetchpriority=high`; en celular el LCP es el H1.
2. Respaldo · blanco · fundido CSS. 2/3 texto + 1/3 "2013" en 96 px con "desde" pequeño, fijo. Las industrias van como una línea de texto sin chips ni enlaces (supuesto).
3. Soluciones · `#F3F6F8` · pieza 3 (isla). Rejilla 2×2 con la columna derecha desfasada. Fotos: 01 `distribucion-schneider`, 02 `control-abb-interior`, 03 `hmi-nema4x` (recorte de puerta con HMI), 04 `switch-emerson`. Todas en recorte 4:3 con IP difuminadas.
4. Marcas · blanco · fundido escalonado CSS. 10 logos monocromo `#586A78` en grilla 5×2 (celular 2×5). No es carrusel, sin enlaces. Faltan Cisco y Emerson (§7).
5. Normativa y pruebas · noche · badges CSS + parallax. Foto `marcaje-frente` a la derecha, con badges debajo y el texto aclarando que son diseños alineados a la norma.
6. Proceso · `#F3F6F8` · riel estático CSS (misma anatomía que la pieza 2, sin scroll). Sin foto.
7. FAQ · blanco · `<details>` nativo; el ícono gira en 180 ms.
8. Banda final · noche · barrido en botón. "Datos rápidos": correo, teléfono, taller, horario.

### 2 · Hub `/soluciones/` (Orientar)
1. Hero corto · noche · unifilar estático con los 4 ramales rotulados.
2. 4 soluciones · blanco · pieza 3 (isla), filas anchas de 1 columna con foto 5/12 y texto 7/12, 3 viñetas cuadradas amarillas. Mismas 4 fotos del Inicio.
3. Cómo trabajamos · `#F3F6F8` · una frase y enlaces a Servicios de terreno y Empresa.
4. Diferenciadores · blanco · fundido.
5. Banda final · noche.

### 3 · Fuerza (Persuadir/leer)
1. Hero · noche · ramal 01 iluminado (CSS). Foto horizontal `fuerza-estructura-taller` con velo noche ~50 %.
2. Definición · blanco.
3. Alcance TDA / TDF · `#F3F6F8` · dos paneles con etiqueta de marcaje "TDA" y "TDF" (revelado `clip-path` CSS). Foto `distribucion-schneider`.
4. Diferenciadores · blanco · alimentación redundante con `redundancia-alimentacion` (alimentación principal, redundante y normal rotuladas) y `sitop-doble-fuente`.
5. Pruebas · noche · badges CSS, enlace a Servicios de terreno.
6. FAQ · blanco · `<details>`.
7. Banda final · noche · "Cotizar tablero de fuerza".

### 4 · Control
1. Hero · noche · ramal 02 iluminado. Foto `control-s7-300` (filas de módulos), recorte 4:3 de dos filas.
2. Definición · blanco.
3. Metodología (5 pasos, si el copy los mantiene) · `#F3F6F8` · riel estático CSS. Sujeto a C4 (Gustavo).
4. Alcance (PLC, I/O, programación, variadores) · blanco · lista con etiquetas Mono. Foto macro `plc-abb-pm564` con parallax.
5. Marcas y diseño · noche · `cableado-terminales` (cable naranja y borneras) o `modulos-io-verdes`, en recorte 16:9.
6. Pruebas · `#F3F6F8`.
7. FAQ · blanco.
8. Banda final · noche · "Cotizar tablero de control".

### 5 · Supervisión
1. Hero · noche · ramal 03 iluminado. Foto `hmi-nema4x` (puerta con HMI y botonera), recorte 4:5.
2. Definición · blanco.
3. Alcance · `#F3F6F8` · lista con etiquetas Mono.
4. Integración · blanco · cierra con enlaces a Control y Comunicaciones.
5. FAQ · `#F3F6F8`.
6. Banda final · noche · "Cotizar sistema de supervisión".
- Pocas fotos: solo hay una limpia. La pantalla HMI encendida (`hmi-pelambres`) está retenida (§6, decisión 1).

### 6 · Comunicaciones
1. Hero · noche · ramal 04 iluminado. Foto `switch-emerson` (vertical), con IP difuminadas.
2. Definición · blanco.
3. Alcance · `#F3F6F8`.
4. Arquitectura campo → control → supervisión · noche · SVG de 3 niveles que se dibuja en 800 ms al entrar a la vista, solo CSS (`stroke-dashoffset`). Sin foto.
5. Valor · blanco.
6. Pruebas · `#F3F6F8`.
7. FAQ · blanco.
8. Banda final · noche · "Cotizar infraestructura de red". Foto de apoyo `comunicaciones-fibra` (fibra amarilla con rótulos), con IP difuminadas.

### 7 · Servicios de terreno `/pruebas-fat-sat-y-comisionamiento/` (Explicar)
Solo 3 bandas, con la línea como protagonista.
1. Hero · noche + canaleta · diagrama estático que se dibuja en CSS. Sin foto (el LCP es el H1).
2. El ciclo · blanco · cadena de chips FAT → IFAT → SAT → CAT con fundido escalonado CSS y la tabla FAT/SAT del copy. Aclarar que SAT se hace solo cuando el proyecto lo requiere, e IFAT según el proyecto.
3. La línea (Fábrica · Terreno · 3 etapas · Por qué importa · CTA) · noche · pieza 2 (isla). Cada nodo con su foto:
   - Nodo 1, FAT·IFAT: par `tdc-001-film` + `interior-plc-ab`, ≤360 px (baja resolución).
   - Nodo 2, SAT·CAT: `terreno-tablero-abierto` (recorte superior 4:3).
   - Nodo 3, Pre-comisionamiento: `terreno-glandulas`.
   - Nodo 4, Comisionamiento: sin foto, solo etiqueta de marcaje.
   - Nodo 5, Puesta en marcha: `terreno-caja-planta`.
   - Terminal: texto de "Por qué importa", el botón [Conversemos] como fin del riel y [WhatsApp] al lado. Este botón reemplaza a la banda final.

### 8 · Empresa (Confianza)
1. Hero · noche · unifilar estático, sin foto.
2. División de AT Ingeniería · blanco · "desde 2013" en 96 px, fijo.
3. Qué hacemos · `#F3F6F8` · lista de 4 líneas con viñeta cuadrada amarilla.
4. Cómo trabajamos · blanco · riel estático CSS.
5. Dónde estamos y datos (`<dl>`) · `#F3F6F8` · taller de Buin, horario y razón social. Foto `fuerza-estructura-taller` con parallax. Sin mapa embebido (CSP). No decir "taller propio" ni su capacidad.
6. Banda final · noche · "Hablar con Telectrich".

### 9 · Contacto (Convertir)
1. Cabecera compacta · noche · H1, bajada y plazos "respuesta en 1 día · cotización en 48 h".
2. Formulario (izquierda, 7/12) + panel noche de contacto directo (derecha, sticky en escritorio) · blanco.
- Sin barra inferior, sin banda final, sin parallax, sin pieza GSAP. Variante solo WhatsApp: el panel pasa a ser lo primario, con un botón WhatsApp amarillo grande y correo/teléfono/horario; el plazo de 1 día se mantiene.

### 10 · Privacidad (Leer)
1. H1 sobre `#F3F6F8`, sin hero ni banda ni movimiento.
2. Texto en blanco, medida ≤75 caracteres. Índice interno sticky en escritorio. Sección `#cookies` con el botón "Preferencias de cookies".
- Sin barra inferior ni flotante; sí el banner y el footer.

## 5. Accesibilidad y desempeño de la capa de movimiento
- `prefers-reduced-motion: reduce`: se aplica la tabla de §2. Si hay movimiento de posición se quita; los cambios de color y de opacidad que ayudan a leer se conservan.
- Foco nunca oculto bajo header, barra o banner (§3). Orden de tabulación = orden visual. Las islas no capturan foco.
- Contenido y CTA visibles sin JS. El `<noscript>` y la variante WhatsApp siguen la ficha §9.
- Presupuesto: el JS propio ≤30 KB gz por página excluye GSAP; por página, como máximo 2 islas (Inicio: 1 y 3; Hub: 3; Servicios: 2). Soluciones, Empresa, Contacto y Privacidad: 0 islas. Lighthouse celular ≥90 (ficha §10).

## 6. Fotos: asignación y reparos (33 en `Tableros/` + `Timeline.png`)
Nombres nuevos sin cliente al copiar a `src/assets/img/`. Recortes de verticales a 4:5 o 4:3 según cada pieza. Todas con `alt` descriptivo sin nombre de cliente; los pies dicen "cliente del sector minero" o van sin pie (P8).
**Usar**
- `PLC-Siemens-Pelambres` → `plc-s7-1200`: hero Inicio, recorte 4:5.
- `Gabinete-de-distribucion-chuquicamata` → `distribucion-schneider`: Inicio 01, Fuerza alcance.
- `Terminaciones` / `Terminaciones-1` → `terminaciones-cableado`: Fuerza (quedarse con una; parecen la misma toma, verificar).
- `Gabinete-de-fuerza` → `fuerza-estructura-taller` (1013×954, bastidores y barras en fabricación): hero Fuerza y Empresa.
- `DCS-Rosemount-Pelambres` → `redundancia-alimentacion`: Fuerza, recorte superior 16:9; difuminar IP de los rótulos de switches.
- `Gabinete-alimentacion-redundante` → `sitop-doble-fuente`: Fuerza.
- `Gabinete-de-control` → `control-s7-300`: hero Control.
- `Gabinete-de-control-ABB-Albemarle` → `control-abb-interior`: Inicio 02, Control.
- `PLC-ABB` → `plc-abb-pm564`: Control macro. `CPU-Simotions-D` → `simotion-sinamics`: reserva Control.
- `IMG_0010` → `modulos-io-verdes` (horizontal 16:9): Control. `2c655ab8…` → `cableado-terminales`: Control.
- `Gabinete-indice-nema-4x` → `hmi-nema4x` (placa de AT visible): hero Supervisión e Inicio 03.
- `Switch-Emerson` → `switch-emerson`: hero Comunicaciones e Inicio 04, difuminar IP. `Gabinete-de-comunicaciones` → `comunicaciones-fibra`: Comunicaciones, difuminar IP.
- `Marcaje-de-gabinetes-02` → `marcaje-frente`: Inicio Normativa.
- Terreno: `IMG_6388` → `terreno-tablero-abierto`, recorte superior 4:3 (sin la espuma rosa de abajo); `35e486ba…` → `terreno-caja-planta`; `c6a3ad99…` → `terreno-glandulas`.
- FAT: `65b47c3e…` → `tdc-001-film` (720×1280, con film plástico; sirve como "antes del despacho"); `f03d920b…` → `interior-plc-ab` (720×1280). Ambas de baja resolución: mostrar ≤360 px, o reemplazar si llega algo mejor.
**Retener hasta confirmar** (no publicar así)
- `Gabiente-de-distribucion-y-control-ER2` y `HMI-Siemens-Pelambres`: llevan placas "Schaffner S.A., tableros y ferretería eléctrica industrial" (otro fabricante), tarjetas de bloqueo con nombres escritos a mano y una pegatina de pre-comisionamiento de un proyecto. Nadie debe leerlas como tableros fabricados por Telectrich sin confirmarlo con Gustavo.
- `HMI-Pelambres`: pantalla HMI encendida, con el logo de otro cliente (Hidropack) y tags de proceso. Es la mejor foto de Supervisión; necesita permiso.
**Con reparo**
- `Gabinete-autosoportado`: puerta casi vacía y franja superior con "N° PLANO CODELCO"; solo sirve recortada, bajo valor.
- `3b1c815b…` (fuente Allen-Bradley, vertical 960×1280): reserva de detalle.
- `Sistema-de-control-descentralizado`: gran angular deformada, baja resolución; reserva.
- `Fuente-redundante`: está girada 90°; girar antes de usar, y difuminar IP. `switch-fibra-1`: IP visible y media imagen vacía (sirve como espacio de texto).
- `IMG_6388`: autoría por confirmar (equipo antiguo, instalación de campo).
**Descartar**
- `IMG_1682` (640×480, patio desordenado) y `gabinete-dcs` (772×631).
- `20160518_150354`: caja de despacho con rótulos legibles de cliente y faena. Los pictogramas de manejo se redibujan como SVG.
- Todo lo de `clientes/`.
- `Timeline.png`: referencia de estructura, no se publica.
- Marcas: 8 SVG en `marcas/`; se renderizan monocromo.

## 7. Criterios de aceptación (sí/no)
1. Contraste ≥4,5:1 en texto y ≥3:1 en controles con axe, sobre cada fondo (noche, blanco, `#F3F6F8`), incluidos botón amarillo/noche y el texto blanco al 72 %.
2. 0 problemas graves o críticos en axe, 10 páginas, escritorio y celular.
3. Con `prefers-reduced-motion: reduce`, ninguna pieza se mueve (tabla de §2) y la página se usa igual.
4. Con JS desactivado se ven contenido, CTA, riel completo, fotos y badges en su estado final.
5. Ningún texto, H1 ni CTA espera a una animación; el hero muestra el H1 y el CTA desde el primer render.
6. LCP <2,5 s y CLS <0,1 en celular, con y sin banner abierto, en Inicio y Servicios de terreno (criterio T21).
7. JS propio ≤30 KB gz por página sin GSAP, como máximo 2 islas por página y 0 en Soluciones, Empresa, Contacto y Privacidad.
8. Las islas hidratan con `client:visible` o `IntersectionObserver`; el INP queda <200 ms.
9. Recorrido solo con teclado: header, menú, barra, banner y formulario con foco visible de 3 px y nunca oculto (SC 2.4.11).
10. CTA primario visible sin scroll en 360×640 en Inicio, las 4 soluciones y Servicios de terreno; cada página (salvo Privacidad) tiene acceso a contacto en ≤2 toques.
11. En celular hay barra inferior ("Cotizar" + WhatsApp), el flotante está oculto, el banner queda encima de la barra y la barra no aparece en `/contacto/` ni `/privacidad/`.
12. Nada se mueve en el formulario ni en el banner de cookies; el botón "Enviar" no lleva barrido.
13. El "Cotizar" del header lleva a `/contacto/`, también en la variante solo WhatsApp.
14. Ninguna imagen publicada muestra nombres de clientes, IP de red ni placas de otro fabricante.
15. Todo enlace del menú, footer y contenido va a una página de I1.
16. Controles ≥44×44 px y separación suficiente entre "Aceptar" y "Rechazar".
17. Ningún texto amarillo sobre fondo claro; solo colores y fuentes del brandkit (más el blanco al 72 % derivado).
18. Todas las imágenes tienen `alt` (decorativas `alt=""`); los números de las tarjetas son legibles por lectores de pantalla.

## Hechos / supuestos / decisiones
**Hechos.** Todo lo de §1; 8 logos de marca en `marcas/`; Timeline.png ajeno a la marca; fotos con rótulos de terceros listadas en §6.
**Supuestos.**
- El Encargo llegó cortado: se reconstruyó que el hero unifilar es solo de Inicio (en las demás páginas es CSS) y que la línea FAT→SAT termina en el CTA. Esas dos decisiones son del agente.
- Pieza 3 se aplica también al hub, y las cinco etapas de la línea son FAT·IFAT, SAT·CAT y las tres de puesta en marcha.
- La tabla FAT/SAT del copy de Terreno se reubica en el bloque "El ciclo" y la banda final de Servicios de terreno se fusiona con el nodo final; los textos no cambian, `fullstack` lo valida.
- Las industrias en Inicio quedan como texto sin enlaces.
- Los 5 pasos de Control y Proceso dependen de C4 y del copy final.
- Nuevo valor `barra` para `whatsapp_click`: lo aprueba arquitecto o fullstack y se refleja en la ficha §8.
- Contraste de `#586A78` (≈5:1) y del blanco al 72 % son estimaciones; axe decide.
- Pesos de GSAP y de React: sin dato verificado hoy; se miden en T21.
- La ClientRouter de Astro y las view transitions nativas: sin dato verificado hoy.
- `fuerza-estructura-taller` no muestra capacidad ni se publica como tal.
**Decisiones realmente abiertas (3).**
1. **Fotos con rótulos de terceros.** ¿Telectrich fabricó los tableros con placa Schaffner S.A. (ER2/TDC-0002), y autoriza el cliente la pantalla HMI con su logo (Hidropack)? Recomendado: no usarlas hasta que Gustavo confirme autoría y permiso; mientras, Supervisión sale con `hmi-nema4x` solo.
2. **Logos de Cisco y Emerson.** Faltan en `marcas/`. Recomendado: conseguir SVG oficiales para completar los 10 del copy; si no llegan, la franja sale con 8 y el copy deja de decir "10".
3. **Fotos de terreno y de comisionamiento.** Servicios de terreno depende de 3 fotos de campo (una de autoría por confirmar) y de 2 de baja resolución. Recomendado: pedir a Gustavo 2–3 fotos de puesta en marcha, sin rótulos de cliente, o aceptar que el nodo 4 quede sin foto.
