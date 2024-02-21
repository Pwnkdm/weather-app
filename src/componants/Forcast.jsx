import React, { useEffect, useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "../styles/forcast.css";
import axios from "axios";
import { getIcon } from "../common/functions/commonfunctions";
import serachIcon from "../common/icon/search.png"

const Forcast = ({ defaultIcon, defaultWeather }) => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");
  const [icon, setIcon] = useState("");

  const defaults = {
    color: "white",
    size: 100,
    animate: true,
  };

  const handleSearch = (city) => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${process.env.REACT_APP_PASS}`,
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  const setcurrIcon = () => {
    const currIcon = getIcon(weather?.weather?.[0]?.main);
    setIcon(currIcon);
  };

  useEffect(() => {
    setcurrIcon();
  }, [weather?.weather]);

  useEffect(() => {
    handleSearch('pune');  
  }, [])
  

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={icon ? icon : defaultIcon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>
          {weather &&
          weather?.weather &&
          weather?.weather?.[0] &&
          weather?.weather?.[0]?.main
            ? weather?.weather?.[0]?.main
            : defaultWeather}
        </h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            {" "}
            <img
              src={serachIcon}
              onClick={handleSearch}
              alt="search"
            />
          </div>
        </div>
        <ul>
          {typeof weather?.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather?.name}, {weather?.sys?.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}.png`}
                  alt="icon"
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather?.main?.temp)}°c (
                  {weather?.weather?.[0]?.main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather?.main?.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather?.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather?.wind?.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Forcast;
