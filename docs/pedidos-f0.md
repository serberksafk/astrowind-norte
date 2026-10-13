# Pedidos a F0 (fundación)

Anotaciones de cosas que faltan o no funcionan en F0 y que bloquean a los workers de páginas. **No se edita F0**: se anota aquí y se trabaja en el bloque propio.

## PB · Soluciones
- `src/components/telectrich/Unifilar.astro`: el prop `lit` (1-4) está documentado pero **no tiene efecto**. El componente no agrega la clase `u-lit` a los paths/fills del ramal N. En modo `estatico=true` se aplica `opacity: 0.16` inline al `<svg>`, así que aunque marcara los elementos, el padre los dejaría a 0.16. **Trabajo en PB**: para los heroes de las 4 páginas de solución, inlineo el SVG del unifilar con la clase `u-lit` aplicada al ramal correspondiente y manejo la opacidad con CSS propio (`u-lit` a 1, resto a 0.16). No toco F0.
- `src/components/telectrich/Hero.astro`: la variante `solucion` no incluye el unifilar, no tiene breadcrumb, no soporta foto vertical (4:5) ni `object-position` por página, y su diccionario de fotos solo trae `plc-s7-1200`, `control-s7-300`, `plc-abb-pm564`, `hero-1`, `hero-2` (faltan `fuerza-estructura-taller`, `distribucion-schneider`, `hmi-nema4x`, `switch-emerson`, etc.). **Trabajo en PB**: el hero de cada página se construye dentro de `PaginaSolucion.astro` con su propio grid + foto + breadcrumb + unifilar. No toco F0.

## PC / PD · bloqueos aún no explorados
- (vacío)

