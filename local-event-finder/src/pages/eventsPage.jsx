// src/pages/EventsPage.jsx
import React, { useState, useEffect } from "react";
import { fetchTicketmasterEvents } from "../services/ticketmaster";

export default function EventsPage() {
  const [city, setCity]             = useState("");
  const [radius, setRadius]         = useState("10");
  const [unit, setUnit]             = useState("km");
  const [events, setEvents]         = useState([]);
  const [loadingEvents, setLoading] = useState(false);
  const [error, setError]           = useState(null);
  const [favorites, setFavorites]   = useState([]);
  const [saving, setSaving]         = useState(false);

  // Load favorites on mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    try {
      const res  = await fetch("/api/favorites");
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  }

  async function handleSearch(e) {
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
  }

  async function handleFavorite(event) {
    setSaving(true);
    try {
      const res = await fetch("/api/favorites", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          user_id:  "00000000-0000-0000-0000-000000000000",
          event_id: event.id,
          name:     event.name,
          date:     event.dates.start.dateTime,
          url:      event.url,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      await fetchFavorites();
    } catch (err) {
      console.error("Could not save favorite:", err);
      alert("Could not save favorite: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  const isFavorited = (id) =>
    favorites.some((fav) => fav.event_id === id);

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
          {events.map((event) => (
            <div key={event.id} className="card">
              <h3>{event.name}</h3>
              <p>{new Date(event.dates.start.dateTime).toLocaleString()}</p>
              <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  View
                </a>
                <button
                  onClick={() => handleFavorite(event)}
                  disabled={isFavorited(event.id) || saving}
                  className="btn btn-primary"
                >
                  {isFavorited(event.id)
                    ? "❤️ Liked"
                    : saving
                      ? "Saving…"
                      : "🤍 Like"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
