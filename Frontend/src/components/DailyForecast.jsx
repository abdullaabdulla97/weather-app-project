// Renders a 5 day list with min/max temperatures and a visual bar

function weekDayName(date, idx) { // Turn a date string into a weekday label, first item becomes "Today"
  if (idx === 0) { // If this is the first row
    return "Today"; // label it "Today"
  }
  const day = new Date(date).toLocaleDateString("en-US", {weekday: "short"}); // Create a Date from "YYYY-MM-DD", gets formated in English (short day)
  return day; // e.g., "Mon", "Fri"

}

function DailyForecast({forecastData}) { {/*Expects array with 5 objects (min/max per day)*/}
//Build a flat list of all min + max temperatures to find global range
  const temperatures = forecastData.flatMap(day => [day.minimumTemperature, day.maximumTemperature]); // [min, max, min, mx, ...]
  const minimumTemperature = Math.min(...temperatures); // Lowest across all days
  const maximumTemperature = Math.max(...temperatures); // Highest across all days

  return (
    <div className="daily-forecast-container"> {/*Wrapper*/}
      <div className="daily-forecast-title">5-day forecast</div> {/*Title*/}
      {forecastData.map((day, idx) => { // One row per day
        const label = weekDayName(day.date, idx); // "Today", "Mon", ...
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