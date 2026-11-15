import test from "node:test";
import assert from "node:assert/strict";
import { calculatePricing, formatRupiah } from "../src/utils/pricing.js";

const items = [
  { price: 20000, quantity: 2, category: "Kopi" },
  { price: 10000, quantity: 1, category: "Snack" },
];
test("pajak 10% dihitung setelah diskon UTS25", () => {
  assert.deepEqual(calculatePricing(items, "UTS25"), {
    subtotal: 50000,
    discount: 12500,
    tax: 3750,
    total: 41250,
    promo: "UTS25",
  });
});
test("HEMAT10 mendiskon seluruh subtotal dan KOPI15 hanya kopi", () => {
  assert.equal(calculatePricing(items, "HEMAT10").discount, 5000);
  assert.equal(calculatePricing(items, "KOPI15").discount, 6000);
  assert.equal(
    calculatePricing(
      [{ price: 10000, quantity: 1, category: "Snack" }],
      "KOPI15",
    ).discount,
    0,
  );
});
test("kode invalid ditolak dan keranjang kosong bernilai nol", () => {
  assert.throws(() => calculatePricing(items, "SALAH"), /tidak valid/);
  assert.equal(calculatePricing([]).total, 0);
  assert.match(formatRupiah(25000), /25.000/);
});
