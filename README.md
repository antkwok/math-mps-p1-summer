# P.2 Summer Math PWA (Svelte + TypeScript)

A Web PWA migration of the original Flutter math practice app.

## Current status
- Phase 1 complete: Vite + Svelte + TypeScript + PWA setup
- Phase 2 complete: core logic extracted to TypeScript utilities
- Phase 3 complete: centralized Svelte store for app state and daily progress
- Phase 4 complete: child-friendly UI components wired to the store
- Phase 5 complete: localStorage persistence with automatic next-day reset
- Phase 6 started: build/preview verification done, browser install/offline checks pending

## Project structure
- `src/lib/types/practice.ts` - shared domain types and limits
- `src/lib/utils/numberToWord.ts` - 100 to 999 number-to-word converter
- `src/lib/utils/random.ts` - Part A and Part B random question generators
- `src/lib/dev/phase2-smoke.ts` - tiny smoke-test runner for Phase 2 logic
- `src/lib/stores/practiceStore.ts` - writable store + actions + derived progress
- `src/lib/dev/phase3-smoke.ts` - tiny smoke-test runner for Phase 3 store behavior
- `src/lib/components/ProgressCard.svelte` - mission progress + celebration banner
- `src/lib/components/PartASection.svelte` - Part A card draw and word check UI
- `src/lib/components/PartBSection.svelte` - Part B equations and answer reveal UI
- `src/App.svelte` - top-level app layout connected to store actions
- `src/lib/services/storage.ts` - validated localStorage read/write helpers
- `src/lib/dev/phase5-smoke.ts` - smoke test for persistence and date reset rules

## Scripts
```zsh
npm run dev
npm run build
npm run preview
npm run check
npm run phase2:smoke
npm run phase3:smoke
npm run phase5:smoke
```

## Quick start
```zsh
npm install
npm run phase2:smoke
npm run phase3:smoke
npm run phase5:smoke
npm run dev
```

## Notes
- `convertNumberToWord(num)` throws for out-of-range or non-integer input.
- Part A generator guarantees values from 100 to 999.
- Part B generator guarantees values from 1 to 19 and uses bigger-minus-smaller for subtraction.

## Phase 6 checklist (manual)
1. Build and preview locally:
   ```zsh
   npm run build
   npm run preview -- --host
   ```
2. Open Chrome DevTools -> Application:
   - Confirm `manifest.webmanifest` is detected.
   - Confirm Service Worker is installed and activated.
   - Confirm Cache Storage has precached assets.
3. Test install flow:
   - Desktop Chrome: use install icon in address bar.
   - Mobile Chrome/Safari: Add to Home Screen.
4. Deploy static `dist/` output:
   - Vercel: Framework = Vite, build command `npm run build`, output `dist`.
   - Netlify: build command `npm run build`, publish directory `dist`.

## Deploy to GitHub Pages
1. Push this repository to GitHub (default branch `main`).
2. In GitHub -> Settings -> Pages:
   - Build and deployment: `GitHub Actions`.
3. Ensure workflow file exists at `/.github/workflows/deploy-gh-pages.yml`.
4. Push to `main` (or manually run workflow from Actions tab).
5. After deployment, site URL is:
   - `https://<your-github-username>.github.io/<your-repo-name>/`

This project is in `math-pwa/`, so the workflow builds from that folder and publishes `math-pwa/dist`.

