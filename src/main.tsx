import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// NOTE: Add back strict mode once finished. Temporarily disable
// because it's double fetching the Unsplash API
// and so it's making the UI strange.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
