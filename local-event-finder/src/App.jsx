import { useState } from "react";
import SearchForm from "./components/searchForm";
import eventList from "./components/eventList":
import { fetchEventbriteEvents } from "./services/eventbrite";
import { fetchTicketmasterEvents } from "./services/ticketmaster";

function App() {
  const [events, setEvents] = useState([]);

  const handleSearch = async ({ location, keyword, date }) => {
    try {
      const [ebEvents, tmEvents] = await Promise.all([
        fetchEventbriteEvents(location, keyword, date),
        fetchTicketmasterEvents(location, keyword, date),
      ]);
      const combinedEvents = [...ebEvents, ...tmEvents];
      setEvents(combinedEvents);
    } catch (err) {
      console.error("Search error:", err);
      s;
    }
  };
  return (
    <div className="App">
      <h1>Local Event Finder</h1> <SearchForm onSearch={handleSearch} />{" "}
      <EventList events={events} />{" "}
    </div>
  );
}

export default App;
