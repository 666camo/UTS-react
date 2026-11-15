import {
  Bell,
  Coffee,
  History,
  Search,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
export default function Header({
  query,
  setQuery,
  cartCount,
  unread,
  onCart,
  onHistory,
  onNotifications,
  onAbout,
}) {
  return (
    <>
      <div className="announcement">
        A little coffee, a little company.{" "}
        <span>Selamat datang di Koptum.</span>
        <Coffee size={13} />
      </div>
      <header className="header">
        <a className="wordmark" href="#" aria-label="Koptum beranda">
          koptum<span>®</span>
        </a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a className="nav-active" href="#menu">
            Menu kami
          </a>
          <button onClick={onAbout}>
            Tentang Koptum <ArrowUpRight size={13} />
          </button>
        </nav>
        <label className="search-box">
          <Search size={18} />
          <span className="sr-only">Cari nama menu</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Lagi pengin apa?"
            type="search"
          />
          <kbd>/</kbd>
        </label>
        <div className="header-actions">
          <button
            className="icon-button history-button"
            aria-label="Riwayat transaksi"
            onClick={onHistory}
          >
            <History size={21} />
          </button>
          <button
            className="icon-button badge-button"
            aria-label={`Notifikasi, ${unread} belum dibaca`}
            onClick={onNotifications}
          >
            <Bell size={21} />
            {unread > 0 && (
              <span className="notification-dot">
                {unread > 99 ? "99+" : unread}
              </span>
            )}
          </button>
          <button
            className="cart-button"
            aria-label={`Keranjang, ${cartCount} item`}
            onClick={onCart}
          >
            <ShoppingBag size={18} />
            <span>Keranjang</span>
            <b>{cartCount}</b>
          </button>
        </div>
      </header>
    </>
  );
}
