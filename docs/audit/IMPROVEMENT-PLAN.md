# Folio25 — Improvement Plan

Discovery/planning audit, 2026-09-28. Read-only: nothing in `src/`, `public/`, or configs was changed. Raw command output lives in `docs/audit/evidence/`.

## 1. Summary

**Stack:** React 18.3 SPA (Vite 5.4, react-router 6), Tailwind 3 + CSS modules + plain CSS, Firebase client SDK, external REST backend (`VITE_BACKEND_PORT`), PWA via vite-plugin-pwa + a redundant workbox-cli pass, deployed on Vercel with a strict CSP header. npm + package-lock. No tests, no CI, no tsconfig (despite 4 `.tsx` files).

**Baseline health:** Build passes; dev server boots; **lint fails hard** (150 errors, 12 warnings); **zero tests**; **56 known dependency vulnerabilities** (2 critical). Roughly **35% of `src/` is unreachable dead code**, and `public/` ships **~207 MB of assets of which ~180 MB look unreferenced** (best-effort static scan — verify before deleting).

**Top 5 risks**
1. **Production CSP likely breaks core functionality** — `vercel.json` `connect-src` omits the API origin `https://uzigateway.vercel.app`, and `script-src` omits `clarity.ms` while the Clarity snippet is injected without a nonce → API calls and analytics blocked in prod (SC-1, High).
2. **56 dependency vulnerabilities** incl. 2 critical (`websocket-driver` via Firebase chain) plus a Vite ≤6.4.2 dev-server advisory (SC-2).
3. **~180 MB of probably-unused public assets** deployed and partially precached — huge bandwidth/build cost (PF-1).
4. **Dual service-worker build** — `workbox generateSW` emits a 641-URL / 77.6 MB `service-worker.js` that is never registered; the real `sw.js` comes from vite-plugin-pwa. One of these configs is dead weight and a future foot-gun (CF-2).
5. **No safety net** — no tests, no CI, and lint currently fails, so any cleanup work is unverifiable (CF-1).

## 2. Baseline results

| Command | Result | Notes (evidence in `docs/audit/evidence/`) |
|---------|--------|--------------------------------------------|
| `npm ci` | PASS | 926 pkgs. Warnings: `react-lottie` engine, deprecated `inflight`, `glob@7`, `core-js@2`, `@studio-freight/lenis` renamed → `lenis` |
| `npm run build` | PASS | Warnings: caniuse-lite 15 months stale; `svg-pathz.svg`, `card 3.avif`, `story-bg.png` unresolved; 19 files >2 MB skip precache; emits **both** `sw.js` (registered) and `service-worker.js` (unregistered, 641 URLs/77.6 MB precache); `dist/` = 213 MB |
| `npm run lint` | **FAIL** | 150 errors, 12 warnings. Includes parse errors on `vite.config.js` (config bug) and `ErrorBoundary.jsx` (ecmaVersion too old); all `.tsx` ignored entirely |
| typecheck | N/A | No `tsconfig.json`; `.tsx` files transpile via esbuild unchecked |
| tests | N/A | No runner/script/framework |
| `vite` dev boot | PASS | Ready ~266 ms, HTTP 200 on `/` |
| `npm audit` | 56 vulns | 2 critical (`websocket-driver`, `tmp`), 24 high, 26 moderate, 4 low — see `audit.log` |
| `npm outdated` | 33 pkgs behind | Majors pending: react 19, vite 8, firebase 12, router 7, tailwind 4, eslint 10, lucide-react 1.x, vite-plugin-pwa 1.x |

## 3. Findings by category

Confidence: **H**igh (verified by command/trace), **M**edium (strong signal, needs one human check), **L**ow (suspected).

### 3a. Dead code & files (DC)

