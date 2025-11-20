import { usePreferencesStore } from '../../stores/zustand/store.ts'

const UserSettings = () => {
  const user = usePreferencesStore((state) => state.user)
  const updateUser = usePreferencesStore((state) => state.updateUser)

  return (
    <div className="example-section">
      <h2>User Settings</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: '#999' }}>
            Name
          </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => updateUser({ name: e.target.value })}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: '#999' }}>
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => updateUser({ email: e.target.value })}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={user.notifications}
              onChange={(e) => updateUser({ notifications: e.target.checked })}
            />
            <span>Enable notifications</span>
          </label>
        </div>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={user.autoSave}
              onChange={(e) => updateUser({ autoSave: e.target.checked })}
            />
            <span>Auto-save preferences</span>
          </label>
        </div>
      </div>
    </div>
  )
}

const AppearanceSettings = () => {
  const user = usePreferencesStore((state) => state.user)
  const updateUser = usePreferencesStore((state) => state.updateUser)

  return (
    <div className="example-section">
      <h2>Appearance</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#999' }}>
            Theme
          </label>
          <div className="button-group">
            <button
              className={user.theme === 'light' ? '' : 'secondary'}
              onClick={() => updateUser({ theme: 'light' })}
            >
              Light
            </button>
            <button
              className={user.theme === 'dark' ? '' : 'secondary'}
              onClick={() => updateUser({ theme: 'dark' })}
            >
              Dark
            </button>
            <button
              className={user.theme === 'auto' ? '' : 'secondary'}
              onClick={() => updateUser({ theme: 'auto' })}
            >
              Auto
            </button>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#999' }}>
            Font Size
          </label>
          <div className="button-group">
            <button
              className={user.fontSize === 'small' ? '' : 'secondary'}
              onClick={() => updateUser({ fontSize: 'small' })}
            >
              Small
            </button>
            <button
              className={user.fontSize === 'medium' ? '' : 'secondary'}
              onClick={() => updateUser({ fontSize: 'medium' })}
            >
              Medium
            </button>
            <button
              className={user.fontSize === 'large' ? '' : 'secondary'}
              onClick={() => updateUser({ fontSize: 'large' })}
            >
              Large
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const UISettings = () => {
  const ui = usePreferencesStore((state) => state.ui)
  const updateUI = usePreferencesStore((state) => state.updateUI)
  const toggleSidebar = usePreferencesStore((state) => state.toggleSidebar)

  return (
    <div className="example-section">
      <h2>UI Preferences</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={ui.sidebarOpen} onChange={toggleSidebar} />
            <span>Show sidebar</span>
          </label>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#999' }}>
            Layout Mode
          </label>
          <div className="button-group">
            <button
              className={ui.layoutMode === 'compact' ? '' : 'secondary'}
              onClick={() => updateUI({ layoutMode: 'compact' })}
            >
              Compact
            </button>
            <button
              className={ui.layoutMode === 'comfortable' ? '' : 'secondary'}
              onClick={() => updateUI({ layoutMode: 'comfortable' })}
            >
              Comfortable
            </button>
            <button
              className={ui.layoutMode === 'spacious' ? '' : 'secondary'}
              onClick={() => updateUI({ layoutMode: 'spacious' })}
            >
              Spacious
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const PreferencesPreview = () => {
  const user = usePreferencesStore((state) => state.user)
  const ui = usePreferencesStore((state) => state.ui)

  return (
    <div className="example-section">
      <h2>Current Preferences (Live)</h2>
      <div
        style={{
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '4px',
          padding: '1rem',
        }}
      >
        <pre style={{ margin: 0, fontSize: '0.875rem' }}>
          {JSON.stringify({ user, ui }, null, 2)}
        </pre>
      </div>
      <p style={{ color: '#999', fontSize: '0.875rem', marginTop: '0.5rem' }}>
        💾 These preferences are automatically saved to localStorage
      </p>
    </div>
  )
}

const ZustandExample = () => {
  const resetToDefaults = usePreferencesStore((state) => state.resetToDefaults)

  return (
    <div className="example-container">
      <div className="example-header">
        <h1>Zustand</h1>
        <p>Lightweight state management with automatic persistence</p>
      </div>

      <div className="example-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0 }}>Preferences Manager</h2>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#999' }}>
              Changes are automatically persisted to localStorage
            </p>
          </div>
          <button className="danger" onClick={resetToDefaults}>
            Reset to Defaults
          </button>
        </div>
      </div>

      <UserSettings />
      <AppearanceSettings />
      <UISettings />
      <PreferencesPreview />

      <div className="example-section">
        <h2>Key Concepts</h2>
        <ul style={{ color: '#999', lineHeight: '1.8' }}>
          <li>
            <strong>Zustand</strong> is a small, fast, and scalable state management solution
          </li>
          <li>Uses hooks API - no providers needed</li>
          <li>Minimal boilerplate compared to Redux</li>
          <li>
            <code>create</code> function defines store with state and actions
          </li>
          <li>Selectors allow fine-grained subscriptions to specific state slices</li>
          <li>Middleware support (persist, devtools, immer, etc.)</li>
          <li>Automatic persistence to localStorage with <code>persist</code> middleware</li>
          <li>TypeScript support out of the box</li>
        </ul>
      </div>

      <div className="example-section">
        <h2>Why Zustand?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <h3 style={{ color: '#2ecc71', fontSize: '1rem', marginBottom: '0.5rem' }}>✓ Advantages</h3>
            <ul style={{ color: '#999', fontSize: '0.875rem', lineHeight: '1.6' }}>
              <li>Very small bundle size (~1kb)</li>
              <li>Simple, hook-based API</li>
              <li>No providers/wrappers needed</li>
              <li>Easy to learn and use</li>
              <li>Built-in persistence</li>
              <li>Great TypeScript support</li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#61dafb', fontSize: '1rem', marginBottom: '0.5rem' }}>📋 Best For</h3>
            <ul style={{ color: '#999', fontSize: '0.875rem', lineHeight: '1.6' }}>
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
  )
}

export default ZustandExample
