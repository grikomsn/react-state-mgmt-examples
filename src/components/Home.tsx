import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { PageContent, PageHeader } from "./layout";

const ExampleCard = ({
  to,
  title,
  description,
}: {
  to: string;
  title: string;
  description: string;
}) => {
  return (
    <Link to={to} className="block h-full">
      <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader className="flex-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

const Home = () => {
  return (
    <PageContent>
      <PageHeader
        title="React State Management Examples"
        description="Explore comprehensive examples of various state management patterns in React. Each example demonstrates key concepts and best practices."
      />

      <section className="mb-12 space-y-4">
        <h2 className="text-2xl font-semibold">Built-in React Hooks</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          <ExampleCard
            to="/usestate"
            title="useState"
            description="Counter with history tracking"
          />
          <ExampleCard
            to="/usereducer"
            title="useReducer"
            description="Todo list with filters"
          />
          <ExampleCard
            to="/usecontext"
            title="useContext"
            description="Theme switcher with global state"
          />
        </div>
      </section>

      <section className="mb-12 space-y-4">
        <h2 className="text-2xl font-semibold">External State Libraries</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          <ExampleCard
            to="/redux"
            title="Redux Toolkit"
            description="Shopping cart with DevTools"
          />
          <ExampleCard
            to="/zustand"
            title="Zustand"
            description="User preferences with persistence"
          />
          <ExampleCard
            to="/jotai"
            title="Jotai"
            description="Form with atomic dependencies"
          />
          <ExampleCard
            to="/mobx"
            title="MobX"
            description="Real-time dashboard"
          />
          <ExampleCard
            to="/recoil"
            title="Recoil"
            description="Collaborative editor"
          />
        </div>
      </section>

      <section className="mb-12 space-y-4">
        <h2 className="text-2xl font-semibold">Server State Management</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          <ExampleCard
            to="/tanstack-query"
            title="TanStack Query"
            description="Posts with pagination and mutations"
          />
          <ExampleCard
            to="/swr"
            title="SWR"
            description="User profile with revalidation"
          />
        </div>
      </section>
    </PageContent>
  );
};

export default Home;
