/**
 * Users API endpoints for SWR example
 */

import type { User } from "../types";
import { delay, maybeThrowError } from "./utils";

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    bio: "Full-stack developer passionate about React and TypeScript",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    bio: "Frontend architect specializing in state management",
  },
];

/**
 * Fetch a user by ID
 */
export const fetchUser = async (id: number): Promise<User> => {
  await delay(600);
  maybeThrowError(0.1, "Failed to fetch user");

  const user = users.find((u) => u.id === id);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Update a user by ID
 */
export const updateUser = async (
  id: number,
  updates: Partial<User>
): Promise<User> => {
  await delay(800);

  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }

  users[index] = { ...users[index], ...updates };
  return users[index];
};
