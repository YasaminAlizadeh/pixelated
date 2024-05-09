import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "app/app";
import CanvasProvider from "./context/CanvasContext";
import ColorProvider from "./context/ColorContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <React.StrictMode>
    <CanvasProvider>
      <ColorProvider>
        <App />
      </ColorProvider>
    </CanvasProvider>
  </React.StrictMode>
);
