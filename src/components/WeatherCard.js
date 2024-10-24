import React from 'react';
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';

const WeatherCard = ({ weather }) => {
  const { location, current } = weather;

  return (
    <div className="weather-card">
      <h2>{location.name}, {location.country}</h2>
      <p className="temperature">
        <FaTemperatureHigh /> {current.temp_c}°C
      </p>
      <p>{current.condition.text}</p>
      <div className="weather-details">
        <p><FaWind /> Wind: {current.wind_kph} kph</p>
        <p><FaTint /> Humidity: {current.humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherCard;
