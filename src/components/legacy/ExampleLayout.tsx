import type { ReactNode } from "react";

interface ExampleLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const ExampleLayout = ({
  title,
  description,
  children,
}: ExampleLayoutProps) => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="mb-2 text-3xl text-cyan-400">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </div>
      {children}
    </div>
  );
};
