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
  const [saving, setSaving] = useState(false);

  // GET favorites
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/favorites");
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      }
    })();
  }, []);

  // POST favorite
  const handleFavorite = async (evt) => {
    setSaving(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "00000000-0000-0000-0000-000000000000",
          event_id: evt.id,
          name: evt.name,
          date: evt.dates.start.dateTime,
          url: evt.url,
        }),
      });

      if (!res.ok) {
        // read the text so we surface the real error
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      // reload favorites list
      const favRes = await fetch("/api/favorites");
      if (favRes.ok) {
        const favData = await favRes.json();
        setFavorites(favData);
      }
    } catch (err) {
      console.error("Could not save favorite:", err);
      alert("Could not save favorite: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const isFavorited = (id) => favorites.some((f) => f.event_id === id);

  // Search handler omitted for brevity—assume it's unchanged and never calls res.json() on POST.

  return (
    // ... your JSX with the like button:
    <button
      onClick={() => handleFavorite(evt)}
      disabled={isFavorited(evt.id) || saving}
      className="btn"
    >
      {isFavorited(evt.id) ? "❤️ Liked" : saving ? "Saving…" : "🤍 Like"}
    </button>
  );
}
