import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import Modal from "./Modal";
import StarRating from "./StarRating";
import { useNotifications } from "../context/NotificationContext";
export default function ReviewModal({ menu, reviews, onSubmit, onClose }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const { notify } = useNotifications();
  function submit(e) {
    e.preventDefault();
    if (!rating || comment.trim().length < 5) {
      const message = "Pilih rating 1–5 dan tulis komentar minimal 5 karakter.";
      setError(message);
      notify(message, "error");
      return;
    }
    onSubmit(menu.id, {
      id: crypto.randomUUID(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
    });
    setComment("");
    setRating(0);
    setError("");
  }
  return (
    <Modal title={`Cerita tentang ${menu.name}`} onClose={onClose}>
      <form className="review-form" onSubmit={submit}>
        <label>Seberapa kamu suka?</label>
        <StarRating value={rating} onChange={setRating} />
        <label htmlFor="review-text">Ceritakan pengalamanmu</label>
        <textarea
          id="review-text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1000}
          rows={3}
          placeholder="Rasanya gimana? Teman lain pengin tahu..."
          aria-describedby={error ? "review-error" : "review-help"}
        />
        <small id="review-help">
          Minimal 5 karakter · {comment.trim().length}/1000
        </small>
        {error && (
          <p className="field-error" id="review-error" role="alert">
            {error}
          </p>
        )}
        <button className="primary-button" type="submit">
          Kirim ulasan <Send size={16} />
        </button>
      </form>
      <div className="review-list">
        <h3>
          Cerita teman Koptum <span>({reviews.length})</span>
        </h3>
        {reviews.length ? (
          reviews.map((review) => (
            <article className="review-item" key={review.id}>
              <div>
                <strong>Teman Koptum</strong>
                <StarRating value={review.rating} />
              </div>
              <small>{new Date(review.date).toLocaleString("id-ID")}</small>
              <p>{review.comment}</p>
            </article>
          ))
        ) : (
          <div className="empty-compact">
            <MessageCircle size={25} />
            <p>Belum ada ulasan. Jadi yang pertama bercerita!</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
