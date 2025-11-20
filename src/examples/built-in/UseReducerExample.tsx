import { useReducer, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

interface State {
  todos: Todo[];
  filter: FilterType;
}

type Action =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number }
  | { type: "SET_FILTER"; filter: FilterType }
  | { type: "CLEAR_COMPLETED" };

const initialState: State = {
  todos: [
    { id: 1, text: "Learn useReducer", completed: true },
    { id: 2, text: "Build todo app", completed: false },
    { id: 3, text: "Master state management", completed: false },
  ],
  filter: "all",
};

function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.text,
            completed: false,
          },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.filter,
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    default:
      return state;
  }
}

const UseReducerExample = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState("");

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: "ADD_TODO", text: input });
      setInput("");
    }
  };

  const activeCount = state.todos.filter((t) => !t.completed).length;
  const completedCount = state.todos.filter((t) => t.completed).length;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="mb-2 text-3xl text-cyan-400">useReducer Hook</h1>
        <p className="text-gray-500">
          Todo list with complex state management and filters
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Add Todo</h2>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-gray-950 transition-all hover:bg-cyan-600 active:scale-95"
          >
            Add
          </button>
        </form>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="m-0 text-xl text-gray-200">Todos</h2>
          <div className="text-sm text-gray-500">
            {activeCount} active • {completedCount} completed
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
              state.filter === "all"
                ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => dispatch({ type: "SET_FILTER", filter: "all" })}
          >
            All
          </button>
          <button
            className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
              state.filter === "active"
                ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => dispatch({ type: "SET_FILTER", filter: "active" })}
          >
            Active
          </button>
          <button
            className={`rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
              state.filter === "completed"
                ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                : "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() =>
              dispatch({ type: "SET_FILTER", filter: "completed" })
            }
          >
            Completed
          </button>
          <button
            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600"
            onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
            disabled={completedCount === 0}
          >
            Clear Completed
          </button>
        </div>

        <ul className="list-none space-y-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center gap-3 rounded border border-gray-800 bg-gray-950 p-3 ${
                todo.completed ? "opacity-60" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
                className="h-5 w-5 cursor-pointer"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "text-gray-500 line-through"
                    : "text-gray-200"
                }`}
              >
                {todo.text}
              </span>
              <button
                className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white transition-all hover:bg-red-700 active:scale-95"
                onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id })}
              >
                Delete
              </button>
            </li>
          ))}
          {filteredTodos.length === 0 && (
            <li className="py-8 text-center text-gray-500">
              No todos to display
            </li>
          )}
        </ul>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Key Concepts</h2>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useReducer
            </code>{" "}
            is ideal for complex state logic with multiple sub-values
          </li>
          <li>Centralizes state update logic in a reducer function</li>
          <li>Actions describe "what happened" rather than "how to update"</li>
          <li>Makes state transitions explicit and predictable</li>
          <li>
            Better for state that depends on previous state or involves multiple
            operations
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UseReducerExample;
