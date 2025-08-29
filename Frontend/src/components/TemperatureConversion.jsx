// Two-button toggle: Celsius (metric) or Fahrenheit (imperial). Highlights the active unit and calls onToggle(unit)

function TemperatureConversion({unit, onToggle}) { // unit = "metric" / "imperial"
  return (
    <div className="temperature-toggle-container"> {/*Rounded toggle wrapper*/}
      <button
        className={`temperature-toggle-btn ${unit === "metric" ? "active" : ""}`} // Add "active" if metric
        onClick={() => onToggle("metric")} // Switch to Celsius when clicked
        >
          <span className="temperature-toggle-unit">&deg;C</span> {/*Label*/}
        </button>
        <button
          className={`temperature-toggle-btn ${unit === "imperial" ? "active" : ""}`} // Add "active" class if imperial
          onClick={() => onToggle("imperial")} // Switch to Fahrenheit when clicked
          >
           <span className="temperature-toggle-unit">&deg;F</span> {/*Label*/}
          </button>
     </div>
  );
}
export default TemperatureConversion; // Export component for WeatherApp.jsx