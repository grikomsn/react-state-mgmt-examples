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

## 📝 License

This project is provided as an educational resource.

## 🤝 Contributing

Feel free to explore, learn, and adapt these examples for your own projects!
