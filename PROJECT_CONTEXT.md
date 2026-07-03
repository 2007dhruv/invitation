# Engagement Invitation - Project Context

**Target:** Create a premium, modern engagement invitation web application heavily inspired by the "Royal Prestige" gate-fold template.
**Reference URL:** `https://zareqia.com/invite/demo?template=royal-prestige`

## Tech Stack
- **Framework:** React 19 (scaffolded via Vite)
- **Styling:** Vanilla CSS with custom properties (`index.css`)
- **Icons:** `lucide-react` (installed)
- **Animations:** CSS keyframes, 3D transforms, and **`framer-motion`** (installed) for physics-based interactive gestures and dynamic scroll effects.

## Current Progress

1. **GateFoldOpen Component (`src/components/GateFoldOpen.jsx`)**
   - Replaced the simple splash screen/envelope with a premium "Gate-Fold" animation.
   - Features a left and right door that meet in the center.
   - A pulsing central wax seal that, when tapped, triggers a 3D swing-open animation.
   - Designed to be highly responsive and mobile-first.

2. **Welcome Hero Component (`src/components/WelcomeHero.jsx`)**
   - Serves as a dedicated, full-screen introductory section after the doors open, focusing entirely on the couple's names and tagline.
   - Features a responsive background image setup: wide (`hero-bg.jpg`) for desktop, and portrait (`hero-bg-mobile.jpg`) for perfect mobile framing.
   - **Ganesha Integration:** Added a smoothly animating `ganesha.png` at the top center, complete with responsive CSS sizing and precise margin adjustments to seamlessly overlap the image's built-in white space.
   - **Cinematic Entrance Animation:** A CSS keyframe animation (`elegant-entrance`) smoothly fades in, scales up, and brings the text into focus upon loading.
   - **Parallax Scroll Effect:** A React scroll listener dynamically reduces opacity and translates the text downward as the user scrolls away, creating a premium depth effect.
   - **Enhanced Typography Visibility:** Uses `Great Vibes` and `Playfair Display` fonts. The couple names are highlighted using a deep gold gradient and a subtle dark drop-shadow to ensure perfect readability and contrast against lighter backgrounds.

3. **Envelope Reveal Component (`src/components/EnvelopeReveal.jsx`)**
   - Replaced the old Scratch Reveal with an elegant 3D Envelope Reveal.
   - Features a wax seal that, when clicked, opens the envelope flap and slides out a premium "Save the Date" card.
   - Features a fluid parallax scroll effect that links the section's position and opacity directly to the user's scroll position.

4. **Countdown Timer Component (`src/components/CountdownTimer.jsx`)**
   - A dynamic countdown to the target date with individual gold-bordered blocks for Days, Hours, Minutes, and Seconds.
   - Integrated the `useScroll` Framer Motion hook to ensure perfect two-way exit/entrance parallax physics, precisely matching the other main sections.
   - Applied perfect `0.3` opacity overlays and distinct desktop/mobile background logic to prevent aggressive zoomed background scaling on mobile devices.

5. **App Assembly (`src/App.jsx`)**
   - Manages the state between the Gate-Fold intro and the main invitation content.
   - Orchestrates the entrance animations and scroll flows.
   - Controls the master dates (e.g., August 25, 2026) passed down to EnvelopeReveal and CountdownTimer components.

6. **Photo Gallery Component (`src/components/PhotoGallery.jsx`)**
   - Implemented an elegant Masonry grid layout for desktop views with staggered spring entrance animations using Framer Motion.
   - **Interactive Physics Stack (Mobile):** Built a "Tinder-style" draggable card stack using Framer Motion. Users can physically drag, tilt, and throw polaroid cards off the screen with momentum and spring physics.
   - **Parallax Blur Effect:** Integrates `framer-motion`'s `useScroll` to dynamically blur, fade, and translate the gallery out of view as the user scrolls past it, perfectly matching the cinematic effects of the upper sections.
   - Properly integrates local Vite static assets via direct ES6 imports to ensure reliable production builds.

7. **Bilingual Support & Event Details (`src/components/LanguageToggle.jsx`)**
   - Upgraded the invitation to serve specifically as an **Engagement Ceremony (સગાઈ સમારંભ)** invite.
   - Added a sleek, glassmorphic floating toggle button that allows the guest to seamlessly switch the entire invitation text between English (`en`) and Gujarati (`gu`).
   - Uses the elegant `Rasa` Google Font for Gujarati to perfectly match the premium serif/script aesthetic of the English typography.
   - Positioned absolutely at the top of the invitation so it naturally scrolls out of view as the guest reads the rest of the content (optimized with `transform: translateZ(0)` for hardware acceleration and glitch-free scrolling on mobile).
   - State is managed globally in `App.jsx` and passed down to all text-bearing components to ensure a clean, uncluttered interface.

8. **Venue Details Component (`src/components/VenueDetails.jsx`)**
   - Displays the location mapping and dress code with elegant typography and styling.
   - Implemented an interactive "Open in Maps" button that links seamlessly to Google Maps across desktop and mobile native apps.
   - Incorporates a rich parallax background image (`hero-bg.jpg`) with a sleek glassmorphic card for optimal contrast and aesthetic.

## Next Steps

We are building the remaining core components for the invitation in the following order:

1. **Event Timeline:** Build `EventTimeline.jsx` to show the schedule (e.g., Ring Ceremony, Dinner) using an animated vertical timeline.
2. **RSVP Form:** Build `RsvpForm.jsx` to allow guests to confirm attendance.
3. **Background Music:** (Optional) Add a toggleable audio player for traditional/ambient music.

## How to Run

1. Open a terminal in `d:\sunil- invitaion`.
2. Run `npm install` (if dependencies are missing).
3. Run `npm run dev` to start the Vite development server.
4. Open the provided `localhost` URL in your browser.
