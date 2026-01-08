import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "app/App";
import CanvasProvider from "context/CanvasContext";
import ColorProvider from "context/ColorContext";
import { AuthProvider } from "context/AuthContext";
import { ToastProvider } from "context/ToastContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <CanvasProvider>
          <ColorProvider>
            <App />
          </ColorProvider>
        </CanvasProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);
