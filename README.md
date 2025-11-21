## React State Management Examples

Examples of different React state management patterns and libraries, using a shared UI and layout.

### What's included

- **Built-in hooks**: `useState`, `useReducer`, `useContext`
- **External libraries**: Redux Toolkit, Zustand, Jotai, MobX, Recoil
- **Server state**: TanStack Query, SWR

### Getting started

- Prerequisite: **Bun** (recommended) or Node.js 18+

```bash
# Install
bun install

# Dev server (http://localhost:5173)
bun dev

# Build
bun run build

# Lint
bun lint
```

### Tech stack

- React 18, TypeScript 5.9
- Vite (rolldown-vite), React Router 7, ESLint
- Tailwind CSS 4 (via `src/index.css`)
- shadcn UI components in `src/components/ui/`

### Project structure

```text
src/
├── api/          # posts, users, dashboard, utils, index
├── components/   # layout, ui, kibo-ui, Home, Navigation
├── config/       # routes.ts
├── examples/     # built-in, external, server-state, index
├── stores/       # redux, zustand, mobx, index
├── types/        # index.ts (central types)
├── App.tsx
└── main.tsx
```

### Architecture & styling

- Domain APIs in `src/api/`, state stores in `src/stores/`, examples in `src/examples/`, routes in `src/config/routes.ts`.
- Types are centralized in `src/types/index.ts`.
- Layout primitives (`ExampleLayout`, `PageHeader`, `PageContent`) live in `src/components/layout/`.
- Prefer shadcn UI components and Tailwind utility classes over custom CSS and wrapper `div`s.
