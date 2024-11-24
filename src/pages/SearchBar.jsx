import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Какой у тебя вопрос?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-gray-800 text-center border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-main text-white px-4 py-2 rounded-lg hover:bg-seco focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Поиск
      </button>
    </form>
  );
};

export default SearchBar;