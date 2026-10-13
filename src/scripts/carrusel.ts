document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('[data-slide]');
  const dots = carousel.querySelectorAll('[data-dot]');
  const pauseBtn = carousel.querySelector('[data-pause]');

  if (slides.length === 0) return;

  let current = 0;
  let interval: ReturnType<typeof setInterval> | null = null;
  let isPaused = false;

  function showSlide(index: number) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('hidden', i !== index);
      slide.classList.toggle('on', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('aria-current', i === index);
      dot.setAttribute('aria-current', String(i === index));
    });
    current = index;
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }

  function startAutoPlay() {
    if (isPaused) return;
    if (interval) clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
    pauseBtn?.setAttribute('aria-pressed', String(isPaused));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  pauseBtn?.addEventListener('click', togglePause);

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startAutoPlay();
  }
});