| ID | File:line | Evidence | Conf |
|----|-----------|----------|------|
| DC-1 | `src/App.css` | Import-graph: unreachable; `grep App.css` = 0 refs | H |
| DC-2 | `src/config.js` | Unreachable; `COMPANY_NAME` has no importer — NavBar.jsx:5 and TopBar.jsx:8 compute their own `companyName` and never use it | H |
| DC-3 | `src/components/Account/SignUp.jsx` + `SignUp.css` | Unreachable; no `/signup` route in App.jsx:86-108 | H |
| DC-4 | `src/components/Account/LoginTrader.jsx` | Unreachable; no route | H |
| DC-5 | `src/components/About/Mission.jsx` | Unreachable; not imported by About.jsx | H |
| DC-6 | `src/components/Home/Fragments/Avatar.jsx` + `avatar.css` | Unreachable | H |
| DC-7 | `src/components/Extras/Maintainance.jsx` + `Extras/css/maintainance.css` | Unreachable | H |
| DC-8 | `src/components/Loading/{Maintainance,LottieLoad,PageTransition}.jsx` | Unreachable (LottieLoad only used by dead LoginTrader). PageTransition also passes wrong prop `onComplete`→Preloader (expects `done`) — dead+broken; **owner wants it kept** → repair or document | H |
| DC-9 | `src/components/Work/projects/ProjectVanilla.jsx` + `project.js` | Unreachable **and broken**: references undefined `gsap/ScrollTrigger/ScrollSmoother/SplitText/TweenMax` globals (lint `no-undef`, 25+ errors) | H |
| DC-10 | `src/components/Dashboard.css` | Unreachable; Dashboard.jsx:4 imports `./Dashboard.module.css` | H |
| DC-11 | `src/components/hooks/{useGet,useDelete}.jsx` | useGet imported only by dead SignUp/LoginTrader; useDelete has zero importers | H |
| DC-12 | `src/assets/fonts/**` (31 files) + `src/assets/{image.png,react.svg}` + `src/assets/fonts/image.png` | Unreachable; index.css @font-face points at `/fonts/*` (public), not src/assets | H |
| DC-13 | `src/assets/json/{privacyPolicy,values,maintainance,loading-circles}.json` | No importers (or only dead importers) | H |
| DC-14 | `public/lottie/Loading.json`, `public/output-onlinepngtools.png`, `public/visual.svg`, `public/svg-path.svg` | Not in referenced-assets scan | M |
| DC-15 | ~718 files / ~180 MB under `public/` | `comm` of disk files vs. all literal asset refs → `evidence/unreferenced-public.txt`. Template-literal paths (`/images/works/${pageData.id}/…`) mean some may be dynamically used — verify each batch before deleting | M |
| DC-16 | `public/~partytown/debug/*` (108 KB) | Debug libs shipped **and precached** by sw.js | H |
| DC-17 | root `robots.txt` | Byte-identical duplicate of `public/robots.txt` | H |
| DC-18 | `dist/service-worker.js` (generated) | `registerSW.js` registers `/sw.js` only; nothing references `service-worker.js` → `workbox generateSW` build step is dead | H |
| DC-19 | `index.html:38-46` | Six `<link rel="preload" href="">` empty-href tags + stray fetchpriority attributes | H |
| DC-20 | `src/main.jsx:3,9` | `Router` imported/commented-out but unused (lint error) | H |
| DC-21 | Repo-wide | ~30 `console.log`, ~48 `console.*` calls; large commented-out blocks (firebase.js:1-19, Login.jsx:37-56, App.jsx:54) | H |
| DC-22 | `src/components/Loading/Loading.jsx` prop | `isLoading` prop always undefined at the single Suspense usage — preloader logic effectively dead | M |

### 3b. Dependencies (DP)

