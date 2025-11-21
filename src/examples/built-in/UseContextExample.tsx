import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { ExampleLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Kbd } from "../../components/ui/kbd";
import { createExampleSnippet } from "../../utils/example-snippets";
import rawSource from "./UseContextExample.tsx?raw";

const snippet = createExampleSnippet(rawSource, "UseContextExample");

// @example-start UseContextExample
type Theme = "light" | "dark" | "blue";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined); // [!code highlight]

const useTheme = () => {
  const context = useContext(ThemeContext); // [!code highlight]
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark"); // [!code highlight]

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}> {/* [!code highlight] */}
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
      <Button
        variant={theme === "light" ? "default" : "outline"}
        onClick={() => setTheme("light")}
      >
        Light
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        onClick={() => setTheme("dark")}
      >
        Dark
      </Button>
      <Button
        variant={theme === "blue" ? "default" : "outline"}
        onClick={() => setTheme("blue")}
      >
        Blue
      </Button>
    </div>
  );
};

const ThemeStatus = () => {
  const { theme } = useTheme();
  return (
    <p className="mt-2 text-sm text-muted-foreground">
      Current theme: <Kbd>{theme}</Kbd>
    </p>
  );
};
// @example-end UseContextExample

const UseContextExample = () => {
  return (
    <ThemeProvider>
      <ExampleLayout
        title="useContext Hook"
        description="Global theme management with Context API"
        sourcePath="src/examples/built-in/UseContextExample.tsx"
        sourceLine={121}
        snippet={snippet}
      >
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Theme Selector</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeSelector />
            <ThemeStatus />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Themed Components</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              These components consume the theme context and update
              automatically when the theme changes
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
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Key Concepts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
              <li>
                <Kbd>useContext</Kbd> enables consuming context values in
                functional components
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
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>When to Use Context</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-base font-semibold text-green-600 dark:text-green-400">
                  ✓ Good Use Cases
                </h3>
                <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                  <li>Theme/styling preferences</li>
                  <li>User authentication state</li>
                  <li>Locale/language settings</li>
                  <li>UI state (modals, sidebars)</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold text-red-600 dark:text-red-400">
                  ✗ Avoid For
                </h3>
                <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                  <li>Frequently changing state</li>
                  <li>Large state objects</li>
                  <li>Form state</li>
                  <li>Component-specific state</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </ExampleLayout>
    </ThemeProvider>
  );
};

export default UseContextExample;
