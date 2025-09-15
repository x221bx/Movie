import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

const root = document.getElementById("root");
createRoot(root).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
);
