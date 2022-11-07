import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import App from "./App";

export const socket = io("http://localhost:5000");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
