import { useEffect } from "react";
import { Bell, CheckCheck } from "lucide-react";
import Modal from "./Modal";
import { useNotifications } from "../context/NotificationContext";
export default function NotificationsModal({ onClose }) {
  const { notifications, markRead } = useNotifications();
  useEffect(() => {
    markRead();
  }, [markRead]);
  return (
    <Modal title="Kabar untuk kamu" onClose={onClose}>
      <div className="notification-heading">
        <span>{notifications.length} aktivitas</span>
        <span>
          <CheckCheck size={15} /> Sudah dibaca
        </span>
      </div>
      {notifications.length ? (
        <div className="notifications-list">
          {notifications.map((n) => (
            <article
              className={`notification-item ${n.type === "error" ? "notification-error" : ""}`}
              key={n.id}
            >
              <span className="notification-icon">
                <Bell size={17} />
              </span>
              <div>
                <p>{n.message}</p>
                <small>{new Date(n.date).toLocaleString("id-ID")}</small>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-compact">
          <Bell size={36} />
          <h3>Belum ada kabar baru.</h3>
          <p>Aktivitasmu akan tersimpan di sini.</p>
        </div>
      )}
    </Modal>
  );
}
