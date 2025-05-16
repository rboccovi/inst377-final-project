// src/pages/AboutPage.jsx
import React from "react";

export default function AboutPage() {
  return (
    <div className="container">
      <h1>About EventFinder</h1>
      <p>
        EventFinder was built to make it easier for you to discover what's
        happening in your city. Whether you're looking for live music, theater,
        festivals, or community gatherings, we've got you covered.
      </p>

      <h2>Our Mission</h2>
      <p>
        To bring people together by surfacing local events in a simple,
        beautiful interface.
      </p>

      <h2>The Team</h2>
      <ul>
        <li>
          <strong>You</strong> – Full-stack developer, UI/UX designer, and event
          enthusiast
        </li>
        <li>
          <strong>Supabase</strong> – Powers our favorites and categories
          backend
        </li>
        <li>
          <strong>Ticketmaster API</strong> – Source of up-to-date event
          listings
        </li>
      </ul>

      <h2>How It Works</h2>
      <ol>
        <li>Enter your city and search radius</li>
        <li>Browse the featured or filtered events</li>
        <li>Click “View on Ticketmaster” to get tickets</li>
        <li>Save your favorites for easy access later</li>
      </ol>
    </div>
  );
}
