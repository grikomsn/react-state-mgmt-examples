import useSWR, { mutate, SWRConfig } from 'swr'
import { useState } from 'react'
import { fetchUser, updateUser } from '../../api/mockApi.ts'
import type { User } from '../../api/mockApi.ts'

const UserProfile = ({ userId }: { userId: number }) => {
  const { data, error, isLoading, isValidating } = useSWR<User>(
    `user-${userId}`,
    () => fetchUser(userId),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
    }
  )

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<User>>({})

  const handleEdit = () => {
    if (data) {
      setEditForm({
        name: data.name,
        email: data.email,
        bio: data.bio,
      })
      setIsEditing(true)
    }
  }

  const handleSave = async () => {
    if (!data) return

    try {
      // Optimistic update
      mutate(
        `user-${userId}`,
        { ...data, ...editForm },
        false
      )

      // Update on server
      await updateUser(userId, editForm)

      // Revalidate to get fresh data
      mutate(`user-${userId}`)

      setIsEditing(false)
    } catch (error) {
      // Revert on error
      mutate(`user-${userId}`)
      alert('Failed to update user')
    }
  }

  if (isLoading) {
    return <div className="loading">Loading user profile...</div>
  }

  if (error) {
    return (
      <div className="error">
        Error loading user: {error.message}
        <button onClick={() => mutate(`user-${userId}`)} style={{ marginLeft: '1rem' }}>
          Retry
        </button>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="example-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>User Profile</h2>
          {isValidating && (
            <span style={{ fontSize: '0.75rem', color: '#61dafb' }}>Revalidating...</span>
          )}
        </div>
        <div className="button-group">
          {!isEditing && (
            <>
              <button onClick={handleEdit}>Edit</button>
              <button className="secondary" onClick={() => mutate(`user-${userId}`)}>
                Refresh
              </button>
            </>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '2rem',
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '2rem',
        }}
      >
        <div style={{ flex: '0 0 120px' }}>
          <img
            src={data.avatar}
            alt={data.name}
            style={{ width: '120px', height: '120px', borderRadius: '50%', border: '3px solid #61dafb' }}
          />
        </div>

        {!isEditing ? (
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: '#61dafb' }}>
              {data.name}
            </h3>
            <p style={{ margin: '0 0 1rem 0', color: '#999', fontSize: '0.875rem' }}>
              {data.email}
            </p>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#e0e0e0' }}>
              {data.bio}
            </p>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: '#999' }}>
                Name
              </label>
              <input
                type="text"
                value={editForm.name || ''}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: '#999' }}>
                Email
              </label>
              <input
                type="email"
                value={editForm.email || ''}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: '#999' }}>
                Bio
              </label>
              <textarea
                value={editForm.bio || ''}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                style={{ width: '100%', minHeight: '80px', resize: 'vertical' }}
              />
            </div>
            <div className="button-group">
              <button onClick={handleSave}>Save Changes</button>
              <button className="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const UserSelector = ({ userId, onUserChange }: { userId: number; onUserChange: (id: number) => void }) => {
  return (
    <div className="example-section">
      <h2>Select User</h2>
      <div className="button-group">
        <button
          className={userId === 1 ? '' : 'secondary'}
          onClick={() => onUserChange(1)}
        >
          User 1 (John Doe)
        </button>
        <button
          className={userId === 2 ? '' : 'secondary'}
          onClick={() => onUserChange(2)}
        >
          User 2 (Jane Smith)
        </button>
      </div>
    </div>
  )
}

