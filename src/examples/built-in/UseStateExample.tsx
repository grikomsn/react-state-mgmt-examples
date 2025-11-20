import { useState } from "react";

const UseStateExample = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<number[]>([0]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const reset = () => {
    setCount(0);
    setHistory([0]);
  };

  return (
    <div className="example-container">
      <div className="example-header">
        <h1>useState Hook</h1>
        <p>Basic state management with counter and history tracking</p>
      </div>

      <div className="example-section">
        <h2>Counter</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <button onClick={decrement}>-</button>
          <span
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#61dafb" }}
          >
            {count}
          </span>
          <button onClick={increment}>+</button>
          <button onClick={reset} className="secondary">
            Reset
          </button>
        </div>
      </div>

      <div className="example-section">
        <h2>History</h2>
        <p style={{ color: "#999", marginBottom: "0.5rem" }}>
          All count values: {history.length} entries
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            padding: "1rem",
            background: "#1a1a1a",
            borderRadius: "4px",
          }}
        >
          {history.map((value, index) => (
            <span
              key={index}
              style={{
                padding: "0.25rem 0.5rem",
                background: value === count ? "#264f5f" : "#2a2a2a",
                color: value === count ? "#61dafb" : "#e0e0e0",
                borderRadius: "4px",
                fontSize: "0.875rem",
              }}
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      <div className="example-section">
        <h2>Key Concepts</h2>
        <ul style={{ color: "#999", lineHeight: "1.8" }}>
          <li>
            <code>useState</code> is the most basic React hook for managing
            component state
          </li>
          <li>Returns a state value and a setter function</li>
          <li>State updates trigger component re-renders</li>
          <li>Previous state is preserved between renders</li>
          <li>Can store any type of value (primitives, objects, arrays)</li>
        </ul>
      </div>
    </div>
  );
};

export default UseStateExample;
