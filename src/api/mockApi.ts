// Mock API for server state examples

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

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Posts API
export const fetchPosts = async (
  page = 1,
  limit = 3
): Promise<{ posts: Post[]; total: number }> => {
  await delay(800);

  // Simulate occasional error
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch posts");
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    posts: posts.slice(start, end),
    total: posts.length,
  };
};

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

export const deletePost = async (id: number): Promise<void> => {
  await delay(500);
  posts = posts.filter((post) => post.id !== id);
};

// Users API
export const fetchUser = async (id: number): Promise<User> => {
  await delay(600);

  // Simulate occasional error
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch user");
  }

  const user = users.find((u) => u.id === id);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

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

// Dashboard data for MobX example
export interface DashboardData {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
  await delay(1000);

  return {
    visitors: Math.floor(Math.random() * 1000) + 500,
    pageViews: Math.floor(Math.random() * 5000) + 2000,
    bounceRate: Math.random() * 50 + 20,
    avgSessionDuration: Math.random() * 300 + 60,
  };
};
