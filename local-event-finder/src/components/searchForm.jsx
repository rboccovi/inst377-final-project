import { useState } from "react";
export default function SearchForm({ onSearch }) {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, date });
  };
  return (
    <form onSubmit={handleSubmit} className="search-form">
      {" "}
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city (e.g. New York)"
        required
      />{" "}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />{" "}
      <button type="submit">Search Events</button>{" "}
    </form>
  );
}
