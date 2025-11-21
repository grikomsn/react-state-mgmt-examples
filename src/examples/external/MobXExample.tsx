import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { dashboardStore } from "../../stores/mobx/store";
import { ViewSourceLink } from "../../components/ui";

const StatCard = observer(
  ({
    title,
    value,
    suffix = "",
    trend,
  }: {
    title: string;
    value: number | string;
    suffix?: string;
    trend?: "up" | "down" | "neutral";
  }) => {
    const trendColors = {
      up: "text-green-400",
      down: "text-red-400",
      neutral: "text-gray-500",
    };

    return (
      <div className="rounded-lg border border-gray-800 bg-gray-950 p-6">
        <div className="mb-2 text-sm text-gray-500">{title}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-cyan-400">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {suffix && <span className="text-base text-gray-500">{suffix}</span>}
        </div>
        {trend && (
          <div className={`mt-1 text-xs ${trendColors[trend]}`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trend}
          </div>
        )}
      </div>
    );
  }
);

const DashboardMetrics = observer(() => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      <StatCard
        title="Visitors"
        value={dashboardStore.data.visitors}
        trend="up"
      />
      <StatCard
        title="Page Views"
        value={dashboardStore.data.pageViews}
        trend="up"
      />
      <StatCard
        title="Bounce Rate"
        value={dashboardStore.data.bounceRate.toFixed(1)}
        suffix="%"
        trend="down"
      />
      <StatCard
        title="Avg Session"
        value={dashboardStore.formattedSessionDuration}
        trend="neutral"
      />
    </div>
  );
});

const ComputedMetrics = observer(() => {
  const qualityColor =
    dashboardStore.dataQuality === "Excellent"
      ? "text-green-400"
      : dashboardStore.dataQuality === "Good"
      ? "text-cyan-400"
      : dashboardStore.dataQuality === "Fair"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Computed Metrics</h2>
      <p className="mb-4 text-sm text-gray-500">
        These values are automatically computed from observable data using MobX
        getters
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded border border-gray-800 bg-gray-950 p-4">
          <div className="mb-1 text-sm text-gray-500">Conversion Rate</div>
          <div className="text-2xl font-bold text-cyan-400">
            {dashboardStore.conversionRate}%
          </div>
        </div>
        <div className="rounded border border-gray-800 bg-gray-950 p-4">
          <div className="mb-1 text-sm text-gray-500">Data Quality</div>
          <div className={`text-2xl font-bold ${qualityColor}`}>
            {dashboardStore.dataQuality}
          </div>
        </div>
      </div>
    </div>
  );
});

const DashboardControls = observer(() => {
  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => dashboardStore.fetchData()}
            disabled={dashboardStore.isLoading}
            className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-gray-950 transition-all hover:bg-cyan-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {dashboardStore.isLoading ? "Loading..." : "Refresh Data"}
          </button>
          <button
            onClick={() => dashboardStore.reset()}
            className="rounded border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 transition-all hover:bg-gray-700 active:scale-95"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={dashboardStore.autoRefresh}
              onChange={(e) => dashboardStore.setAutoRefresh(e.target.checked)}
              className="h-4 w-4 cursor-pointer"
            />
            <span className="text-sm text-gray-200">Auto-refresh</span>
          </label>

          {dashboardStore.autoRefresh && (
            <select
              value={dashboardStore.refreshInterval}
              onChange={(e) =>
                dashboardStore.setRefreshInterval(Number(e.target.value))
              }
              className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
            >
              <option value={3000}>3s</option>
              <option value={5000}>5s</option>
              <option value={10000}>10s</option>
            </select>
          )}
        </div>
      </div>

      {dashboardStore.lastUpdated && (
        <p className="mt-2 text-xs text-gray-500">
          Last updated: {dashboardStore.lastUpdated.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
});

const MobXExample = observer(() => {
  useEffect(() => {
    // Initial fetch
    dashboardStore.fetchData();

    // Auto-refresh setup
    let intervalId: number | undefined;

    const setupAutoRefresh = () => {
      if (dashboardStore.autoRefresh) {
        intervalId = window.setInterval(() => {
          dashboardStore.fetchData();
        }, dashboardStore.refreshInterval);
      }
    };

    setupAutoRefresh();

    // Cleanup on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  // Re-setup interval when auto-refresh settings change
  useEffect(() => {
    let intervalId: number | undefined;

    if (dashboardStore.autoRefresh) {
      intervalId = window.setInterval(() => {
        dashboardStore.fetchData();
      }, dashboardStore.refreshInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [dashboardStore.autoRefresh, dashboardStore.refreshInterval]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 border-b-2 border-gray-800 pb-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl text-cyan-400">MobX</h1>
            <p className="text-gray-500">
              Real-time dashboard with observable state and computed values
            </p>
          </div>
          <ViewSourceLink url={import.meta.url} />
        </div>
      </div>

      <DashboardControls />

      {dashboardStore.error && (
        <div className="mb-6 rounded border border-red-800 bg-red-900/30 p-4 text-red-200">
          Error: {dashboardStore.error}
        </div>
      )}

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Dashboard Metrics</h2>
        {dashboardStore.isLoading && !dashboardStore.lastUpdated ? (
          <div className="py-8 text-center text-gray-500">
            Loading dashboard data...
          </div>
        ) : (
          <DashboardMetrics />
        )}
      </div>

      <ComputedMetrics />

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Observable State</h2>
        <div className="rounded border border-gray-800 bg-gray-950 p-4">
          <pre className="m-0 text-sm">
            {JSON.stringify(
              {
                data: dashboardStore.data,
                isLoading: dashboardStore.isLoading,
                error: dashboardStore.error,
                autoRefresh: dashboardStore.autoRefresh,
                refreshInterval: dashboardStore.refreshInterval,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Key Concepts</h2>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              MobX
            </code>{" "}
            provides reactive state management through observables
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              makeAutoObservable
            </code>{" "}
            automatically makes class properties observable
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              observer
            </code>{" "}
            HOC makes React components reactive to observable changes
          </li>
          <li>
            Computed values (getters) are cached and only recompute when
            dependencies change
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              runInAction
            </code>{" "}
            ensures state modifications in async code are tracked
          </li>
          <li>
            Fine-grained reactivity - components only re-render when observables
            they use change
          </li>
          <li>Object-oriented approach with classes and methods</li>
          <li>
            Automatic dependency tracking - no manual subscriptions needed
          </li>
        </ul>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">MobX Features</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-base text-green-400">✓ Advantages</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Minimal boilerplate</li>
              <li>Automatic dependency tracking</li>
              <li>Excellent performance</li>
              <li>Computed values are efficient</li>
              <li>OOP-friendly architecture</li>
              <li>Easy to learn and use</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-base text-cyan-400">📋 Best For</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Complex domain models</li>
              <li>Real-time data dashboards</li>
              <li>Applications with computed values</li>
              <li>When you prefer OOP patterns</li>
              <li>Large applications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MobXExample;
