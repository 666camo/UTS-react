import test from "node:test";
import assert from "node:assert/strict";
import { cartReducer, initialCartState } from "../src/context/cartReducer.js";
import { menus } from "../src/data/menu.js";

test("15 menu memiliki 8 properti dan ID unik", () => {
  assert.equal(menus.length, 15);
  assert.equal(new Set(menus.map((m) => m.id)).size, 15);
  for (const m of menus)
    for (const key of [
      "id",
      "name",
      "category",
      "price",
      "stock",
      "image",
      "description",
      "rating",
    ])
      assert.ok(key in m);
});
test("keranjang dibatasi stok dan menolak kuantitas tidak valid", () => {
  let state = initialCartState;
  for (let i = 0; i < 100; i++)
    state = cartReducer(state, { type: "ADD", id: 1 });
  assert.equal(state.items[1], menus[0].stock);
  assert.equal(
    cartReducer(state, { type: "SET_QUANTITY", id: 1, quantity: -1 }),
    state,
  );
  assert.equal(
    cartReducer(state, { type: "SET_QUANTITY", id: 1, quantity: 1.5 }),
    state,
  );
});
test("checkout atomik mengurangi stok dan menyimpan snapshot struk", () => {
  const state = cartReducer(initialCartState, { type: "ADD", id: 1 });
  const paid = cartReducer(state, {
    type: "CHECKOUT",
    id: "KT-TEST",
    date: "2026-11-15T00:00:00.000Z",
    promo: "UTS25",
  });
  assert.deepEqual(paid.items, {});
  assert.equal(paid.sold[1], 1);
  assert.equal(paid.orders[0].items[0].name, menus[0].name);
  assert.equal(
    paid.orders[0].pricing.total,
    Math.round(menus[0].price * 0.75 * 1.1),
  );
  assert.equal(cartReducer(paid, { type: "CHECKOUT" }), paid);
  assert.deepEqual(cartReducer(paid, { type: "RESET" }), initialCartState);
});
