import { Check, ReceiptText } from "lucide-react";
import { formatRupiah } from "../utils/pricing";
export default function Receipt({ order }) {
  const { pricing } = order;
  return (
    <div className="receipt">
      <div className="receipt-brand">
        <span className="receipt-check">
          <Check size={24} />
        </span>
        <h3>Terima kasih, teman!</h3>
        <p>Pesananmu sudah tercatat.</p>
        <small>Pembayaran simulasi · proyek UTS</small>
      </div>
      <div className="receipt-id">
        <ReceiptText size={17} />
        <span>{order.id}</span>
        <small>{new Date(order.date).toLocaleString("id-ID")}</small>
      </div>
      <div className="receipt-items">
        {order.items.map((item) => (
          <div key={item.id}>
            <span>
              {item.quantity} × {item.name}
            </span>
            <strong>{formatRupiah(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>
      <div className="price-summary">
        <div>
          <span>Subtotal</span>
          <span>{formatRupiah(pricing.subtotal)}</span>
        </div>
        {pricing.discount > 0 && (
          <div className="discount-line">
            <span>Diskon {pricing.promo}</span>
            <span>−{formatRupiah(pricing.discount)}</span>
          </div>
        )}
        <div>
          <span>Pajak 10%</span>
          <span>{formatRupiah(pricing.tax)}</span>
        </div>
        <div className="total-line">
          <strong>Total pembayaran</strong>
          <strong>{formatRupiah(pricing.total)}</strong>
        </div>
      </div>
      <p className="receipt-footer">
        Sampai bertemu di cerita berikutnya.
        <br />
        Koptum — kopi, teman, dan cerita.
      </p>
    </div>
  );
}
