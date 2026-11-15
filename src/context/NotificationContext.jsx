import { createContext, useCallback, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";
const NotificationContext = createContext(null);
export const useNotifications = () => useContext(NotificationContext);
const valid = (value) =>
  Array.isArray(value) &&
  value.every(
    (n) =>
      n &&
      typeof n.id === "string" &&
      typeof n.message === "string" &&
      typeof n.read === "boolean" &&
      typeof n.date === "string",
  );
export function NotificationProvider({ children }) {
  const [notifications, setNotifications, storageError] = useLocalStorage(
    "koptum-notifications-v1",
    [],
    valid,
  );
  const toast = useToast();
  const notify = useCallback(
    (message, type = "success") => {
      toast(message, type);
      setNotifications((current) => [
        {
          id: crypto.randomUUID(),
          message,
          type,
          date: new Date().toISOString(),
          read: false,
        },
        ...current,
      ]);
    },
    [toast, setNotifications],
  );
  const markRead = useCallback(
    () =>
      setNotifications((current) =>
        current.some((n) => !n.read)
          ? current.map((n) => ({ ...n, read: true }))
          : current,
      ),
    [setNotifications],
  );
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notify,
        markRead,
        storageError,
        unread: notifications.filter((n) => !n.read).length,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
