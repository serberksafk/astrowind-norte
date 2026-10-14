interface SlideEl extends HTMLElement {
  dataset: { cap?: string };
}

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector<HTMLElement>('[data-hero-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll<SlideEl>('[data-hero-slide]'));
  const dots = Array.from(carousel.querySelectorAll<HTMLButtonElement>('[data-hero-dot]'));
  const capOut = carousel.querySelector<HTMLElement>('[data-cap-out]');
  const pauseBtn = carousel.querySelector<HTMLButtonElement>('[data-hero-pause]');

  if (slides.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer: ReturnType<typeof setInterval> | null = null;
  let paused = reducedMotion;
  let seen = true;

  function show(index: number) {
    const next = ((index % slides.length) + slides.length) % slides.length;
    if (slides[current]) slides[current].classList.remove('on');
    if (dots[current]) dots[current].removeAttribute('aria-current');
    current = next;
    slides[current].classList.add('on');
    if (dots[current]) dots[current].setAttribute('aria-current', 'true');
    if (capOut && slides[current].dataset.cap) {
      capOut.textContent = slides[current].dataset.cap;
    }
  }

  function nextSlide() {
    show(current + 1);
  }

  function startTimer() {
    stopTimer();
    if (paused || !seen || document.hidden) return;
    timer = setInterval(nextSlide, 6500);
  }

  function stopTimer() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  function setPaused(value: boolean) {
    paused = value;
    pauseBtn?.setAttribute('aria-pressed', value ? 'true' : 'false');
    pauseBtn?.setAttribute('aria-label', value ? 'Reanudar el carrusel' : 'Pausar el carrusel');
    if (value) stopTimer();
    else startTimer();
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      show(i);
      startTimer();
    });
  });

  pauseBtn?.addEventListener('click', () => setPaused(!paused));

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTimer();
    else startTimer();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        seen = entry.isIntersecting;
        if (seen) startTimer();
        else stopTimer();
      });
    },
    { threshold: 0 },
  );
  observer.observe(carousel);

  carousel.addEventListener('mouseenter', () => {
    if (!paused) stopTimer();
  });
  carousel.addEventListener('mouseleave', () => {
    if (!paused) startTimer();
  });

  if (!reducedMotion) startTimer();
});