import { Star } from "lucide-react";
export default function StarRating({ value, onChange }) {
  if (!onChange)
    return (
      <span className="rating">
        <Star size={13} fill="currentColor" /> {value.toFixed(1)}
      </span>
    );
  return (
    <div className="star-picker" role="group" aria-label="Pilih rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          aria-label={`Rating ${n} bintang`}
          aria-pressed={n === value}
          onClick={() => onChange(n)}
        >
          <Star size={28} fill={n <= value ? "currentColor" : "none"} />
        </button>
      ))}
    </div>
  );
}
