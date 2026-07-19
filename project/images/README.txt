This folder is where your real hotel photography should live.

All HTML pages currently reference placeholder images from picsum.photos
(a free placeholder image service) so the site renders fully out of the box
without needing any images uploaded here first.

To switch to your own photography:
1. Add optimised .jpg/.webp files here (recommend max 1800px wide for hero
   images, max 900px wide for cards/gallery — compress before uploading).
2. In each HTML file, replace the placeholder src, e.g.:
     src="https://picsum.photos/seed/regalia-hero1/1800/1000"
   with:
     src="images/hero-facade.jpg"
3. Keep the existing "alt" text or write new descriptive alt text for SEO
   and accessibility — do not leave alt attributes empty on content images.
4. Add loading="lazy" to every image below the fold (already done site-wide;
   keep it when you swap sources).
