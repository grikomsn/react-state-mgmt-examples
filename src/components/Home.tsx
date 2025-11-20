import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-4 text-4xl text-cyan-400">
        React State Management Examples
      </h1>
      <p className="mb-12 text-lg leading-relaxed text-gray-500">
        Explore comprehensive examples of various state management patterns in
        React. Each example demonstrates key concepts and best practices.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 border-b-2 border-gray-800 pb-2 text-2xl text-gray-200">
          Built-in React Hooks
        </h2>
        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          <Link
            to="/usestate"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400"
          >
            <h3 className="mb-2 text-xl text-cyan-400">useState</h3>
            <p className="text-sm text-gray-500">
              Counter with history tracking
            </p>
          </Link>
          <Link
            to="/usereducer"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400"
          >
            <h3 className="mb-2 text-xl text-cyan-400">useReducer</h3>
            <p className="text-sm text-gray-500">Todo list with filters</p>
          </Link>
          <Link
            to="/usecontext"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400"
          >
            <h3 className="mb-2 text-xl text-cyan-400">useContext</h3>
            <p className="text-sm text-gray-500">
              Theme switcher with global state
            </p>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 border-b-2 border-gray-800 pb-2 text-2xl text-gray-200">
          External State Libraries
        </h2>
        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          <Link
            to="/redux"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400"
          >
            <h3 className="mb-2 text-xl text-cyan-400">Redux Toolkit</h3>
            <p className="text-sm text-gray-500">Shopping cart with DevTools</p>
          </Link>
          <Link
            to="/zustand"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400"
          >
            <h3 className="mb-2 text-xl text-cyan-400">Zustand</h3>
            <p className="text-sm text-gray-500">
              User preferences with persistence
            </p>
          </Link>
          <Link
            to="/jotai"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400"
          >
            <h3 className="mb-2 text-xl text-cyan-400">Jotai</h3>
            <p className="text-sm text-gray-500">
              Form with atomic dependencies
            </p>
          </Link>
          <Link
            to="/mobx"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400"
          >
            <h3 className="mb-2 text-xl text-cyan-400">MobX</h3>
            <p className="text-sm text-gray-500">Real-time dashboard</p>
          </Link>
          <Link
            to="/recoil"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400"
          >
            <h3 className="mb-2 text-xl text-cyan-400">Recoil</h3>
            <p className="text-sm text-gray-500">Collaborative editor</p>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 border-b-2 border-gray-800 pb-2 text-2xl text-gray-200">
          Server State Management
        </h2>
        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          <Link
            to="/tanstack-query"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400"
          >
            <h3 className="mb-2 text-xl text-cyan-400">TanStack Query</h3>
            <p className="text-sm text-gray-500">
              Posts with pagination and mutations
            </p>
          </Link>
          <Link
            to="/swr"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-400"
          >
            <h3 className="mb-2 text-xl text-cyan-400">SWR</h3>
            <p className="text-sm text-gray-500">
              User profile with revalidation
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
