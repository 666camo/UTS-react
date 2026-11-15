import { Heart, Info, MessageCircle, Plus, Coffee } from "lucide-react";
import StarRating from "./StarRating";
import { formatRupiah } from "../utils/pricing";
export default function MenuCard({
  menu,
  favorite,
  stock,
  rating,
  reviewCount,
  onFavorite,
  onInfo,
  onReview,
  onAdd,
}) {
  return (
    <article className="menu-card">
      <div className="menu-photo">
        <img
          src={menu.image}
          alt={menu.name}
          loading="lazy"
          width="600"
          height="480"
        />
        {menu.id === 1 && (
          <span className="photo-label">
            <Coffee size={12} /> Signature
          </span>
        )}
        {menu.id === 12 && <span className="photo-label">Teman ngopi</span>}
        <button
          className={`favorite-button ${favorite ? "is-favorite" : ""}`}
          aria-label={`${favorite ? "Hapus" : "Tambah"} favorit ${menu.name}`}
          aria-pressed={!!favorite}
          onClick={() => onFavorite(menu)}
        >
          <Heart size={19} fill={favorite ? "currentColor" : "none"} />
        </button>
        {stock === 0 && <span className="sold-out">Habis hari ini</span>}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span>{menu.category}</span>
          <StarRating value={rating} />
        </div>
        <h3>{menu.name}</h3>
        <p>{menu.description}</p>
        <div className="stock-row">
          <span className={stock < 5 ? "low-stock" : ""}>
            <i />
            {stock > 0 ? `${stock} tersedia` : "Stok habis"}
          </span>
          <span>{reviewCount} ulasan</span>
        </div>
        <div className="card-bottom">
          <strong>{formatRupiah(menu.price)}</strong>
          <div className="card-actions">
            <button
              className="icon-button"
              aria-label={`Info ${menu.name}`}
              onClick={() => onInfo(menu)}
            >
              <Info size={17} />
            </button>
            <button
              className="icon-button"
              aria-label={`Komentar ${menu.name}`}
              onClick={() => onReview(menu)}
            >
              <MessageCircle size={17} />
            </button>
            <button
              className="add-button"
              aria-label={`Tambah ${menu.name} ke keranjang`}
              onClick={() => onAdd(menu)}
            >
              <Plus size={19} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
