/* ==========================================================================
   MAIN.JS — global site behaviour
   Edit HOTEL_CONFIG once and every page (nav, footer, floating buttons,
   booking links) updates automatically.
   ========================================================================== */

/* ------------------------- 1. SITE CONFIG (EDIT ME) ------------------------- */
const HOTEL_CONFIG = {
  name: "Sagar Hotel ",
  tagline: "Experience Royalty in the Lap of Nature",
  address: " FANTA IS MY LOVE , , Bihar 800001, India",
  phone: "+919031182614",
  phoneDisplay: "+91 903 118 2614",
  whatsapp: "919031182614",
  email: "sagarsharma51965@gmail.com",
  mapEmbed: "https://www.google.com/maps?q=BIHAR,Bihar,India&output=embed",
  social: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    youtube: "#"
  }
};

/* Placeholder note for future backend work:
   window.HOTEL_CONFIG is intentionally global so a future Firebase layer
   (Auth / Firestore / Storage / Admin Panel) can read hotel settings,
   room inventory, and gallery data from Firestore and simply overwrite
   the relevant DOM without any change to markup or CSS classes. */
window.HOTEL_CONFIG = HOTEL_CONFIG;

document.addEventListener("DOMContentLoaded", () => {
  injectContactDetails();
  initPreloader();
  initHeaderScroll();
  initMobileNav();
  initScrollReveal();
  initCounters();
  initTypingEffect();
  initFAQ();
  initBackToTop();
  initCookieBanner();
  initFloatingButtons();
  initNewsletter();
  setActiveNavLink();
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
});

/* ------------------------- 2. INJECT CONTACT DETAILS ------------------------- */
function injectContactDetails() {
  document.querySelectorAll("[data-hotel-name]").forEach(el => el.textContent = HOTEL_CONFIG.name);
  document.querySelectorAll("[data-hotel-tagline]").forEach(el => el.textContent = HOTEL_CONFIG.tagline);
  document.querySelectorAll("[data-hotel-address]").forEach(el => el.textContent = HOTEL_CONFIG.address);
  document.querySelectorAll("[data-hotel-email]").forEach(el => {
    el.textContent = HOTEL_CONFIG.email;
    if (el.tagName === "A") el.href = `mailto:${HOTEL_CONFIG.email}`;
  });
  document.querySelectorAll("[data-hotel-phone]").forEach(el => {
    el.textContent = HOTEL_CONFIG.phoneDisplay;
    if (el.tagName === "A") el.href = `tel:${HOTEL_CONFIG.phone}`;
  });
  document.querySelectorAll("[data-map-embed]").forEach(el => el.src = HOTEL_CONFIG.mapEmbed);
}

/* ------------------------- 3. PRELOADER ------------------------- */
function initPreloader() {
  const pre = document.querySelector(".preloader");
  if (!pre) return;
  window.addEventListener("load", () => {
    setTimeout(() => pre.classList.add("hide"), 400);
  });
  // Safety fallback in case load event already fired
  setTimeout(() => pre.classList.add("hide"), 2500);
}

/* ------------------------- 4. HEADER SCROLL / DARK ON SCROLL ------------------------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const toggle = () => {
    if (window.scrollY > 60) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* ------------------------- 5. MOBILE NAV TOGGLE ------------------------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    document.body.classList.remove("nav-open");
  }));
}

/* ------------------------- 6. ACTIVE NAV LINK ------------------------- */
function setActiveNavLink() {
  const page = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) a.classList.add("active");
  });
}

/* ------------------------- 7. SCROLL REVEAL (IntersectionObserver) ------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* ------------------------- 8. COUNTER ANIMATION ------------------------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.counter, 10) || 0;
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => io.observe(el));
}

/* ------------------------- 9. TYPING EFFECT ------------------------- */
function initTypingEffect() {
  const el = document.querySelector("[data-typing]");
  if (!el) return;
  const words = el.dataset.typing.split("|");
  let wordIndex = 0, charIndex = 0, deleting = false;
  el.innerHTML = `<span class="type-text"></span><span class="type-cursor typing-cursor">&nbsp;</span>`;
  const textSpan = el.querySelector(".type-text");

  function tick() {
    const word = words[wordIndex];
    if (!deleting) {
      charIndex++;
      textSpan.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) { deleting = true; setTimeout(tick, 1400); return; }
    } else {
      charIndex--;
      textSpan.textContent = word.slice(0, charIndex);
      if (charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 45 : 90);
  }
  tick();
}

/* ------------------------- 10. FAQ ACCORDION ------------------------- */
function initFAQ() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(openItem => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* ------------------------- 11. BACK TO TOP ------------------------- */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ------------------------- 12. COOKIE BANNER ------------------------- */
function initCookieBanner() {
  const banner = document.querySelector(".cookie-banner");
  if (!banner) return;
  const KEY = "regalia_cookie_consent";
  if (!localStorage.getItem(KEY)) {
    setTimeout(() => banner.classList.add("show"), 1200);
  }
  banner.querySelectorAll("[data-cookie-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      localStorage.setItem(KEY, btn.dataset.cookieAction);
      banner.classList.remove("show");
    });
  });
}

/* ------------------------- 13. FLOATING WHATSAPP / CALL BUTTONS ------------------------- */
function initFloatingButtons() {
  document.querySelectorAll("[data-whatsapp-link]").forEach(a => {
    const msg = encodeURIComponent(a.dataset.whatsappLink || `Hello ${HOTEL_CONFIG.name}, I would like to enquire about a booking.`);
    a.href = `https://wa.me/${HOTEL_CONFIG.whatsapp}?text=${msg}`;
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-call-link]").forEach(a => a.href = `tel:${HOTEL_CONFIG.phone}`);
}

/* ------------------------- 14. NEWSLETTER FORM ------------------------- */
function initNewsletter() {
  const form = document.querySelector(".newsletter-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (!input.value || !input.value.includes("@")) {
      input.style.borderColor = "#c0392b";
      return;
    }
    input.style.borderColor = "var(--color-gold)";
    form.innerHTML = `<p style="color:var(--color-gold-light);font-size:0.9rem;">Thank you — you're subscribed to ${HOTEL_CONFIG.name} updates.</p>`;
    /* TODO (backend): forward this address to Firestore collection "newsletter_subscribers" */
  });
}
