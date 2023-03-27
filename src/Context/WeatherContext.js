import { createContext, useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState({ lat: 37.8667, lon: 32.4833 });
  const [weatherData, setWeatherData] = useState({});
  const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;

  /* Hava durumu bilgisini almak icin openweathermap API'na enlem, boylam ve apikey ile istekte bulunuyoruz
    Her sehir degistiginde bu istek tekrar ediyor
  */
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${city.lat}&lon=${city.lon}&appid=${APIKEY}&units=metric&cnt=7`
      )
      .then((data) => {
        setWeatherData(data.data);
      });
  }, [city]);

  const values = {
    weatherData,
    setCity,
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContext;
