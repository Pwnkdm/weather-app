import React from "react";
import "../styles/currentlocation.css";
import ReactAnimatedWeather from "react-animated-weather";
import Clock from "react-live-clock";

const CurrentLocation = ({ state }) => {

  function getFormattedDate(date) {
    let options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    };
    return date.toLocaleString("en-IN", options);
  }

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  let now = new Date();

  return (
    <div className="city">
      <div className="title">
        <h2>{state?.city}</h2>
        <h3>{state?.country}</h3>
      </div>
      <div className="mb-icon">
        {" "}
        <ReactAnimatedWeather
          icon={state?.icon}
          color={defaults?.color}
          size={defaults?.size}
          animate={defaults?.animate}
        />
        <p>{state?.main}</p>
      </div>
      <div className="date-time">
        <div className="dmy">
          <div id="txt"></div>
          <div className="current-time">
          <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          </div>
          <div className="current-date">{getFormattedDate(now)}</div>
        </div>
        <div className="temperature">
          <p>
            {state?.temperatureC ? state?.temperatureC : "0"}°<span>C</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentLocation;
