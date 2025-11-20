/**
 * Posts API endpoints for TanStack Query example
 */

import type { Post } from "../types";
import { delay, maybeThrowError } from "./utils";

// Mock data
let posts: Post[] = [
  {
    id: 1,
    title: "Getting Started with React",
    body: "React is a JavaScript library for building user interfaces...",
    author: "John Doe",
    createdAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: 2,
    title: "Understanding State Management",
    body: "State management is crucial for building scalable React applications...",
    author: "Jane Smith",
    createdAt: new Date("2024-01-20").toISOString(),
  },
  {
    id: 3,
    title: "TypeScript Best Practices",
    body: "TypeScript adds static typing to JavaScript...",
    author: "Bob Johnson",
    createdAt: new Date("2024-02-01").toISOString(),
  },
  {
    id: 4,
    title: "Advanced React Patterns",
    body: "Learn about render props, HOCs, and hooks...",
    author: "Alice Williams",
    createdAt: new Date("2024-02-10").toISOString(),
  },
  {
    id: 5,
    title: "Performance Optimization in React",
    body: "Tips and tricks for making your React app faster...",
    author: "Charlie Brown",
    createdAt: new Date("2024-02-15").toISOString(),
  },
];

/**
 * Fetch posts with pagination
 */
export const fetchPosts = async (
  page = 1,
  limit = 3
): Promise<{ posts: Post[]; total: number }> => {
  await delay(800);
  maybeThrowError(0.1, "Failed to fetch posts");

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    posts: posts.slice(start, end),
    total: posts.length,
  };
};

/**
 * Create a new post
 */
export const createPost = async (
  post: Omit<Post, "id" | "createdAt">
): Promise<Post> => {
  await delay(1000);

  const newPost: Post = {
    ...post,
    id: posts.length + 1,
    createdAt: new Date().toISOString(),
  };

  posts = [newPost, ...posts];
  return newPost;
};

/**
 * Delete a post by ID
 */
export const deletePost = async (id: number): Promise<void> => {
  await delay(500);
  posts = posts.filter((post) => post.id !== id);
};