| ID | File:line | Evidence | Conf |
|----|-----------|----------|------|
| DP-1 | `crypto-js` | Only importer is dead LoginTrader.jsx, where it's itself unused | H |
| DP-2 | `intl-tel-input` | Only importer is dead SignUp.jsx | H |
| DP-3 | `react-lottie` | Only importers are dead LottieLoad/Maintainance; also unmaintained (engine warning, depends on deprecated `inflight`) | H |
| DP-4 | `eslint-plugin-react-hooks@5.1.0-rc.0` | Pinned to a release candidate; stable 5.x/7.x exists | H |
| DP-5 | `@studio-freight/lenis` | Package deprecated/renamed to `lenis` (npm warn); still used by About.jsx + BlogPost.tsx | H |
| DP-6 | Majors behind (outdated.log) | react 18→19, vite 5→8, firebase 10→12, react-router 6→7, tailwind 3→4, eslint 9→10, @vitejs/plugin-react 4→6, lucide-react 0.440→1.48, intl-tel-input 24→29 (moot if removed), vite-plugin-pwa 0.20→1.3, framer-motion 12→13 | H |
| DP-7 | caniuse-lite | Build warning: browsers data 15 months old | H |

### 3c. Bugs & correctness (BG)

| ID | File:line | Evidence | Conf |
|----|-----------|----------|------|
| BG-1 | `eslint.config.js:13,38` | `vite.config.js` lint **parse error** (CommonJS override on an ESM file); `ecmaVersion:2021` makes `ErrorBoundary.jsx:19` class fields a parse error; `.tsx` gets "File ignored — no matching configuration" | H |
| BG-2 | `vercel.json:11` | `connect-src` lacks `https://uzigateway.vercel.app` (the configured prod backend, vite.config.js:9) → prod XHR blocked; `script-src 'self' 'nonce-…'` lacks `www.clarity.ms` and the React-injected Clarity script (ClarityStats.jsx) carries no nonce → analytics blocked | H |
| BG-3 | `index.html:36` vs `vercel.json:11` | Meta CSP `style-src * 'unsafe-inline'` is redundant/noise next to the header CSP (both apply; effective = intersection) | H |
| BG-4 | `index.html:64` | `twitter:image` → `/svg/companylogo-clear.png` **does not exist** → broken Twitter card | H |
| BG-5 | `src/components/Work/css/projects.css:425` | `url(../assets/svg-pathz.svg)` unresolvable (build warning; file absent) → broken background | H |
| BG-6 | `src/components/Extras/css/extras.css:11` | Relative `url("images/unknown/…card 3.avif")` won't resolve post-build (build warning) | M |
| BG-7 | `ProtectedRoutes.jsx:57-58` | Double `navigate()` on refresh failure; gate is client-side `status==="active"` only | H |
| BG-8 | `Login.jsx:34-57` | Unconditional `POST /api/refresh-token` on every mount (the `if (!storedAuthData)` guard is commented out) — stray request + possible redirect loop on `/login` | H |
| BG-9 | `App.jsx:53` | `MouseFollower.registerGSAP(gsap)` runs in render body (side effect re-executed every render); `ScrollTrigger` imported but unused | H |
| BG-10 | `Dashboard.jsx` | Empty-grid stub — **intentional**: owner says this becomes the portfolio CMS. Keep route, either hide behind feature flag or build out | H |
| BG-11 | `App.jsx:94-95, 101-102` | Duplicate routes: `/insights`+`/blogs` → Blogs; `/terminal`+`/shell` → TerminalShell (**keep per owner** — fun login path; consider whether both aliases are needed) | H |
| BG-12 | `src/Firebase/firebase.js` vs `firebaseConfig.js` | Duplicate app-init + config; exports different instances (`db` vs `dbFirestore`/`dbRealtime`), both live | H |
| BG-13 | Branding | `<title>Vickkie</title>` vs PWA name `Uzitrake` vs `og:url vickkie.vercel.app` vs CSP `uzifolio25.vercel.app` vs package name `uzitrake` | H |

### 3d. Security (SC)

