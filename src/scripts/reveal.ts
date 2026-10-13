export function initReveal(): void {
  if (typeof window === 'undefined') return;
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotionQuery.matches) return;

  const cards = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (cards.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );

  cards.forEach((card) => observer.observe(card));
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal, { once: true });
  } else {
    initReveal();
  }

  // Re-init after Astro view transitions.
  document.addEventListener('astro:page-load', initReveal);
}