# Agent Guidelines for react-state-mgmt-examples

## Build & Test

- **Install**: `bun install`
- **Dev**: `bun dev` (Vite on port 5173)
- **Build**: `bun run build`
- **Lint**: `bun lint`
- No test suite configured.

## Tooling

- Package manager: **Bun** (no npm/pnpm/yarn in commands).
- TypeScript: strict, ES2022, React JSX; use `import type { ... } from "../types"`.

## Styling & UI

- Tailwind CSS v4 via `src/index.css` with design tokens and dark mode.
- Prefer shadcn UI components in `src/components/ui/`.
- Use layout primitives in `src/components/layout/` (`ExampleLayout`, `PageHeader`, `PageContent`).

## Code & Architecture

- Imports: React Router from `"react-router-dom"`, local code via relative paths.
- Types and interfaces: `src/types/index.ts` is the single source of truth.
- Components and utilities: arrow functions, camelCase, PascalCase for components.
- API layer: `src/api/` (`posts.ts`, `users.ts`, `dashboard.ts`).
- State layer: Redux, Zustand, MobX in `src/stores/` with a barrel export.
- Examples: `src/examples/` wired through `src/config/routes.ts`; avoid prop drilling by using the provided state libraries and context.
