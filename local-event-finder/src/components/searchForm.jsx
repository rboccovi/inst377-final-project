import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, keyword, date });
  };
  return (
    <form onSubmit={handleSubmit} className="search-form">
      {" "}
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />{" "}
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Keyword"
      />{" "}
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />{" "}
      <button type="submit">Search</button>{" "}
    </form>
  );
}
