// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedSlider from "../components/FeaturedSlider";
import { fetchTicketmasterEvents } from "../services/ticketmaster";

export default function HomePage() {
  const navigate = useNavigate();

  const [city, setCity] = useState("Boston");
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loadingAttractions, setLoadingAttractions] = useState(false);
  const [attrError, setAttrError] = useState(false);

  // whenever `city` changes, reload both events and attractions
  useEffect(() => {
    // 1️⃣ Fetch featured events
    fetchTicketmasterEvents({ city, radius: 50, unit: "km" })
      .then(setFeaturedEvents)
      .catch(console.error);

    // 2️⃣ Geocode the city to lat/lon
    setLoadingAttractions(true);
    setAttrError(false);

    fetch(
      `https://nominatim.openstreetmap.org/search?` +
        new URLSearchParams({
          q: city,
          format: "json",
          limit: "1",
        }).toString(),
      { headers: { "User-Agent": "EventFinder/1.0" } }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Geocoding error");
        return res.json();
      })
      .then((results) => {
        if (!results.length) throw new Error("City not found");
        const { lat, lon } = results[0];

        // 3️⃣ Fetch Wikipedia geosearch
        const wikiUrl = new URL("https://en.wikipedia.org/w/api.php");
        wikiUrl.search = new URLSearchParams({
          action: "query",
          list: "geosearch",
          gscoord: `${lat}|${lon}`,
          gsradius: "10000",
          gslimit: "5",
          format: "json",
          origin: "*",
        });

        return fetch(wikiUrl).then((r) => {
          if (!r.ok) throw new Error("Attractions fetch error");
          return r.json();
        });
      })
      .then((json) => {
        setAttractions(json.query.geosearch || []);
      })
      .catch((err) => {
        console.error("Attractions pipeline error:", err);
        setAttractions([]);
        setAttrError(true);
      })
      .finally(() => setLoadingAttractions(false));
  }, [city]);

  return (
    <div className="container">
      <h1>Welcome to EventFinder</h1>

      {/* City selector */}
      <div style={{ margin: "1rem 0" }}>
        <input
          className="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city (e.g. New York)"
        />
      </div>

      {/* Attractions */}
      <section style={{ margin: "2rem 0" }}>
        <h2>Top Attractions in {city}</h2>
        {loadingAttractions ? (
          <p>Loading attractions…</p>
        ) : attrError ? (
          <p style={{ color: "var(--accent-hot)" }}>
            Couldn’t fetch attractions for {city}.
          </p>
        ) : attractions.length ? (
          <ul style={{ listStyle: "disc inside" }}>
            {attractions.map((a) => (
              <li key={a.pageid}>
                <a
                  href={`https://en.wikipedia.org/?curid=${a.pageid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {a.title}
                </a>{" "}
                ({Math.round(a.dist)} m)
              </li>
            ))}
          </ul>
        ) : (
          <p>No attractions found.</p>
        )}
      </section>

      {/* Find Events button */}
      <button onClick={() => navigate("/events")} className="btn btn-primary">
        Find Events in {city}
      </button>

      {/* Featured Events */}
      <section style={{ marginTop: "2rem" }}>
        <h2>Featured Events in {city}</h2>
        {featuredEvents.length ? (
          <FeaturedSlider events={featuredEvents} />
        ) : (
          <p>Loading featured events…</p>
        )}
      </section>
    </div>
  );
}
