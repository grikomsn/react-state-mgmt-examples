/**
 * Barrel export for all API modules
 */

// Posts API
export { fetchPosts, createPost, deletePost } from "./posts";

// Users API
export { fetchUser, updateUser } from "./users";

// Dashboard API
export { fetchDashboardData } from "./dashboard";

// Utilities
export { delay, maybeThrowError } from "./utils";

// Re-export types
export type { Post, User, DashboardData } from "../types";
