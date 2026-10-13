---
tipo: copy
cliente: Telectrich
proyecto: P007_web
pagina: /contacto/
estado: aprobado
revision: 2
reemplaza: P002_web/sitemap-copy/copies/contacto-copy.md (rev. 1, 2026-09-30)
keyword_principal: cotizar tablero eléctrico industrial
title: "Cotización de Tableros Eléctricos Industriales | Telectrich"
meta_description: "Cotiza tableros de fuerza, control, comunicación y supervisión. Escríbenos o llámanos: taller en Buin, lunes a viernes 09:00–18:00."
brief: ../../P002_web/sitemap-copy/briefs/contacto.md
fuentes: P007_web/ficha-tecnica.md §9, docs/decisiones.md (2026-10-13), diseno/direccion-ux-i1.md §3 y §4, docs/revision-insumos-i1.md §9
---

# Copy: Contacto / Cotización (rev. 2)

Cambios frente a la rev. 1: el formulario pide área de desempeño y gama (ya no "solución" ni "sector"), un solo adjunto, correo `ventas@atingenieria.com`, "taller" en lugar de "planta", mensajes de error por caso, texto sin JavaScript y variante solo WhatsApp.

## [SECCIÓN: ENCABEZADO] (cabecera compacta, noche)
**H1:** Cotiza tu tablero eléctrico industrial
**Bajada:** Cuéntanos para qué sector es el tablero y qué gama buscas. Respondemos tu consulta en 1 día y entregamos la cotización en 48 horas, con el suministro y las pruebas claramente definidos.

## [SECCIÓN: FORMULARIO]
Los campos con asterisco son obligatorios; los demás llevan "(opcional)" en la etiqueta.

| Orden | Etiqueta | Tipo | Ayuda bajo el campo |
|---|---|---|---|
| 1 | Nombre * | texto | — |
| 2 | Correo * | email | "Aquí te enviamos la respuesta." |
| 3 | Área de desempeño del tablero * | lista: Minería · Energía · Alimentos · Manufactura · Otro | — |
| 4 | Gama * | lista: Alta · Media · Económica | "Alta usa componentes premium de alta calidad del mercado y cuesta más; Media y Económica bajan en esa proporción." |
| 5 | Teléfono (opcional) | teléfono | — |
| 6 | Empresa (opcional) | texto | — |
| 7 | Ubicación del tablero (opcional) | lista: Interior · Exterior · Corrosivo | "Dónde se instalará." |
| 8 | Mensaje (opcional) | texto largo | "Tipo de tablero, cargas o señales y fecha estimada." |
| 9 | Plano o especificación (opcional) | botón "Adjuntar archivo" | "Un archivo de hasta 10 MB: PDF, DWG, DXF, PNG, JPG o XLSX. No aceptamos ZIP." |
| 10 | Consentimiento * | casilla | "Acepto la [política de privacidad](/privacidad/)." |

**Botón:** Solicitar cotización · **Mientras envía:** Enviando…

### Mensajes
| Caso | Texto |
|---|---|
| Éxito | **Recibimos tu solicitud.** Te responderemos en 1 día. |
| Campo obligatorio vacío | Nombre: "Escribe tu nombre." · Correo: "Escribe tu correo." · Área: "Elige el área de desempeño." · Gama: "Elige una gama." · Consentimiento: "Acepta la política de privacidad para enviar." |
| Correo inválido | "Revisa el correo: parece incompleto." |
| Teléfono inválido | "Revisa el teléfono: usa solo números, espacios y + ( ) -." |
| No se verificó el envío | "No pudimos verificar el envío. Inténtalo de nuevo o escríbenos por WhatsApp al +56 9 3593 5595." |
| Archivo muy grande | "El archivo supera 10 MB. Adjunta uno más liviano o envíanoslo a ventas@atingenieria.com." |
| Tipo no permitido | "Tipo de archivo no permitido. Usa PDF, DWG, DXF, PNG, JPG o XLSX." |
| Error de envío o de red | "No pudimos enviar el formulario. Escríbenos a ventas@atingenieria.com o por WhatsApp al +56 9 3593 5595." |

**Sin JavaScript (`<noscript>`):** "Para enviar el formulario necesitas activar JavaScript. Mientras tanto, escríbenos por WhatsApp al +56 9 3593 5595, llámanos o escribe a ventas@atingenieria.com."

## [SECCIÓN: CONTACTO DIRECTO] (panel noche)
**H2:** Contacto directo
* **Correo:** ventas@atingenieria.com
* **Teléfono / WhatsApp:** +56 9 3593 5595
* **Taller:** Parcelación Victoria de Viluco, Buin, Región Metropolitana
* **Horario:** lunes a viernes, 09:00 a 18:00 h

**Botón:** [Escribir por WhatsApp] (`whatsapp_click`, ubicacion=contacto). Texto prellenado: "Hola, los contacto desde telectrich.cl (/contacto/)".

**Enlaces:** [soluciones eléctricas industriales](/soluciones/) · [pruebas FAT y SAT](/pruebas-fat-sat-y-comisionamiento/)

## [VARIANTE SOLO WHATSAPP] (si el formulario no está listo el 23-10; el panel pasa a ser lo principal)
**H1:** Cotiza tu tablero eléctrico industrial
**Bajada:** Escríbenos por WhatsApp y cuéntanos qué necesitas. Respondemos tu consulta en 1 día y entregamos la cotización en 48 horas.
**Botón principal (amarillo, grande):** Escribir por WhatsApp · +56 9 3593 5595 (`whatsapp_click`, ubicacion=contacto). Texto prellenado: "Hola, los contacto desde telectrich.cl (/contacto/)".
**Línea de apoyo:** ¿Tienes un plano o una especificación? Envíalo por el mismo chat o a ventas@atingenieria.com.
Después, el panel "Contacto directo" de arriba con correo, teléfono, taller y horario. No hay campos, botón "Solicitar cotización", casilla ni mensajes de éxito o error.

## Hechos usados
- Correo `ventas@atingenieria.com`, teléfono, dirección del taller y horario: `CONTEXTO.md`.
- Plazos: 1 día para responder y 48 horas para la cotización (especialista, 2026-09-30).
- Campos, adjunto (un archivo, 10 MB, sin zip, tipos de la ficha CRM §2.2) y códigos de error: `ficha-tecnica.md` §9.
- Área: Minería, Energía, Alimentos, Manufactura, Otro (decidido 2026-10-13). Gama: alta, media, económica (O8).

## Decisiones pendientes
- La ayuda de "Gama" es la propuesta del diseño con la definición del operador (O8); Gustavo puede ajustarla.
- Los textos de ayuda, de validación y de error son microcopy propuesto.

## Supuestos
- "Corrosivo" no lleva explicación para no inventar criterios técnicos; la protección se define con el estudio del ambiente (`CONTEXTO.md`).
