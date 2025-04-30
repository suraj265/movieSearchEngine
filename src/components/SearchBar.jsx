import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query); // Calls the search function in App.jsx
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-gray-700 p-2 rounded-lg">
      <input
        type="text"
        placeholder="Search movies..."
        className="bg-transparent outline-none px-2 text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <FaSearch className="text-gray-400" />
      </button>
    </form>
  );
};

export default SearchBar;
