// Displays the current city's temperature, condition, city name, local time, wind, and min/max

import { cityLocalTime } from "../Api"; // Utility to format local time from dt + timezone

function CurrentWeather({weatherData}) { // Expects full current weather object
    if(!weatherData) { // If nothing passed, render nothing
        return null;
    }
    
    const localTime = cityLocalTime(weatherData.dt, weatherData.timezone); // time currently in the current city
    const weatherIconCode = weatherData.weather[0].icon; // icon from OpenWeather with code e.g., "10d"
    const weatherIconImage = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`; // Build icon url

    return (
        <div className="current-weather-card"> {/*Card container*/}
            <div className="current-weather-left"> {/*Left column*/}
                <div className="current-weather-temperature">
                       {Math.round(weatherData.main.temp)}° {/*Current weather temperature rounded*/}
                </div>
                <div className="current-weather-details-row"> {/*Condition row: icon + text*/}
                    <img // Icon of the current weather
                        src={weatherIconImage}
                        alt={weatherData.weather[0].main}
                        className="current-weather-condition-icon"
                    />
                    <span className="current-weather-main">
                        {weatherData.weather[0].main} {/*Condition label*/}
                    </span>
                    </div>
                    <div className="current-weather-feelslike">
                        Feel like: {Math.round(weatherData.main.feels_like)}°C {/*Feels like temperature*/}
                    </div>
                </div>
                <div className="current-weather-right"> {/*Right column*/}
                   <div className="current-weather-city">{weatherData.name}</div> {/*City name*/}
                   <div className="current-weather-time">{localTime}</div> {/*Local time*/}
                   <div className="current-weather-wind-row"> {/*Wind row*/}
                        <img  // Wind icon
                            width="30" 
                            height="30" 
                            src="https://img.icons8.com/fluency/30/wind.png" 
                            alt="wind"
                            className="current-weather-wind-icon"
                        />
                        <span className="current-weather-wind-value">
                            {weatherData.wind.speed} m/s {/*Wind speed*/}
                        </span>
                    </div>
                    <div className="current-weather-minmax">
                    {Math.round(weatherData.main.temp_min)}° to {Math.round(weatherData.main.temp_max)}° {/*Day min -> max temperature*/}
                   </div>
                </div>
            </div>
            );
        }

        export default CurrentWeather; // Export component for WeatherApp.jsx