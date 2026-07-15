# Turki Omar Group — Marketing Site

A single-page, black-and-white scrollytelling marketing site built with React, Vite, Three.js, GSAP/ScrollTrigger, Lenis, Framer Motion, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/       Reusable UI + Three.js pieces (Header, GlobalBackground,
                     LogoScene, LightStreakBackground, GlassFilterDefs)
  sections/          Page sections assembled in App.jsx, in scroll order
  hooks/             useLenis — sets up inertial scrolling + syncs with
                     GSAP ScrollTrigger
  utils/             Static content data (e.g. companies.js)
  index.css          Tailwind entry + global keyframes/utilities
```

## Scroll Sequence

1. **Hero / Logo Scene** — a pinned Three.js scene (letter "T" with orbiting
   curved lines and dots) morphs through three states — About Us, Our Vision,
   Our Focus — scroll-scrubbed and fully reversible.
2. **Blackout Transition** — grayscale equalizer bars are eaten by a
   center-out vignette until the page turns solid black, with a heading
   crossfading from dim gray to bright white.
3. **Our Companies** — a pinned, scroll-driven 3D coverflow of frosted
   "liquid glass" cards (SVG turbulence + backdrop blur) over an ambient,
   independently looping monochrome light-streak background.
4. **Return to White** — Services and Approach sections on the same soft
   drifting gray-shadow background used in the hero.
5. **Contact + Footer** — a light-gray contact card with a form, and a
   separate light-gray footer card with a large wordmark and social links.

## Notes for Real Content

- Replace the placeholder company entries in `src/utils/companies.js` with
  real subsidiary names, sectors, descriptions, and (optionally) real photos
  — swap the CSS `gradient` for a `backgroundImage` on the card.
- Replace the contact form's `onSubmit` handler in
  `src/sections/ContactSection.jsx` with a real submission endpoint.
- Swap the placeholder photo panel in the contact section and the social
  icon links in the footer for real assets/URLs.
- Arabic labels (`من نحن`, `رؤيتنا`, `تركيزنا`) are in `HeroLogoSection.jsx`
  and can be adjusted or localized further.
