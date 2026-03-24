# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Start development server (http://localhost:3000)
npm run build  # Build production bundle
npm run lint   # Run ESLint
npm start      # Run production server
```

No test suite is configured.

## Architecture

This is a Next.js 14 (App Router) portfolio site built with TypeScript, Tailwind CSS, and Framer Motion. The UI mimics a Linux desktop/tiling window manager.

### Core Concept: Three Workspaces

The app is structured around 3 workspaces managed by `WorkspaceManager.tsx`, switchable via keyboard (`1`/`2`/`3`) or the Waybar taskbar:

- **Workspace 1** — Dwindle tiling layout: draggable/resizable content windows (Projects, Experience, Education, About, Skills)
- **Workspace 2** — Split 60/40: D3 tech graph + GitHub activity feed
- **Workspace 3** — Master document viewer (resume/CV)

A `LockScreen` overlays everything on initial load; the desktop is only accessible after unlocking.

### Key Directories

- `src/app/` — Next.js App Router pages and API routes
  - `api/contributions/` — Fetches GitHub contribution data
- `src/components/` — All React components, organized by workspace:
  - `dwindle/` — Tiling WM components (`DwindleDesktop`, `DwindleWindow`, `SplitHandle`, `LauncherBar`)
  - `workspace2/` — `TechGraph` (D3), `GitHubActivity`
  - `workspace3/` — `MasterDocViewer`
  - `windows/` — Content windows rendered inside the dwindle layout
  - `mobile/` — Responsive mobile layout (activated at ≤768px via `useMediaQuery`)
- `src/lib/dwindle.ts` — Core tiling layout algorithm (`computeLayout`, `TreeNode`, `Bounds`)
- `src/hooks/useMediaQuery.ts` — Media query hook for responsive switching

### Styling

Tailwind CSS with the **Catppuccin** color palette defined in `tailwind.config.ts` (colors like `crust`, `mantle`, `base`, `surface0`–`surface2`, `lavender`, `blue`, etc.). Global styles and font imports are in `src/app/globals.css` (JetBrains Mono + CaskaydiaCove Nerd Font).

### Path Alias

`@/*` resolves to `./src/*`.
