// src/services/ticketmaster.js
export async function fetchTicketmasterEvents({
  city,
  radius = 10,
  unit = "km",
  countryCode = "US",
} = {}) {
  const params = new URLSearchParams({
    city,
    radius: String(radius),
    unit,
    countryCode,
  });
  const res = await fetch(`/api/events?${params.toString()}`);
  if (!res.ok) {
    const txt = await res.text().catch(() => res.statusText);
    throw new Error(`Error ${res.status}: ${txt}`);
  }
  return res.json(); // returns an array of events
}
