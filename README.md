# Local Event Finder

A Vite-powered React single-page app for discovering events in any city, saving favorites to a Supabase backend, and viewing stats and local attractions. Users can:

- 🔍 Search Ticketmaster events by city, radius, and unit
- ❤️ “Like” events to save them in a Supabase `favorites` table
- 📊 View event count-by-weekday charts under “Insights”
- 🗺️ Discover nearby attractions via Wikipedia Geosearch

**Target Browsers**  
Designed for modern desktop browsers (Chrome, Firefox, Edge, Safari) and mobile WebKit (iOS Safari, Android Chrome).

# Developer Manual

This document guides future developers through installing, running, testing, and extending **Local Event Finder**.


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
- A Ticketmaster API key

- A Vercel account (for deployment)

- ## 2.  Installation
Clone this repo and enter the front-end directory:

bash
Copy
Edit
git clone https://github.com/your-org/inst377-final-project.git
cd inst377-final-project/local-event-finder
Environment
Create a .env (do not commit) with:

bash
Copy
Edit
VITE_TICKETMASTER_API_KEY=your_ticketmaster_key
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key



## 3. Running Locally
Development (React + Vite HMR + API emulation):

bash
Copy
Edit
npx vercel dev
App: http://localhost:3000

API: http://localhost:3000/api/events, /api/favorites

Production Preview (build & serve):

bash
Copy
Edit
npm run build
npm run preview



# 4. API Reference
All routes live under api/ and are exposed at /api/*.

##  GET /api/events
this is Proxy to Ticketmaster.

Query

city (string, default "Boston")

radius (number, default 10)

unit ("km" or "miles", default "km")

countryCode (ISO, default "US")

Response

200 OK & JSON array of event objects

502 Bad Gateway on upstream failure

## GET /api/favorites
Fetch all saved favorites.

Response

200 OK & JSON array of:

json
Copy
Edit
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "event_id": "string",
    "name": "string",
    "date": "ISO timestamp",
    "url": "string"
  },
  …
]
500 Internal Server Error on DB error

##  POST /api/favorites
Save a new favorite.

Request Body (JSON):

json
Copy
Edit
{
  "user_id": "uuid",
  "event_id": "string",
  "name": "string",
  "date": "ISO timestamp",
  "url": "string"
}
Response

201 Created & the inserted row as JSON

500 Internal Server Error on DB error

# 6. Known Bugs & Caveats
SPA deep-links (e.g. /events) require a catch-all rewrite in vercel.json or Vercel Routes.

No automated tests—manual only.

Single-user demo; no authentication or multi-user support.

***7. Roadmap*** 
Authentication via Supabase Auth

Map View with Mapbox/Google Maps

Mobile UX optimizations for iOS/Android



Thank you for picking up Local Event Finder! Happy coding. 🎉









