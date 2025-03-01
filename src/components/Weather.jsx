import "./Weather.css";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import cloudy_icon from "../assets/cloud.png";
import rainy_icon from "../assets/rain.png";
import snowy_icon from "../assets/snow.png";
import sunny_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

import mist_icon from "../assets/mist.png";
import thunder_icon from "../assets/thunder.png";
import { useEffect, useRef, useState } from "react";
const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": sunny_icon,
    "01n": sunny_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": cloudy_icon,
    "04n": cloudy_icon,
    "09d": rainy_icon,
    "09n": rainy_icon,
    "10d": drizzle_icon,
    "10n": drizzle_icon,
    "11d": thunder_icon,
    "11n": thunder_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon || sunny_icon];
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        cityName: data.name,
        icon: icon,
        description: data.weather[0].description,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };
  useEffect(() => {
    search("Vienna");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={inputRef} />
        <img
          src={search_icon}
          alt=""
          onClick={() => {
            search(inputRef.current.value);
            inputRef.current.value = "";
          }}
        />
      </div>

      {weatherData ? (
        <>
          {" "}
          <img
            src={weatherData.icon}
            alt={"The weather is " + weatherData.description}
            className="weather-icon"
          />
          <p className="temprature">{weatherData.temperature}° C</p>
          <p className="location">{weatherData.cityName}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Weather;
