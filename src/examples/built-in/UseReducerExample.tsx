import { useReducer, useState } from "react";
import { ExampleLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Kbd } from "../../components/ui/kbd";
import { Badge } from "../../components/ui/badge";
import { createExampleSnippets } from "../../utils/example-snippets";
import rawSource from "./UseReducerExample.tsx?raw";

const snippetIds = ["UseReducerExampleReducer", "UseReducerExampleComponent"];
const snippets = createExampleSnippets(rawSource, snippetIds).map((s) => ({
  ...s,
  label:
    s.id === "UseReducerExampleReducer"
      ? "todoReducer.ts"
      : "UseReducerExample.tsx",
  language: "tsx" as const,
}));

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

// @example-start UseReducerExampleReducer
function todoReducer(state: State, action: Action): State {
  // [!code highlight]
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
// @example-end UseReducerExampleReducer

const UseReducerExample = () => {
  // @example-start UseReducerExampleComponent
  const [state, dispatch] = useReducer(todoReducer, initialState); // [!code highlight]
  const [input, setInput] = useState("");

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: "ADD_TODO", text: input }); // [!code highlight]
      setInput("");
    }
  };

  const activeCount = state.todos.filter((t) => !t.completed).length;
  const completedCount = state.todos.filter((t) => t.completed).length;

  const content = (
    <>
      <Card className="mb-4 md:mb-6">
        <CardHeader>
          <CardTitle>Add Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1"
            />
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-4 md:mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Todos</CardTitle>
            <Badge variant="secondary">
              {activeCount} active • {completedCount} completed
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            <Button
              variant={state.filter === "all" ? "default" : "outline"}
              onClick={() => dispatch({ type: "SET_FILTER", filter: "all" })} // [!code highlight]
            >
              All
            </Button>
            <Button
              variant={state.filter === "active" ? "default" : "outline"}
              onClick={() => dispatch({ type: "SET_FILTER", filter: "active" })}
            >
              Active
            </Button>
            <Button
              variant={state.filter === "completed" ? "default" : "outline"}
              onClick={() =>
                dispatch({ type: "SET_FILTER", filter: "completed" })
              }
            >
              Completed
            </Button>
            <Button
              variant="destructive"
              onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
              disabled={completedCount === 0}
            >
              Clear Completed
            </Button>
          </div>

          <ul className="list-none space-y-2">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  todo.completed ? "opacity-60" : ""
                }`}
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() =>
                    dispatch({ type: "TOGGLE_TODO", id: todo.id }) // [!code highlight]
                  }
                />
                <span
                  className={`flex-1 ${
                    todo.completed ? "text-muted-foreground line-through" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id })} // [!code highlight]
                >
                  Delete
                </Button>
              </li>
            ))}
            {filteredTodos.length === 0 && (
              <li className="py-4 md:py-8 text-center text-muted-foreground">
                No todos to display
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </>
  );
  // @example-end UseReducerExampleComponent

  return (
    <ExampleLayout
      title="useReducer Hook"
      description="Todo list with complex state management and filters"
      sourcePath="src/examples/built-in/UseReducerExample.tsx"
      sourceLine={102}
      snippets={snippets}
    >
      {content}

      <Card className="mb-4 md:mb-6">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <Kbd>useReducer</Kbd> is ideal for complex state logic with
              multiple sub-values
            </li>
            <li>Centralizes state update logic in a reducer function</li>
            <li>
              Actions describe "what happened" rather than "how to update"
            </li>
            <li>Makes state transitions explicit and predictable</li>
            <li>
              Better for state that depends on previous state or involves
              multiple operations
            </li>
          </ul>
        </CardContent>
      </Card>
    </ExampleLayout>
  );
};

export default UseReducerExample;
