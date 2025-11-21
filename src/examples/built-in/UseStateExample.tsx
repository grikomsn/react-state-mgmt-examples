import { useState } from "react";
import { ViewSourceLink } from "../../components/legacy";

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
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 border-b-2 border-gray-800 pb-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl text-cyan-400">useState Hook</h1>
            <p className="text-gray-500">
              Basic state management with counter and history tracking
            </p>
          </div>
          <ViewSourceLink url={import.meta.url} />
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Counter</h2>
        <div className="mb-4 flex items-center gap-4">
          <button
            onClick={decrement}
            className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-gray-950 transition-all hover:bg-cyan-600 active:scale-95"
          >
            -
          </button>
          <span className="text-3xl font-bold text-cyan-400">{count}</span>
          <button
            onClick={increment}
            className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-gray-950 transition-all hover:bg-cyan-600 active:scale-95"
          >
            +
          </button>
          <button
            onClick={reset}
            className="rounded border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 transition-all hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">History</h2>
        <p className="mb-2 text-sm text-gray-500">
          All count values: {history.length} entries
        </p>
        <div className="flex flex-wrap gap-2 rounded bg-gray-950 p-4">
          {history.map((value, index) => (
            <span
              key={index}
              className={`rounded px-2 py-1 text-sm ${
                value === count
                  ? "bg-cyan-900/50 text-cyan-400"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Key Concepts</h2>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useState
            </code>{" "}
            is the most basic React hook for managing component state
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
