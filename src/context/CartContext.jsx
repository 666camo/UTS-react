import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  cartReducer,
  getAvailableStock,
  getCartItems,
  initialCartState,
} from "./cartReducer";
import { isValidCartState } from "../utils/storage";
const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);
export function CartProvider({ children }) {
  const [stored, setStored, storageError] = useLocalStorage(
    "koptum-cart-v1",
    initialCartState,
    isValidCartState,
  );
  const [state, dispatch] = useReducer(cartReducer, stored);
  useEffect(() => {
    setStored(state);
  }, [state, setStored]);
  const items = getCartItems(state);
  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        items,
        storageError,
        count: items.reduce((sum, item) => sum + item.quantity, 0),
        available: (menu) => getAvailableStock(state, menu),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
