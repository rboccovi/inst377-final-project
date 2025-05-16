// src/pages/ChartPage.jsx
import React, { useState, useEffect } from "react";
import { fetchTicketmasterEvents } from "../services/ticketmaster";
import EventChart from "../components/eventChart";

export default function ChartPage() {
  const [city, setCity] = useState("Boston");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTicketmasterEvents({ city, radius: 50, unit: "km" })
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <div className="container">
      <h1>📊 Event Stats for {city}</h1>

      {/* City selector */}
      <div style={{ margin: "1rem 0" }}>
        <input
          className="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city (e.g. Seattle)"
        />
      </div>

      {loading && <p>Loading events…</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && events.length > 0 && (
        <section style={{ marginTop: "2rem", height: 400 }}>
          <EventChart events={events} />
        </section>
      )}

      {!loading && !error && events.length === 0 && (
        <p>No events found for {city}.</p>
      )}
    </div>
  );
}
