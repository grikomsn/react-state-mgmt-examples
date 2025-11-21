import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  atomFamily,
} from "recoil";
import { useState } from "react";
import { ViewSourceLink } from "../../components/ui";

// Atoms
const documentTextAtom = atom({
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
const userColorFamily = atomFamily({
  key: "userColor",
  default: (userId: string) => {
    const colors = ["#61dafb", "#2ecc71", "#f39c12", "#e74c3c", "#9b59b6"];
    const index = parseInt(userId.replace("user", "")) - 1;
    return colors[index % colors.length];
  },
});

// Selectors
const documentStatsSelector = selector({
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
  const [text, setText] = useRecoilState(documentTextAtom);
  const [, setCursorPositions] = useRecoilState(cursorPositionsAtom);
  const currentUserId = useRecoilValue(currentUserIdAtom);
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
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Document Editor</h2>
      <div className="relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          onSelect={handleSelect}
          className="min-h-[300px] w-full resize-y rounded border border-gray-700 bg-gray-800 p-4 font-mono text-base leading-relaxed text-gray-200 focus:border-cyan-400 focus:outline-none"
        />
        <div className="absolute right-2 top-2 rounded bg-gray-950 px-2 py-1 text-xs text-gray-500">
          Your cursor: {selectionStart}
        </div>
      </div>
    </div>
  );
};

const DocumentStats = () => {
  const stats = useRecoilValue(documentStatsSelector);

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Document Statistics</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="rounded border border-gray-800 bg-gray-950 p-4 text-center"
          >
            <div className="text-2xl font-bold text-cyan-400">{value}</div>
            <div className="capitalize text-sm text-gray-500">{key}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CollaboratorsList = () => {
  const users = useRecoilValue(userNamesSelector);
  const cursorPositions = useRecoilValue(cursorPositionsAtom);
  const currentUserId = useRecoilValue(currentUserIdAtom);

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Active Collaborators</h2>
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 rounded border p-3"
            style={{
              backgroundColor:
                user.id === currentUserId ? "#264f5f" : "#1a1a1a",
              borderColor: user.id === currentUserId ? user.color : "#333",
            }}
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: user.color }}
            />
            <div className="flex-1">
              <div className="font-medium text-gray-200">
                {user.name}
                {user.id === currentUserId && (
                  <span className="text-sm text-gray-500"> (You)</span>
                )}
              </div>
              <div className="text-xs text-gray-500">
                Cursor at position {cursorPositions[user.id] || 0}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserSwitcher = () => {
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdAtom);
  const activeUsers = useRecoilValue(activeUsersAtom);

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Switch User</h2>
      <p className="mb-4 text-sm text-gray-500">
        Simulate different users editing the document
      </p>
      <div className="flex flex-wrap gap-2">
        {activeUsers.map((userId) => (
          <button
            key={userId}
            className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
              currentUserId === userId
                ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => setCurrentUserId(userId)}
          >
            User {userId.replace("user", "")}
          </button>
        ))}
      </div>
    </div>
  );
};

const RecoilExampleContent = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 border-b-2 border-gray-800 pb-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl text-cyan-400">Recoil</h1>
            <p className="text-gray-500">
              Collaborative document editor with atomic state
            </p>
          </div>
          <ViewSourceLink url={import.meta.url} />
        </div>
      </div>

      <UserSwitcher />
      <Editor />
      <DocumentStats />
      <CollaboratorsList />

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Key Concepts</h2>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              Recoil
            </code>{" "}
            provides atomic and flexible state management for React
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              atom()
            </code>{" "}
            creates a unit of state with a unique key
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              selector()
            </code>{" "}
            defines derived state with automatic memoization
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              atomFamily()
            </code>{" "}
            creates a collection of related atoms with parameters
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useRecoilState()
            </code>{" "}
            works like useState but for Recoil atoms
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useRecoilValue()
            </code>{" "}
            subscribes to atom value (read-only)
          </li>
          <li>Atoms can be shared across components without prop drilling</li>
          <li>
            Selectors automatically track dependencies and recompute efficiently
          </li>
          <li>Built-in support for async data queries and mutations</li>
        </ul>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Recoil Features</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-base text-green-400">✓ Advantages</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Designed specifically for React</li>
              <li>Concurrent mode compatible</li>
              <li>Powerful selector system</li>
              <li>Atom families for dynamic state</li>
              <li>Built-in async support</li>
              <li>Time-travel debugging</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-base text-cyan-400">📋 Best For</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Complex derived state</li>
              <li>Collaborative applications</li>
              <li>Dynamic collections of state</li>
              <li>Apps with async dependencies</li>
              <li>When you need fine-grained control</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Atom vs Selector</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded border border-gray-800 bg-gray-950 p-4">
            <h3 className="mb-2 text-base text-cyan-400">Atoms</h3>
            <ul className="m-0 space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Units of state</li>
              <li>Can be written to</li>
              <li>Source of truth</li>
              <li>Examples: text, cursor position</li>
            </ul>
          </div>
          <div className="rounded border border-gray-800 bg-gray-950 p-4">
            <h3 className="mb-2 text-base text-green-400">Selectors</h3>
            <ul className="m-0 space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Derived state</li>
              <li>Read-only (or writable with set)</li>
              <li>Computed from atoms</li>
              <li>Examples: word count, stats</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