const RevalidationDemo = () => {
  const [focusCount, setFocusCount] = useState(0)
  const [reconnectCount, setReconnectCount] = useState(0)

  return (
    <div className="example-section">
      <h2>Automatic Revalidation</h2>
      <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '1rem' }}>
        SWR automatically revalidates data in the following scenarios:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '1rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#61dafb', marginBottom: '0.5rem' }}>
            Window Focus
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#999', marginBottom: '0.5rem' }}>
            Data refetches when you return to the tab
          </p>
          <button onClick={() => setFocusCount(c => c + 1)} className="secondary">
            Simulate Focus ({focusCount})
          </button>
        </div>

        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '1rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#61dafb', marginBottom: '0.5rem' }}>
            Network Reconnect
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#999', marginBottom: '0.5rem' }}>
            Data refetches when network reconnects
          </p>
          <button onClick={() => setReconnectCount(c => c + 1)} className="secondary">
            Simulate Reconnect ({reconnectCount})
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#264f5f', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          💡 <strong>Try it:</strong> Switch to another tab and come back - you'll see the "Revalidating..." indicator
          as SWR fetches fresh data automatically.
        </p>
      </div>
    </div>
  )
}

const SWRExampleContent = () => {
  const [userId, setUserId] = useState(1)

  return (
    <div className="example-container">
      <div className="example-header">
        <h1>SWR (Stale-While-Revalidate)</h1>
        <p>Server state management with automatic revalidation and optimistic updates</p>
      </div>

      <UserSelector userId={userId} onUserChange={setUserId} />
      <UserProfile userId={userId} />
      <RevalidationDemo />

      <div className="example-section">
        <h2>Key Concepts</h2>
        <ul style={{ color: '#999', lineHeight: '1.8' }}>
          <li>
            <strong>SWR</strong> is a React Hooks library for data fetching by Vercel
          </li>
          <li>
            Stale-While-Revalidate strategy: show cached data first, then fetch fresh data
          </li>
          <li>
            <code>useSWR(key, fetcher)</code> hook manages data fetching and caching
          </li>
          <li>Automatic revalidation on focus, reconnect, and intervals</li>
          <li>Request deduplication prevents duplicate requests</li>
          <li>
            <code>mutate()</code> function for manual revalidation and optimistic updates
          </li>
          <li>Built-in error retry with exponential backoff</li>
          <li>Real-time experience with automatic refetch</li>
          <li>Optimistic UI updates for instant feedback</li>
        </ul>
      </div>

      <div className="example-section">
        <h2>SWR Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <h3 style={{ color: '#2ecc71', fontSize: '1rem', marginBottom: '0.5rem' }}>✓ Advantages</h3>
            <ul style={{ color: '#999', fontSize: '0.875rem', lineHeight: '1.6' }}>
              <li>Lightweight (5kb gzipped)</li>
              <li>Real-time experience</li>
              <li>Built-in cache</li>
              <li>Automatic revalidation</li>
              <li>Focus tracking</li>
              <li>Network status awareness</li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#61dafb', fontSize: '1rem', marginBottom: '0.5rem' }}>📋 Best For</h3>
            <ul style={{ color: '#999', fontSize: '0.875rem', lineHeight: '1.6' }}>
              <li>Real-time applications</li>
              <li>Data that changes frequently</li>
              <li>User-centric apps</li>
              <li>When freshness is critical</li>
              <li>Mobile-first applications</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h2>SWR vs TanStack Query</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '1rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#61dafb' }}>SWR</h3>
            <ul style={{ color: '#999', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
              <li>Simpler API</li>
              <li>Smaller bundle size</li>
              <li>Focus on revalidation</li>
              <li>Great for real-time data</li>
            </ul>
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '1rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#2ecc71' }}>TanStack Query</h3>
            <ul style={{ color: '#999', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
              <li>More features</li>
              <li>Powerful DevTools</li>
              <li>Advanced pagination</li>
              <li>Better for complex apps</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h2>Optimistic Updates</h2>
        <p style={{ color: '#999', marginBottom: '0.5rem' }}>
          This example demonstrates optimistic updates:
        </p>
        <ol style={{ color: '#999', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
          <li>Click "Edit" and make changes to the user profile</li>
          <li>When you save, the UI updates immediately (optimistic)</li>
          <li>The actual API request happens in the background</li>
          <li>If the request fails, changes are reverted automatically</li>
          <li>After success, SWR revalidates to ensure data is fresh</li>
        </ol>
      </div>
    </div>
  )
}

const SWRExample = () => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
      }}
    >
      <SWRExampleContent />
    </SWRConfig>
  )
}

export default SWRExample
