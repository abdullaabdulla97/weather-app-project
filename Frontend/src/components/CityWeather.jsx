// Shows small cards for a few preset major cities, using the same unit (metric/imperial) as the main view

import React, {useState, useEffect} from "react"; // useState = local state, useEffect = run effects when dependencies change

const cities = [ // Preset cities to fetch and display
  {name: "Kuwait City", country: "KW", label: "Kuwait"}, // City object #1
  {name: "Manchester", country: "GB", label: "United Kingdom"}, // City object #2
  {name: "New York", country: "US", label: "United States"}, // City object #3
]

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Reads API key from env

function CityWeather({temperatureUnit}) { // Receives current unit ("metric" or "imperial")
  const [cityWeatherList, setCityWeatherList] = useState([]); // List of fetched weather objects
  
  useEffect (() => { // Re-run whenever the unit changes(°C <-> °F)
    async function fetchWeather() { // Async loader
      const data = [] // Temporary array for results
      for (let city of cities) { // Loop through all preset cities
        const response = await fetch( // Fetch current weather for each city
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.name)},${city.country}&appid=${API_KEY}&units=${temperatureUnit}`
        );
        data.push(await response.json()); // Parse response and push into list
      }
      setCityWeatherList(data); // Save to state -> triggers re-render
    }
    fetchWeather(); // Kick off the requests
}, [temperatureUnit]); // Dependency array

return (
  <div className="city-weather-section"> {/*Section wrapper*/}
    <div className="city-weather-title">Other large cities</div> {/*Title*/}
    {cityWeatherList.map((data, idx) => { // Iterate over fetched results
      const city = cities[idx];  // Match weather to original city

      return (
        <div className="city-weather-card" key={city.name}> {/*Card container*/}
          <div className="city-weather-details"> {/*Left side info*/}
            <div className="city-weather-country">{city.label}</div> {/*Country labe;*/}
            <div className="city-weather-name">{city.name}</div> {/*City name*/}
            <div className="city-weather-description"> {/*Condition description*/}
            {data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)} {/*Capitalize the first letter*/}
            </div>
          </div>
          <div className="city-weather-main">  {/*Right side: icon + temperature*/}
            <img // Weather icon
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].main}
              className="city-weather-icon"
            />
            <div className="city-weather-temperature">
              {Math.round(data.main.temp)}&deg;  {/*Rounded temperature*/}
            </div>
          </div>
        </div>
         );
       })}
    </div>
   );
 }

export default CityWeather; // Export for use in WeatherApp

