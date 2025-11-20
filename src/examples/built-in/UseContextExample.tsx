import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'blue'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const themeStyles = {
  light: {
    background: '#f5f5f5',
    color: '#333',
    border: '#ddd',
    accent: '#007acc',
  },
  dark: {
    background: '#1e1e1e',
    color: '#e0e0e0',
    border: '#333',
    accent: '#61dafb',
  },
  blue: {
    background: '#1a2b3c',
    color: '#e0f0ff',
    border: '#2d4a5f',
    accent: '#64b5f6',
  },
}

const ThemedCard = ({ title, content }: { title: string; content: string }) => {
  const { theme } = useTheme()
  const styles = themeStyles[theme]

  return (
    <div
      style={{
        background: styles.background,
        color: styles.color,
        border: `1px solid ${styles.border}`,
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1rem',
      }}
    >
      <h3 style={{ margin: '0 0 0.5rem 0', color: styles.accent }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '0.875rem' }}>{content}</p>
    </div>
  )
}

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="button-group">
      <button
        className={theme === 'light' ? '' : 'secondary'}
        onClick={() => setTheme('light')}
      >
        Light
      </button>
      <button
        className={theme === 'dark' ? '' : 'secondary'}
        onClick={() => setTheme('dark')}
      >
        Dark
      </button>
      <button
        className={theme === 'blue' ? '' : 'secondary'}
        onClick={() => setTheme('blue')}
      >
        Blue
      </button>
    </div>
  )
}

const ThemeStatus = () => {
  const { theme } = useTheme()
  return (
    <p style={{ color: '#999', fontSize: '0.875rem', marginTop: '0.5rem' }}>
      Current theme: <code>{theme}</code>
    </p>
  )
}

const UseContextExample = () => {
  return (
    <ThemeProvider>
      <div className="example-container">
        <div className="example-header">
          <h1>useContext Hook</h1>
          <p>Global theme management with Context API</p>
        </div>

        <div className="example-section">
          <h2>Theme Selector</h2>
          <ThemeSelector />
          <ThemeStatus />
        </div>

        <div className="example-section">
          <h2>Themed Components</h2>
          <p style={{ color: '#999', marginBottom: '1rem', fontSize: '0.875rem' }}>
            These components consume the theme context and update automatically when the theme changes
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

        <div className="example-section">
          <h2>Key Concepts</h2>
          <ul style={{ color: '#999', lineHeight: '1.8' }}>
            <li><code>useContext</code> enables consuming context values in functional components</li>
            <li>Avoids "prop drilling" by providing global state access</li>
            <li>Context updates trigger re-renders in all consuming components</li>
            <li>Provider pattern wraps component tree to provide values</li>
            <li>Best for truly global state (theme, auth, locale)</li>
            <li>Can be combined with useReducer for complex state management</li>
          </ul>
        </div>

        <div className="example-section">
          <h2>When to Use Context</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h3 style={{ color: '#2ecc71', fontSize: '1rem', marginBottom: '0.5rem' }}>✓ Good Use Cases</h3>
              <ul style={{ color: '#999', fontSize: '0.875rem', lineHeight: '1.6' }}>
                <li>Theme/styling preferences</li>
                <li>User authentication state</li>
                <li>Locale/language settings</li>
                <li>UI state (modals, sidebars)</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: '#e74c3c', fontSize: '1rem', marginBottom: '0.5rem' }}>✗ Avoid For</h3>
              <ul style={{ color: '#999', fontSize: '0.875rem', lineHeight: '1.6' }}>
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
  )
}

export default UseContextExample
