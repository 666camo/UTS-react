import {
  ArrowDown,
  ArrowDownUp,
  ArrowUpRight,
  Coffee,
  Heart,
  Leaf,
  SearchX,
  TicketPercent,
  Utensils,
  Cookie,
  Grid2X2,
  Sparkles,
} from "lucide-react";
import { categories } from "../data/menu";
import MenuCard from "./MenuCard";
const categoryIcons = {
  Semua: Grid2X2,
  Kopi: Coffee,
  "Non-Kopi": Leaf,
  Makanan: Utensils,
  Snack: Cookie,
  Favorit: Heart,
};
export default function MainContent({
  menus,
  filtered,
  category,
  setCategory,
  sort,
  setSort,
  favorites,
  reviews,
  available,
  onFavorite,
  onInfo,
  onReview,
  onAdd,
  onPromo,
  onClear,
}) {
  const rating = (menu) =>
    reviews[menu.id]?.length
      ? reviews[menu.id].reduce((sum, review) => sum + review.rating, 0) /
        reviews[menu.id].length
      : menu.rating;
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span /> YOUR DAILY DOSE OF GOOD COMPANY
          </div>
          <h1>
            Secangkir kopi.
            <br />
            Sejuta <em>cerita.</em>
          </h1>
          <p>
            Dari tegukan pertama sampai obrolan terakhir.
            <br />
            Temukan rasa favoritmu, nikmati momen kecilmu.
          </p>
          <a className="primary-button" href="#menu">
            Temukan menu kamu <ArrowDown size={17} />
          </a>
          <div className="hero-bottom">
            <div className="little-mark">
              <Coffee size={20} />
            </div>
            <span>
              Diseduh dengan hati.
              <br />
              <strong>Dinikmati bersama teman.</strong>
            </span>
            <div className="hero-rule" />
            <span className="hero-number">
              01 <span>/ A GOOD DAY STARTS HERE</span>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/images/latte.jpg"
            alt="Secangkir latte hangat dengan latte art"
            width="900"
            height="900"
            fetchPriority="high"
          />
          <div className="hero-image-shade" />
          <div className="hero-stamp">
            <Coffee size={24} />
            <span>
              GOOD COFFEE
              <br />
              BETTER COMPANY
            </span>
            <small>EST. 2026</small>
          </div>
          <div className="hero-caption">
            <span>
              <small>THE EVERYDAY FAVORITE</small>
              <strong>A little pause, a better day.</strong>
            </span>
            <ArrowUpRight size={28} />
          </div>
        </div>
      </section>
      <section className="promise-strip" aria-label="Keunggulan menu">
        <span>
          <Coffee size={17} /> Kopi pilihan, rasa yang ngangenin
        </span>
        <i />
        <span>
          <Leaf size={17} /> Dibuat segar, untuk kamu
        </span>
        <i />
        <span>
          <Heart size={17} /> Lebih nikmat dinikmati bersama
        </span>
      </section>
      <section className="promo-banner">
        <div className="promo-icon">
          <TicketPercent size={27} />
        </div>
        <div>
          <span className="eyebrow">SEDIKIT HEMAT, BANYAK NIKMAT</span>
          <p>
            Ngopi bareng, <strong>hemat 25%.</strong>
          </p>
        </div>
        <div className="promo-right">
          <span>
            Pakai kode <b>UTS25</b> di keranjangmu
          </span>
          <button onClick={onPromo}>
            Lihat promo <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="tiny-line" /> THE GOOD STUFF
            </span>
            <h2>
              Temukan teman <em>ngopimu.</em>
            </h2>
            <p>
              Dari kopi andalan sampai camilan kesayangan. Kamu pilih yang mana?
            </p>
          </div>
          <span className="menu-total">
            <Sparkles size={15} /> 15 rasa, banyak cerita
          </span>
        </div>
        <div className="menu-toolbar">
          <div className="category-tabs" aria-label="Kategori menu">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat];
              const count =
                cat === "Semua"
                  ? menus.length
                  : cat === "Favorit"
                    ? Object.keys(favorites).length
                    : menus.filter((menu) => menu.category === cat).length;
              return (
                <button
                  key={cat}
                  aria-pressed={category === cat}
                  className={category === cat ? "selected" : ""}
                  onClick={() => setCategory(cat)}
                >
                  <Icon size={15} />
                  {cat}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
          <label className="sort-control">
            <ArrowDownUp size={15} />
            <span className="sr-only">Urutkan menu</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recommended">Rekomendasi</option>
              {category === "Favorit" && (
                <>
                  <option value="newest">Favorit terbaru</option>
                  <option value="oldest">Favorit terlama</option>
                </>
              )}
              <option value="price-low">Harga terendah</option>
              <option value="price-high">Harga tertinggi</option>
              <option value="rating">Rating tertinggi</option>
              <option value="name">Nama A–Z</option>
            </select>
          </label>
        </div>
        <div className="results-caption">
          <span>
            {category === "Favorit"
              ? "Pilihan yang kamu suka"
              : category === "Semua"
                ? "Sedikit inspirasi untuk harimu"
                : `Pilihan ${category.toLowerCase()} untukmu`}
          </span>
          <span>Menampilkan {filtered.length} menu</span>
        </div>
        {filtered.length ? (
          <div className="menu-grid">
            {filtered.map((menu) => (
              <MenuCard
                key={menu.id}
                menu={menu}
                favorite={favorites[menu.id]}
                stock={available(menu)}
                rating={rating(menu)}
                reviewCount={reviews[menu.id]?.length || 0}
                onFavorite={onFavorite}
                onInfo={onInfo}
                onReview={onReview}
                onAdd={onAdd}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={38} />
            <h3>Belum ada teman ngopi di sini.</h3>
            <p>Coba nama menu lain atau tambahkan menu ke favoritmu.</p>
            <button className="primary-button" onClick={onClear}>
              Lihat semua menu <ArrowUpRight size={16} />
            </button>
          </div>
        )}
        <div className="menu-end">
          <span />
          <Coffee size={18} />
          <p>Ada cerita baik di setiap cangkir.</p>
          <span />
        </div>
      </section>
    </main>
  );
}
