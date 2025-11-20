/**
 * Centralized route configuration for the application
 */

import {
  UseStateExample,
  UseReducerExample,
  UseContextExample,
  ReduxExample,
  ZustandExample,
  JotaiExample,
  MobXExample,
  RecoilExample,
  TanStackQueryExample,
  SWRExample,
} from "../examples";
import Home from "../components/Home";
import type { RouteConfig } from "../types";

export const routes: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    category: "General",
    component: Home,
  },
  {
    path: "/usestate",
    label: "useState",
    category: "Built-in Hooks",
    component: UseStateExample,
  },
  {
    path: "/usereducer",
    label: "useReducer",
    category: "Built-in Hooks",
    component: UseReducerExample,
  },
  {
    path: "/usecontext",
    label: "useContext",
    category: "Built-in Hooks",
    component: UseContextExample,
  },
  {
    path: "/redux",
    label: "Redux Toolkit",
    category: "External Libraries",
    component: ReduxExample,
  },
  {
    path: "/zustand",
    label: "Zustand",
    category: "External Libraries",
    component: ZustandExample,
  },
  {
    path: "/jotai",
    label: "Jotai",
    category: "External Libraries",
    component: JotaiExample,
  },
  {
    path: "/mobx",
    label: "MobX",
    category: "External Libraries",
    component: MobXExample,
  },
  {
    path: "/recoil",
    label: "Recoil",
    category: "External Libraries",
    component: RecoilExample,
  },
  {
    path: "/tanstack-query",
    label: "TanStack Query",
    category: "Server State",
    component: TanStackQueryExample,
  },
  {
    path: "/swr",
    label: "SWR",
    category: "Server State",
    component: SWRExample,
  },
];

/**
 * Get routes grouped by category
 */
export const getRoutesByCategory = () => {
  const categories = Array.from(new Set(routes.map((route) => route.category)));
  return categories.map((category) => ({
    category,
    routes: routes.filter((route) => route.category === category),
  }));
};

/**
 * Get all unique categories
 */
export const getCategories = () => {
  return Array.from(new Set(routes.map((route) => route.category)));
};
