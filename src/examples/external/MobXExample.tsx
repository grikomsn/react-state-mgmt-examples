import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { dashboardStore } from "../../stores/mobx/store.ts";

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
      up: "#2ecc71",
      down: "#e74c3c",
      neutral: "#999",
    };

    return (
      <div
        style={{
          background: "#1a1a1a",
          border: "1px solid #333",
          borderRadius: "8px",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            fontSize: "0.875rem",
            color: "#999",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </div>
        <div
          style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}
        >
          <span
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#61dafb" }}
          >
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {suffix && (
            <span style={{ fontSize: "1rem", color: "#999" }}>{suffix}</span>
          )}
        </div>
        {trend && (
          <div
            style={{
              fontSize: "0.75rem",
              color: trendColors[trend],
              marginTop: "0.25rem",
            }}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trend}
          </div>
        )}
      </div>
    );
  }
);

const DashboardMetrics = observer(() => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
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
      ? "#2ecc71"
      : dashboardStore.dataQuality === "Good"
      ? "#61dafb"
      : dashboardStore.dataQuality === "Fair"
      ? "#f39c12"
      : "#e74c3c";

  return (
    <div className="example-section">
      <h2>Computed Metrics</h2>
      <p style={{ color: "#999", fontSize: "0.875rem", marginBottom: "1rem" }}>
        These values are automatically computed from observable data using MobX
        getters
      </p>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "4px",
            padding: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              color: "#999",
              marginBottom: "0.25rem",
            }}
          >
            Conversion Rate
          </div>
          <div
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#61dafb" }}
          >
            {dashboardStore.conversionRate}%
          </div>
        </div>
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "4px",
            padding: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              color: "#999",
              marginBottom: "0.25rem",
            }}
          >
            Data Quality
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: qualityColor,
            }}
          >
            {dashboardStore.dataQuality}
          </div>
        </div>
      </div>
    </div>
  );
});

const DashboardControls = observer(() => {
  return (
    <div className="example-section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div className="button-group">
          <button
            onClick={() => dashboardStore.fetchData()}
            disabled={dashboardStore.isLoading}
          >
            {dashboardStore.isLoading ? "Loading..." : "Refresh Data"}
          </button>
          <button className="secondary" onClick={() => dashboardStore.reset()}>
            Reset
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={dashboardStore.autoRefresh}
              onChange={(e) => dashboardStore.setAutoRefresh(e.target.checked)}
            />
            <span style={{ fontSize: "0.875rem" }}>Auto-refresh</span>
          </label>

          {dashboardStore.autoRefresh && (
            <select
              value={dashboardStore.refreshInterval}
              onChange={(e) =>
                dashboardStore.setRefreshInterval(Number(e.target.value))
              }
              style={{ fontSize: "0.875rem" }}
            >
              <option value={3000}>3s</option>
              <option value={5000}>5s</option>
              <option value={10000}>10s</option>
            </select>
          )}
        </div>
      </div>

      {dashboardStore.lastUpdated && (
        <p
          style={{ margin: "0.5rem 0 0 0", fontSize: "0.75rem", color: "#999" }}
        >
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
    <div className="example-container">
      <div className="example-header">
        <h1>MobX</h1>
        <p>Real-time dashboard with observable state and computed values</p>
      </div>

      <DashboardControls />

      {dashboardStore.error && (
        <div className="error">Error: {dashboardStore.error}</div>
      )}

      <div className="example-section">
        <h2>Dashboard Metrics</h2>
        {dashboardStore.isLoading && !dashboardStore.lastUpdated ? (
          <div className="loading">Loading dashboard data...</div>
        ) : (
          <DashboardMetrics />
        )}
      </div>

      <ComputedMetrics />

      <div className="example-section">
        <h2>Observable State</h2>
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "4px",
            padding: "1rem",
          }}
        >
          <pre style={{ margin: 0, fontSize: "0.875rem" }}>
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

      <div className="example-section">
        <h2>Key Concepts</h2>
        <ul style={{ color: "#999", lineHeight: "1.8" }}>
          <li>
            <strong>MobX</strong> provides reactive state management through
            observables
          </li>
          <li>
            <code>makeAutoObservable</code> automatically makes class properties
            observable
          </li>
          <li>
            <code>observer</code> HOC makes React components reactive to
            observable changes
          </li>
          <li>
            Computed values (getters) are cached and only recompute when
            dependencies change
          </li>
          <li>
            <code>runInAction</code> ensures state modifications in async code
            are tracked
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

      <div className="example-section">
        <h2>MobX Features</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <h3
              style={{
                color: "#2ecc71",
                fontSize: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              ✓ Advantages
            </h3>
            <ul
              style={{ color: "#999", fontSize: "0.875rem", lineHeight: "1.6" }}
            >
              <li>Minimal boilerplate</li>
              <li>Automatic dependency tracking</li>
              <li>Excellent performance</li>
              <li>Computed values are efficient</li>
              <li>OOP-friendly architecture</li>
              <li>Easy to learn and use</li>
            </ul>
          </div>
          <div>
            <h3
              style={{
                color: "#61dafb",
                fontSize: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              📋 Best For
            </h3>
            <ul
              style={{ color: "#999", fontSize: "0.875rem", lineHeight: "1.6" }}
            >
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
