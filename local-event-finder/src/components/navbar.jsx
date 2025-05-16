// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav
      style={{
        display: "flex",
        padding: 20,
        background: "#430000",
        color: "white",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>EventFinder</h1>
      <div style={{ display: "flex", gap: 16 }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/events" style={{ color: "#fff", textDecoration: "none" }}>
          Events
        </Link>
        <Link to="/favorites" style={{ color: "#fff", textDecoration: "none" }}>
          Favorites
        </Link>
        <Link to="/stats" style={{ color: "#fff", textDecoration: "none" }}>
          Stats
        </Link>
      </div>
    </nav>
  );
}
