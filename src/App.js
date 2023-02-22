import "./App.css";
import WeatherContext, { WeatherProvider } from "./Context/WeatherContext";
import Cards from "./Components/Cards";

function App() {
  return (
    <div className="App">
      <WeatherProvider>
        <Cards />
      </WeatherProvider>
    </div>
  );
}

export default App;
