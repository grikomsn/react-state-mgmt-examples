# Architecture Documentation

## Overview

This project demonstrates various state management approaches in React through a clean, modular architecture optimized for learning and maintainability.

## Design Principles

### 1. Separation of Concerns

Each layer of the application has a clear responsibility:

- **API Layer**: Handles data fetching and mutations
- **State Layer**: Manages application state
- **Component Layer**: Renders UI and handles user interactions
- **Configuration Layer**: Centralizes app configuration

### 2. Type Safety

TypeScript is used throughout with:

- Centralized type definitions in `src/types/`
- Strict mode enabled for maximum safety
- Type-only imports where applicable
- Explicit return types for functions

### 3. Code Reusability

The architecture promotes DRY principles through:

- Shared component library
- Barrel exports for simplified imports
- Utility CSS classes
- Common configuration files

## Project Structure

### API Layer (`src/api/`)

Domain-driven API organization:

```
api/
├── posts.ts      # Post-related endpoints (TanStack Query)
├── users.ts      # User-related endpoints (SWR)
├── dashboard.ts  # Dashboard endpoints (MobX)
├── utils.ts      # Shared utilities (delay, error simulation)
└── index.ts      # Barrel export
```

**Benefits:**

- Easy to locate API functions
- Clear ownership of endpoints
- Testable in isolation
- Prevents circular dependencies

### Type System (`src/types/`)

Centralized type definitions:

```typescript
// API Types
export interface Post { ... }
export interface User { ... }
export interface DashboardData { ... }

// Store Types
export interface Product { ... }
export interface CartItem { ... }
export interface UserPreferences { ... }

// Component Types
export interface RouteConfig { ... }
export interface ExampleLayoutProps { ... }
```

**Benefits:**

- Single source of truth for types
- Easy to maintain and update
- Prevents type duplication
- Improves IDE autocomplete

### Component Architecture (`src/components/`)

```
components/
├── shared/           # Reusable components
│   ├── ExampleLayout.tsx
│   ├── StateViewer.tsx
│   ├── ConceptsList.tsx
│   └── index.ts
├── Home.tsx          # Landing page
└── Navigation.tsx    # Sidebar navigation
```

**Shared Components:**

1. **ExampleLayout**: Wraps all examples with consistent header
2. **StateViewer**: Displays JSON state for debugging
3. **ConceptsList**: Renders educational bullet points

### Configuration (`src/config/`)

Centralized configuration for:

- **Route Configuration**: All routes in one place
- **Type-safe routing**: Route metadata with components
- **Easy navigation generation**: Category grouping built-in

```typescript
export const routes: RouteConfig[] = [
  {
    path: "/usestate",
    label: "useState",
    category: "Built-in Hooks",
    component: UseStateExample,
  },
  // ...
];
```

### State Management (`src/stores/`)

Each store demonstrates a different approach:

- **Redux**: `stores/redux/` - Slice-based architecture
- **Zustand**: `stores/zustand/` - Minimal with middleware
- **MobX**: `stores/mobx/` - Class-based observables

Barrel export (`stores/index.ts`) provides unified access.

### Examples (`src/examples/`)

Organized by category:

```
examples/
├── built-in/         # useState, useReducer, useContext
├── external/         # Redux, Zustand, Jotai, MobX, Recoil
├── server-state/     # TanStack Query, SWR
└── index.ts          # Barrel export
```

Each example follows the same pattern:

1. Import dependencies
2. Define types/interfaces
3. Implement state logic
4. Render UI with examples
5. Include educational content

## Data Flow

### Client State Flow

```
User Action → Component → State Manager → Component Re-render
```

Examples:

- **Local State**: Component → useState/useReducer
- **Global State**: Component → Redux/Zustand/etc → All Subscribers
- **Context**: Component → Context API → Consumers

### Server State Flow

```
Component → Query Hook → API Layer → Network → Cache → Component
```

Examples:

- **TanStack Query**: Automatic caching, background refetching
- **SWR**: Stale-while-revalidate, optimistic updates

## Styling Strategy

### Utility-First Approach

CSS utility classes defined in `App.css`:

```css
.flex-center {
  display: flex;
  align-items: center;
}
.gap-md {
  gap: 1rem;
}
.text-muted {
  color: #999;
}
.mb-md {
  margin-bottom: 1rem;
}
```

**Benefits:**

- Smaller bundle size
- Consistent spacing/colors
- Faster development
- Easy to maintain

### Component-Specific Styles

Colocated CSS files for complex components:

- `Navigation.css`
- `Home.css`

## State Management Comparison

| Approach       | Best For            | Complexity | Bundle Size |
| -------------- | ------------------- | ---------- | ----------- |
| useState       | Local state         | Low        | Minimal     |
| useReducer     | Complex state logic | Medium     | Minimal     |
| useContext     | Global UI state     | Low        | Minimal     |
| Redux Toolkit  | Large apps          | High       | Large       |
| Zustand        | Simple global state | Low        | Small       |
| Jotai          | Atomic state        | Medium     | Small       |
| MobX           | Observable data     | Medium     | Medium      |
| Recoil         | Dynamic atoms       | Medium     | Medium      |
| TanStack Query | Server state        | Medium     | Medium      |
| SWR            | Server state        | Low        | Small       |

## Performance Considerations

### Code Splitting

- Route-based splitting via React Router
- Dynamic imports for heavy libraries
- Lazy loading where applicable

### Bundle Optimization

- Barrel exports enable tree-shaking
- Type-only imports don't add runtime code
- Utility classes reduce inline styles
- Modular API prevents importing unused endpoints

### Runtime Performance

- Proper React hooks usage
- Memoization where needed
- Optimistic updates for better UX
- Debouncing for expensive operations

## Best Practices

### Imports

✅ **Do:**

```typescript
import { store } from "../../stores";
import type { Product } from "../../types";
```

❌ **Don't:**

```typescript
import { store } from "../../stores/redux/store.ts";
import { Product } from "../../stores/redux/store.ts";
```

### Types

✅ **Do:**

```typescript
import type { User } from "../../types";
```

❌ **Don't:**

```typescript
import { User } from "../../api/users";
```

### Components

✅ **Do:**

```typescript
<div className="flex-center gap-md">
```

❌ **Don't:**

```typescript
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
```

## Testing Strategy

While tests aren't included in this educational project, recommended approach:

1. **Unit Tests**: Individual components and utilities
2. **Integration Tests**: State management flows
3. **E2E Tests**: User journeys through examples

## Future Enhancements

Potential improvements:

- Add test suite (Vitest + React Testing Library)
- Implement error boundaries
- Add loading states across all examples
- Create comparison dashboard
- Add search/filter functionality
- Implement code syntax highlighting
- Add copy-to-clipboard for code examples

## Learning Path

Recommended order for studying examples:

1. **useState** - Foundation
2. **useReducer** - Complex state
3. **useContext** - Sharing state
4. **Zustand** - Simple external state
5. **Redux Toolkit** - Enterprise solution
6. **Jotai** - Atomic approach
7. **MobX** - Observable pattern
8. **Recoil** - Facebook's approach
9. **TanStack Query** - Server state
10. **SWR** - Alternative server state

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Zustand](https://github.com/pmndrs/zustand)
- [Jotai](https://jotai.org)
- [MobX](https://mobx.js.org)
- [Recoil](https://recoiljs.org)
- [TanStack Query](https://tanstack.com/query)
- [SWR](https://swr.vercel.app)

## Contributing

When adding new examples or features:

1. Follow existing file structure
2. Use centralized types
3. Add barrel exports
4. Include educational content
5. Update documentation
6. Test across all examples
