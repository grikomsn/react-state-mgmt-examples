import { useState } from "react";
import { ExampleLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Kbd } from "../../components/ui/kbd";
import { createExampleSnippets } from "../../utils/example-snippets";
import rawSource from "./UseStateExample.tsx?raw";

const snippetIds = ["UseStateExampleState", "UseStateExampleUpdates"];
const snippets = createExampleSnippets(rawSource, snippetIds).map((s) => ({
  ...s,
  label:
    s.id === "UseStateExampleState"
      ? "State.tsx"
      : "Updates.tsx",
  language: "tsx" as const,
}));

const UseStateExample = () => {
  // @example-start UseStateExampleState
  const [count, setCount] = useState(0); // [!code highlight]
  const [history, setHistory] = useState<number[]>([0]);
  // @example-end UseStateExampleState

  // @example-start UseStateExampleUpdates
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount); // [!code highlight]
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
  // @example-end UseStateExampleUpdates

  return (
    <ExampleLayout
      title="useState Hook"
      description="Basic state management with counter and history tracking"
      sourcePath="src/examples/built-in/UseStateExample.tsx"
      sourceLine={30}
      snippets={snippets}
    >
      <Card className="mb-4 md:mb-6">
        <CardHeader>
          <CardTitle>Counter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3 md:mb-4 flex items-center gap-2 md:gap-4">
            <Button onClick={decrement}>-</Button>
            <span className="text-2xl md:text-3xl font-bold">{count}</span>
            <Button onClick={increment}>+</Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4 md:mb-6">
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-sm text-muted-foreground">
            All count values: {history.length} entries
          </p>
          <div className="flex flex-wrap gap-2 rounded-lg bg-muted p-4">
            {history.map((value, index) => (
              <Badge
                key={index}
                variant={value === count ? "default" : "outline"}
              >
                {value}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4 md:mb-6">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <Kbd>useState</Kbd> is the most basic React hook for managing
              component state
            </li>
            <li>Returns a state value and a setter function</li>
            <li>State updates trigger component re-renders</li>
            <li>Previous state is preserved between renders</li>
            <li>Can store any type of value (primitives, objects, arrays)</li>
          </ul>
        </CardContent>
      </Card>
    </ExampleLayout>
  );
};

export default UseStateExample;
