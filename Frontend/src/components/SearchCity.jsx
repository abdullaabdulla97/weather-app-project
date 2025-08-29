//Controlled text input for entering a city name and fires onSearch() when user presses Enter

function SearchCity({value, onChange, onSearch}) { // Parent passes value + handlers
  function handleKeyDown(e) { // Listen for Enter key
    if (e.key === "Enter") { // If Enter is pressed
      onSearch(); // Trigger parent onSearch callback
    }
  }

  return(
    <div className="search-city-container"> {/*Styles wrapper*/}
      <span className="search-city-icon"> {/*Left icon*/}
        <img width="22" height="22" src="https://img.icons8.com/ios/22/search--v1.png" alt="search--v1"/> {/*Magnifying glass icon*/}
      </span>
      <input
        className="search-city-bar" // For CSS styling
        type="text" // Text input
        placeholder="Search city...." // PLaceholder text
        value={value} // Controlled value from parent state
        onChange={onChange} // Update value as user types
        onKeyDown={handleKeyDown} // Submit on Enter
      />
    </div>
  );
}
export default SearchCity; // Export component for WeatherApp.jsx