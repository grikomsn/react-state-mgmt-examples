/**
 * Shared utilities for API mocking
 */

/**
 * Simulates network delay
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates occasional random errors
 */
export const maybeThrowError = (probability: number, message: string) => {
  if (Math.random() < probability) {
    throw new Error(message);
  }
};
