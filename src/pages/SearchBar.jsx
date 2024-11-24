import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Поиск постов..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Поиск</button>
    </form>
  );
};

export default SearchBar;