export const promoCodes = ["UTS25", "HEMAT10", "KOPI15"];
export const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
export function calculatePricing(items, code = "") {
  const promo = code.trim().toUpperCase();
  if (promo && !promoCodes.includes(promo))
    throw new Error("Kode promo tidak valid.");
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const coffee = items
    .filter((item) => item.category === "Kopi")
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(
    promo === "UTS25"
      ? subtotal * 0.25
      : promo === "HEMAT10"
        ? subtotal * 0.1
        : promo === "KOPI15"
          ? coffee * 0.15
          : 0,
  );
  const tax = Math.round((subtotal - discount) * 0.1);
  return { subtotal, discount, tax, total: subtotal - discount + tax, promo };
}
