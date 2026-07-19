/* ==========================================================================
   SLIDER.JS — hero mega slider with autoplay, dots, ken-burns
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const dotsWrap = document.querySelector(".hero-dots");
  let current = 0;
  let timer = null;
  const AUTOPLAY_MS = 5500;

  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function render() {
    slides.forEach((s, i) => s.classList.toggle("active", i === current));
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle("active", i === current));
    }
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
    restart();
  }

  function next() { goTo(current + 1); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, AUTOPLAY_MS);
  }

  if (slides.length) {
    render();
    restart();
  }

  // Pause on hover for a more premium feel
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", restart);
});
