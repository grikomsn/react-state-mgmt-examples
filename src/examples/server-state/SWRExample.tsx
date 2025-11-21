import useSWR, { mutate, SWRConfig } from "swr";
import { useState } from "react";
import { fetchUser, updateUser } from "../../api";
import type { User } from "../../types";
import { ExampleLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Kbd } from "../../components/ui/kbd";
import { createExampleSnippets } from "../../utils/example-snippets";
import rawSource from "./SWRExample.tsx?raw";

const snippetIds = [
  "SWRExampleUserProfile",
  "SWRExampleMain",
  "SWRExampleConfig",
];
const snippets = createExampleSnippets(rawSource, snippetIds).map((s) => ({
  ...s,
  label:
    s.id === "SWRExampleUserProfile"
      ? "UserProfile.tsx"
      : s.id === "SWRExampleMain"
      ? "Main.tsx"
      : "SWRConfig.tsx",
  language: "tsx" as const,
}));

const UserProfile = ({ userId }: { userId: number }) => {
  // @example-start SWRExampleUserProfile
  const { data, error, isLoading, isValidating } = useSWR<User>( // [!code highlight]
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
      mutate(`user-${userId}`, { ...data, ...editForm }, false); // [!code highlight]

      // Update on server
      await updateUser(userId, editForm);

      // Revalidate to get fresh data
      mutate(`user-${userId}`); // [!code highlight]

      setIsEditing(false);
    } catch {
      // Revert on error
      mutate(`user-${userId}`);
      alert("Failed to update user");
    }
  };
  // @example-end SWRExampleUserProfile

  if (isLoading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Loading user profile...
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        variant="destructive"
        className="border-red-800 bg-red-900/30 text-red-200"
      >
        <AlertDescription className="flex items-center justify-between">
          <span>Error loading user: {error.message}</span>
          <Button
            onClick={() => mutate(`user-${userId}`)}
            variant="destructive"
            size="sm"
            className="ml-4"
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle>User Profile</CardTitle>
            {isValidating && (
              <span className="text-xs text-muted-foreground">
                Revalidating...
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {!isEditing && (
              <>
                <Button
                  onClick={handleEdit}
                  className="bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => mutate(`user-${userId}`)}
                  variant="outline"
                >
                  Refresh
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8 rounded-lg border p-8">
          <div className="shrink-0">
            <img
              src={data.avatar}
              alt={data.name}
              className="h-[120px] w-[120px] rounded-full border-4 border-cyan-400"
            />
          </div>

          {!isEditing ? (
            <div className="flex-1">
              <h3 className="m-0 mb-2 text-2xl text-cyan-600 dark:text-cyan-400">
                {data.name}
              </h3>
              <p className="m-0 mb-4 text-sm text-muted-foreground">
                {data.email}
              </p>
              <p className="m-0 leading-relaxed">{data.bio}</p>
            </div>
          ) : (
            <div className="grid flex-1 gap-6">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  value={editForm.name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editForm.email || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={editForm.bio || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  className="min-h-20"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                >
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
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
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Select User</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={userId === 1 ? "default" : "outline"}
            className={
              userId === 1 ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600" : ""
            }
            onClick={() => onUserChange(1)}
          >
            User 1 (John Doe)
          </Button>
          <Button
            variant={userId === 2 ? "default" : "outline"}
            className={
              userId === 2 ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600" : ""
            }
            onClick={() => onUserChange(2)}
          >
            User 2 (Jane Smith)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const RevalidationDemo = () => {
  const [focusCount, setFocusCount] = useState(0);
  const [reconnectCount, setReconnectCount] = useState(0);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Automatic Revalidation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          SWR automatically revalidates data in the following scenarios:
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-cyan-600 dark:text-cyan-400">
                Window Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">
                Data refetches when you return to the tab
              </p>
              <Button
                onClick={() => setFocusCount((c) => c + 1)}
                variant="outline"
              >
                Simulate Focus ({focusCount})
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-cyan-600 dark:text-cyan-400">
                Network Reconnect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">
                Data refetches when network reconnects
              </p>
              <Button
                onClick={() => setReconnectCount((c) => c + 1)}
                variant="outline"
              >
                Simulate Reconnect ({reconnectCount})
              </Button>
            </CardContent>
          </Card>
        </div>

        <Alert className="mt-4 border-cyan-800 bg-cyan-900/20 text-cyan-200">
          <AlertDescription>
            💡 <strong>Try it:</strong> Switch to another tab and come back -
            you'll see the "Revalidating..." indicator as SWR fetches fresh data
            automatically.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

const SWRExampleContent = () => {
  // @example-start SWRExampleMain
  const [userId, setUserId] = useState(1); // [!code highlight]

  return (
    <ExampleLayout
      title="SWR (Stale-While-Revalidate)"
      description="Server state management with automatic revalidation and optimistic updates"
      sourcePath="src/examples/server-state/SWRExample.tsx"
      sourceLine={310}
      snippets={snippets}
    >
      <UserSelector userId={userId} onUserChange={setUserId} />
      <UserProfile userId={userId} />
      <RevalidationDemo />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <Kbd>SWR</Kbd> is a React Hooks library for data fetching by
              Vercel
            </li>
            <li>
              Stale-While-Revalidate strategy: show cached data first, then
              fetch fresh data
            </li>
            <li>
              <Kbd>useSWR(key, fetcher)</Kbd> hook manages data fetching and
              caching
            </li>
            <li>Automatic revalidation on focus, reconnect, and intervals</li>
            <li>Request deduplication prevents duplicate requests</li>
            <li>
              <Kbd>mutate()</Kbd> function for manual revalidation and
              optimistic updates
            </li>
            <li>Built-in error retry with exponential backoff</li>
            <li>Real-time experience with automatic refetch</li>
            <li>Optimistic UI updates for instant feedback</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>SWR Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-base font-semibold text-green-600 dark:text-green-400">
                ✓ Advantages
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Lightweight (5kb gzipped)</li>
                <li>Real-time experience</li>
                <li>Built-in cache</li>
                <li>Automatic revalidation</li>
                <li>Focus tracking</li>
                <li>Network status awareness</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold">📋 Best For</h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Real-time applications</li>
                <li>Data that changes frequently</li>
                <li>User-centric apps</li>
                <li>When freshness is critical</li>
                <li>Mobile-first applications</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>SWR vs TanStack Query</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-muted p-4">
              <h3 className="mb-2 text-base font-semibold">SWR</h3>
              <ul className="m-0 space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Simpler API</li>
                <li>Smaller bundle size</li>
                <li>Focus on revalidation</li>
                <li>Great for real-time data</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-muted p-4">
              <h3 className="mb-2 text-base font-semibold text-green-600 dark:text-green-400">
                TanStack Query
              </h3>
              <ul className="m-0 space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>More features</li>
                <li>Powerful DevTools</li>
                <li>Advanced pagination</li>
                <li>Better for complex apps</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Optimistic Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-muted-foreground">
            This example demonstrates optimistic updates:
          </p>
          <ol className="list-inside list-decimal space-y-2 pl-6 leading-relaxed text-muted-foreground">
            <li>Click "Edit" and make changes to the user profile</li>
            <li>When you save, the UI updates immediately (optimistic)</li>
            <li>The actual API request happens in the background</li>
            <li>If the request fails, changes are reverted automatically</li>
            <li>After success, SWR revalidates to ensure data is fresh</li>
          </ol>
        </CardContent>
      </Card>
    </ExampleLayout>
  );
  // @example-end SWRExampleMain
};

// @example-start SWRExampleConfig
const SWRExample = () => {
  return (
    <SWRConfig // [!code highlight]
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
  // @example-end SWRExampleConfig
};

export default SWRExample;
