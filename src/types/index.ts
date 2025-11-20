/**
 * Centralized type definitions for the React State Management Examples project
 */

// ============================================================================
// API Types
// ============================================================================

export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

export interface DashboardData {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

// ============================================================================
// Redux Store Types
// ============================================================================

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// ============================================================================
// Zustand Store Types
// ============================================================================

export interface UserPreferences {
  name: string;
  email: string;
  notifications: boolean;
  theme: "light" | "dark" | "auto";
  fontSize: "small" | "medium" | "large";
  autoSave: boolean;
}

export interface UIState {
  sidebarOpen: boolean;
  layoutMode: "compact" | "comfortable" | "spacious";
}

// ============================================================================
// Route Configuration Types
// ============================================================================

export interface RouteConfig {
  path: string;
  label: string;
  category: string;
  component: React.ComponentType;
}
