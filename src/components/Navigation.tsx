import { Link, useLocation } from "react-router-dom";
import { getRoutesByCategory } from "../config/routes";

const Navigation = () => {
  const location = useLocation();
  const routesByCategory = getRoutesByCategory();

  return (
    <nav className="fixed left-0 top-0 h-screen w-[280px] overflow-y-auto border-r border-gray-800 bg-gray-900 p-6 text-gray-200">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="mb-2 text-2xl text-cyan-400">React State Management</h1>
        <p className="text-sm text-gray-500">Examples & Patterns</p>
      </div>

      {routesByCategory.map(({ category, routes }) => (
        <div key={category} className="mb-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
            {category}
          </h3>
          <ul className="list-none space-y-1">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className={`block rounded px-3 py-2 text-gray-200 transition-colors ${
                    location.pathname === route.path
                      ? "bg-cyan-900/50 font-medium text-cyan-400"
                      : "hover:bg-gray-800 hover:text-cyan-400"
                  }`}
                >
                  {route.label}
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
