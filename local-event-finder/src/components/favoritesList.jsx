
import React, { useEffect, useState } from "react";

export default function FavoritesList() {
  const [favorites, setFavorites] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setFavorites(data);
      })
      .catch((err) => {
        console.error("Failed to load favorites:", err);
        setError("Failed to load favorites");
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!favorites.length) return <p>No favorites yet.</p>;

  return (
    <ul>
      {favorites.map((fav) => (
        <li key={fav.id}>
          {fav.name} — {new Date(fav.date).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}
