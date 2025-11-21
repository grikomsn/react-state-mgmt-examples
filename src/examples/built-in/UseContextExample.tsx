import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { ViewSourceLink } from "../../components/legacy";

type Theme = "light" | "dark" | "blue";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const themeStyles = {
  light: {
    background: "#f5f5f5",
    color: "#333",
    border: "#ddd",
    accent: "#007acc",
  },
  dark: {
    background: "#1e1e1e",
    color: "#e0e0e0",
    border: "#333",
    accent: "#61dafb",
  },
  blue: {
    background: "#1a2b3c",
    color: "#e0f0ff",
    border: "#2d4a5f",
    accent: "#64b5f6",
  },
};

const ThemedCard = ({ title, content }: { title: string; content: string }) => {
  const { theme } = useTheme();
  const styles = themeStyles[theme];

  return (
    <div
      style={{
        background: styles.background,
        color: styles.color,
        border: `1px solid ${styles.border}`,
        borderRadius: "8px",
        padding: "1.5rem",
        marginBottom: "1rem",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0", color: styles.accent }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "0.875rem" }}>{content}</p>
    </div>
  );
};

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
          theme === "light"
            ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
            : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
        }`}
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
          theme === "dark"
            ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
            : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
        }`}
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
      <button
        className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
          theme === "blue"
            ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
            : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
        }`}
        onClick={() => setTheme("blue")}
      >
        Blue
      </button>
    </div>
  );
};

const ThemeStatus = () => {
  const { theme } = useTheme();
  return (
    <p className="mt-2 text-sm text-gray-500">
      Current theme:{" "}
      <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
        {theme}
      </code>
    </p>
  );
};

const UseContextExample = () => {
  return (
    <ThemeProvider>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 border-b-2 border-gray-800 pb-4">
          <div className="mb-2 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="mb-2 text-3xl text-cyan-400">useContext Hook</h1>
              <p className="text-gray-500">
                Global theme management with Context API
              </p>
            </div>
            <ViewSourceLink url={import.meta.url} />
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xl text-gray-200">Theme Selector</h2>
          <ThemeSelector />
          <ThemeStatus />
        </div>

        <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xl text-gray-200">Themed Components</h2>
          <p className="mb-4 text-sm text-gray-500">
            These components consume the theme context and update automatically
            when the theme changes
          </p>
          <ThemedCard
            title="Context API"
            content="Context provides a way to pass data through the component tree without having to pass props down manually at every level."
          />
          <ThemedCard
            title="useContext Hook"
            content="Accepts a context object and returns the current context value. The component will re-render when the context value changes."
          />
          <ThemedCard
            title="Provider Pattern"
            content="A Provider component wraps your component tree and provides context values to all descendants that consume it."
          />
        </div>

        <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xl text-gray-200">Key Concepts</h2>
          <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
            <li>
              <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
                useContext
              </code>{" "}
              enables consuming context values in functional components
            </li>
            <li>Avoids "prop drilling" by providing global state access</li>
            <li>
              Context updates trigger re-renders in all consuming components
            </li>
            <li>Provider pattern wraps component tree to provide values</li>
            <li>Best for truly global state (theme, auth, locale)</li>
            <li>
              Can be combined with useReducer for complex state management
            </li>
          </ul>
        </div>

        <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xl text-gray-200">When to Use Context</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-base text-green-400">
                ✓ Good Use Cases
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
                <li>Theme/styling preferences</li>
                <li>User authentication state</li>
                <li>Locale/language settings</li>
                <li>UI state (modals, sidebars)</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-base text-red-400">✗ Avoid For</h3>
              <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
                <li>Frequently changing state</li>
                <li>Large state objects</li>
                <li>Form state</li>
                <li>Component-specific state</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UseContextExample;
