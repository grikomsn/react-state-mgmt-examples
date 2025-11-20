import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  atomFamily,
} from "recoil";
import { useState } from "react";

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
    <div className="example-section">
      <h2>Document Editor</h2>
      <div style={{ position: "relative" }}>
        <textarea
          value={text}
          onChange={handleTextChange}
          onSelect={handleSelect}
          style={{
            width: "100%",
            minHeight: "300px",
            padding: "1rem",
            fontSize: "1rem",
            lineHeight: "1.6",
            fontFamily: "monospace",
            resize: "vertical",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            fontSize: "0.75rem",
            color: "#999",
            background: "#1a1a1a",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          Your cursor: {selectionStart}
        </div>
      </div>
    </div>
  );
};

const DocumentStats = () => {
  const stats = useRecoilValue(documentStatsSelector);

  return (
    <div className="example-section">
      <h2>Document Statistics</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
        }}
      >
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "4px",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#61dafb",
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "#999",
                textTransform: "capitalize",
              }}
            >
              {key}
            </div>
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
    <div className="example-section">
      <h2>Active Collaborators</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem",
              background: user.id === currentUserId ? "#264f5f" : "#1a1a1a",
              border: `1px solid ${
                user.id === currentUserId ? user.color : "#333"
              }`,
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: user.color,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>
                {user.name}
                {user.id === currentUserId && (
                  <span style={{ color: "#999", fontSize: "0.875rem" }}>
                    {" "}
                    (You)
                  </span>
                )}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#999" }}>
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
    <div className="example-section">
      <h2>Switch User</h2>
      <p style={{ color: "#999", fontSize: "0.875rem", marginBottom: "1rem" }}>
        Simulate different users editing the document
      </p>
      <div className="button-group">
        {activeUsers.map((userId) => (
          <button
            key={userId}
            className={currentUserId === userId ? "" : "secondary"}
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
    <div className="example-container">
      <div className="example-header">
        <h1>Recoil</h1>
        <p>Collaborative document editor with atomic state</p>
      </div>

      <UserSwitcher />
      <Editor />
      <DocumentStats />
      <CollaboratorsList />

      <div className="example-section">
        <h2>Key Concepts</h2>
        <ul style={{ color: "#999", lineHeight: "1.8" }}>
          <li>
            <strong>Recoil</strong> provides atomic and flexible state
            management for React
          </li>
          <li>
            <code>atom()</code> creates a unit of state with a unique key
          </li>
          <li>
            <code>selector()</code> defines derived state with automatic
            memoization
          </li>
          <li>
            <code>atomFamily()</code> creates a collection of related atoms with
            parameters
          </li>
          <li>
            <code>useRecoilState()</code> works like useState but for Recoil
            atoms
          </li>
          <li>
            <code>useRecoilValue()</code> subscribes to atom value (read-only)
          </li>
          <li>Atoms can be shared across components without prop drilling</li>
          <li>
            Selectors automatically track dependencies and recompute efficiently
          </li>
          <li>Built-in support for async data queries and mutations</li>
        </ul>
      </div>

      <div className="example-section">
        <h2>Recoil Features</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <h3
              style={{
                color: "#2ecc71",
                fontSize: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              ✓ Advantages
            </h3>
            <ul
              style={{ color: "#999", fontSize: "0.875rem", lineHeight: "1.6" }}
            >
              <li>Designed specifically for React</li>
              <li>Concurrent mode compatible</li>
              <li>Powerful selector system</li>
              <li>Atom families for dynamic state</li>
              <li>Built-in async support</li>
              <li>Time-travel debugging</li>
            </ul>
          </div>
          <div>
            <h3
              style={{
                color: "#61dafb",
                fontSize: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              📋 Best For
            </h3>
            <ul
              style={{ color: "#999", fontSize: "0.875rem", lineHeight: "1.6" }}
            >
              <li>Complex derived state</li>
              <li>Collaborative applications</li>
              <li>Dynamic collections of state</li>
              <li>Apps with async dependencies</li>
              <li>When you need fine-grained control</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h2>Atom vs Selector</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "4px",
              padding: "1rem",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                marginBottom: "0.5rem",
                color: "#61dafb",
              }}
            >
              Atoms
            </h3>
            <ul
              style={{
                color: "#999",
                fontSize: "0.875rem",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              <li>Units of state</li>
              <li>Can be written to</li>
              <li>Source of truth</li>
              <li>Examples: text, cursor position</li>
            </ul>
          </div>
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "4px",
              padding: "1rem",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                marginBottom: "0.5rem",
                color: "#2ecc71",
              }}
            >
              Selectors
            </h3>
            <ul
              style={{
                color: "#999",
                fontSize: "0.875rem",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
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
