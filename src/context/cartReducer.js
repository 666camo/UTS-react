import { menus } from "../data/menu.js";
import { calculatePricing } from "../utils/pricing.js";
export const initialCartState = { items: {}, sold: {}, orders: [] };
export const getAvailableStock = (state, menu) =>
  Math.max(0, menu.stock - (state.sold[menu.id] || 0));
export const getCartItems = (state) =>
  menus
    .filter((menu) => state.items[menu.id] > 0)
    .map((menu) => ({ ...menu, quantity: state.items[menu.id] }));
export function cartReducer(state, action) {
  if (action.type === "RESET") return initialCartState;
  if (action.type === "CHECKOUT") {
    const items = getCartItems(state);
    if (
      !items.length ||
      items.some((item) => item.quantity > getAvailableStock(state, item))
    )
      return state;
    const pricing = calculatePricing(items, action.promo);
    const sold = { ...state.sold };
    items.forEach((item) => {
      sold[item.id] = (sold[item.id] || 0) + item.quantity;
    });
    return {
      items: {},
      sold,
      orders: [
        { id: action.id, date: action.date, items, pricing },
        ...state.orders,
      ],
    };
  }
  const menu = menus.find((item) => item.id === action.id);
  if (!menu) return state;
  const quantity =
    action.type === "ADD"
      ? (state.items[action.id] || 0) + 1
      : action.type === "REMOVE"
        ? 0
        : action.quantity;
  if (
    !Number.isInteger(quantity) ||
    quantity < 0 ||
    quantity > getAvailableStock(state, menu)
  )
    return state;
  const items = { ...state.items };
  if (quantity === 0) delete items[action.id];
  else items[action.id] = quantity;
  return { ...state, items };
}
