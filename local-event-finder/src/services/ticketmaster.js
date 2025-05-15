import axios from "axios";

export const fetchTicketmasterEvents = async (location, keyword, date) => {
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_TICKETMASTER_API_KEY is missing");
  }

  const params = {
    apikey: apiKey,
    ...(location && { city: location }),
    ...(keyword && { keyword }),
    ...(date && { startDateTime: new Date(date).toISOString() }),
  };

  try {
    const { data } = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/events.json",
      { params }
    );
    return data._embedded?.events || [];
  } catch (err) {
    console.error("Ticketmaster API error:", err);
    return [];
  }
};
