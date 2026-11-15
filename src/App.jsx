import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Coffee, TicketPercent } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import Modal from "./components/Modal";
import InfoModal from "./components/InfoModal";
import ReviewModal from "./components/ReviewModal";
import CartDrawer from "./components/CartDrawer";
import HistoryModal from "./components/HistoryModal";
import NotificationsModal from "./components/NotificationsModal";
import Receipt from "./components/Receipt";
import { menus } from "./data/menu";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useCart } from "./context/CartContext";
import { useNotifications } from "./context/NotificationContext";
import { useToast } from "./context/ToastContext";
const validFavorites = (value) =>
  value &&
  !Array.isArray(value) &&
  typeof value === "object" &&
  Object.entries(value).every(
    ([id, date]) =>
      menus.some((menu) => menu.id === +id) && Number.isFinite(date),
  );
const validReviews = (value) =>
  value &&
  !Array.isArray(value) &&
  typeof value === "object" &&
  Object.entries(value).every(
    ([id, items]) =>
      menus.some((menu) => menu.id === +id) &&
      Array.isArray(items) &&
      items.every(
        (r) =>
          r &&
          typeof r.id === "string" &&
          Number.isInteger(r.rating) &&
          r.rating >= 1 &&
          r.rating <= 5 &&
          typeof r.comment === "string" &&
          r.comment.trim().length >= 5 &&
          typeof r.date === "string",
      ),
  );
