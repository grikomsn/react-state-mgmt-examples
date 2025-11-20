import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchPosts, createPost } from '../../api/mockApi.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const PostsList = () => {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page, 3),
  })

  // Prefetch next page
  const prefetchNextPage = () => {
    if (data && page * 3 < data.total) {
      queryClient.prefetchQuery({
        queryKey: ['posts', page + 1],
        queryFn: () => fetchPosts(page + 1, 3),
      })
    }
  }

  const totalPages = data ? Math.ceil(data.total / 3) : 0

  if (isLoading) {
    return <div className="loading">Loading posts...</div>
  }

  if (error) {
    return (
      <div className="error">
        Error loading posts: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {data?.posts.map(post => (
          <div
            key={post.id}
            style={{
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#61dafb' }}>{post.title}</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#e0e0e0', lineHeight: '1.6' }}>{post.body}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#999' }}>
              <span>By {post.author}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="button-group">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            Previous
          </button>
          <button
            onClick={() => {
              setPage(p => p + 1)
              prefetchNextPage()
            }}
            disabled={page >= totalPages}
            onMouseEnter={prefetchNextPage}
          >
            Next
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#999' }}>
            Page {page} of {totalPages}
          </span>
          {isFetching && (
            <span style={{ fontSize: '0.75rem', color: '#61dafb' }}>Updating...</span>
          )}
        </div>
      </div>
    </div>
  )
}

const CreatePostForm = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts queries
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      // Reset form
      setTitle('')
      setBody('')
      setAuthor('')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && body && author) {
      mutation.mutate({ title, body, author })
    }
  }

  return (
    <div className="example-section">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: '#999' }}>
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            style={{ width: '100%' }}
            disabled={mutation.isPending}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: '#999' }}>
            Content
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post content"
            style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
            disabled={mutation.isPending}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: '#999' }}>
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            style={{ width: '100%' }}
            disabled={mutation.isPending}
          />
        </div>

        {mutation.isError && (
          <div className="error">
            Error: {mutation.error instanceof Error ? mutation.error.message : 'Failed to create post'}
          </div>
        )}

        {mutation.isSuccess && (
          <div className="success">Post created successfully!</div>
        )}

        <button type="submit" disabled={mutation.isPending || !title || !body || !author}>
          {mutation.isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  )
}

const QueryStats = () => {
  const queries = queryClient.getQueryCache().getAll()
  const mutations = queryClient.getMutationCache().getAll()

  return (
    <div className="example-section">
      <h2>Query Cache Status</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#61dafb' }}>
            {queries.length}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#999' }}>Cached Queries</div>
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ecc71' }}>
            {queries.filter(q => q.state.status === 'success').length}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#999' }}>Successful</div>
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f39c12' }}>
            {mutations.length}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#999' }}>Mutations</div>
        </div>
      </div>
    </div>
  )
}

const TanStackQueryExampleContent = () => {
  return (
    <div className="example-container">
      <div className="example-header">
        <h1>TanStack Query (React Query)</h1>
        <p>Server state management with caching, pagination, and mutations</p>
      </div>

      <CreatePostForm />

      <div className="example-section">
        <h2>Posts</h2>
        <PostsList />
      </div>

      <QueryStats />

      <div className="example-section">
        <h2>Key Concepts</h2>
        <ul style={{ color: '#999', lineHeight: '1.8' }}>
          <li>
            <strong>TanStack Query</strong> (React Query) manages server state with automatic caching
          </li>
          <li>
            <code>useQuery</code> fetches and caches data with automatic background updates
          </li>
          <li>
            <code>useMutation</code> handles data modifications (POST, PUT, DELETE)
          </li>
          <li>Query keys identify and organize cached data</li>
          <li>Automatic refetching on window focus, network reconnect, and intervals</li>
          <li>Built-in loading, error, and success states</li>
          <li>Query invalidation triggers automatic refetch</li>
          <li>Prefetching improves perceived performance</li>
          <li>Optimistic updates for instant UI feedback</li>
        </ul>
      </div>

      <div className="example-section">
        <h2>TanStack Query Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <h3 style={{ color: '#2ecc71', fontSize: '1rem', marginBottom: '0.5rem' }}>✓ Advantages</h3>
            <ul style={{ color: '#999', fontSize: '0.875rem', lineHeight: '1.6' }}>
              <li>Automatic caching and deduplication</li>
              <li>Background refetching</li>
              <li>Pagination and infinite scroll</li>
              <li>Request cancellation</li>
              <li>Parallel and dependent queries</li>
              <li>DevTools for debugging</li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#61dafb', fontSize: '1rem', marginBottom: '0.5rem' }}>📋 Best For</h3>
            <ul style={{ color: '#999', fontSize: '0.875rem', lineHeight: '1.6' }}>
              <li>Apps with server data</li>
              <li>RESTful APIs</li>
              <li>Real-time data updates</li>
              <li>Paginated or infinite lists</li>
              <li>Complex data fetching needs</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h2>Cache Behavior</h2>
        <p style={{ color: '#999', marginBottom: '1rem' }}>
          TanStack Query automatically manages cache lifecycle:
        </p>
        <ul style={{ color: '#999', lineHeight: '1.8' }}>
          <li>Fresh data is served immediately from cache</li>
          <li>Stale data is refetched in the background</li>
          <li>Failed queries are retried automatically</li>
          <li>Inactive queries are garbage collected</li>
          <li>Prefetched data improves navigation speed</li>
        </ul>
      </div>
    </div>
  )
}

const TanStackQueryExample = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TanStackQueryExampleContent />
    </QueryClientProvider>
  )
}

export default TanStackQueryExample
