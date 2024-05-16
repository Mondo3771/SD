import React, { useEffect, useState } from "react";
import {
  Wrapper,
  Weather,
  Booking,
  Card,
  ImageSec,
  Main,
  Text,
} from "./StaffCarWash.styles";

const StaffCarWash = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const [MondayQuant, setMondayQuant] = useState(11);
  const [ThursdayQuant, setThursdayQuant] = useState(11);

  useEffect(() => {
    // Weather api
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = "364463030b5dcb4c6b6f92bbaab6ab21 ";
      const apiUrl = `https://api.openweathermap.org/data/2.5//weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Weather data not available");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const getLocation = () => {
      //gets location of device
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            setError("Unable to retrieve location");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const mondayBook = () => {
    console.log("mon");
  };

  const tuesdayBook = () => {
    console.log("tues");
  };

  return (
    <Wrapper>
      <ImageSec>
        <h3>Professional Cleaning Service</h3>
      </ImageSec>
      <Main>
        {/* <Text>Car Wash</Text> */}
        <Weather>
          {error && <p>{error}</p>}
          {weatherData && (
            <div>
              {console.log(weatherData)}
              <h2>Current Weather</h2>
              <p>Location: {weatherData.name}</p>
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Description: {weatherData.weather[0].description}</p>
            </div>
          )}
        </Weather>

        <Booking>
          <Card>
            <h4>Monday</h4>
            <p>Availability: {MondayQuant} slots</p>
            <button onClick={mondayBook}>Book</button>
          </Card>
          <Card>
            <h4>Thursday</h4>
            <p>Availability: {ThursdayQuant} slots</p>
            <button onClick={tuesdayBook}>Book</button>
          </Card>
        </Booking>
      </Main>
    </Wrapper>
  );
};

export default StaffCarWash;
