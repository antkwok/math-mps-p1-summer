# Flutter -> Svelte TypeScript Web PWA Implementation Plan

This plan helps you migrate your existing Flutter math practice app to a lightweight Svelte + TypeScript PWA in WebStorm, with Gemini Code Assist for faster implementation.

---

## Goals
- Keep existing learning flow from Flutter (Part A + Part B).
- Make it installable on phone/tablet/desktop as a PWA.
- Add child-friendly motivation UX (progress, stars, celebration).
- Keep code easy to maintain with modular TypeScript + Svelte components.

---

## Recommended Stack
- Framework: `Vite + Svelte + TypeScript`
- Styling: `Tailwind CSS` (optional but recommended)
- PWA: `vite-plugin-pwa`
- State: Svelte `writable` stores
- Persistence: `localStorage`

---

## Migration Checklist (Flutter -> Svelte)

### Phase 1 - Project Bootstrap (Svelte + PWA)
- [x] Create project in WebStorm terminal.
- [x] Install PWA plugin and configure `manifest` + service worker.
- [x] Confirm app is installable and supports offline caching (manual browser check).

Commands:
```zsh
npm create vite@latest math-pwa -- --template svelte-ts
cd math-pwa
npm install
npm install -D vite-plugin-pwa tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Gemini prompt:
> Help me configure `vite.config.ts` for a Svelte TypeScript app with `vite-plugin-pwa`. This is a primary-school math practice app. Use standalone display mode, amber theme color, and offline support for app shell assets.

---

### Phase 2 - Core Logic Extraction (Dart -> TypeScript)
- [x] Move pure logic from Flutter to `src/lib/utils/`.
- [x] Implement `convertNumberToWord(num: number): string` for 100-999.
- [x] Implement random card generators for Part A and Part B.

Suggested files:
- `src/lib/utils/numberToWord.ts`
- `src/lib/utils/random.ts`
- `src/lib/types/practice.ts`

Gemini prompt:
> Convert this Dart function into strict TypeScript: number to English words from 100 to 999 with proper British-style "and" (e.g., 102 -> one hundred and two).

---

### Phase 3 - State Management (Flutter setState -> Svelte stores)
- [x] Create central store for daily progress and generated questions.
- [x] Keep Part A/Part B counters with goals (5 and 10).
- [x] Add derived progress percentage and completion flag.
- [x] Add reset action for daily restart.

Suggested files:
- `src/lib/stores/practiceStore.ts`

Gemini prompt:
> Build a Svelte writable store in TypeScript for a daily math app with Part A and Part B progress, generated values, toggles for showing answers, stars, and reset methods.

---

### Phase 4 - UI Components (Child-friendly learning flow)
- [x] Build `ProgressCard.svelte` for daily progress and celebration banner.
- [x] Build `PartASection.svelte` (3-digit card draw + show/hide English word).
- [x] Build `PartBSection.svelte` (1-19 draw + addition/subtraction + show/hide answers).
- [x] Add simple animation when 100% completed.

Suggested component structure:
- `src/lib/components/ProgressCard.svelte`
- `src/lib/components/PartASection.svelte`
- `src/lib/components/PartBSection.svelte`
- `src/App.svelte`

Gemini prompt:
> Create a Svelte + TypeScript component for a child-friendly daily progress card. Total 15 tasks (Part A 5, Part B 10). At 100%, show a celebration message and crown animation.

---

### Phase 5 - Local Persistence + Motivation
- [x] Persist progress, stars, and last active date via `localStorage`.
- [x] Reset counters automatically when date changes.
- [x] Add encouraging messages after each generated question.

Suggested file:
- `src/lib/services/storage.ts`

Gemini prompt:
> Implement TypeScript helpers for localStorage to save and load daily progress safely. Include schema validation defaults to avoid app crash if data is missing/corrupted.

---

### Phase 6 - QA, Offline, and Deployment
- [x] Run local build and preview.
- [x] Verify service worker + manifest in Chrome DevTools Application tab (manual check needed).
- [x] Test install flow on mobile and desktop (manual check needed).
- [x] Deploy to GitHub Pages.

Commands:
```zsh
npm run build
npm run preview
```

---

## Flutter to Svelte Mapping Guide
- `StatefulWidget + setState` -> Svelte `writable` store + reactive bindings
- Dart utility methods -> TypeScript utility modules
- Flutter widget sections -> Svelte components
- `show/hide` booleans -> component/store booleans with `{#if}` rendering
- AppBar actions -> top toolbar buttons in `App.svelte`

---

## Suggested Minimal Milestone Plan
1. P0: App shell + PWA setup complete.
2. P1: Part A fully functional.
3. P2: Part B fully functional.
4. P3: Progress + stars + completion celebration.
5. P4: LocalStorage daily persistence.
6. P5: Polish UI + deploy.

---

## Done Criteria
- Student can generate Part A and Part B questions by themselves.
- Answers are hidden by default and can be revealed.
- Daily target (15 tasks) is visible and motivating.
- Completion triggers positive feedback and star reward.
- App works offline after first load and is installable as PWA.

---

## WebStorm + Gemini Practical Tips
1. Keep each prompt focused on one file or one feature.
2. Use `@file` context for Gemini (example: `@file src/lib/stores/practiceStore.ts`).
3. Ask Gemini to output strict TypeScript and avoid `any`.
4. After each generated file, run `npm run build` to catch type errors early.
