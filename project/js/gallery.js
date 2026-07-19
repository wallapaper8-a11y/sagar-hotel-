/* ==========================================================================
   GALLERY.JS — category filter + lightbox for the masonry gallery
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".masonry");
  if (!grid) return;

  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = Array.from(grid.querySelectorAll(".masonry-item"));

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.filter;
      items.forEach(item => {
        const match = category === "all" || item.dataset.category === category;
        item.style.display = match ? "" : "none";
      });
    });
  });

  /* ---------------- Lightbox ---------------- */
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;
  const lightboxImg = lightbox.querySelector("img");
  const captionEl = lightbox.querySelector(".lightbox-caption");
  let visibleItems = [];
  let activeIndex = 0;

  function openLightbox(index) {
    visibleItems = items.filter(i => i.style.display !== "none");
    activeIndex = visibleItems.findIndex(i => i === items[index]) ;
    if (activeIndex === -1) activeIndex = 0;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function updateLightbox() {
    const item = visibleItems[activeIndex];
    if (!item) return;
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (captionEl) captionEl.textContent = img.alt;
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  lightbox.querySelector(".lightbox-close")?.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  });
  lightbox.querySelector(".lightbox-next")?.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % visibleItems.length;
    updateLightbox();
  });
  lightbox.querySelector(".lightbox-prev")?.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") lightbox.querySelector(".lightbox-close").click();
    if (e.key === "ArrowRight") lightbox.querySelector(".lightbox-next").click();
    if (e.key === "ArrowLeft") lightbox.querySelector(".lightbox-prev").click();
  });
});
