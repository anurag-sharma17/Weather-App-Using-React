import React from 'react';

const SearchBar = ({ city, setCity, getWeather }) => {
  return (
    <form onSubmit={getWeather} className="search-bar">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
  