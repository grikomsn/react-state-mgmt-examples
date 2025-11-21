import useSWR, { mutate, SWRConfig } from "swr";
import { useState } from "react";
import { fetchUser, updateUser } from "../../api";
import type { User } from "../../types";
import { ViewSourceLink } from "../../components/legacy";

const UserProfile = ({ userId }: { userId: number }) => {
  const { data, error, isLoading, isValidating } = useSWR<User>(
    `user-${userId}`,
    () => fetchUser(userId),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
    }
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const handleEdit = () => {
    if (data) {
      setEditForm({
        name: data.name,
        email: data.email,
        bio: data.bio,
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!data) return;

    try {
      // Optimistic update
      mutate(`user-${userId}`, { ...data, ...editForm }, false);

      // Update on server
      await updateUser(userId, editForm);

      // Revalidate to get fresh data
      mutate(`user-${userId}`);

      setIsEditing(false);
    } catch {
      // Revert on error
      mutate(`user-${userId}`);
      alert("Failed to update user");
    }
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center text-gray-500">
        Loading user profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded border border-red-800 bg-red-900/30 p-4 text-red-200">
        Error loading user: {error.message}
        <button
          onClick={() => mutate(`user-${userId}`)}
          className="ml-4 rounded bg-red-600 px-3 py-1 text-sm font-medium text-white transition-all hover:bg-red-700 active:scale-95"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="m-0 text-xl text-gray-200">User Profile</h2>
          {isValidating && (
            <span className="text-xs text-cyan-400">Revalidating...</span>
          )}
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <button
                onClick={handleEdit}
                className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-gray-950 transition-all hover:bg-cyan-600 active:scale-95"
              >
                Edit
              </button>
              <button
                onClick={() => mutate(`user-${userId}`)}
                className="rounded border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 transition-all hover:bg-gray-700 active:scale-95"
              >
                Refresh
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-8 rounded-lg border border-gray-800 bg-gray-950 p-8">
        <div className="flex-shrink-0">
          <img
            src={data.avatar}
            alt={data.name}
            className="h-[120px] w-[120px] rounded-full border-4 border-cyan-400"
          />
        </div>

        {!isEditing ? (
          <div className="flex-1">
            <h3 className="m-0 mb-2 text-2xl text-cyan-400">{data.name}</h3>
            <p className="m-0 mb-4 text-sm text-gray-500">{data.email}</p>
            <p className="m-0 leading-relaxed text-gray-200">{data.bio}</p>
          </div>
        ) : (
          <div className="grid flex-1 gap-4">
            <div>
              <label className="mb-1 block text-sm text-gray-500">Name</label>
              <input
                type="text"
                value={editForm.name || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-500">Email</label>
              <input
                type="email"
                value={editForm.email || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-500">Bio</label>
              <textarea
                value={editForm.bio || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                className="min-h-[80px] w-full resize-y rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-gray-950 transition-all hover:bg-cyan-600 active:scale-95"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 transition-all hover:bg-gray-700 active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const UserSelector = ({
  userId,
  onUserChange,
}: {
  userId: number;
  onUserChange: (id: number) => void;
}) => {
  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Select User</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
            userId === 1
              ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
              : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
          }`}
          onClick={() => onUserChange(1)}
        >
          User 1 (John Doe)
        </button>
        <button
          className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
            userId === 2
              ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
              : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
          }`}
          onClick={() => onUserChange(2)}
        >
          User 2 (Jane Smith)
        </button>
      </div>
    </div>
  );
};

const RevalidationDemo = () => {
  const [focusCount, setFocusCount] = useState(0);
  const [reconnectCount, setReconnectCount] = useState(0);

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Automatic Revalidation</h2>
      <p className="mb-4 text-sm text-gray-500">
        SWR automatically revalidates data in the following scenarios:
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded border border-gray-800 bg-gray-950 p-4">
          <h3 className="mb-2 text-base text-cyan-400">Window Focus</h3>
          <p className="mb-2 text-sm text-gray-500">
            Data refetches when you return to the tab
          </p>
          <button
            onClick={() => setFocusCount((c) => c + 1)}
            className="rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-200 transition-all hover:bg-gray-700 active:scale-95"
          >
            Simulate Focus ({focusCount})
          </button>
        </div>

        <div className="rounded border border-gray-800 bg-gray-950 p-4">
          <h3 className="mb-2 text-base text-cyan-400">Network Reconnect</h3>
          <p className="mb-2 text-sm text-gray-500">
            Data refetches when network reconnects
          </p>
          <button
            onClick={() => setReconnectCount((c) => c + 1)}
            className="rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-200 transition-all hover:bg-gray-700 active:scale-95"
          >
            Simulate Reconnect ({reconnectCount})
          </button>
        </div>
      </div>

      <div className="mt-4 rounded border border-cyan-800 bg-cyan-900/20 p-4">
        <p className="m-0 text-sm text-gray-200">
          💡 <strong>Try it:</strong> Switch to another tab and come back -
          you'll see the "Revalidating..." indicator as SWR fetches fresh data
          automatically.
        </p>
      </div>
    </div>
  );
};

const SWRExampleContent = () => {
  const [userId, setUserId] = useState(1);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 border-b-2 border-gray-800 pb-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl text-cyan-400">
              SWR (Stale-While-Revalidate)
            </h1>
            <p className="text-gray-500">
              Server state management with automatic revalidation and optimistic
              updates
            </p>
          </div>
          <ViewSourceLink url={import.meta.url} />
        </div>
      </div>

      <UserSelector userId={userId} onUserChange={setUserId} />
      <UserProfile userId={userId} />
      <RevalidationDemo />

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Key Concepts</h2>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              SWR
            </code>{" "}
            is a React Hooks library for data fetching by Vercel
          </li>
          <li>
            Stale-While-Revalidate strategy: show cached data first, then fetch
            fresh data
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useSWR(key, fetcher)
            </code>{" "}
            hook manages data fetching and caching
          </li>
          <li>Automatic revalidation on focus, reconnect, and intervals</li>
          <li>Request deduplication prevents duplicate requests</li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              mutate()
            </code>{" "}
            function for manual revalidation and optimistic updates
          </li>
          <li>Built-in error retry with exponential backoff</li>
          <li>Real-time experience with automatic refetch</li>
          <li>Optimistic UI updates for instant feedback</li>
        </ul>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">SWR Features</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-base text-green-400">✓ Advantages</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Lightweight (5kb gzipped)</li>
              <li>Real-time experience</li>
              <li>Built-in cache</li>
              <li>Automatic revalidation</li>
              <li>Focus tracking</li>
              <li>Network status awareness</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-base text-cyan-400">📋 Best For</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Real-time applications</li>
              <li>Data that changes frequently</li>
              <li>User-centric apps</li>
              <li>When freshness is critical</li>
              <li>Mobile-first applications</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">SWR vs TanStack Query</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded border border-gray-800 bg-gray-950 p-4">
            <h3 className="mb-2 text-base text-cyan-400">SWR</h3>
            <ul className="m-0 space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Simpler API</li>
              <li>Smaller bundle size</li>
              <li>Focus on revalidation</li>
              <li>Great for real-time data</li>
            </ul>
          </div>
          <div className="rounded border border-gray-800 bg-gray-950 p-4">
            <h3 className="mb-2 text-base text-green-400">TanStack Query</h3>
            <ul className="m-0 space-y-1 text-sm leading-relaxed text-gray-500">
              <li>More features</li>
              <li>Powerful DevTools</li>
              <li>Advanced pagination</li>
              <li>Better for complex apps</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Optimistic Updates</h2>
        <p className="mb-2 text-gray-500">
          This example demonstrates optimistic updates:
        </p>
        <ol className="list-inside list-decimal space-y-2 pl-6 leading-relaxed text-gray-500">
          <li>Click "Edit" and make changes to the user profile</li>
          <li>When you save, the UI updates immediately (optimistic)</li>
          <li>The actual API request happens in the background</li>
          <li>If the request fails, changes are reverted automatically</li>
          <li>After success, SWR revalidates to ensure data is fresh</li>
        </ol>
      </div>
    </div>
  );
};

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
  );
};

export default SWRExample;
