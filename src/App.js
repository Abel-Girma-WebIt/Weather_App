import React, { useState, useEffect, useRef } from 'react';
import './style.css';

export default function App() {
  let weatherIcone = {
    PartialCloudy: 'https://cdn-icons-png.flaticon.com/128/1163/1163661.png',

    sunny: 'https://cdn-icons-png.flaticon.com/128/4814/4814268.png',

    rainy: 'https://cdn-icons-png.flaticon.com/128/1163/1163657.png',

    BrokenClouds: 'https://cdn-icons-png.flaticon.com/128/414/414825.png',

    lightRain: 'https://cdn-icons-png.flaticon.com/128/2930/2930082.png',

    ClearSky: 'https://cdn-icons-png.flaticon.com/128/6974/6974833.png',
    ScatteredClouds: 'https://cdn-icons-png.flaticon.com/128/414/414825.png',
    lightIntensRaain: 'https://cdn-icons-png.flaticon.com/128/2469/2469994.png',
  };

  let [weatherData, setWeatherData] = useState();
  let [city, setCity] = useState('London');

  let wholeData = (event) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6e5f09014f02fd2996c341d5fda6b58d`
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => {
        console.log('Error fetching weather data:', err);
        setWeatherData(null); // Reset weatherData to null on error
      });
  };

  useEffect(() => {
    wholeData();
  }, []);

  let typeOfWeather = weatherData?.weather[0]?.description;

  console.log(typeOfWeather);

  console.log(city);

  return (
    <div id="main">
      <div id="input_div">
        <input
          onKeyPress={(e) => (e.key === 'Enter' ? wholeData() : '')}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          id="entry"
          placeholder='Type city/country name here ...'
        />
      </div>

      <div id="typeOfWeather">
        <img
          src={
            typeOfWeather === 'moderate rain'
              ? weatherIcone.LightRain
              : typeOfWeather === 'broken clouds'
              ? weatherIcone.BrokenClouds
              : typeOfWeather === 'clear sky'
              ? weatherIcone.ClearSky
              : typeOfWeather === 'rainy'
              ? weatherIcone.rainy
              : typeOfWeather === 'light rain'
              ? weatherIcone.lightRain
              : typeOfWeather === 'overcast clouds'
              ? weatherIcone.ScatteredClouds
              : typeOfWeather === 'scattered clouds'
              ? weatherIcone.ScatteredClouds
              : typeOfWeather === 'few clouds'
              ? weatherIcone.PartialCloudy
              : typeOfWeather === 'light intensity drizzle rain'
              ? weatherIcone.lightIntensRaain
              : typeOfWeather === ''
              ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png'
              : ' '
          }
          width="100px"
          height="100px"
          alt=""
        />

        <h1 id="degree"></h1>
        <h1 id="degree">
          {weatherData?.main?.temp
            ? (weatherData.main.temp - 273).toFixed(2) + '°C'
            : 'Loading...'}
        </h1>

        <h1 id="current_weather">{weatherData?.weather[0]?.description}</h1>

        <h1 id="city">{weatherData?.name}</h1>
      </div>

      <div id="footer">
        <div id="humidity">
          <img
            src="https://cdn-icons-png.flaticon.com/128/5664/5664982.png"
            width="40px"
            height="40px"
            alt=""
          />
          <h2>{weatherData?.main.humidity}</h2>
          <p>Humidity</p>
        </div>

        <div id="windspeed">
          <img
            src="https://cdn-icons-png.flaticon.com/128/4113/4113122.png"
            width="40px"
            height="40px"
            alt=""
          />
          <h2>{weatherData?.wind.speed}</h2>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
}
