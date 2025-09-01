// Renders a 5 day list with min/max temperatures and a visual bar

function weekDayName(timeStamp, timeZoneOffset) { // Turn a date string into a weekday label, first item becomes "Today"
  const localDate = new Date((timeStamp + timeZoneOffset) * 1000); // Converst the API UTC timeStamp (in seconds) to milliseconds
  const cityNow = new Date(Date.now() + timeZoneOffset * 1000); // Computes the city's "now" (today) the same way

  function date(d) { // Helper function to turn a Date into YYYY-MM-DD format
    const year = d.getUTCFullYear();

    let month = d.getUTCMonth() + 1; // Months are 0-11, so added 1
    if (month < 10) {
      month = "0" + month; // Added a leading zero if needed
    }

    let day = d.getUTCDate(); // Day of the month
    if (day < 10) {
      day = "0" + day; // Added a leading zero if needed
    }

    return year + "-" + month + "-" + day; // Returns a string in YYYY-MM-DD format
  }

  if (date(localDate) === date(cityNow)) { // Compare the local date to the city's current local date
    return "Today"; 
  }

  return new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC"}).format(localDate); // Formated weekday name as "Mon", "Tue", etc. and forced UTC timezone to prevent local system timezone interference
}

function DailyForecast({forecastData, timeZoneOffset}) { {/*Expects array with 5 objects (min/max per day)*/}
//Build a flat list of all min + max temperatures to find global range
  const temperatures = forecastData.flatMap(day => [day.minimumTemperature, day.maximumTemperature]); // [min, max, min, mx, ...]
  const minimumTemperature = Math.min(...temperatures); // Lowest across all days
  const maximumTemperature = Math.max(...temperatures); // Highest across all days

  return (
    <div className="daily-forecast-container"> {/*Wrapper*/}
      <div className="daily-forecast-title">5-day forecast</div> {/*Title*/}
      {forecastData.map((day, idx) => { // One row per day
        const label = weekDayName(day.timeStamp, timeZoneOffset); // "Today", "Mon", ...
        const barRange = maximumTemperature - minimumTemperature || 1; // Prevent divide by zero
        const beginningOfBar = ((day.minimumTemperature - minimumTemperature) / barRange) * 100; // Start %
        const endOfBar = ((day.maximumTemperature - minimumTemperature) / barRange) * 100; // End %

        return (
          <div className="daily-forecast-row" key={idx}> {/*Row container*/}
            <div className="daily-forecast-day">{label}</div> {/*Day label*/}
            <img // Weather icon for the day
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.main}
              className="daily-forecast-icon"
            />
            <div className="daily-forecast-main">{day.main}</div> {/*Condition label*/}
            <div className="daily-forecast-temperature">{Math.round(day.minimumTemperature)}&deg;</div> {/*Min temperature*/}
            {/*Horizontal range bar shows min->max relative to week range*/}
            <div className="daily-forecast-bar">
              <div
                className="daily-forecast-bar-fill"
                style={{
                  left: `${beginningOfBar}%`, // Shift start
                  width: `${endOfBar - beginningOfBar}%` // Width equals day's range
                }}
              ></div>
            </div>
            <div className="daily-forecast-temperature">{Math.round(day.maximumTemperature)}&deg;</div> {/*Max temperature*/}
          </div>
          );
        })}
    </div>
  );
}
export default DailyForecast; // Export component for WeatherApp.jsx
