document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const aceptarBtn = document.getElementById('cookie-aceptar');
  const rechazarBtn = document.getElementById('cookie-rechazar');

  if (!banner) return;

  function getConsent(): string | null {
    try {
      return localStorage.getItem('cookie-consent');
    } catch {
      return null;
    }
  }

  function setConsent(value: string) {
    try {
      localStorage.setItem('cookie-consent', value);
    } catch {
      // localStorage not available
    }
  }

  function pushConsent(value: string) {
    try {
      const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
      if (!dl) (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({ event: 'cookie_consent', consent: value });
    } catch {
      // dataLayer not available
    }
  }

  function hideBanner() {
    banner!.classList.add('hidden');
    document.body.style.scrollPaddingBottom = '';
  }

  function showBanner() {
    banner!.classList.remove('hidden');
    const barra = document.getElementById('barra-fija');
    if (barra) {
      document.body.style.scrollPaddingBottom = '5rem';
    }
  }

  const consent = getConsent();
  if (consent === null) {
    showBanner();
  }

  aceptarBtn?.addEventListener('click', () => {
    setConsent('accepted');
    pushConsent('accepted');
    hideBanner();
  });

  rechazarBtn?.addEventListener('click', () => {
    setConsent('rejected');
    pushConsent('rejected');
    hideBanner();
  });
});
