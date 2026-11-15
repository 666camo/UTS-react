import { useState } from "react";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  TicketPercent,
  Trash2,
} from "lucide-react";
import Modal from "./Modal";
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationContext";
import { calculatePricing, formatRupiah, promoCodes } from "../utils/pricing";
export default function CartDrawer({ onClose, onPaid }) {
  const { state, items, count, dispatch, available } = useCart();
  const { notify } = useNotifications();
  const [input, setInput] = useState("");
  const [promo, setPromo] = useState("");
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const pricing = calculatePricing(items, promo);
  function quantity(item, value) {
    if (value > available(item)) {
      notify(`Stok ${item.name} hanya ${available(item)}.`, "error");
      return;
    }
    dispatch({ type: "SET_QUANTITY", id: item.id, quantity: value });
    notify(
      value
        ? `Jumlah ${item.name} diubah menjadi ${value}.`
        : `${item.name} dihapus dari keranjang.`,
    );
  }
  function apply(e) {
    e.preventDefault();
    const code = input.trim().toUpperCase();
    if (!promoCodes.includes(code)) {
      setError("Kode belum cocok. Coba UTS25, HEMAT10, atau KOPI15.");
      notify("Kode promo tidak valid.", "error");
      return;
    }
    if (code === "KOPI15" && !items.some((item) => item.category === "Kopi")) {
      setError("KOPI15 berlaku untuk menu kategori Kopi.");
      notify("Tambahkan kopi untuk memakai KOPI15.", "error");
      return;
    }
    setPromo(code);
    setError("");
    notify(`Promo ${code} berhasil dipakai.`);
  }
  function checkout() {
    if (paying || !items.length) return;
    if (items.some((item) => item.quantity > available(item))) {
      notify("Stok berubah. Periksa keranjangmu.", "error");
      return;
    }
    setPaying(true);
    const order = {
      id: `KT-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`,
      date: new Date().toISOString(),
      items,
      pricing,
    };
    dispatch({ type: "CHECKOUT", id: order.id, date: order.date, promo });
    notify(`Pesanan ${order.id} berhasil dibayar (simulasi).`);
    onPaid(order);
  }
  return (
    <Modal title="Keranjang kamu" onClose={onClose} drawer>
      <p className="drawer-subtitle">
        {count} pilihan enak untuk menemani harimu.
      </p>
      {items.length ? (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} width="84" height="84" />
                <div>
                  <span className="eyebrow">{item.category}</span>
                  <h3>{item.name}</h3>
                  <strong>{formatRupiah(item.price)}</strong>
                  <div className="quantity-control">
                    <button
                      aria-label={`Kurangi ${item.name}`}
                      onClick={() => quantity(item, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Tambah jumlah ${item.name}`}
                      onClick={() => quantity(item, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                    <small>Stok {available(item)}</small>
                  </div>
                </div>
                <button
                  className="icon-button remove-item"
                  aria-label={`Hapus ${item.name}`}
                  onClick={() => quantity(item, 0)}
                >
                  <Trash2 size={17} />
                </button>
              </article>
            ))}
          </div>
          <div className="cart-checkout">
            <form className="promo-form" onSubmit={apply}>
              <label htmlFor="promo-input">
                <TicketPercent size={17} /> Punya kode promo?
              </label>
              <div>
                <input
                  id="promo-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Masukkan kode"
                />
                <button type="submit">Pakai</button>
              </div>
              {error && (
                <p className="field-error" role="alert">
                  {error}
                </p>
              )}
              {promo && (
                <p className="applied-promo">
                  <Check size={14} /> {promo} aktif{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setPromo("");
                      setInput("");
                      notify("Kode promo dilepas.");
                    }}
                  >
                    Lepas
                  </button>
                </p>
              )}
              <small>
                UTS25 · diskon 25% &nbsp; HEMAT10 · 10%
                <br />
                KOPI15 · diskon 15% khusus kopi. Pilih satu promo.
              </small>
            </form>
            <div className="price-summary">
              <div>
                <span>Subtotal</span>
                <span>{formatRupiah(pricing.subtotal)}</span>
              </div>
              <div className="discount-line">
                <span>Diskon {promo}</span>
                <span>−{formatRupiah(pricing.discount)}</span>
              </div>
              <div>
                <span>Pajak 10% (setelah diskon)</span>
                <span>{formatRupiah(pricing.tax)}</span>
              </div>
              <div className="total-line">
                <strong>Total</strong>
                <strong>{formatRupiah(pricing.total)}</strong>
              </div>
            </div>
            <button
              className="primary-button checkout-button"
              onClick={checkout}
              disabled={paying}
            >
              Bayar sekarang <ArrowRight size={18} />
            </button>
            <p className="checkout-note">
              Pembayaran simulasi untuk proyek UTS.
              <br />
              Tidak ada uang yang ditagihkan.
            </p>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <ShoppingBag size={44} />
          <h3>Masih kosong, nih.</h3>
          <p>Ada kopi dan camilan yang menunggu kamu.</p>
          <button className="primary-button" onClick={onClose}>
            Yuk, pilih menu <ArrowRight size={17} />
          </button>
        </div>
      )}
    </Modal>
  );
}
