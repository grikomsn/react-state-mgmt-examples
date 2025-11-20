import { Provider, useSelector, useDispatch } from 'react-redux'
import {
  store,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../stores/redux/store.ts'
import type { Product, RootState, AppDispatch } from '../../stores/redux/store.ts'

const products: Product[] = [
  { id: 1, name: 'React Fundamentals Course', price: 49.99, image: '📚' },
  { id: 2, name: 'TypeScript Handbook', price: 29.99, image: '📖' },
  { id: 3, name: 'State Management Guide', price: 39.99, image: '📘' },
  { id: 4, name: 'Advanced React Patterns', price: 59.99, image: '📕' },
  { id: 5, name: 'Testing Best Practices', price: 34.99, image: '📗' },
  { id: 6, name: 'Performance Optimization', price: 44.99, image: '📙' },
]

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>()
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === product.id)
  )

  return (
    <div
      style={{
        background: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ fontSize: '3rem', textAlign: 'center' }}>{product.image}</div>
      <h3 style={{ margin: 0, fontSize: '1rem', color: '#e0e0e0' }}>{product.name}</h3>
      <div style={{ fontSize: '1.25rem', color: '#61dafb', fontWeight: 'bold' }}>
        ${product.price.toFixed(2)}
      </div>
      {cartItem ? (
        <div style={{ fontSize: '0.875rem', color: '#2ecc71' }}>
          ✓ In cart ({cartItem.quantity})
        </div>
      ) : null}
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  )
}

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.cart.items)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
        Your cart is empty
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Cart ({items.length} items)</h2>
        <button className="danger" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map(item => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: '#1a1a1a',
              borderRadius: '4px',
              marginBottom: '0.5rem',
            }}
          >
            <div style={{ fontSize: '2rem' }}>{item.image}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{item.name}</div>
              <div style={{ fontSize: '0.875rem', color: '#999' }}>
                ${item.price.toFixed(2)} each
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() =>
                  dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))
                }
                style={{ padding: '0.25rem 0.5rem' }}
              >
                -
              </button>
              <span style={{ minWidth: '2rem', textAlign: 'center' }}>{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                }
                style={{ padding: '0.25rem 0.5rem' }}
              >
                +
              </button>
            </div>
            <div style={{ fontWeight: 'bold', color: '#61dafb', minWidth: '5rem', textAlign: 'right' }}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              className="danger"
              onClick={() => dispatch(removeFromCart(item.id))}
              style={{ padding: '0.5rem 0.75rem' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#264f5f',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total:</span>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#61dafb' }}>
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

const ReduxExampleContent = () => {
  return (
    <div className="example-container">
      <div className="example-header">
        <h1>Redux Toolkit</h1>
        <p>Shopping cart with centralized state management</p>
      </div>

      <div className="example-section">
        <h2>Products</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="example-section">
        <Cart />
      </div>

      <div className="example-section">
        <h2>Key Concepts</h2>
        <ul style={{ color: '#999', lineHeight: '1.8' }}>
          <li>
            <strong>Redux Toolkit</strong> simplifies Redux with built-in best practices
          </li>
          <li>
            <code>createSlice</code> automatically generates action creators and action types
          </li>
          <li>
            <code>configureStore</code> sets up store with good defaults (Redux DevTools, etc.)
          </li>
          <li>Immer integration allows "mutating" state in reducers safely</li>
          <li>
            <code>useSelector</code> hook extracts data from store
          </li>
          <li>
            <code>useDispatch</code> hook dispatches actions to modify state
          </li>
          <li>Single source of truth for application state</li>
          <li>Time-travel debugging with Redux DevTools</li>
        </ul>
      </div>

      <div className="example-section">
        <h2>Redux DevTools</h2>
        <p style={{ color: '#999', marginBottom: '0.5rem' }}>
          Redux Toolkit automatically configures Redux DevTools. Open your browser's DevTools and look for
          the Redux tab to:
        </p>
        <ul style={{ color: '#999', lineHeight: '1.8' }}>
          <li>Inspect every action dispatched</li>
          <li>View state before and after each action</li>
          <li>Time-travel through state changes</li>
          <li>Replay actions or skip them</li>
        </ul>
      </div>
    </div>
  )
}

const ReduxExample = () => {
  return (
    <Provider store={store}>
      <ReduxExampleContent />
    </Provider>
  )
}

export default ReduxExample
