import React,{useEffect,useState} from 'react'


const StaffCarWash = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = '364463030b5dcb4c6b6f92bbaab6ab21 ';
      const apiUrl = `https://api.openweathermap.org/data/2.5//weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            setError('Unable to retrieve location');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  return (
    <div>
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
    </div>
  );
};


export default StaffCarWash
