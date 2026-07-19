# — Luxury Hotel & Banquet Website

A production-ready, fully responsive luxury hotel & banquet website built with
**pure HTML5, CSS3 and vanilla JavaScript** — no frameworks, no libraries.

## 🚀 Quick Start

No build step required. Just open `index.html` in a browser, or serve the
folder with any static server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## ✏️ How to Rebrand in 2 Minutes

Almost every piece of hotel-specific content is centralised so you can
re-skin the whole site without touching markup:

1. **Open `js/main.js`** and edit the `HOTEL_CONFIG` object at the top:
   ```js
   const HOTEL_CONFIG = {
     name: "I AM THE BEST HOTEL",
     tagline: "Your Tagline",
     address: "Your full address",
     phone: "+919031182614",
     phoneDisplay: "+91 9031182614",
     whatsapp: "919031182614",   // digits only, no + or spaces
     email: "sagarsharma51965@gmail.com",
     mapEmbed: "https://www.google.com/maps?q=YOUR+ADDRESS&output=embed",
     social: { instagram: "#", facebook: "#", twitter: "#", youtube: "#" }
   };
   ```
   Every element with `data-hotel-name`, `data-hotel-tagline`,
   `data-hotel-address`, `data-hotel-phone`, `data-hotel-email` or
   `data-map-embed` updates automatically on page load.

2. **Colours & fonts** — open `css/style.css` and edit the CSS variables at
   the top of the file (`:root { ... }`). Everything on the site references
   these tokens, so changing `--color-maroon` or `--color-gold` re-skins the
   entire site instantly.

3. **Images** — every `<img>` currently points to a placeholder image
   service (`picsum.photos`) with a unique, descriptive seed so the layout
   works out of the box. Replace the `src` with your own photography in
   `/images` before launch (see `images/README.txt`).

## 📁 Folder Structure

```
project/
├── index.html          Home page (hero slider, booking bar, about, rooms, amenities, testimonials, FAQ)
├── about.html           Hotel story, philosophy, team, awards
├── rooms.html            Room/suite catalogue, filters, full booking form
├── dining.html           Restaurants, sample menu, in-room dining
├── banquet.html          Event venues, event types, site-visit enquiry form
├── gallery.html          Filterable masonry gallery with lightbox
├── contact.html          Contact details, embedded map, general enquiry form
├── 404.html              Custom not-found page
├── css/
│   ├── style.css         Design tokens, layout, all component styles
│   ├── responsive.css    Mobile-first breakpoint overrides
│   └── animation.css     Keyframes + scroll-reveal utility classes
├── js/
│   ├── main.js           Config injection, preloader, nav, counters, FAQ, cookie banner, floating buttons
│   ├── slider.js         Hero slider (autoplay, dots, pause-on-hover)
│   ├── booking.js        Booking form validation + WhatsApp/call/email hand-off + confirmation modal
│   └── gallery.js        Category filter + keyboard-accessible lightbox
├── images/                Drop your photography here
└── assets/                Favicon and other static assets
```

## 🧩 Features Implemented

- Sticky navbar, transparent on hero, dark-on-scroll
- Hero mega slider with Ken Burns effect, dots, autoplay
- Booking bar + full booking pages (rooms & banquet) with client-side
  validation, WhatsApp / phone / email hand-off, and a confirmation modal
- Scroll-reveal, counters, staggered card animation, typing effect
- Responsive masonry gallery with category filters and a custom lightbox
  (keyboard navigable — arrows + Escape)
- Testimonials styled as Google-review cards
- FAQ accordion
- Embedded Google Map + full contact form
- Floating WhatsApp / call buttons, back-to-top, cookie consent banner
- Preloader, custom 404 page
- Semantic HTML, `alt` text on every image, visible focus states,
  `prefers-reduced-motion` respected throughout

## 🔌 Admin / Firebase Ready

The site ships as a static front-end, but is structured so a backend can be
added later **without changing any markup or CSS**:

- `window.HOTEL_CONFIG` in `js/main.js` is a single source of truth for
  hotel details — swap this for a Firestore `settings` document fetch.
- Booking and contact forms already produce a flat JS object
  (`{ name, phone, email, checkin, checkout, guests, roomType, notes }`)
  right before hand-off — see the `TODO (backend)` comments in
  `js/booking.js` and `contact.html` for the exact spot to insert a
  Firestore `.add()` call.
- Gallery images are plain `<img>` tags inside `.masonry-item[data-category]`
  wrappers — a future admin panel can generate this markup dynamically from
  a Firestore `gallery` collection + Firebase Storage URLs.
- Room and venue cards follow one repeatable markup pattern, ready to be
  templated from a `rooms` / `venues` collection.

## 📱 Responsive Breakpoints

`css/responsive.css` handles 1200px, 992px, 900px (nav collapse), 700px and
420px breakpoints — test with your browser's device toolbar.

## ⚠️ Notes

- Placeholder images are loaded from `picsum.photos` (no attribution
  required) so the site is fully functional out of the box. Replace with
  real photography before going live.
- The Google Maps `<iframe>` uses the public embed endpoint with a
  place-name query; swap in your exact `?q=` coordinates or a "Share" embed
  link from Google Maps for a pinpoint marker.
- The WhatsApp number in `HOTEL_CONFIG.whatsapp` must be digits only
  (country code + number, no `+`, spaces or dashes) — this is a `wa.me`
  requirement.
