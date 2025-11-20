# Agent Guidelines for react-state-mgmt-examples

## Build & Test Commands
- **Install**: `bun install` (preferred) or `npm install`
- **Dev**: `bun dev` (starts Vite dev server on port 5173)
- **Build**: `bun run build` (runs TypeScript compilation + Vite build)
- **Lint**: `bun lint` (runs ESLint)
- **Single test**: No test suite configured (this is a demo project)

## Package Manager
Use **Bun** instead of npm/pnpm/yarn per `.cursor/rules/use-bun-instead-of-node-vite-npm-pnpm.mdc`

## TypeScript
- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`
- Use type imports: `import type { Post } from "../types"`
- Target ES2022, JSX transform: react-jsx

## Code Style
- **Imports**: React Router from "react-router-dom", relative paths for local files
- **Types**: Centralized in `src/types/index.ts`, use interfaces over types
- **Functions**: Use arrow functions for components and utilities
- **Error handling**: Mock APIs use `maybeThrowError()` from `src/api/utils.ts`
- **Async**: Use async/await with delays via `delay()` utility
- **Naming**: camelCase for variables/functions, PascalCase for components/types

## Architecture
- API layer: Domain modules in `src/api/` (posts.ts, users.ts, dashboard.ts)
- Barrel exports: `index.ts` files for clean imports
- JSDoc comments for public APIs
- No prop drilling: Use state management libraries shown in examples
