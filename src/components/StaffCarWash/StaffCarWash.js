import React, { useEffect, useState } from "react";
import {
  Wrapper,
  Weather,
  Booking,
  Card,
  ImageSec,
  Right,
  Text,
  WeatherSec,
} from "./StaffCarWash.styles";
import { MapPinIcon } from "@heroicons/react/24/outline";
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
      <Right>
        {/* <Text>Car Wash</Text> */}
        <WeatherSec>
          <Text>
            <section className="text">
              <h5>Services</h5>
              <ul>
                <li> Car wash</li>
                <li> Vaccuuming</li>
                <li> Window washing</li>
                <li> Cleaning tires and rims</li>
                <li> Air Freshner</li>
              </ul>
            </section>
          </Text>

          <Weather>
            {error && <p>{error}</p>}
            {weatherData && (
              <section className="WeatherText">
                {console.log(weatherData)}
                <h2>Current Weather</h2>
                <p>{weatherData.name}</p>

                <h6>{weatherData.main.temp} °C</h6>
                <p> {weatherData.weather[0].description}</p>
                <p>Feels like:{weatherData.main.feels_like}</p>
                <p></p>
              </section>
            )}
          </Weather>
        </WeatherSec>

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
      </Right>
    </Wrapper>
  );
};

export default StaffCarWash;
