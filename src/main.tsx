import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="max-w-md mx-auto bg-background min-h-screen relative overflow-hidden">
      <App />
    </div>
  </React.StrictMode>
);
