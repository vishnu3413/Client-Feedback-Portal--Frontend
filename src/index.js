import React from "react";
import ReactDOM from "react-dom/client";  // Use 'react-dom/client' for React 18
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