| ID | File:line | Evidence | Conf |
|----|-----------|----------|------|
| SC-1 | `vercel.json:11` | See BG-2 — CSP blocks prod API + analytics (availability issue) | H |
| SC-2 | `npm audit` | 56 vulns; critical `websocket-driver` (Firebase/undici chain), `tmp`; high in `vite`≤6.4.2 esbuild dev server, `react-router` 6.x, `prismjs` via react-syntax-highlighter, `serialize-javascript` | H |
| SC-3 | `AuthContext.jsx:27`, `ProtectedRoutes.jsx:29` | JWT + user object in `localStorage` → XSS-exfiltratable; protected routes enforced client-side only (server must still gate) | H |
| SC-4 | `Story.jsx:50`, `ProjectContent.jsx:119,221` | `dangerouslySetInnerHTML` on JSON-driven content. Source is repo-local JSON (not user input) → low immediate risk, but pattern is unsafe if data source ever changes | M |
| SC-5 | repo-wide | No secrets/keys in tracked files (verified: `git ls-files`, gtag ID is public by design). `.env` correctly gitignored | H |

### 3e. Performance (PF)

| ID | File:line | Evidence | Conf |
|----|-----------|----------|------|
| PF-1 | `public/` | 207 MB; ~180 MB unreferenced (DC-15); 19 files >2 MB break precache (12 MB png, 11 MB mp4) — see `build.log` | H |
| PF-2 | `dist/assets` | BlogPost chunk 740 KB (react-syntax-highlighter+prism); main vendor chunk 520 KB | H |
| PF-3 | `workbox-config.cjs` + build | Generated `service-worker.js` would precache 641 URLs/77.6 MB — unused today, catastrophic if ever registered | H |
| PF-4 | `index.html:9-46` | Over-preloading: 4 fonts + 2 hero PNGs + 6 empty hrefs; competes for early bandwidth | H |
| PF-5 | `public/images/works/**` | Full-res PNG screenshots (2–12 MB) instead of WebP/AVIF + responsive sizes | H |
| PF-6 | `public/fonts/*` + `src/assets/fonts/*` | ~39 font files shipped; only 5 @font-face in index.css | H |

### 3f. Config & build hygiene (CF)

