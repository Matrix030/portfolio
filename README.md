# Portfolio

An interactive developer portfolio built as a Linux desktop simulation — complete with a tiling window manager, multi-workspace navigation, lock screen, and a live tech graph. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Tiling window manager (Dwindle layout)** — Workspace 1 renders content in a recursive binary split tree, with draggable/resizable panes and live split handles. Windows can be opened, closed, swapped, and repositioned to any edge.
- **Three workspaces** — Switch with keyboard keys `1`/`2`/`3` or the Waybar taskbar. Each workspace fades in/out via Framer Motion.
- **D3 tech graph** — Workspace 2 renders an interactive force-directed graph of technologies.
- **GitHub activity feed** — Live GitHub contribution data fetched via a Next.js API route.
- **Resume/CV viewer** — Workspace 3 displays a master document with full-page rendering.
- **Lock screen** — Overlays the desktop on first load; dismissible to reveal the workspace.
- **Onboarding tutorial** — Hints guide first-time visitors through the UI.
- **Mobile layout** — Fully separate responsive layout activates at ≤768px.
- **Catppuccin theme** — Consistent palette (`crust`, `mantle`, `base`, `surface0`–`surface2`, `lavender`, `blue`, etc.) via Tailwind config.

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS + Catppuccin palette |
| Animation | Framer Motion |
| Data Viz | D3.js |
| Fonts | JetBrains Mono, CaskaydiaCove Nerd Font |

## Getting Started

```bash
npm install
npm run dev   # http://localhost:3000
```

Other commands:

```bash
npm run build  # Production build
npm run lint   # ESLint
npm start      # Run production server
```

## Architecture

The app is organized around three workspaces managed by `WorkspaceManager.tsx`:

- **Workspace 1** — `DwindleDesktop` renders content windows (Projects, Experience, Education, About, Skills) in a tiling layout driven by the `computeLayout` function in `src/lib/dwindle.ts`. The layout tree is a recursive `TreeNode` structure of `WindowNode` and `SplitNode` types; splits alternate direction based on depth.
- **Workspace 2** — `TechGraph` (D3 force graph, 60%) + `GitHubActivity` feed (40%).
- **Workspace 3** — `MasterDocViewer` for resume/CV.

The dwindle algorithm in `src/lib/dwindle.ts` supports: `computeLayout`, `openWindow`, `closeWindow`, `swapWindows`, `moveWindowToEdge`, `extractWindow`, and `updateSplitRatio`.

Path alias: `@/*` → `./src/*`
