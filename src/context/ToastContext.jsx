import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Check, CircleAlert, X } from "lucide-react";
const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [target, setTarget] = useState(document.body);
  const timers = useRef(new Set());
  const toast = useCallback((message, type = "success") => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current.slice(-2), { id, message, type }]);
    const timer = setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
      timers.current.delete(timer);
    }, 3800);
    timers.current.add(timer);
  }, []);
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );
  useEffect(() => {
    const update = () =>
      setTarget(
        [...document.querySelectorAll("dialog[open]")].at(-1) || document.body,
      );
    window.addEventListener("koptum-dialog-change", update);
    return () => window.removeEventListener("koptum-dialog-change", update);
  }, []);
  return (
    <ToastContext.Provider value={toast}>
      {children}
      {createPortal(
        <div className="toast-stack" role="status" aria-live="polite">
          {toasts.map((t) => (
            <div className={`toast ${t.type}`} key={t.id}>
              {t.type === "error" ? (
                <CircleAlert size={20} />
              ) : (
                <Check size={20} />
              )}
              <span>{t.message}</span>
              <button
                className="icon-button"
                aria-label="Tutup notifikasi singkat"
                onClick={() =>
                  setToasts((current) =>
                    current.filter((item) => item.id !== t.id),
                  )
                }
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>,
        target,
      )}
    </ToastContext.Provider>
  );
}
