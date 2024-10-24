import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY; 

  const getWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
      .then(response => {
        setWeather(response.data);
        setCity('');
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError('City not found. Please try again.');
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
