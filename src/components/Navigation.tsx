import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

interface NavItem {
  path: string;
  label: string;
  category: string;
}

const navItems: NavItem[] = [
  { path: "/", label: "Home", category: "General" },
  { path: "/usestate", label: "useState", category: "Built-in Hooks" },
  { path: "/usereducer", label: "useReducer", category: "Built-in Hooks" },
  { path: "/usecontext", label: "useContext", category: "Built-in Hooks" },
  { path: "/redux", label: "Redux Toolkit", category: "External Libraries" },
  { path: "/zustand", label: "Zustand", category: "External Libraries" },
  { path: "/jotai", label: "Jotai", category: "External Libraries" },
  { path: "/mobx", label: "MobX", category: "External Libraries" },
  { path: "/recoil", label: "Recoil", category: "External Libraries" },
  {
    path: "/tanstack-query",
    label: "TanStack Query",
    category: "Server State",
  },
  { path: "/swr", label: "SWR", category: "Server State" },
];

const Navigation = () => {
  const location = useLocation();
  const categories = Array.from(new Set(navItems.map((item) => item.category)));

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1>React State Management</h1>
        <p className="nav-subtitle">Examples & Patterns</p>
      </div>

      {categories.map((category) => (
        <div key={category} className="nav-category">
          <h3 className="nav-category-title">{category}</h3>
          <ul className="nav-list">
            {navItems
              .filter((item) => item.category === category)
              .map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? "active" : ""}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
