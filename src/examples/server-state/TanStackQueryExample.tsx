import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { fetchPosts, createPost } from "../../api";
import { ViewSourceLink } from "../../components/ui";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const PostsList = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page, 3),
  });

  // Prefetch next page
  const prefetchNextPage = () => {
    if (data && page * 3 < data.total) {
      queryClient.prefetchQuery({
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
      <div className="rounded border border-red-800 bg-red-900/30 p-4 text-red-200">
        Error loading posts:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {data?.posts.map((post) => (
          <div
            key={post.id}
            className="rounded-lg border border-gray-800 bg-gray-950 p-6"
          >
            <h3 className="m-0 mb-2 text-lg text-cyan-400">{post.title}</h3>
            <p className="m-0 mb-4 leading-relaxed text-gray-200">
              {post.body}
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-gray-950 transition-all hover:bg-cyan-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => {
              setPage((p) => p + 1);
              prefetchNextPage();
            }}
            disabled={page >= totalPages}
            onMouseEnter={prefetchNextPage}
            className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-gray-950 transition-all hover:bg-cyan-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          {isFetching && (
            <span className="text-xs text-cyan-400">Updating...</span>
          )}
        </div>
      </div>
    </div>
  );
};

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts queries
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // Reset form
      setTitle("");
      setBody("");
      setAuthor("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body && author) {
      mutation.mutate({ title, body, author });
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Create New Post</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="mb-1 block text-sm text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            disabled={mutation.isPending}
            className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-500">Content</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post content"
            disabled={mutation.isPending}
            className="min-h-[100px] w-full resize-y rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            disabled={mutation.isPending}
            className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {mutation.isError && (
          <div className="rounded border border-red-800 bg-red-900/30 p-3 text-sm text-red-200">
            Error:{" "}
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Failed to create post"}
          </div>
        )}

        {mutation.isSuccess && (
          <div className="rounded border border-green-800 bg-green-900/30 p-3 text-sm text-green-200">
            Post created successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={mutation.isPending || !title || !body || !author}
          className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-gray-950 transition-all hover:bg-cyan-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mutation.isPending ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

const QueryStats = () => {
  const queries = queryClient.getQueryCache().getAll();
  const mutations = queryClient.getMutationCache().getAll();

  return (
    <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl text-gray-200">Query Cache Status</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded border border-gray-800 bg-gray-950 p-4">
          <div className="text-2xl font-bold text-cyan-400">
            {queries.length}
          </div>
          <div className="text-sm text-gray-500">Cached Queries</div>
        </div>
        <div className="rounded border border-gray-800 bg-gray-950 p-4">
          <div className="text-2xl font-bold text-green-400">
            {queries.filter((q) => q.state.status === "success").length}
          </div>
          <div className="text-sm text-gray-500">Successful</div>
        </div>
        <div className="rounded border border-gray-800 bg-gray-950 p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {mutations.length}
          </div>
          <div className="text-sm text-gray-500">Mutations</div>
        </div>
      </div>
    </div>
  );
};

const TanStackQueryExampleContent = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 border-b-2 border-gray-800 pb-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl text-cyan-400">
              TanStack Query (React Query)
            </h1>
            <p className="text-gray-500">
              Server state management with caching, pagination, and mutations
            </p>
          </div>
          <ViewSourceLink url={import.meta.url} />
        </div>
      </div>

      <CreatePostForm />

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Posts</h2>
        <PostsList />
      </div>

      <QueryStats />

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Key Concepts</h2>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              TanStack Query
            </code>{" "}
            (React Query) manages server state with automatic caching
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useQuery
            </code>{" "}
            fetches and caches data with automatic background updates
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useMutation
            </code>{" "}
            handles data modifications (POST, PUT, DELETE)
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
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">TanStack Query Features</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-base text-green-400">✓ Advantages</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Automatic caching and deduplication</li>
              <li>Background refetching</li>
              <li>Pagination and infinite scroll</li>
              <li>Request cancellation</li>
              <li>Parallel and dependent queries</li>
              <li>DevTools for debugging</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-base text-cyan-400">📋 Best For</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Apps with server data</li>
              <li>RESTful APIs</li>
              <li>Real-time data updates</li>
              <li>Paginated or infinite lists</li>
              <li>Complex data fetching needs</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Cache Behavior</h2>
        <p className="mb-4 text-gray-500">
          TanStack Query automatically manages cache lifecycle:
        </p>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>Fresh data is served immediately from cache</li>
          <li>Stale data is refetched in the background</li>
          <li>Failed queries are retried automatically</li>
          <li>Inactive queries are garbage collected</li>
          <li>Prefetched data improves navigation speed</li>
        </ul>
      </div>
    </div>
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
