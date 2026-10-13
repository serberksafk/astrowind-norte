document.addEventListener('DOMContentLoaded', () => {
  const whatsappLinks = document.querySelectorAll('a[data-wa]');

  whatsappLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const ubicacion = link.getAttribute('data-wa') || 'unknown';
      const pagina = window.location.pathname;

      try {
        const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
        if (!dl) (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: 'whatsapp_click',
          ubicacion,
          pagina,
        });
      } catch {
        // dataLayer not available
      }
    });
  });
});
