import { Provider, useSelector, useDispatch } from "react-redux";
import {
  store,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../stores/redux/store";
import type { Product, RootState, AppDispatch } from "../../stores/redux/store";
import { ExampleLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Kbd } from "../../components/ui/kbd";
import { createExampleSnippets } from "../../utils/example-snippets";
import rawSource from "./ReduxExample.tsx?raw";

const snippetIds = ["ReduxExampleProductCard", "ReduxExampleCart"];
const snippets = createExampleSnippets(rawSource, snippetIds).map((s) => ({
  ...s,
  label: s.id === "ReduxExampleProductCard" ? "ProductCard.tsx" : "Cart.tsx",
  language: "tsx" as const,
}));

const products: Product[] = [
  { id: 1, name: "React Fundamentals Course", price: 49.99, image: "📚" },
  { id: 2, name: "TypeScript Handbook", price: 29.99, image: "📖" },
  { id: 3, name: "State Management Guide", price: 39.99, image: "📘" },
  { id: 4, name: "Advanced React Patterns", price: 59.99, image: "📕" },
  { id: 5, name: "Testing Best Practices", price: 34.99, image: "📗" },
  { id: 6, name: "Performance Optimization", price: 44.99, image: "📙" },
];

const ProductCard = ({ product }: { product: Product }) => {
  // @example-start ReduxExampleProductCard
  const dispatch = useDispatch<AppDispatch>(); // [!code highlight]
  const cartItem = useSelector((state: RootState) => // [!code highlight]
    state.cart.items.find((item) => item.id === product.id)
  );
  // @example-end ReduxExampleProductCard

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex justify-center pb-4 text-5xl">{product.image}</div>
        <CardTitle className="text-base">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
        {cartItem && (
          <Badge variant="secondary" className="mt-2">
            ✓ In cart ({cartItem.quantity})
          </Badge>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => dispatch(addToCart(product))} className="w-full"> {/* [!code highlight] */}
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

const Cart = () => {
  // @example-start ReduxExampleCart
  const dispatch = useDispatch<AppDispatch>(); // [!code highlight]
  const items = useSelector((state: RootState) => state.cart.items); // [!code highlight]
  // @example-end ReduxExampleCart

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Your cart is empty
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="m-0 text-xl">Cart ({items.length} items)</h2>
        <Button onClick={() => dispatch(clearCart())} variant="destructive">
          Clear Cart
        </Button>
      </div>

      <ul className="m-0 list-none space-y-2 p-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <div className="text-3xl">{item.image}</div>
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)} each
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Math.max(1, item.quantity - 1),
                    })
                  )
                }
                variant="outline"
                size="sm"
              >
                -
              </Button>
              <span className="min-w-[2rem] text-center">{item.quantity}</span>
              <Button
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                  )
                }
                variant="outline"
                size="sm"
              >
                +
              </Button>
            </div>
            <div className="min-w-[5rem] text-right font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <Button
              onClick={() => dispatch(removeFromCart(item.id))}
              variant="destructive"
              size="sm"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

const ReduxExampleContent = () => {
  return (
    <ExampleLayout
      title="Redux Toolkit"
      description="Shopping cart with centralized state management"
      sourcePath="src/examples/external/ReduxExample.tsx"
      sourceLine={149}
      snippets={snippets}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent>
          <Cart />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <Kbd>Redux Toolkit</Kbd> simplifies Redux with built-in best
              practices
            </li>
            <li>
              <Kbd>createSlice</Kbd> automatically generates action creators and
              action types
            </li>
            <li>
              <Kbd>configureStore</Kbd> sets up store with good defaults (Redux
              DevTools, etc.)
            </li>
            <li>
              Immer integration allows "mutating" state in reducers safely
            </li>
            <li>
              <Kbd>useSelector</Kbd> hook extracts data from store
            </li>
            <li>
              <Kbd>useDispatch</Kbd> hook dispatches actions to modify state
            </li>
            <li>Single source of truth for application state</li>
            <li>Time-travel debugging with Redux DevTools</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Redux DevTools</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-muted-foreground">
            Redux Toolkit automatically configures Redux DevTools. Open your
            browser's DevTools and look for the Redux tab to:
          </p>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>Inspect every action dispatched</li>
            <li>View state before and after each action</li>
            <li>Time-travel through state changes</li>
            <li>Replay actions or skip them</li>
          </ul>
        </CardContent>
      </Card>
    </ExampleLayout>
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
