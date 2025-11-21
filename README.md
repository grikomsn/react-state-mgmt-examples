# React State Management Examples

A comprehensive showcase of various state management patterns and libraries in React, featuring practical examples with modern best practices.

## 🎯 What's Included

### Built-in React Hooks

- **useState** - Counter with history tracking
- **useReducer** - Todo list with filters and complex state transitions
- **useContext** - Theme switcher with global state management

### External State Libraries

- **Redux Toolkit** - Shopping cart with DevTools integration
- **Zustand** - User preferences with localStorage persistence
- **Jotai** - Complex form with atomic dependencies and derived state
- **MobX** - Real-time dashboard with observables and computed values
- **Recoil** - Collaborative document editor with atom families

### Server State Management

- **TanStack Query** - Posts with pagination, caching, and mutations
- **SWR** - User profile with automatic revalidation and optimistic updates

## 🚀 Getting Started

### Prerequisites

- **Bun** (recommended) or Node.js 18+

This project uses Bun for fast package management and execution. If you don't have Bun installed:

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash
```

### Installation

```bash
# Install dependencies with Bun (recommended)
bun install

# Or with npm
npm install
```

### Development

```bash
# Start the development server with Bun (recommended)
bun dev

# Or with npm
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the examples.

### Build

```bash
# Build for production with Bun (recommended)
bun run build

# Or with npm
npm run build
```

### Lint

```bash
# Run ESLint with Bun (recommended)
bun lint

# Or with npm
npm run lint
```

## 📚 Learning Resources

Each example includes:

- **Practical Implementation** - Real-world use cases
- **Key Concepts** - Important features and patterns
- **Best Practices** - When to use each approach
- **Live State Inspection** - See state changes in real-time
- **Interactive Controls** - Experiment with different scenarios

## 🛠 Tech Stack

- **React 19** - Latest React features
- **TypeScript 5.9** - Type-safe code
- **Vite** (rolldown-vite) - Fast build tool
- **React Router 7** - Client-side routing
- **ESLint** - Code quality

## 📖 Example Details

### useState

Simple state management for component-level state. Perfect for counters, toggles, and form inputs.

### useReducer

Ideal for complex state logic with multiple sub-values or when the next state depends on the previous one.

### useContext

Avoid prop drilling by providing global state access. Best for theme, authentication, and locale.

### Redux Toolkit

Industry-standard solution for large applications. Features time-travel debugging and powerful middleware.

### Zustand

Minimal and fast state management. Great for small to medium apps with simple requirements.

### Jotai

Atomic approach to state management. Excellent for forms with dependencies and derived values.

### MobX

Observable state with automatic reactivity. Ideal for complex domain models and real-time data.

### Recoil

Facebook's atomic state solution with powerful selector system and atom families for dynamic state.

### TanStack Query

The go-to solution for server state with automatic caching, background refetching, and pagination.

### SWR

Vercel's stale-while-revalidate strategy. Lightweight and perfect for real-time applications.

## 🎨 Features

- 🌙 Dark mode UI
- 📱 Responsive design
- 🎯 TypeScript throughout
- 🔄 Live state updates
- 📊 Real-time examples
- 🛠 Mock API with delays
- 💾 LocalStorage persistence
- ⚡ Fast HMR with Vite

## 📁 Project Structure

```
src/
├── api/              # API layer with domain-specific modules
│   ├── posts.ts      # Posts API endpoints
│   ├── users.ts      # Users API endpoints
│   ├── dashboard.ts  # Dashboard API endpoints
│   ├── utils.ts      # Shared API utilities
│   └── index.ts      # API barrel exports
├── components/       # React components
│   ├── shared/       # Reusable components
│   ├── Home.tsx      # Landing page
│   └── Navigation.tsx # Sidebar navigation
├── config/           # Configuration files
│   └── routes.ts     # Centralized route configuration
├── examples/         # State management examples
│   ├── built-in/     # React hooks examples
│   ├── external/     # External library examples
│   ├── server-state/ # Server state management examples
│   └── index.ts      # Examples barrel exports
├── stores/           # State management stores
│   ├── redux/        # Redux store
│   ├── zustand/      # Zustand store
│   ├── mobx/         # MobX store
│   └── index.ts      # Stores barrel exports
├── types/            # TypeScript type definitions
│   └── index.ts      # Centralized types
├── App.tsx           # Main app component
└── main.tsx          # Application entry point
```

## 🏗️ Architecture

This project follows a **modular architecture** with clear separation of concerns:

- **API Layer**: Domain-specific modules (posts, users, dashboard) with shared utilities
- **Type System**: Centralized type definitions for consistency
- **Component Library**: Reusable shared components (ExampleLayout, StateViewer, ConceptsList)
- **Configuration**: Centralized route configuration for easy maintenance
- **Barrel Exports**: Simplified imports across the codebase

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed information.

## 🎨 Styling Guidelines

This project follows a **shadcn-first** approach to styling:

### Principles

1. **Always prefer shadcn UI components** from `src/components/ui/` over custom CSS
2. **Use theme tokens** (`text-foreground`, `bg-background`, `text-muted-foreground`, etc.) instead of hardcoded colors
3. **Minimize wrapper divs** - use semantic HTML and shadcn layout components
4. **Reuse layout primitives** - use `ExampleLayout`, `PageHeader`, `PageContent` from `src/components/layout/`

### Layout Components

- **`ExampleLayout`**: Standard wrapper for example pages with title, description, and source link
- **`PageHeader`**: Consistent page headers with optional actions
- **`PageContent`**: Max-width container for page content

### When to Add a Wrapper

✅ **Good**: Using semantic HTML (`<section>`, `<article>`) or shadcn components (`<Card>`, `<Tabs>`)
✅ **Good**: Grouping related content in shadcn components
❌ **Avoid**: Purely structural `<div>` wrappers just for spacing
❌ **Avoid**: Custom CSS classes for layout that shadcn utilities can handle

### Theme Tokens

Use these theme-aware tokens instead of hardcoded colors:

- `text-foreground` / `bg-background` - Primary text/background
- `text-muted-foreground` / `bg-muted` - Secondary text/background
- `border` - Border colors
- `primary`, `secondary`, `accent` - Semantic colors
- `destructive` - Error/danger states

### Code Examples

Use the `<Kbd>` component for inline code/keyboard references instead of `<code>` tags with custom styling.

## ⚡ Performance Optimizations

- **Utility CSS Classes**: Reduced inline styles for smaller bundle size
- **Modular API**: Split API reduces unused code in bundles
- **Barrel Exports**: Tree-shaking friendly structure
- **Type Imports**: Proper type-only imports for optimal compilation

## 📝 License

This project is provided as an educational resource.

## 🤝 Contributing

Feel free to explore, learn, and adapt these examples for your own projects!
