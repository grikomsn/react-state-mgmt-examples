/**
 * Barrel export for all store modules
 */

// Redux store
export {
  store,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "./redux/store";
export type { RootState, AppDispatch, Product, CartItem } from "./redux/store";

// Zustand store
export { usePreferencesStore } from "./zustand/store";
export type { UserPreferences } from "./zustand/store";

// MobX store
export { dashboardStore } from "./mobx/store";
