import React, { useState, useEffect } from "react";
import axios from "axios";
const Weather = ({ countryInfo }) => {
  const [weatherapi, setWeatherapi] = useState([])
  console.log('countries.capital', countryInfo)
  const api_Key = process.env.REACT_APP_API_KEY;
  const api_Url = `https://api.openweathermap.org/data/2.5/weather?q=${countryInfo}&APPID=${api_Key}`;
  console.log('weather', weatherapi)
  useEffect(() => {
    console.log('effect')
    axios
      .get(api_Url)
      .then(response => {
        console.log('Weather promise fulfilled')
        console.log(response.data)
        setWeatherapi(response.data)
      })
  }, [api_Url, countryInfo])
  return (
    <div>
      <h2>Weather in {countryInfo}</h2>
      <div>
        <p>temperature {((weatherapi?.main && weatherapi.main.temp) - 273.15).toFixed(2)} Celsius</p>
        <img
          src={weatherapi?.weather && `http://openweathermap.org/img/w/${weatherapi.weather[0].icon}.png`}
          alt="Weather img"
        />

      </div>


      <p>wind {weatherapi?.wind && weatherapi.wind.speed} m/s</p>
    </div>
  )
}

export default Weather;