export default function App() {
  const [favorites, setFavorites, favoriteError] = useLocalStorage(
    "koptum-favorites-v1",
    {},
    validFavorites,
  );
  const [reviews, setReviews, reviewError] = useLocalStorage(
    "koptum-reviews-v1",
    {},
    validReviews,
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sort, setSort] = useState("recommended");
  const [modal, setModal] = useState(null);
  const {
    state,
    dispatch,
    available,
    count,
    storageError: cartError,
  } = useCart();
  const {
    notify,
    unread,
    storageError: notificationError,
  } = useNotifications();
  const toast = useToast();
  const previousQuery = useRef(query);
  useEffect(() => {
    if (previousQuery.current === query) return;
    const timer = setTimeout(() => {
      previousQuery.current = query;
      notify(
        query.trim()
          ? `Mencari menu: ${query.trim()}.`
          : "Pencarian dikosongkan.",
      );
    }, 650);
    return () => clearTimeout(timer);
  }, [query, notify]);
  useEffect(() => {
    const handler = (e) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          document.activeElement.tagName,
        ) &&
        !document.querySelector("dialog[open]")
      ) {
        e.preventDefault();
        document.querySelector('input[type="search"]')?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const filtered = useMemo(() => {
    const result = menus.filter(
      (menu) =>
        (category === "Semua" ||
          (category === "Favorit"
            ? favorites[menu.id]
            : menu.category === category)) &&
        menu.name
          .toLocaleLowerCase("id-ID")
          .includes(query.trim().toLocaleLowerCase("id-ID")),
    );
    const rating = (menu) =>
      reviews[menu.id]?.length
        ? reviews[menu.id].reduce((sum, r) => sum + r.rating, 0) /
          reviews[menu.id].length
        : menu.rating;
    return result.sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : sort === "rating"
            ? rating(b) - rating(a)
            : sort === "name"
              ? a.name.localeCompare(b.name, "id")
              : sort === "newest"
                ? favorites[b.id] - favorites[a.id]
                : sort === "oldest"
                  ? favorites[a.id] - favorites[b.id]
                  : a.id - b.id,
    );
  }, [category, favorites, query, reviews, sort]);
  function favorite(menu) {
    const removing = !!favorites[menu.id];
    setFavorites((current) => {
      const next = { ...current };
      if (removing) delete next[menu.id];
      else next[menu.id] = Date.now();
      return next;
    });
    notify(
      `${menu.name} ${removing ? "dihapus dari" : "ditambahkan ke"} favorit.`,
    );
  }
  function add(menu) {
    if ((state.items[menu.id] || 0) >= available(menu)) {
      notify(`Stok ${menu.name} tidak mencukupi.`, "error");
      return;
    }
    dispatch({ type: "ADD", id: menu.id });
    notify(`${menu.name} ditambahkan ke keranjang.`);
  }
  function show(type, menu) {
    setModal({ type, menu });
    toast(
      type === "info"
        ? `Detail ${menu.name}.`
        : type === "review"
          ? `Bagikan cerita tentang ${menu.name}.`
          : type === "cart"
            ? "Keranjang kamu dibuka."
            : type === "history"
              ? "Riwayat transaksi dibuka."
              : type === "notifications"
                ? "Semua kabar ditandai sudah dibaca."
                : type === "promo"
                  ? "Tiga cara untuk ngopi lebih hemat."
                  : "Kenalan dengan Koptum.",
    );
  }
  const close = () => setModal(null);
  const storageError =
    favoriteError || reviewError || cartError || notificationError;
  return (
    <>
      <a className="skip-link" href="#menu">
        Langsung ke menu
      </a>
      <Header
        query={query}
        setQuery={setQuery}
        cartCount={count}
        unread={unread}
        onCart={() => show("cart")}
        onHistory={() => show("history")}
        onNotifications={() => show("notifications")}
        onAbout={() => show("about")}
      />
      {storageError && (
        <div className="storage-warning" role="alert">
          {storageError}
        </div>
      )}
      <MainContent
        menus={menus}
        filtered={filtered}
        category={category}
        setCategory={(cat) => {
          setCategory(cat);
          setSort(cat === "Favorit" ? "newest" : "recommended");
          notify(`Kategori ${cat} ditampilkan.`);
        }}
        sort={sort}
        setSort={(value) => {
          setSort(value);
          notify("Urutan menu diperbarui.");
        }}
        favorites={favorites}
        reviews={reviews}
        available={available}
        onFavorite={favorite}
        onInfo={(menu) => show("info", menu)}
        onReview={(menu) => show("review", menu)}
        onAdd={add}
        onPromo={() => {
          show("promo");
          notify("Promo tersedia: UTS25, HEMAT10, dan KOPI15.");
        }}
        onClear={() => {
          setCategory("Semua");
          setQuery("");
          setSort("recommended");
          notify("Semua menu ditampilkan kembali.");
        }}
      />
      <Footer onAbout={() => show("about")} />
      {modal?.type === "info" && (
        <InfoModal
          menu={modal.menu}
          stock={available(modal.menu)}
          reviews={reviews[modal.menu.id] || []}
          onAdd={add}
          onReview={() => show("review", modal.menu)}
          onClose={close}
        />
      )}
      {modal?.type === "review" && (
        <ReviewModal
          menu={modal.menu}
          reviews={reviews[modal.menu.id] || []}
          onSubmit={(id, review) => {
            setReviews((current) => ({
              ...current,
              [id]: [review, ...(current[id] || [])],
            }));
            notify("Terima kasih! Ceritamu sudah ditambahkan.");
          }}
          onClose={close}
        />
      )}
      {modal?.type === "cart" && (
        <CartDrawer
          onClose={close}
          onPaid={(order) => setModal({ type: "receipt", order })}
        />
      )}
      {modal?.type === "receipt" && (
        <Modal title="Struk pembayaran" onClose={close}>
          <Receipt order={modal.order} />
          <button className="primary-button full-width" onClick={close}>
            Kembali pilih menu <ArrowUpRight size={17} />
          </button>
        </Modal>
      )}
      {modal?.type === "history" && <HistoryModal onClose={close} />}
      {modal?.type === "notifications" && (
        <NotificationsModal onClose={close} />
      )}
      {modal?.type === "promo" && (
        <Modal title="Ngopi enak, lebih hemat." onClose={close}>
          <p className="muted">
            Pilih satu kode dan masukkan di keranjang sebelum bayar.
          </p>
          <div className="promo-options">
            {[
              { code: "UTS25", text: "Diskon 25% untuk seluruh menu." },
              { code: "HEMAT10", text: "Diskon 10% untuk seluruh menu." },
              {
                code: "KOPI15",
                text: "Diskon 15% khusus subtotal kategori Kopi.",
              },
            ].map((p) => (
              <div className="promo-option" key={p.code}>
                <TicketPercent size={24} />
                <span>
                  <strong>{p.code}</strong>
                  <small>{p.text}</small>
                </span>
                <button
                  onClick={() => {
                    setModal({ type: "cart" });
                    notify(`Gunakan ${p.code} pada kolom promo keranjang.`);
                  }}
                >
                  Pilih <ArrowUpRight size={15} />
                </button>
              </div>
            ))}
          </div>
          <p className="small-note">
            Promo tidak dapat digabung. Pajak 10% dihitung setelah diskon.
            Ketentuan promo ini merupakan simulasi proyek UTS.
          </p>
        </Modal>
      )}
      {modal?.type === "about" && (
        <Modal title="Kopi, teman, dan cerita." onClose={close}>
          <div className="about-mark">
            <Coffee size={40} />
          </div>
          <p className="about-text">
            Koptum hadir untuk momen kecil yang layak dinikmati. Secangkir kopi,
            teman ngemil, dan ruang untuk cerita yang belum selesai.
          </p>
          <p className="muted">
            Aplikasi ini merupakan proyek UTS React Fundamental 2026 oleh Alif
            Rifky Pratama. Pemesanan, pembayaran, stok, dan promo adalah
            simulasi. Data disimpan di browser perangkat ini.
          </p>
        </Modal>
      )}
    </>
  );
}
