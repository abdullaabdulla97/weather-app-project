// Shows the next 24 hours (8 x 3 hour entries) as small cards

import { cityLocalTime } from "../Api"; // Format local time from dt + timezone

function HourlyForecast({forecastData, cityTimeZone}) { // Receives list of 3-hour entries + timezone
  return (
    <div className="hourly-forecast-container"> {/*Wrapper*/}
      <div className="hourly-forecast-row"> {/*Grid of 8 items*/}
        {forecastData.map((item, idx) => { // Loop each entry
          const localTime = cityLocalTime(item.dt, cityTimeZone); // Current time in this format "5:00 PM"

         const weatherMain = item.weather[0].main; // Weather label e.g., Clouds
         const weatherIcon = item.weather[0].icon; // Weather icon 
         const temperature = Math.round(item.main.temp) // Rounded temperature

         return (
          <div className="hourly-forecast-item" key={idx}> {/*One hour block*/}
            <div className="hourly-forecast-time">{localTime}</div> {/*Local time*/}
            <div className="hourly-forecast-divider"></div> {/*Divider line*/}
            <img // Weather icon
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt={weatherMain}
              className="hourly-forecast-icon"
            />
            <div className="hourly-forecast-weather">{weatherMain}</div> {/*Weather Label*/}
            <div className="hourly-forecast-temperature">{temperature}&deg;</div> {/*Temperature*/}
          </div>
        );
      })}
    </div>
  </div>
 );
}

export default HourlyForecast; // Export the component for WeatherApp.jsx