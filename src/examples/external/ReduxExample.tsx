import { Provider, useSelector, useDispatch } from "react-redux";
import {
  store,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../stores/redux/store";
import type { Product, RootState, AppDispatch } from "../../stores/redux/store";
import { ViewSourceLink } from "../../components/ui";

const products: Product[] = [
  { id: 1, name: "React Fundamentals Course", price: 49.99, image: "📚" },
  { id: 2, name: "TypeScript Handbook", price: 29.99, image: "📖" },
  { id: 3, name: "State Management Guide", price: 39.99, image: "📘" },
  { id: 4, name: "Advanced React Patterns", price: 59.99, image: "📕" },
  { id: 5, name: "Testing Best Practices", price: 34.99, image: "📗" },
  { id: 6, name: "Performance Optimization", price: 44.99, image: "📙" },
];

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-800 bg-gray-950 p-4">
      <div className="text-center text-5xl">{product.image}</div>
      <h3 className="m-0 text-base text-gray-200">{product.name}</h3>
      <div className="text-xl font-bold text-cyan-400">
        ${product.price.toFixed(2)}
      </div>
      {cartItem ? (
        <div className="text-sm text-green-400">
          ✓ In cart ({cartItem.quantity})
        </div>
      ) : null}
      <button
        onClick={() => dispatch(addToCart(product))}
        className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-gray-950 transition-all hover:bg-cyan-600 active:scale-95"
      >
        Add to Cart
      </button>
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">Your cart is empty</div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="m-0 text-xl text-gray-200">
          Cart ({items.length} items)
        </h2>
        <button
          onClick={() => dispatch(clearCart())}
          className="rounded border border-red-800 bg-red-900/50 px-4 py-2 text-sm font-medium text-red-200 transition-all hover:bg-red-900 active:scale-95"
        >
          Clear Cart
        </button>
      </div>

      <ul className="m-0 list-none space-y-2 p-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded border border-gray-800 bg-gray-950 p-4"
          >
            <div className="text-3xl">{item.image}</div>
            <div className="flex-1">
              <div className="font-medium text-gray-200">{item.name}</div>
              <div className="text-sm text-gray-500">
                ${item.price.toFixed(2)} each
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Math.max(1, item.quantity - 1),
                    })
                  )
                }
                className="rounded bg-gray-800 px-2 py-1 text-sm text-gray-200 transition-all hover:bg-gray-700 active:scale-95"
              >
                -
              </button>
              <span className="min-w-[2rem] text-center">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                  )
                }
                className="rounded bg-gray-800 px-2 py-1 text-sm text-gray-200 transition-all hover:bg-gray-700 active:scale-95"
              >
                +
              </button>
            </div>
            <div className="min-w-[5rem] text-right font-bold text-cyan-400">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-red-700 active:scale-95"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between rounded border border-cyan-800 bg-cyan-900/20 p-4">
        <span className="text-xl font-bold text-gray-200">Total:</span>
        <span className="text-2xl font-bold text-cyan-400">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

const ReduxExampleContent = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 border-b-2 border-gray-800 pb-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl text-cyan-400">Redux Toolkit</h1>
            <p className="text-gray-500">
              Shopping cart with centralized state management
            </p>
          </div>
          <ViewSourceLink url={import.meta.url} />
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Products</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <Cart />
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Key Concepts</h2>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              Redux Toolkit
            </code>{" "}
            simplifies Redux with built-in best practices
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              createSlice
            </code>{" "}
            automatically generates action creators and action types
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              configureStore
            </code>{" "}
            sets up store with good defaults (Redux DevTools, etc.)
          </li>
          <li>Immer integration allows "mutating" state in reducers safely</li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useSelector
            </code>{" "}
            hook extracts data from store
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useDispatch
            </code>{" "}
            hook dispatches actions to modify state
          </li>
          <li>Single source of truth for application state</li>
          <li>Time-travel debugging with Redux DevTools</li>
        </ul>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Redux DevTools</h2>
        <p className="mb-2 text-gray-500">
          Redux Toolkit automatically configures Redux DevTools. Open your
          browser's DevTools and look for the Redux tab to:
        </p>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>Inspect every action dispatched</li>
          <li>View state before and after each action</li>
          <li>Time-travel through state changes</li>
          <li>Replay actions or skip them</li>
        </ul>
      </div>
    </div>
  );
};

const ReduxExample = () => {
  return (
    <Provider store={store}>
      <ReduxExampleContent />
    </Provider>
  );
};

export default ReduxExample;
