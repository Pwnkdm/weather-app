import React, { useEffect, useState } from "react";
import "./App.css";
import CurrentLocation from "./componants/CurrentLocation";
import Forcast from "./componants/Forcast";
import { getIcon } from "./common/functions/commonfunctions";
import loader from "./common/icon/weather.gif";

function App() {
  const [state, setState] = useState({
    lat: undefined,
    lon: undefined,
    city: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    humidity: undefined,
    main: undefined,
    country: undefined,
    icon: "CLEAR_DAY", // Default icon
  });

  const getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_PASS}`,
    );
    const data = await api_call.json();
    setState({
      lat: lat,
      lon: lon,
      city: data?.name,
      temperatureC: Math.round(data?.main?.temp),
      temperatureF: Math.round(data?.main?.temp * 1.8 + 32),
      humidity: data?.main?.humidity,
      main: data?.weather?.[0]?.main,
      country: data?.sys?.country,
      icon: getIcon(data?.weather?.[0]?.main), 
    });
  };

  const getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        .then((position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather.",
          );
        });
    } else {
      alert("Geolocation not available");
    }

    let timerID = setInterval(() => {
      getWeather(state.lat, state.lon);
    }, 600000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className="App">
      <div className="container">
        {state && state?.temperatureC ? (<>
          <CurrentLocation state={state} />
          <Forcast defaultWeather={state?.main} defaultIcon={state?.icon} />
        </>):(
          <div style={{border:":1px solid red"}}>
          <img id="loader" src={loader} alt="loading" style={{ width: "50%", WebkitUserDrag: "none"}} />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location wil be displayed on the App <br></br> & used
            for calculating Real time weather.
          </h3>
          </div>
        )}
      </div>
      <div className="footer-info">
        <a href="https://github.com/Pwnkdm/weather-app">Github Source Code</a> | Developed by{" "}
        <a href="https://www.linkedin.com/in/pwnkdm/">
          Pawanraje Kadam
        </a>{" "}
      </div>
    </div>
  );
}

export default App;
