/**
 * Dashboard API endpoints for MobX example
 */

import type { DashboardData } from "../types";
import { delay } from "./utils";

/**
 * Fetch dashboard metrics with random values
 */
export const fetchDashboardData = async (): Promise<DashboardData> => {
  await delay(1000);

  return {
    visitors: Math.floor(Math.random() * 1000) + 500,
    pageViews: Math.floor(Math.random() * 5000) + 2000,
    bounceRate: Math.random() * 50 + 20,
    avgSessionDuration: Math.random() * 300 + 60,
  };
};
