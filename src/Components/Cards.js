import WeatherContext from "../Context/WeatherContext";
import { useContext } from "react";
import "../App.css";
import city from "../Cities";

function Cards() {
  const weatherContext = useContext(WeatherContext);
  let today = new Date();
  let currentDay = today.getDate();

  const convertDate = (UNIX_timestamp) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let a = new Date(UNIX_timestamp * 1000);
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = date + " " + month + " " + year + " ";
    return time;
  };

  return (
    <div>
      <div className="title">
        {weatherContext.weatherData.city?.name}
        <div>
          <select
            onChange={(e) => weatherContext.setCity(JSON.parse(e.target.value))}
          >
            {city.map((item, index) => {
              return (
                <option
                  selected={item.name === weatherContext.weatherData.city?.name}
                  key={index}
                  value={JSON.stringify({
                    lat: item.latitude,
                    lon: item.longitude,
                  })}
                >
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="cards">
        {weatherContext.weatherData.list?.map((item, index) => {
          return (
            <div
              className="card"
              key={index}
              style={
                convertDate(item.dt).slice(0, 2) == currentDay
                  ? { border: "3px solid black" }
                  : {}
              }
            >
              <div className="date">{convertDate(item.dt)}</div>
              <div className="temp">{item.temp.day.toFixed(0)}℃</div>
              <div className="weather">{item.weather[0].main}</div>
              <img
                src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                alt="weather icon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Cards;
