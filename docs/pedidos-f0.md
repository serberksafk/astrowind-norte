# Pedidos a F0 (fundación)

## Resueltos en bloque PD con overrides locales

- `src/layouts/TelectrichLayout.astro` no oculta `#whatsapp-flotante` en
  `/contacto/` ni `/privacidad/`. Solo oculta la barra inferior cuando se le pasa
  `bar={false}` o cuando la ruta coincide con `isNoBarPage`. PD necesita "sin barra
  inferior ni flotante" en Contacto y Privacidad (UX §4.9 y §4.10).

  **Resuelto en PD:** `src/pages/contacto.astro` y `src/pages/privacidad.astro`
  ocultan `#whatsapp-flotante` y `#barra-fija` con `:global()` en su `<style>`
  local, sin tocar el layout compartido. La regla se aplica antes del observer
  del layout, así que los elementos existen en el DOM pero no se muestran.

  **Sugerencia para F0/F0.1:** considerar extender `TelectrichLayout` con un
  prop `flotante={false}` o detectar la ruta igual que `isNoBarPage`, para que
  las páginas que cumplen UX no necesiten CSS overrides.