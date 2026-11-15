import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { NotificationProvider } from "./context/NotificationContext";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <NotificationProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </NotificationProvider>
    </ToastProvider>
  </React.StrictMode>,
);
