import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

console.log("🚀 main.jsx loaded"); // ← should appear

const container = document.getElementById("root");
console.log("🔍 root:", container); // ← should log the div

const root = ReactDOM.createRoot(container);
root.render(<App />);
