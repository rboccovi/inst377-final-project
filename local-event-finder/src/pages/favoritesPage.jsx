// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favs, setFavs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/favorites")
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then(setFavs)
      .catch((err) => {
        console.error(err);
        setError("Could not load favorites");
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!favs.length) return <p>No favorites yet.</p>;

  return (
    <div className="container">
      <h1>My Favorite Events</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {favs.map((f) => (
          <li key={f.id} style={{ marginBottom: 12 }}>
            <strong>{f.name}</strong> — {new Date(f.date).toLocaleDateString()}
            {" • "}
            <a href={f.url} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
