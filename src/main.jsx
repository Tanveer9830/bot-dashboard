import React from "react";
import ReactDOM from "react-dom/client";
import DashboardPreview from "./DashboardPreview.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 1000 }}>
        <DashboardPreview />
      </div>
    </div>
  </React.StrictMode>
);
