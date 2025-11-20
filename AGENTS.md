# Agent Guidelines for react-state-mgmt-examples

## Commands
- **Dev**: `npm run dev` or `bun dev`
- **Build**: `npm run build` (runs `tsc -b && vite build`)
- **Lint**: `npm run lint` or `bun lint`
- **Preview**: `npm run preview`
- **Tests**: No test suite configured

## Code Style
- **TypeScript**: Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- **Imports**: Use ES modules, include `.tsx` extensions for components (e.g., `import App from './App.tsx'`)
- **React**: Use functional components with hooks, JSX via `react-jsx` transform
- **Formatting**: Follow ESLint rules (recommended JS/TS + React Hooks + React Refresh)
- **Types**: Target ES2022, use explicit types, avoid `any`
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Files**: `.tsx` for React components, `.ts` for utilities
- **Error Handling**: Use TypeScript's strict null checks (`!` operator only when certain)

## Project Structure
- Source files in `src/`, built output to `dist/`
- Vite + React 19 + TypeScript 5.9
- Uses rolldown-vite (fast Vite alternative)
