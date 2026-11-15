import test from "node:test";
import assert from "node:assert/strict";
import { isValidCartState } from "../src/utils/storage.js";
import { cartReducer, initialCartState } from "../src/context/cartReducer.js";

const paid = () =>
  cartReducer(cartReducer(initialCartState, { type: "ADD", id: 1 }), {
    type: "CHECKOUT",
    id: "KT-VALID",
    date: "2026-11-15T00:00:00.000Z",
    promo: "UTS25",
  });
test("saved real cart and receipt are accepted", () => {
  assert.equal(isValidCartState(initialCartState), true);
  assert.equal(isValidCartState(paid()), true);
});
test("object promo in persisted receipt is rejected before React renders it", () => {
  const state = paid();
  state.orders[0].pricing = { total: 100, discount: 1, promo: { bad: true } };
  assert.equal(isValidCartState(state), false);
});
test("corrupt totals, invalid dates and quantities exceeding stock are rejected", () => {
  const state = paid();
  state.orders[0].pricing.total = -100;
  assert.equal(isValidCartState(state), false);
  const badDate = paid();
  badDate.orders[0].date = "no-date";
  assert.equal(isValidCartState(badDate), false);
  assert.equal(
    isValidCartState({ items: { 1: 100 }, sold: {}, orders: [] }),
    false,
  );
  assert.equal(isValidCartState({ items: [], sold: {}, orders: [] }), false);
});
