document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll('[data-reveal]');

  if (cards.length === 0) return;

  let ticking = false;

  function revealCards() {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.85;
      if (isVisible) {
        card.classList.add('revealed');
      }
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(revealCards);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  revealCards();
});
