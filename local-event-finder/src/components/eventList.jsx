// src/components/EventsList.jsx
import React, { useEffect, useState } from "react";
import { fetchTicketmasterEvents } from "/services/ticketmaster";

export default function EventsList({
  city = "Boston",
  radius = 10,
  unit = "km",
}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTicketmasterEvents({ city, radius, unit })
      .then((data) => {
        setEvents(data._embedded?.events || []);
      })
      .catch((err) => {
        setError(err.response?.data?.fault?.faultstring || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city, radius, unit]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!events.length) return <p>No upcoming events found in {city}.</p>;

  return (
    <div className="events-list">
      {events.map((ev) => (
        <div key={ev.id} className="event-card">
          <h3>{ev.name}</h3>
          {ev.dates?.start?.dateTime && (
            <p>{new Date(ev.dates.start.dateTime).toLocaleString()}</p>
          )}
          {ev._embedded?.venues?.[0] && (
            <p>
              Venue: {ev._embedded.venues[0].name},{" "}
              {ev._embedded.venues[0].city.name}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
