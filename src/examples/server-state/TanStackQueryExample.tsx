import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { fetchPosts, createPost } from "../../api";
import { ExampleLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Kbd } from "../../components/ui/kbd";
import { createExampleSnippets } from "../../utils/example-snippets";
import rawSource from "./TanStackQueryExample.tsx?raw";

const snippetIds = [
  "TanStackQueryExamplePostsList",
  "TanStackQueryExampleCreatePostForm",
  "TanStackQueryExampleConfig",
];
const snippets = createExampleSnippets(rawSource, snippetIds).map((s) => ({
  ...s,
  label:
    s.id === "TanStackQueryExamplePostsList"
      ? "PostsList.tsx"
      : s.id === "TanStackQueryExampleCreatePostForm"
      ? "CreatePostForm.tsx"
      : "QueryClient.tsx",
  language: "tsx" as const,
}));

// @example-start TanStackQueryExampleConfig
const queryClient = new QueryClient({ // [!code highlight]
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
// @example-end TanStackQueryExampleConfig

const PostsList = () => {
  // @example-start TanStackQueryExamplePostsList
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, error, isFetching } = useQuery({ // [!code highlight]
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page, 3),
  });

  // Prefetch next page
  const prefetchNextPage = () => {
    if (data && page * 3 < data.total) {
      queryClient.prefetchQuery({ // [!code highlight]
        queryKey: ["posts", page + 1],
        queryFn: () => fetchPosts(page + 1, 3),
      });
    }
  };

  const totalPages = data ? Math.ceil(data.total / 3) : 0;

  if (isLoading) {
    return (
      <div className="py-8 text-center text-gray-500">Loading posts...</div>
    );
  }

  if (error) {
    return (
      <Alert
        variant="destructive"
        className="border-red-800 bg-red-900/30 text-red-200"
      >
        <AlertDescription>
          Error loading posts:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {data?.posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="m-0 mb-4 leading-relaxed text-muted-foreground">
                {post.body}
              </p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>By {post.author}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="bg-cyan-500 text-gray-950 hover:bg-cyan-600"
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              setPage((p) => p + 1);
              prefetchNextPage();
            }}
            disabled={page >= totalPages}
            onMouseEnter={prefetchNextPage}
            className="bg-cyan-500 text-gray-950 hover:bg-cyan-600"
          >
            Next
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          {isFetching && (
            <span className="text-xs text-cyan-600 dark:text-cyan-400">
              Updating...
            </span>
          )}
        </div>
      </div>
    </div>
  );
  // @example-end TanStackQueryExamplePostsList
};

const CreatePostForm = () => {
  // @example-start TanStackQueryExampleCreatePostForm
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({ // [!code highlight]
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts queries
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // [!code highlight]
      // Reset form
      setTitle("");
      setBody("");
      setAuthor("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body && author) {
      mutation.mutate({ title, body, author }); // [!code highlight]
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              disabled={mutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter post content"
              disabled={mutation.isPending}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Author</Label>
            <Input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              disabled={mutation.isPending}
            />
          </div>

          {mutation.isError && (
            <Alert
              variant="destructive"
              className="border-red-800 bg-red-900/30 text-red-200"
            >
              <AlertDescription>
                Error:{" "}
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : "Failed to create post"}
              </AlertDescription>
            </Alert>
          )}

          {mutation.isSuccess && (
            <Alert className="border-green-800 bg-green-900/30 text-green-200">
              <AlertDescription>Post created successfully!</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={mutation.isPending || !title || !body || !author}
            className="bg-cyan-500 text-gray-950 hover:bg-cyan-600"
          >
            {mutation.isPending ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
  // @example-end TanStackQueryExampleCreatePostForm
};

const QueryStats = () => {
  const queries = queryClient.getQueryCache().getAll();
  const mutations = queryClient.getMutationCache().getAll();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Query Cache Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded border p-4">
            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              {queries.length}
            </div>
            <div className="text-sm text-muted-foreground">Cached Queries</div>
          </div>
          <div className="rounded border p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {queries.filter((q) => q.state.status === "success").length}
            </div>
            <div className="text-sm text-muted-foreground">Successful</div>
          </div>
          <div className="rounded border p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {mutations.length}
            </div>
            <div className="text-sm text-muted-foreground">Mutations</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TanStackQueryExampleContent = () => {
  return (
    <ExampleLayout
      title="TanStack Query (React Query)"
      description="Server state management with caching, pagination, and mutations"
      sourcePath="src/examples/server-state/TanStackQueryExample.tsx"
      sourceLine={269}
      snippets={snippets}
    >
      <CreatePostForm />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <PostsList />
        </CardContent>
      </Card>

      <QueryStats />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <Kbd>TanStack Query</Kbd> (React Query) manages server state with
              automatic caching
            </li>
            <li>
              <Kbd>useQuery</Kbd> fetches and caches data with automatic
              background updates
            </li>
            <li>
              <Kbd>useMutation</Kbd> handles data modifications (POST, PUT,
              DELETE)
            </li>
            <li>Query keys identify and organize cached data</li>
            <li>
              Automatic refetching on window focus, network reconnect, and
              intervals
            </li>
            <li>Built-in loading, error, and success states</li>
            <li>Query invalidation triggers automatic refetch</li>
            <li>Prefetching improves perceived performance</li>
            <li>Optimistic updates for instant UI feedback</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>TanStack Query Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-base font-semibold text-green-600 dark:text-green-400">
                ✓ Advantages
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Automatic caching and deduplication</li>
                <li>Background refetching</li>
                <li>Pagination and infinite scroll</li>
                <li>Request cancellation</li>
                <li>Parallel and dependent queries</li>
                <li>DevTools for debugging</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold">📋 Best For</h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Apps with server data</li>
                <li>RESTful APIs</li>
                <li>Real-time data updates</li>
                <li>Paginated or infinite lists</li>
                <li>Complex data fetching needs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cache Behavior</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            TanStack Query automatically manages cache lifecycle:
          </p>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>Fresh data is served immediately from cache</li>
            <li>Stale data is refetched in the background</li>
            <li>Failed queries are retried automatically</li>
            <li>Inactive queries are garbage collected</li>
            <li>Prefetched data improves navigation speed</li>
          </ul>
        </CardContent>
      </Card>
    </ExampleLayout>
  );
};

const TanStackQueryExample = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TanStackQueryExampleContent />
    </QueryClientProvider>
  );
};

export default TanStackQueryExample;
