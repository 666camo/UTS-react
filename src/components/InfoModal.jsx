import { Package, ShoppingBag } from "lucide-react";
import Modal from "./Modal";
import StarRating from "./StarRating";
import { formatRupiah } from "../utils/pricing";
export default function InfoModal({
  menu,
  stock,
  reviews,
  onAdd,
  onReview,
  onClose,
}) {
  const rating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : menu.rating;
  return (
    <Modal title={menu.name} onClose={onClose}>
      <img className="detail-image" src={menu.image} alt={menu.name} />
      <div className="detail-meta">
        <span className="pill">{menu.category}</span>
        <StarRating value={rating} />
        <span>
          <Package size={14} /> Stok {stock}
        </span>
      </div>
      <p className="detail-description">{menu.description}</p>
      <div className="detail-price">
        <strong>{formatRupiah(menu.price)}</strong>
        <button className="primary-button" onClick={() => onAdd(menu)}>
          Tambah <ShoppingBag size={17} />
        </button>
      </div>
      <div className="review-list">
        <div className="row-between">
          <h3>Ulasan ({reviews.length})</h3>
          <button className="text-link" onClick={onReview}>
            Tulis ulasan
          </button>
        </div>
        {reviews.length ? (
          reviews.map((review) => (
            <article className="review-item" key={review.id}>
              <StarRating value={review.rating} />
              <p>{review.comment}</p>
              <small>{new Date(review.date).toLocaleDateString("id-ID")}</small>
            </article>
          ))
        ) : (
          <p className="muted">
            Belum ada cerita untuk menu ini. Bagikan pengalamanmu.
          </p>
        )}
      </div>
    </Modal>
  );
}
