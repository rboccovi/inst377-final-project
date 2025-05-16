# Local Event Finder

A Vite-powered React single-page app (SPA) for discovering events in any city, saving favorites to a Supabase backend, and viewing stats and local attractions. Users can:

- 🔍 Search Ticketmaster events by city, radius, and unit
- ❤️ “Like” events to save them in a Supabase `favorites` table
- 📊 View event-by-weekday charts under “Insights”
- 🗺️ Discover nearby attractions via Wikipedia Geosearch

**Target Browsers**  
Designed for modern desktop browsers (Chrome, Firefox, Edge, Safari) and mobile WebKit (iOS Safari, Android Chrome).

**Developer Manual**  
For setup, architecture, API docs, tests, and roadmap, see [docs/Developer_Manual.md](docs/Developer_Manual.md).

# Developer Manual

This document guides future developers through installing, running, testing, and extending **Local Event Finder**.

---

## 1. Prerequisites Needs

- Node.js ≥ 18.x
- npm ≥ 8.x
- A Supabase project with a `favorites` table:

  ```sql
  create table favorites (
    id        uuid             primary key default uuid_generate_v4(),
    user_id   uuid             not null,
    event_id  text             not null,
    name      text             not null,
    date      timestamptz      not null,
    url       text             not null
  );
  ```
