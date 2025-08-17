import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Disable DevTools shortcuts
    const handleKeyDown = (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
      }
      // Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
      if (
        e.ctrlKey &&
        e.shiftKey &&
        ["I", "C", "J"].includes(e.key.toUpperCase())
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      )
      .then((response) => {
        setWeather(response.data);
        setCity("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("City not found. Please try again.");
      });
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar city={city} setCity={setCity} getWeather={getWeather} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
