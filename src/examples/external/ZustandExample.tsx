import { usePreferencesStore } from "../../stores/zustand/store";
import { ViewSourceLink } from "../../components/ui";

const UserSettings = () => {
  const user = usePreferencesStore((state) => state.user);
  const updateUser = usePreferencesStore((state) => state.updateUser);

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">User Settings</h2>
      <div className="grid gap-4">
        <div>
          <label className="mb-1 block text-sm text-gray-500">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => updateUser({ name: e.target.value })}
            className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-500">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => updateUser({ email: e.target.value })}
            className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={user.notifications}
              onChange={(e) => updateUser({ notifications: e.target.checked })}
              className="h-4 w-4 cursor-pointer"
            />
            <span className="text-sm text-gray-200">Enable notifications</span>
          </label>
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={user.autoSave}
              onChange={(e) => updateUser({ autoSave: e.target.checked })}
              className="h-4 w-4 cursor-pointer"
            />
            <span className="text-sm text-gray-200">Auto-save preferences</span>
          </label>
        </div>
      </div>
    </div>
  );
};

const AppearanceSettings = () => {
  const user = usePreferencesStore((state) => state.user);
  const updateUser = usePreferencesStore((state) => state.updateUser);

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Appearance</h2>
      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm text-gray-500">Theme</label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                user.theme === "light"
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => updateUser({ theme: "light" })}
            >
              Light
            </button>
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                user.theme === "dark"
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => updateUser({ theme: "dark" })}
            >
              Dark
            </button>
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                user.theme === "auto"
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => updateUser({ theme: "auto" })}
            >
              Auto
            </button>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm text-gray-500">Font Size</label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                user.fontSize === "small"
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => updateUser({ fontSize: "small" })}
            >
              Small
            </button>
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                user.fontSize === "medium"
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => updateUser({ fontSize: "medium" })}
            >
              Medium
            </button>
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                user.fontSize === "large"
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => updateUser({ fontSize: "large" })}
            >
              Large
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UISettings = () => {
  const ui = usePreferencesStore((state) => state.ui);
  const updateUI = usePreferencesStore((state) => state.updateUI);
  const toggleSidebar = usePreferencesStore((state) => state.toggleSidebar);

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">UI Preferences</h2>
      <div className="grid gap-4">
        <div>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={ui.sidebarOpen}
              onChange={toggleSidebar}
              className="h-4 w-4 cursor-pointer"
            />
            <span className="text-sm text-gray-200">Show sidebar</span>
          </label>
        </div>
        <div>
          <label className="mb-2 block text-sm text-gray-500">
            Layout Mode
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                ui.layoutMode === "compact"
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => updateUI({ layoutMode: "compact" })}
            >
              Compact
            </button>
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                ui.layoutMode === "comfortable"
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => updateUI({ layoutMode: "comfortable" })}
            >
              Comfortable
            </button>
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                ui.layoutMode === "spacious"
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => updateUI({ layoutMode: "spacious" })}
            >
              Spacious
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreferencesPreview = () => {
  const user = usePreferencesStore((state) => state.user);
  const ui = usePreferencesStore((state) => state.ui);

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Current Preferences (Live)</h2>
      <div className="rounded border border-gray-800 bg-gray-950 p-4">
        <pre className="m-0 text-sm">
          {JSON.stringify({ user, ui }, null, 2)}
        </pre>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        💾 These preferences are automatically saved to localStorage
      </p>
    </div>
  );
};

const ZustandExample = () => {
  const resetToDefaults = usePreferencesStore((state) => state.resetToDefaults);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 border-b-2 border-gray-800 pb-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl text-cyan-400">Zustand</h1>
            <p className="text-gray-500">
              Lightweight state management with automatic persistence
            </p>
          </div>
          <ViewSourceLink url={import.meta.url} />
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="m-0 text-xl text-gray-200">Preferences Manager</h2>
            <p className="m-0 mt-1 text-sm text-gray-500">
              Changes are automatically persisted to localStorage
            </p>
          </div>
          <button
            onClick={resetToDefaults}
            className="rounded border border-red-800 bg-red-900/50 px-4 py-2 text-sm font-medium text-red-200 transition-all hover:bg-red-900 active:scale-95"
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      <UserSettings />
      <AppearanceSettings />
      <UISettings />
      <PreferencesPreview />

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Key Concepts</h2>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              Zustand
            </code>{" "}
            is a small, fast, and scalable state management solution
          </li>
          <li>Uses hooks API - no providers needed</li>
          <li>Minimal boilerplate compared to Redux</li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              create
            </code>{" "}
            function defines store with state and actions
          </li>
          <li>
            Selectors allow fine-grained subscriptions to specific state slices
          </li>
          <li>Middleware support (persist, devtools, immer, etc.)</li>
          <li>
            Automatic persistence to localStorage with{" "}
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              persist
            </code>{" "}
            middleware
          </li>
          <li>TypeScript support out of the box</li>
        </ul>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Why Zustand?</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-base text-green-400">✓ Advantages</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Very small bundle size (~1kb)</li>
              <li>Simple, hook-based API</li>
              <li>No providers/wrappers needed</li>
              <li>Easy to learn and use</li>
              <li>Built-in persistence</li>
              <li>Great TypeScript support</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-base text-cyan-400">📋 Best For</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Small to medium apps</li>
              <li>Simple state management needs</li>
              <li>When you want less boilerplate</li>
              <li>Client-side preferences</li>
              <li>UI state management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZustandExample;
