import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <h1>React State Management Examples</h1>
      <p className="home-intro">
        Explore comprehensive examples of various state management patterns in React.
        Each example demonstrates key concepts and best practices.
      </p>

      <section className="home-section">
        <h2>Built-in React Hooks</h2>
        <div className="example-cards">
          <Link to="/usestate" className="example-card">
            <h3>useState</h3>
            <p>Counter with history tracking</p>
          </Link>
          <Link to="/usereducer" className="example-card">
            <h3>useReducer</h3>
            <p>Todo list with filters</p>
          </Link>
          <Link to="/usecontext" className="example-card">
            <h3>useContext</h3>
            <p>Theme switcher with global state</p>
          </Link>
        </div>
      </section>

      <section className="home-section">
        <h2>External State Libraries</h2>
        <div className="example-cards">
          <Link to="/redux" className="example-card">
            <h3>Redux Toolkit</h3>
            <p>Shopping cart with DevTools</p>
          </Link>
          <Link to="/zustand" className="example-card">
            <h3>Zustand</h3>
            <p>User preferences with persistence</p>
          </Link>
          <Link to="/jotai" className="example-card">
            <h3>Jotai</h3>
            <p>Form with atomic dependencies</p>
          </Link>
          <Link to="/mobx" className="example-card">
            <h3>MobX</h3>
            <p>Real-time dashboard</p>
          </Link>
          <Link to="/recoil" className="example-card">
            <h3>Recoil</h3>
            <p>Collaborative editor</p>
          </Link>
        </div>
      </section>

      <section className="home-section">
        <h2>Server State Management</h2>
        <div className="example-cards">
          <Link to="/tanstack-query" className="example-card">
            <h3>TanStack Query</h3>
            <p>Posts with pagination and mutations</p>
          </Link>
          <Link to="/swr" className="example-card">
            <h3>SWR</h3>
            <p>User profile with revalidation</p>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
