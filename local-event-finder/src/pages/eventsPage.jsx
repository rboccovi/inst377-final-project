// src/pages/EventsPage.jsx
import React, { useState, useEffect } from "react";
import { fetchTicketmasterEvents } from "../services/ticketmaster";

export default function EventsPage() {
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState("10");
  const [unit, setUnit] = useState("km");
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load existing favorites on mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites");
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  };

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const list = await fetchTicketmasterEvents({
        city,
        radius: Number(radius),
        unit,
      });
      setEvents(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Favorite handler
  const handleFavorite = async (evt) => {
    const payload = {
      user_id: "00000000-0000-0000-0000-000000000000", // replace with real user ID
      event_id: evt.id,
      name: evt.name,
      date: evt.dates.start.dateTime,
      url: evt.url,
    };

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());

      // Re-fetch the full favorites list to update state
      await fetchFavorites();
    } catch (err) {
      console.error("Could not save favorite:", err);
      alert("Could not save favorite: " + err.message);
    }
  };

  // Helper to check if an event is already favorited
  const isFavorited = (id) => favorites.some((fav) => fav.event_id === id);

  return (
    <div className="container">
      <h1>🔍 Find Local Events</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          className="input"
          placeholder="City (e.g. Boston)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          className="input small-input"
          type="number"
          placeholder="Radius"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        />
        <select
          className="input small-input"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="km">km</option>
          <option value="miles">miles</option>
        </select>
        <button className="btn btn-primary" disabled={loadingEvents}>
          {loadingEvents ? "Searching…" : "Search"}
        </button>
      </form>

      {error && <p className="error-text">Error: {error}</p>}

      {!loadingEvents && events.length === 0 && !error && (
        <p>No events found. Try a search above.</p>
      )}

      {events.length > 0 && (
        <div className="event-grid">
          {events.map((evt) => (
            <div key={evt.id} className="card">
              <h3>{evt.name}</h3>
              <p>{new Date(evt.dates.start.dateTime).toLocaleString()}</p>
              <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
                <a
                  href={evt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  View
                </a>
                <button
                  onClick={() => handleFavorite(evt)}
                  disabled={isFavorited(evt.id)}
                  className="btn btn-primary"
                >
                  {isFavorited(evt.id) ? "❤️ Liked" : "🤍 Like"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
