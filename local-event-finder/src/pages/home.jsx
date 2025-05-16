import React, { useEffect, useState } from "react";
import FeaturedSlider from "../components/FeaturedSlider";
// import EventsSimple from "../components/EventsSimple";
import { fetchTicketmasterEvents } from "../services/ticketmaster";

export default function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    fetchTicketmasterEvents({ city: "Boston", radius: 50, unit: "km" })
      .then((events) => setFeaturedEvents(events))
      .catch((err) => console.error("Failed to load featured events:", err));
  }, []);

  return (
    <div className="container">
      <h1>Welcome to EventFinder</h1>
      <p>Discover concerts, sports, theater, and more all in one place.</p>

      <button
        className="btn btn-primary"
        onClick={() => (window.location = "/events")}
      >
        Find Events
      </button>

      <section style={{ marginTop: "2rem" }}>
        <h2>Featured Events</h2>
        <p>
          Kick off your search with our handpicked selection of the hottest
          happenings near you. From live music and theater to seasonal festivals
          and community gatherings, these top-ranked events are curated just for
          your city. Browse the carousel below, click for details, and snag your
          tickets before they sell out!
        </p>
        {featuredEvents.length ? (
          <FeaturedSlider events={featuredEvents} />
        ) : (
          <p>Loading featured events…</p>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Quick Search</h2>
        
      </section>
    </div>
  );
}
