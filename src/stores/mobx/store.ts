import { makeAutoObservable, runInAction } from "mobx";
import { fetchDashboardData } from "../../api";
import type { DashboardData } from "../../types";

class DashboardStore {
  data: DashboardData = {
    visitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
  };

  isLoading = false;
  error: string | null = null;
  lastUpdated: Date | null = null;
  autoRefresh = true;
  refreshInterval = 5000;

  constructor() {
    makeAutoObservable(this);
  }

  get conversionRate() {
    if (this.data.visitors === 0) return 0;
    return ((this.data.pageViews / this.data.visitors) * 10).toFixed(2);
  }

  get formattedSessionDuration() {
    const minutes = Math.floor(this.data.avgSessionDuration / 60);
    const seconds = Math.floor(this.data.avgSessionDuration % 60);
    return `${minutes}m ${seconds}s`;
  }

  get dataQuality() {
    if (this.data.bounceRate < 30) return "Excellent";
    if (this.data.bounceRate < 50) return "Good";
    if (this.data.bounceRate < 70) return "Fair";
    return "Poor";
  }

  async fetchData() {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await fetchDashboardData();
      runInAction(() => {
        this.data = data;
        this.lastUpdated = new Date();
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Failed to fetch data";
        this.isLoading = false;
      });
    }
  }

  setAutoRefresh(value: boolean) {
    this.autoRefresh = value;
  }

  setRefreshInterval(value: number) {
    this.refreshInterval = value;
  }

  reset() {
    this.data = {
      visitors: 0,
      pageViews: 0,
      bounceRate: 0,
      avgSessionDuration: 0,
    };
    this.lastUpdated = null;
    this.error = null;
  }
}

export const dashboardStore = new DashboardStore();
