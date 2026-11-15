import { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  History,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import Modal from "./Modal";
import Receipt from "./Receipt";
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationContext";
import { formatRupiah } from "../utils/pricing";
export default function HistoryModal({ onClose }) {
  const { state, dispatch } = useCart();
  const { notify } = useNotifications();
  const [selected, setSelected] = useState(null);
  const [resetting, setResetting] = useState(false);
  return (
    <Modal title="Riwayat cerita kamu" onClose={onClose}>
      {selected ? (
        <>
          <button
            className="text-link back-link"
            onClick={() => setSelected(null)}
          >
            <ArrowLeft size={15} /> Kembali ke riwayat
          </button>
          <Receipt order={selected} />
        </>
      ) : (
        <>
          <div className="history-summary">
            <span>
              Total belanja{" "}
              <strong>
                {formatRupiah(
                  state.orders.reduce(
                    (sum, order) => sum + order.pricing.total,
                    0,
                  ),
                )}
              </strong>
            </span>
            <span>{state.orders.length} pesanan</span>
          </div>
          {state.orders.length ? (
            <div className="history-list">
              {state.orders.map((order) => (
                <button
                  className="history-item"
                  key={order.id}
                  onClick={() => setSelected(order)}
                >
                  <span className="history-icon">
                    <History size={20} />
                  </span>
                  <span>
                    <strong>{order.id}</strong>
                    <small>
                      {new Date(order.date).toLocaleString("id-ID")} ·{" "}
                      {order.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )}{" "}
                      item
                    </small>
                  </span>
                  <span>
                    <strong>{formatRupiah(order.pricing.total)}</strong>
                    <small className="paid-label">Lunas · simulasi</small>
                  </span>
                  <ChevronRight size={17} />
                </button>
              ))}
            </div>
          ) : (
            <div className="empty-compact">
              <History size={36} />
              <h3>Cerita pertamamu menunggu.</h3>
              <p>Pesanan yang dibayar akan muncul di sini.</p>
            </div>
          )}
          <button className="danger-outline" onClick={() => setResetting(true)}>
            <RotateCcw size={16} /> Reset stok & riwayat
          </button>
        </>
      )}
      {resetting && (
        <Modal title="Mulai cerita baru?" onClose={() => setResetting(false)}>
          <div className="reset-content">
            <TriangleAlert size={35} />
            <p>
              Stok semua menu dipulihkan. Riwayat transaksi dan isi keranjang
              akan dihapus. Favorit dan ulasan tetap tersimpan.
            </p>
            <div className="button-row">
              <button
                className="secondary-button"
                onClick={() => setResetting(false)}
              >
                Batal
              </button>
              <button
                className="danger-button"
                onClick={() => {
                  dispatch({ type: "RESET" });
                  setResetting(false);
                  notify(
                    "Stok dipulihkan. Riwayat dan keranjang sudah direset.",
                  );
                }}
              >
                Ya, reset sekarang
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
}
