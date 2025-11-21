import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  atomFamily,
} from "recoil";
import { useState } from "react";
import { ExampleLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import { Kbd } from "../../components/ui/kbd";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { createExampleSnippets } from "../../utils/example-snippets";
import rawSource from "./RecoilExample.tsx?raw";

const snippetIds = [
  "RecoilExampleEditor",
  "RecoilExampleDocumentStats",
  "RecoilExampleCollaboratorsList",
  "RecoilExampleUserSwitcher",
];
const snippets = createExampleSnippets(rawSource, snippetIds).map((s) => ({
  ...s,
  label:
    s.id === "RecoilExampleEditor"
      ? "Editor.tsx"
      : s.id === "RecoilExampleDocumentStats"
      ? "DocumentStats.tsx"
      : s.id === "RecoilExampleCollaboratorsList"
      ? "CollaboratorsList.tsx"
      : "UserSwitcher.tsx",
  language: "tsx" as const,
}));

// Atoms
const documentTextAtom = atom({ // [!code highlight]
  key: "documentText",
  default:
    "Start typing your document here...\n\nRecoil provides atomic state management for React applications.",
});

const cursorPositionsAtom = atom<{ [userId: string]: number }>({
  key: "cursorPositions",
  default: {
    user1: 0,
    user2: 15,
    user3: 45,
  },
});

const activeUsersAtom = atom<string[]>({
  key: "activeUsers",
  default: ["user1", "user2", "user3"],
});

const currentUserIdAtom = atom({
  key: "currentUserId",
  default: "user1",
});

// Atom Family for user colors
const userColorFamily = atomFamily({ // [!code highlight]
  key: "userColor",
  default: (userId: string) => {
    const colors = ["#61dafb", "#2ecc71", "#f39c12", "#e74c3c", "#9b59b6"];
    const index = parseInt(userId.replace("user", "")) - 1;
    return colors[index % colors.length];
  },
});

// Selectors
const documentStatsSelector = selector({ // [!code highlight]
  key: "documentStats",
  get: ({ get }) => {
    const text = get(documentTextAtom);
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    const characters = text.length;
    const lines = text.split("\n").length;
    const paragraphs = text
      .split(/\n\n+/)
      .filter((p) => p.trim().length > 0).length;

    return { words, characters, lines, paragraphs };
  },
});

const userNamesSelector = selector({
  key: "userNames",
  get: ({ get }) => {
    const users = get(activeUsersAtom);
    return users.map((id) => ({
      id,
      name: `User ${id.replace("user", "")}`,
      color: get(userColorFamily(id)),
    }));
  },
});

const Editor = () => {
  // @example-start RecoilExampleEditor
  const [text, setText] = useRecoilState(documentTextAtom); // [!code highlight]
  const [, setCursorPositions] = useRecoilState(cursorPositionsAtom);
  const currentUserId = useRecoilValue(currentUserIdAtom); // [!code highlight]
  const [selectionStart, setSelectionStart] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const newPosition = e.target.selectionStart;
    setCursorPositions((prev) => ({
      ...prev,
      [currentUserId]: newPosition,
    }));
    setSelectionStart(newPosition);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPosition = e.target.selectionStart;
    setCursorPositions((prev) => ({
      ...prev,
      [currentUserId]: newPosition,
    }));
    setSelectionStart(newPosition);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Document Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Textarea
            value={text}
            onChange={handleTextChange}
            onSelect={handleSelect}
            className="min-h-[300px] font-mono text-base leading-relaxed"
          />
          <div className="absolute right-2 top-2 rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
            Your cursor: {selectionStart}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  // @example-end RecoilExampleEditor
};

const DocumentStats = () => {
  // @example-start RecoilExampleDocumentStats
  const stats = useRecoilValue(documentStatsSelector); // [!code highlight]

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Document Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="rounded border p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {value}
              </div>
              <div className="capitalize text-sm text-muted-foreground">
                {key}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
  // @example-end RecoilExampleDocumentStats
};

const CollaboratorsList = () => {
  // @example-start RecoilExampleCollaboratorsList
  const users = useRecoilValue(userNamesSelector); // [!code highlight]
  const cursorPositions = useRecoilValue(cursorPositionsAtom);
  const currentUserId = useRecoilValue(currentUserIdAtom);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Active Collaborators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 rounded border p-3"
              style={{
                borderColor: user.id === currentUserId ? user.color : undefined,
              }}
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: user.color }}
              />
              <div className="flex-1">
                <div className="font-medium">
                  {user.name}
                  {user.id === currentUserId && (
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      (You)
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  Cursor at position {cursorPositions[user.id] || 0}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
  // @example-end RecoilExampleCollaboratorsList
};

const UserSwitcher = () => {
  // @example-start RecoilExampleUserSwitcher
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdAtom); // [!code highlight]
  const activeUsers = useRecoilValue(activeUsersAtom);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Switch User</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Simulate different users editing the document
        </p>
        <div className="flex flex-wrap gap-2">
          {activeUsers.map((userId) => (
            <Button
              key={userId}
              variant={currentUserId === userId ? "default" : "outline"}
              className={
                currentUserId === userId
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : ""
              }
              onClick={() => setCurrentUserId(userId)}
            >
              User {userId.replace("user", "")}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
  // @example-end RecoilExampleUserSwitcher
};

const RecoilExampleContent = () => {
  return (
    <ExampleLayout
      title="Recoil"
      description="Collaborative document editor with atomic state"
      sourcePath="src/examples/external/RecoilExample.tsx"
      sourceLine={243}
      snippets={snippets}
    >
      <UserSwitcher />
      <Editor />
      <DocumentStats />
      <CollaboratorsList />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <Kbd>Recoil</Kbd> provides atomic and flexible state management
              for React
            </li>
            <li>
              <Kbd>atom()</Kbd> creates a unit of state with a unique key
            </li>
            <li>
              <Kbd>selector()</Kbd> defines derived state with automatic
              memoization
            </li>
            <li>
              <Kbd>atomFamily()</Kbd> creates a collection of related atoms with
              parameters
            </li>
            <li>
              <Kbd>useRecoilState()</Kbd> works like useState but for Recoil
              atoms
            </li>
            <li>
              <Kbd>useRecoilValue()</Kbd> subscribes to atom value (read-only)
            </li>
            <li>Atoms can be shared across components without prop drilling</li>
            <li>
              Selectors automatically track dependencies and recompute
              efficiently
            </li>
            <li>Built-in support for async data queries and mutations</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recoil Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-base font-semibold text-green-600 dark:text-green-400">
                ✓ Advantages
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Designed specifically for React</li>
                <li>Concurrent mode compatible</li>
                <li>Powerful selector system</li>
                <li>Atom families for dynamic state</li>
                <li>Built-in async support</li>
                <li>Time-travel debugging</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold">📋 Best For</h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Complex derived state</li>
                <li>Collaborative applications</li>
                <li>Dynamic collections of state</li>
                <li>Apps with async dependencies</li>
                <li>When you need fine-grained control</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Atom vs Selector</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-muted p-4">
              <h3 className="mb-2 text-base font-semibold">Atoms</h3>
              <ul className="m-0 space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Units of state</li>
                <li>Can be written to</li>
                <li>Source of truth</li>
                <li>Examples: text, cursor position</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-muted p-4">
              <h3 className="mb-2 text-base font-semibold text-cyan-600 dark:text-cyan-400">
                Selectors
              </h3>
              <ul className="m-0 space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Derived state</li>
                <li>Read-only (or writable with set)</li>
                <li>Computed from atoms</li>
                <li>Examples: word count, stats</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </ExampleLayout>
  );
};

const RecoilExample = () => {
  return (
    <RecoilRoot>
      <RecoilExampleContent />
    </RecoilRoot>
  );
};

export default RecoilExample;
