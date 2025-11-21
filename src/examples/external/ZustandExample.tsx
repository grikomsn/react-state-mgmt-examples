import { usePreferencesStore } from "../../stores/zustand/store";
import { ExampleLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Kbd } from "../../components/ui/kbd";

const UserSettings = () => {
  const user = usePreferencesStore((state) => state.user);
  const updateUser = usePreferencesStore((state) => state.updateUser);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>User Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              type="text"
              value={user.name}
              onChange={(e) => updateUser({ name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={user.email}
              onChange={(e) => updateUser({ email: e.target.value })}
            />
          </div>
          <div>
            <Label className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={user.notifications}
                onCheckedChange={(checked) =>
                  updateUser({ notifications: checked === true })
                }
              />
              <span className="text-sm">Enable notifications</span>
            </Label>
          </div>
          <div>
            <Label className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={user.autoSave}
                onCheckedChange={(checked) =>
                  updateUser({ autoSave: checked === true })
                }
              />
              <span className="text-sm">Auto-save preferences</span>
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AppearanceSettings = () => {
  const user = usePreferencesStore((state) => state.user);
  const updateUser = usePreferencesStore((state) => state.updateUser);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={user.theme === "light" ? "default" : "outline"}
                onClick={() => updateUser({ theme: "light" })}
              >
                Light
              </Button>
              <Button
                variant={user.theme === "dark" ? "default" : "outline"}
                onClick={() => updateUser({ theme: "dark" })}
              >
                Dark
              </Button>
              <Button
                variant={user.theme === "auto" ? "default" : "outline"}
                onClick={() => updateUser({ theme: "auto" })}
              >
                Auto
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Font Size</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={user.fontSize === "small" ? "default" : "outline"}
                onClick={() => updateUser({ fontSize: "small" })}
              >
                Small
              </Button>
              <Button
                variant={user.fontSize === "medium" ? "default" : "outline"}
                onClick={() => updateUser({ fontSize: "medium" })}
              >
                Medium
              </Button>
              <Button
                variant={user.fontSize === "large" ? "default" : "outline"}
                onClick={() => updateUser({ fontSize: "large" })}
              >
                Large
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UISettings = () => {
  const ui = usePreferencesStore((state) => state.ui);
  const updateUI = usePreferencesStore((state) => state.updateUI);
  const toggleSidebar = usePreferencesStore((state) => state.toggleSidebar);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>UI Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div>
            <Label className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={ui.sidebarOpen}
                onCheckedChange={() => toggleSidebar()}
              />
              <span className="text-sm">Show sidebar</span>
            </Label>
          </div>
          <div className="space-y-2">
            <Label>Layout Mode</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={ui.layoutMode === "compact" ? "default" : "outline"}
                onClick={() => updateUI({ layoutMode: "compact" })}
              >
                Compact
              </Button>
              <Button
                variant={ui.layoutMode === "comfortable" ? "default" : "outline"}
                onClick={() => updateUI({ layoutMode: "comfortable" })}
              >
                Comfortable
              </Button>
              <Button
                variant={ui.layoutMode === "spacious" ? "default" : "outline"}
                onClick={() => updateUI({ layoutMode: "spacious" })}
              >
                Spacious
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PreferencesPreview = () => {
  const user = usePreferencesStore((state) => state.user);
  const ui = usePreferencesStore((state) => state.ui);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Current Preferences (Live)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-muted p-4">
          <pre className="m-0 text-sm">
            {JSON.stringify({ user, ui }, null, 2)}
          </pre>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          💾 These preferences are automatically saved to localStorage
        </p>
      </CardContent>
    </Card>
  );
};

const ZustandExample = () => {
  const resetToDefaults = usePreferencesStore((state) => state.resetToDefaults);

  return (
    <ExampleLayout
      title="Zustand"
      description="Lightweight state management with automatic persistence"
      sourcePath="src/examples/external/ZustandExample.tsx"
      sourceLine={205}
    >
      <Card className="mb-6">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="m-0 text-xl">Preferences Manager</h2>
              <p className="m-0 mt-1 text-sm text-muted-foreground">
                Changes are automatically persisted to localStorage
              </p>
            </div>
            <Button onClick={resetToDefaults} variant="destructive">
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      <UserSettings />
      <AppearanceSettings />
      <UISettings />
      <PreferencesPreview />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <Kbd>Zustand</Kbd> is a small, fast, and scalable state management solution
            </li>
            <li>Uses hooks API - no providers needed</li>
            <li>Minimal boilerplate compared to Redux</li>
            <li>
              <Kbd>create</Kbd> function defines store with state and actions
            </li>
            <li>
              Selectors allow fine-grained subscriptions to specific state slices
            </li>
            <li>Middleware support (persist, devtools, immer, etc.)</li>
            <li>
              Automatic persistence to localStorage with <Kbd>persist</Kbd> middleware
            </li>
            <li>TypeScript support out of the box</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Why Zustand?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-base font-semibold text-green-600 dark:text-green-400">
                ✓ Advantages
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Very small bundle size (~1kb)</li>
                <li>Simple, hook-based API</li>
                <li>No providers/wrappers needed</li>
                <li>Easy to learn and use</li>
                <li>Built-in persistence</li>
                <li>Great TypeScript support</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold">📋 Best For</h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Small to medium apps</li>
                <li>Simple state management needs</li>
                <li>When you want less boilerplate</li>
                <li>Client-side preferences</li>
                <li>UI state management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </ExampleLayout>
  );
};

export default ZustandExample;
