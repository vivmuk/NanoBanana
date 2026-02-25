# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This repo contains two independent front-end React apps (no backend, no database):

| App | Directory | Framework | Dev command | Port |
|---|---|---|---|---|
| **NanoVivBanana** (primary) | `/workspace` | React 19 + Vite + Tailwind CSS 4 | `npm run dev` | 3000 |
| **Venice Multi-Chat** (secondary) | `/workspace/venice-multi-chat` | React 18 + CRA (react-scripts) | `npm start` | 3000 (use `PORT=3001 npm start` to avoid conflicts) |

Both apps call the **Venice AI API** (`https://api.venice.ai/api/v1`). A `VENICE_API_KEY` can be set via env var or entered in the root app's Settings UI (stored in `localStorage`).

### Running services

- **Root app:** `npm run dev` from `/workspace` — Vite dev server on port 3000 with HMR.
- **Venice Multi-Chat:** `PORT=3001 npm start` from `/workspace/venice-multi-chat` — CRA dev server on port 3001.
- Run both simultaneously by using different ports as shown above.

### Build & type-check

- **Root app:** `npm run build` (Vite build). TypeScript check: `npx tsc --noEmit` (has pre-existing `import.meta.env` type errors that don't affect the build).
- **Venice Multi-Chat:** `npm run build` from `venice-multi-chat/`. Lint is embedded in `react-scripts build`.

### Known caveats

- The root project has no dedicated lint script; TypeScript checking via `npx tsc --noEmit` is the closest equivalent. It reports pre-existing errors about `import.meta.env` (Vite types) which do not affect runtime or builds.
- Venice Multi-Chat has a pre-existing runtime bug: without a valid API key, the model-fetch response is not an array, causing `availableModels.map is not a function`. The app builds and its dev server starts, but the UI crashes on load without an API key.
- When running both apps simultaneously, assign different ports to avoid collisions (root stays on 3000, venice-multi-chat on 3001).
