import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { dashboardStore } from "../../stores/mobx/store";
import { ExampleLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Kbd } from "../../components/ui/kbd";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { createExampleSnippet } from "../../utils/example-snippets";
import rawSource from "./MobXExample.tsx?raw";

const snippet = createExampleSnippet(rawSource, "MobXExample");

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
      up: "text-green-600 dark:text-green-400",
      down: "text-red-600 dark:text-red-400",
      neutral: "text-gray-500",
    };

    return (
      <Card className="p-6">
        <div className="mb-2 text-sm text-muted-foreground">{title}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {suffix && (
            <span className="text-base text-muted-foreground">{suffix}</span>
          )}
        </div>
        {trend && (
          <div className={`mt-1 text-xs ${trendColors[trend]}`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trend}
          </div>
        )}
      </Card>
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
      ? "text-green-600 dark:text-green-400"
      : dashboardStore.dataQuality === "Good"
      ? "text-cyan-600 dark:text-cyan-400"
      : dashboardStore.dataQuality === "Fair"
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-red-600 dark:text-red-400";

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Computed Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          These values are automatically computed from observable data using
          MobX getters
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded border p-4">
            <div className="mb-1 text-sm text-muted-foreground">
              Conversion Rate
            </div>
            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              {dashboardStore.conversionRate}%
            </div>
          </div>
          <div className="rounded border p-4">
            <div className="mb-1 text-sm text-muted-foreground">
              Data Quality
            </div>
            <div className={`text-2xl font-bold ${qualityColor}`}>
              {dashboardStore.dataQuality}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

const DashboardControls = observer(() => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => dashboardStore.fetchData()}
              disabled={dashboardStore.isLoading}
              className="bg-cyan-500 text-gray-950 hover:bg-cyan-600"
            >
              {dashboardStore.isLoading ? "Loading..." : "Refresh Data"}
            </Button>
            <Button onClick={() => dashboardStore.reset()} variant="outline">
              Reset
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Label className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={dashboardStore.autoRefresh}
                onCheckedChange={(checked) =>
                  dashboardStore.setAutoRefresh(checked === true)
                }
                className="h-4 w-4"
              />
              <span className="text-sm">Auto-refresh</span>
            </Label>

            {dashboardStore.autoRefresh && (
              <Select
                value={dashboardStore.refreshInterval.toString()}
                onValueChange={(value) =>
                  dashboardStore.setRefreshInterval(Number(value))
                }
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3000">3s</SelectItem>
                  <SelectItem value="5000">5s</SelectItem>
                  <SelectItem value="10000">10s</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {dashboardStore.lastUpdated && (
          <p className="mt-2 text-xs text-muted-foreground">
            Last updated: {dashboardStore.lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
});

const MobXExample = observer(() => { // [!code highlight]
  // @example-start MobXExample
  useEffect(() => {
    // Initial fetch
    dashboardStore.fetchData(); // [!code highlight]

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
  // @example-end MobXExample

  return (
    <ExampleLayout
      title="MobX"
      description="Real-time dashboard with observable state and computed values"
      sourcePath="src/examples/external/MobXExample.tsx"
      sourceLine={237}
      snippet={snippet}
    >
      <DashboardControls />

      {dashboardStore.error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>Error: {dashboardStore.error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Dashboard Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardStore.isLoading && !dashboardStore.lastUpdated ? (
            <div className="py-8 text-center text-muted-foreground">
              Loading dashboard data...
            </div>
          ) : (
            <DashboardMetrics />
          )}
        </CardContent>
      </Card>

      <ComputedMetrics />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Observable State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded border bg-muted p-4">
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
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <Kbd>MobX</Kbd> provides reactive state management through
              observables
            </li>
            <li>
              <Kbd>makeAutoObservable</Kbd> automatically makes class properties
              observable
            </li>
            <li>
              <Kbd>observer</Kbd> HOC makes React components reactive to
              observable changes
            </li>
            <li>
              Computed values (getters) are cached and only recompute when
              dependencies change
            </li>
            <li>
              <Kbd>runInAction</Kbd> ensures state modifications in async code
              are tracked
            </li>
            <li>
              Fine-grained reactivity - components only re-render when
              observables they use change
            </li>
            <li>Object-oriented approach with classes and methods</li>
            <li>
              Automatic dependency tracking - no manual subscriptions needed
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>MobX Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-base font-semibold text-green-600 dark:text-green-400">
                ✓ Advantages
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Minimal boilerplate</li>
                <li>Automatic dependency tracking</li>
                <li>Excellent performance</li>
                <li>Computed values are efficient</li>
                <li>OOP-friendly architecture</li>
                <li>Easy to learn and use</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold">📋 Best For</h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Complex domain models</li>
                <li>Real-time data dashboards</li>
                <li>Applications with computed values</li>
                <li>When you prefer OOP patterns</li>
                <li>Large applications</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </ExampleLayout>
  );
});

export default MobXExample;
