# ChronicGPT Frontend (chronicgptfe) 🔬🤖

**ChronicGPTFE** is the frontend web application (marketing/landing + interactive UI) built with **React** + **Vite**, intended as the UI for an AI-assisted chronic care experience. It focuses on a highly animated, scroll-driven landing experience using smooth scrolling and rich animations.

---

## Table of contents 📚
- [About](#about)
<!-- - [Demo / Screenshots](#demo--screenshots) -->
- [Tech stack](#tech-stack)
- [Features](#features)
- [Repository structure](#repository-structure)
- [Routing](#routing)
- [Local development](#local-development)
- [Build & deployment](#build--deployment)
- [Linting & formatting](#linting--formatting)
- [Contributing](#contributing)

---

## About ✨
A frontend application built with Vite and React. It provides a scroll-driven landing experience featuring:
- Smooth scrolling provided by `lenis`.
- Timeline-driven interactions built on `gsap` with `ScrollTrigger`.
- UI primitives and accessibility utilities from `@radix-ui`.
- Tailwind CSS for styling (via `@tailwindcss/vite`).

This repository contains the client-side code (UI and static assets) and assumes a separate backend/service for any AI or API calls.

---

<!-- ## Demo / Screenshots 📸


--- -->

## Tech stack 🧰
- Runtime & Bundler: Vite
- Framework: React (v19)
- Styling: Tailwind CSS
- Animations: GSAP (+ ScrollTrigger), Framer Motion
- Smooth scroll: Lenis
- UI primitives: Radix UI packages
- Icons: react-icons

Key `package.json` scripts:

```bash
# install deps
npm install

# local dev server (HMR)
npm run dev

# build for production
npm run build

# preview production build
npm run preview

# run ESLint across project
npm run lint
```

---

## Features ✅
- Scroll-driven landing page with pinned timeline animations.
- Responsive design using Tailwind utilities and custom CSS.
- Reusable UI micro-components (SlideUpText, FadeInText, RotatingText, Floating labels, etc.).
- Routing with React Router for pages: Home (`/`), Safeguards (`/safeguards`), Journey (`/journey`).
- Join cohort / CTA component built for conversion flows.

---

## Repository structure 🗂️
(only top-level / notable files shown)

```
/ (repo root)
├─ public/                      # static assets (images, icons)
├─ src/
│  ├─ components/               # UI components and pages
│  │  ├─ common/                # shared small components & layout
│  │  ├─ home/                  # home specific components
│  │  ├─ journey/               # journey page
│  │  └─ safeguards/            # safeguards page
│  ├─ helpers/                  # utility functions (eg. `cn`)
│  ├─ hooks/                    # custom hooks (lenis integration, scroll helpers)
│  ├─ App.jsx                   # main landing app (animations & sections)
│  └─ main.jsx                  # app bootstrap + Lenis wrapper
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

Notes:
- `src/components/RouterContainer.jsx` contains route definitions and scroll-to-top logic on route change.
- `src/App.jsx` contains the main visual sections, GSAP timelines and the scroll pinning setup.
- `src/components/common/` holds many reusable UI building blocks used across pages.

---

## Routing 🧭
Implemented with React Router. Notable routes:
- `/` → main landing (App)
- `/safeguards` → Safeguards page
- `/journey` → Journey page
- `/how-it-works` → WIP

Router resets Lenis scroll position on route change for smooth UX.

---

## Local development 🛠️
1. Clone the repo

```bash
git clone git@github.com:etherealdesign/chronic-gpt-fe.git
cd chronicGPTFE
npm install
```

2. Run development server:

```bash
npm run dev
```

Open http://localhost:5173 (or the port printed by Vite). The dev server supports HMR.

---

## Build & deployment 🚀
Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Deployment: any static host works (Netlify, Vercel, Surge, GitHub Pages). Upload the `dist/` folder produced by `npm run build`.

---

## Linting & formatting 🧹
ESLint is included. Run:

```bash
npm run lint
```

(You can add Prettier or other formatting tools if desired.)

---

## Contributing 🤝
If you plan to contribute, please:
1. Open an issue describing the change or feature.
2. Create a topic branch from `master`.
3. Add clear commit messages and a short PR description.

Developer notes:
- Reuse components in `src/components/common/` where possible.
- Keep animation logic in `App.jsx` minimal; prefer encapsulating repeated animation sequences in small components or utility hooks.

---


