document.addEventListener('DOMContentLoaded', () => {
  const barra = document.getElementById('barra-fija');
  const flotante = document.getElementById('whatsapp-flotante');

  if (!barra && !flotante) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          barra?.classList.add('translate-y-full');
          flotante?.classList.add('hidden');
        } else {
          barra?.classList.remove('translate-y-full');
          flotante?.classList.remove('hidden');
        }
      });
    },
    { threshold: 0, rootMargin: '0px' }
  );

  const heroSection = document.querySelector('section');
  const bandaFinal = document.querySelector('section:last-of-type');
  const footer = document.querySelector('footer');

  if (heroSection) observer.observe(heroSection);
  if (bandaFinal) observer.observe(bandaFinal);
  if (footer) observer.observe(footer);
});
