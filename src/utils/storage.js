import { menus } from "../data/menu.js";
import { calculatePricing, promoCodes } from "./pricing.js";
const record = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);
function validOrder(order) {
  if (
    !record(order) ||
    typeof order.id !== "string" ||
    !order.id ||
    typeof order.date !== "string" ||
    !Number.isFinite(Date.parse(order.date)) ||
    !record(order.pricing) ||
    !Array.isArray(order.items) ||
    !order.items.length
  )
    return false;
  if (
    !order.items.every(
      (item) =>
        record(item) &&
        menus.some((menu) => menu.id === item.id) &&
        typeof item.name === "string" &&
        typeof item.category === "string" &&
        Number.isInteger(item.price) &&
        item.price > 0 &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        item.quantity <= menus.find((menu) => menu.id === item.id).stock,
    )
  )
    return false;
  if (
    typeof order.pricing.promo !== "string" ||
    (order.pricing.promo !== "" && !promoCodes.includes(order.pricing.promo))
  )
    return false;
  const expected = calculatePricing(order.items, order.pricing.promo);
  return Object.keys(expected).every(
    (key) => order.pricing[key] === expected[key],
  );
}
export function isValidCartState(value) {
  return !!(
    record(value) &&
    record(value.items) &&
    record(value.sold) &&
    Array.isArray(value.orders) &&
    Object.entries(value.sold).every(([id, n]) =>
      menus.some(
        (menu) =>
          menu.id === +id && Number.isInteger(n) && n >= 0 && n <= menu.stock,
      ),
    ) &&
    Object.entries(value.items).every(([id, n]) =>
      menus.some(
        (menu) =>
          menu.id === +id &&
          Number.isInteger(n) &&
          n > 0 &&
          n <= menu.stock - (value.sold[id] || 0),
      ),
    ) &&
    value.orders.every(validOrder) &&
    new Set(value.orders.map((order) => order.id)).size === value.orders.length
  );
}
