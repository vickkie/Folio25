# Folio25 — Discovery & Planning Audit Tracker

Audit date: 2026-09-28. Read-only audit: no source/config/test/asset changes.

## Stack detected

- Language: JavaScript (JSX) + 4 TypeScript files (.tsx) — no tsconfig anywhere
- Framework: React 18.3.1, react-router-dom 6.26 SPA, entry `index.html` → `src/main.jsx` → `src/App.jsx` (lazy routes)
- Build tool: Vite 5.4 + @vitejs/plugin-react; **two** SW setups: vite-plugin-pwa (emits sw.js, registered) AND workbox-cli `generateSW` (emits service-worker.js, never registered)
- Package manager: npm + package-lock.json; node v25.9.0 / npm 11.12.1
- Styling: Tailwind 3.4 (directives in src/index.css) + PostCSS/autoprefixer + CSS modules + plain CSS mixed
- Test runner: NONE (no script, no deps)
- Linter: ESLint 9 flat config; gaps: .tsx files not linted, vite.config.js parse error, ecmaVersion 2021 breaks class-field syntax in ErrorBoundary.jsx
- CI: none
- Env: .env.example only (VITE_BACKEND_PORT*, VITE_COMPANY_NAME, VITE_FIREBASE_*); no .env committed; *.VITE_BACKEND_PORT holds a URL, not a port
- Backend: external API (`http://localhost:7000` dev / `https://uzigateway.vercel.app` prod default); Firebase Firestore + Realtime DB (client SDK)
- Deploy: Vercel (SPA rewrite + strict CSP header), PWA manifest, Partytown (gtag + Clarity)
- Assets: public/ = 207MB; src/ = 154 files / 2.9MB

## Checks

| # | Check | Status | Result |
|---|-------|--------|--------|
| 1 | Stack detection | DONE | above |
| 2 | npm ci | DONE | 926 pkgs; deprecation warnings (inflight, glob7, core-js2, lenis rename) |
| 3 | npm run build | DONE | PASS; warnings: stale browserslist, unresolved assets (svg-pathz.svg, card 3.avif, story-bg.png), 19 files >2MB skip precache |
| 4 | npm run lint | DONE | FAIL: 150 errors / 12 warnings |
| 5 | typecheck | DONE | N/A — no tsconfig; .tsx transpiled by esbuild only |
| 6 | tests | DONE | none exist |
| 7 | dev boot | DONE | vite ready ~266ms, HTTP 200 |
| 8 | npm audit | DONE | 56 vulns (2 crit, 24 high, 26 mod, 4 low) |
| 9 | npm outdated | DONE | 33 pkgs; majors: react19, vite8, firebase12, router7, tailwind4, eslint10 |
| 10 | dead files | DONE | 54/154 src files unreachable; verified per-file below |
| 11 | unused exports | DONE | lint no-unused-vars covers it (dozens) |
| 12 | unused deps | DONE | crypto-js, intl-tel-input, react-lottie only used by dead code |
| 13 | unused assets/env/TODO | DONE | ~180MB public unreferenced (best-effort); 30 console.log; no TODO/FIXME in text files |
| 14 | duplicates | DONE | aboutHero.css x3, about.module.css x2, prefooter.module.css x2 (drifted), Maintainance x2, robots.txt x2, firebase init x2 |
| 15 | security | DONE | CSP blocks prod API + analytics; JWT in localStorage; no secrets committed |
| 16 | performance | DONE | 213MB dist, 740KB BlogPost chunk, unoptimized images |
| 17 | a11y/SEO | DONE | div onClick, missing alts/labels; robots blocks /images; broken twitter:image |
| 18 | config hygiene | DONE | eslint gaps, dual SW, stale browserslist, rc dep |
| 19 | tests | DONE | zero coverage, no infra |
| 20 | structure/docs | DONE | naming typos, empty Dashboard stub, README = screenshots only |

## Findings log (summary — full detail in IMPROVEMENT-PLAN.md)

See IMPROVEMENT-PLAN.md section 3. IDs: DC-## dead code, DP-## dependencies, BG-## bugs, SC-## security, PF-## performance, CF-## config/hygiene, AX-## a11y/SEO, ST-## structure, NV-## not verified.

## Open questions (for owner)

1. Is `https://uzigateway.vercel.app` the live backend? (CSP connect-src currently omits it.)
2. ~~Should /dashboard, /profile, /terminal, SignUp/LoginTrader be kept or removed?~~ **ANSWERED (owner, 2026-09-28):** Dashboard/Profile/Notification = intentional WIP portfolio CMS → keep. TerminalShell + `/terminal`/`/shell` = intentional "fun login path" → keep. SignUp, LoginTrader, Maintainance×2 = scaffold leftovers → confirmed dead. `PageTransition.jsx` — owner believes it's used; verified 0 importers + it passes a wrong prop (`onComplete`) to `Preloader` (expects `done`) → dead+broken, but keep per owner intent until they confirm.
3. Branding: Vickkie vs Uzitrake vs uzifolio25 — which is canonical?
4. Keep the dual Service Worker setup or standardize on vite-plugin-pwa?
5. Which public/images/logos + works/* assets are still needed (~180MB looks unreferenced)?
