import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
export default function Modal({
  title,
  children,
  onClose,
  drawer = false,
  className = "",
}) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    window.dispatchEvent(new Event("koptum-dialog-change"));
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      window.dispatchEvent(new Event("koptum-dialog-change"));
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`${drawer ? "drawer" : "modal"} ${className}`}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = ref.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-heading">
        <div>
          <span className="eyebrow">KOPTUM · KOPI & TEMAN</span>
          <h2 id={titleId}>{title}</h2>
        </div>
        <button
          className="icon-button close-button"
          aria-label="Tutup popup"
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