| ID | File:line | Evidence | Conf |
|----|-----------|----------|------|
| CF-1 | repo | No tests, no test script, no CI (`.github/workflows` absent) | H |
| CF-2 | `package.json:8`, `vite.config.js:22`, `workbox-config.cjs` | Two SW generators; only vite-plugin-pwa's `sw.js` is registered — consolidate to one | H |
| CF-3 | `eslint.config.js` | BG-1 gaps: no .tsx coverage, ESM/CJS override bug, ecmaVersion | H |
| CF-4 | tsx files, no `tsconfig.json` | `BlogPost.tsx`, `BlogListing.tsx`, `NoticationSystem.tsx`, `NotificationItem.tsx` compile via esbuild with zero type safety | H |
| CF-5 | `vite.config.js:131` vs hooks | Dual env mechanism: `define process.env.BACKEND_URL` **and** `import.meta.env.VITE_BACKEND_PORT`; `VITE_BACKEND_PORT` name is misleading (it's a URL). `process.env.NODE_ENV` works only via Vite's built-in replacement | M |
| CF-6 | package.json | Missing `typecheck`/`test`/`audit` scripts; `partytown` script unused in build (`public/~partytown` is committed instead) | H |
| CF-7 | Near-duplicate CSS drifted | `About/css/aboutHero.css` ≠ `Contact/aboutHero.css` ≠ `Work/css/aboutHero.css`; `about.module.css` ×2 differ; `prefooter.module.css` ×2 (dead) | H |
| CF-8 | `.npmrc` | Fine (registry only) — informational | H |

### 3g. Accessibility & SEO (AX)

| ID | File:line | Evidence | Conf |
|----|-----------|----------|------|
| AX-1 | Multiple (ErrorBoundary.jsx:36,50, Login.jsx:112,196, …) | ≥14 `onClick` on `<div>` — not keyboard/screen-reader operable; password toggle uses `type="button"` on a div | H |
| AX-2 | `DashboardLayout.jsx:61,66`, others | `<img>` without `alt` | H |
| AX-3 | `Login.jsx` form | `.label` divs instead of `<label for>`; inputs lack aria association | M |
| AX-4 | `robots.txt` | `Disallow: /images/ /json/ /svg/` — blocks image indexing; no sitemap.xml | H |
| AX-5 | `index.html` | Title "Vickkie" vs rest "Uzitrake"; broken twitter:image (BG-4); `og:image` path `/svg/logo-clear.png` exists but is a logo, not a 1200×630 card | H |
| AX-6 | Motion | GSAP/Lenis smooth scroll + mouse-follower with no `prefers-reduced-motion` handling found | M |

### 3h. Structure & docs (ST)

| ID | File:line | Evidence | Conf |
|----|-----------|----------|------|
| ST-1 | Naming | `ForgotPasword` (sic), `NoticationSystem` (sic), `Maintainance` ×3 (sic), `useGsapMagic`, `index.css` loaded via `<link>` in index.html rather than module import | H |
| ST-2 | `Dashboard/` subtree | Profile/Notification functional, Dashboard itself empty stub — WIP left in prod routes | M |
| ST-3 | `README.md` | Screenshots only — no setup/env/build/deploy docs (`.env.example` is the only doc) | H |
| ST-4 | Mixed data sources | Content split across `src/assets/json/*.json`, `public/json/blogs.json` (fetched), and `ik.imagekit.io` — three conventions for the same job | M |
| ST-5 | Largest files | `TerminalShell.jsx` 572, `Privacy.jsx` 481, dead `SignUp.jsx` 406, dead `project.js` 373 — rest ≤300 lines, OK | H |

### 3i. Suspected — needs confirmation (NV)

| ID | Item | Why unverified |
|----|------|----------------|
| NV-1 | Whether CSP truly blocks prod traffic | Needs a deployed-prod check; analysis of header value vs. configured backend is strong but static |
| NV-2 | Which of the ~180 MB public assets are truly unused | Dynamic template paths (`/images/works/${id}/…`) can evade static scan; sample-verify each asset dir |
| NV-3 | Firebase env-dependent runtime | No `.env` present locally; `initializeApp` with undefined keys fails only at first use — dev behavior unverified |
| NV-4 | Backend contract (`/api/login`, `/api/refresh-token`) | No backend in repo; correctness of hooks unverifiable |
| NV-5 | ~~Dormant vs. dead features~~ **RESOLVED (owner):** `Dashboard`/`Profile`/`Notification` = intentional portfolio-CMS WIP → keep & build out. `TerminalShell` + `/terminal`/`/shell` = intentional "fun login path" → keep. `SignUp`, `LoginTrader`, `Maintainance`×2 = scaffold residue → delete in Phase 1. `PageTransition` — owner asked to confirm usage: verified **0 importers** and it calls `Preloader` with a nonexistent `onComplete` prop (real prop is `done`), so it's dead + broken; owner wants it kept → flag for repair-or-remove decision, not auto-delete |

## 4. Phased plan

### Phase 0 — Safety net (goal: make the repo verifiable)
Addresses: CF-1, BG-1, CF-3, CF-4, DP-4
- Fix `eslint.config.js`: `sourceType: "module"` for vite.config.js (or move it to the browser block), bump `ecmaVersion` to 2022+, add a `**/*.tsx` block (typescript-eslint) or explicitly ignore `.tsx` until TS is adopted.
- Land `npm run lint` at 0 errors: the 150 are ~90% `no-unused-vars`/`no-unescaped-entities` in files Phase 1 will delete — alternatively set `lint` to `--quiet` for errors only and let Phase 1 clear the rest.
- Add `tsconfig.json` (or rename `.tsx`→`.jsx` if TS isn't wanted) + `typecheck` script.
- Add minimal CI (GitHub Actions: `npm ci`, `lint`, `build`) — catches regressions during cleanup.
- **Effort: S-M. Risk: low. Verify:** `npm run lint` exits 0; CI green on main. **Rollback:** config-only changes, revertible.

### Phase 1 — Quick wins, zero behavior change (dead code & deps)
Addresses: DC-1…DC-14, DC-16…DC-22, DP-1…DP-3, DC-18/CF-2 (partial), BG-9 (unused import), DC-19, DC-21
- **Owner-confirmed scaffold residue** (NV-5): `SignUp.jsx+css`, `LoginTrader.jsx`, `Maintainance`×2 (+css/json), `ProjectVanilla.jsx`+`project.js`, `LottieLoad.jsx`, `Avatar.jsx`+css (also orphan `.AvatarSection` rules in `Hero.css:188-255`), `Mission.jsx`, `useGet`/`useDelete`, `config.js`, `App.css`, `Dashboard.css`, dead `src/assets/fonts/**`+json, `prefooter.module.css`×2. **Keep:** `TerminalShell`+`terminal.css`+routes (owner's fun login path — the `Login.jsx:221` link stays); `PageTransition.jsx` (0 importers + broken prop — owner intent: keep; needs repair before use).
- Remove `workbox generateSW` from build script + `workbox-config.cjs` (DC-18) — keep vite-plugin-pwa only.
- Remove deps: `crypto-js`, `intl-tel-input`, `react-lottie`, `workbox-cli` (after dropping the step) → `npm uninstall`.
- Clean `index.html`: delete empty preload hrefs, fix/remove meta CSP (BG-3), correct `twitter:image` (BG-4).
- Strip `console.log`s and commented-out blocks; remove `public/~partytown/debug` from SW precache + decide whether it belongs in git at all (`partytown` script can regenerate it); delete root `robots.txt`.
- NV-5 resolved — src deletions are owner-confirmed. Remaining gate: NV-2 sampling before touching `public/` assets.
- **Effort: M. Risk: low-med (asset deletion = the risky part; do public/ in a second pass). Verify:** `build` PASS, `lint` clean, `dist/` size drops toward ~30 MB, routes smoke-tested in preview. **Rollback:** git revert; all deletions are tracked files.

### Phase 2 — Security & correctness
Addresses: SC-1/BG-2, SC-2, SC-3, BG-5…BG-12, DP-7
- Fix `vercel.json` CSP: add `https://uzigateway.vercel.app` to `connect-src`, add `https://www.clarity.ms` (+ googletagmanager if gtag is fetched cross-origin) to `script-src`, drop the useless static `nonce`, then smoke-test login + analytics on a preview deploy.
- `npm audit fix` (non-breaking subset), then targeted upgrades for `vite` (dev-server advisory) and Firebase/`websocket-driver` chain; verify `prismjs` bump via `react-syntax-highlighter` override/upgrade.
- Replace `localStorage` JWT handling decision (at minimum document the threat model; ideally httpOnly-cookie session — backend-dependent, NV-4).
- Fix broken asset refs (svg-pathz.svg, extras.css image), Login mount refresh loop (BG-8), ProtectedRoutes double-navigate (BG-7), dedupe firebase init (BG-12), collapse duplicate routes (BG-11). Dashboard stub (BG-10) moves to Phase 4 CMS work per owner intent.
- `npx update-browserslist-db@latest`.
- **Effort: M. Risk: med (CSP + auth need a staging check). Verify:** preview-deploy login flow works, DevTools shows no CSP violations, `npm audit` ≈ 0 high/critical. **Rollback:** header change is a one-line revert; keep the old CSP handy.

### Phase 3 — Dependency & framework upgrades (ordered)
Addresses: DP-4…DP-7
- Order: (a) patch/minor bumps + `eslint-plugin-react-hooks` stable; (b) `lenis` rename migration (`npx @darkroom.engineering/codemods`); (c) vite 5→latest + plugin-react + vite-plugin-pwa 1.x together; (d) react-router 6→7 (middleware/data-API breaking notes); (e) firebase 10→12; (f) react 18→19 (check react-lottie removal first — Phase 1 unblocks this); (g) tailwind 3→4 (config format changes) — **last**, optional.
- **Effort: M-L. Risk: med-high per major — do each as its own PR with preview check. Verify:** build+lint+manual smoke per step. **Rollback:** per-package revert via git.

### Phase 4 — Refactors & structure
Addresses: ST-1…ST-5, CF-5, CF-7, BG-13, DC-2 leftovers
- Consolidate triplicated CSS (one `aboutHero.css`), merge firebase modules, fix naming typos (`ForgotPasword`→`ForgotPassword`, `NoticationSystem`→`NotificationSystem`, `Maintainance`→`Maintenance`), pick one branding identity, unify content-data convention (ST-4), build out the Dashboard stub into the intended portfolio CMS (or feature-flag the `/dashboard`+`/profile` routes until ready), move `index.css` to a module import.
- **Effort: M. Risk: low-med (rename churn). Verify:** lint+build clean, grep shows no old names. **Rollback:** trivial reverts.

### Phase 5 — Performance, a11y, tests, docs
Addresses: PF-1…PF-6, AX-1…AX-6, CF-1 (tests), ST-3
- After DC-15 verification: delete unreferenced assets, convert works/* screenshots to WebP/AVIF + `srcset`, move large media to imagekit (already used elsewhere), cap precache globs, trim `index.html` preloads to LCP asset + 1 font.
- Code-split `react-syntax-highlighter` (async import or lightweight `rehype-highlight`); review the 520 KB vendor chunk (`manualChunks`).
- A11y: real `<button>`/`<label>`/alt text; `prefers-reduced-motion` for Lenis/cursor.
- Tests: vitest + React Testing Library on auth hooks (usePost/usePut), ProtectedRoutes expiry logic, form validation schemas; optional Playwright smoke on the 6 main routes.
- README: setup, env vars, scripts, deploy/CSP notes.
- **Effort: L. Risk: med (asset migration). Verify:** Lighthouse scores improve, `du -sh public` < ~50 MB, tests green in CI. **Rollback:** CDN keeps old URLs; asset deletions tracked in git.

## 5. Not verified / blocked

- **NV-1** prod CSP impact (needs deployed preview), **NV-2** exact unused-asset list (needs sampling of dynamic paths), **NV-3** Firebase boot without `.env`, **NV-4** backend API contract (no backend/secrets in repo), **NV-5** dormant-feature intent (owner call). Test coverage and runtime profiling were not possible — no test infra and no prod URL.

## 6. Open questions for the owner

1. Which backend origin is canonical — is `uzigateway.vercel.app` live? (Determines the CSP fix.)
2. ~~Are `SignUp`, `LoginTrader`, `Maintainance`, `/terminal`, and the empty `Dashboard` dormant features or abandoned?~~ **Answered:** Dashboard subtree = intended portfolio CMS (keep); TerminalShell = intentional fun login path (keep); SignUp/LoginTrader/Maintainance = scaffold leftovers (delete); PageTransition = dead+broken but owner wants kept.
3. Canonical brand name — Vickkie, Uzitrake, or uzifolio25? (Title, PWA manifest, og:url, CSP currently disagree.)
4. Keep vite-plugin-pwa only, or was the workbox-cli SW intended to replace it?
5. Is Firebase (Firestore + Realtime DB) actively used, or legacy? It drives a large share of the vuln count. - legacy
6. Any objection to moving portfolio media to ik.imagekit.io entirely (already used for some assets)? - no objections.. what do i or you need to do?
