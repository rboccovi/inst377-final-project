import axios from "axios";
export const fetchEventbriteEvents = async (location, keyword, date) => {
  const config = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_EVENTBRITE_API_KEY}`,
    },
    params: {
      "location.address": location,
      "start_date.range_start": date,
      q: keyword,
    },
  };
  const response = await axios.get(
    "https://www.eventbriteapi.com/v3/venues/:venue_id/events/",
    config
  );
  return response.data.events;
};
