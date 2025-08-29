//Weather App

//Import React and hooks
import React, {useState, useEffect} from "react";  // useState = local state, useEffect = run effects when dependencies change
//Import API helper functions
import {fetchCurrentWeather, fetchForecast} from "./Api"; // Functions that fetch data from OpenWeatherMap
//Import the child components
import CurrentWeather from "./components/CurrentWeather"; // Shows current temperature, city name, wind, etc.
import HourlyForecast from "./components/HourlyForecast"; // Shows hourly weather in 3-hoour intervals
import DailyForecast from "./components/DailyForecast"; // Shows daily summary for 5 days
import CityWeather from "./components/CityWeather"; // Shows weather for some preset large cities
import SearchCity from "./components/SearchCity"; // Search input for changing the selected city
import TemperatureConversion from "./components/TemperatureConversion"; // Toggle between Celsius and Fahrenheit




function WeatherApp() { // main component function for the whole app
    const [selectedCity, setSelectedCity] = useState("Ottawa"); // tracks and displays the selected city weather, initially set as Ottawa
    const [temperatureUnit, setTemperatureUnit] = useState("metric"); // tracks and displays the temperature unit (which is set as imperial)
    const [currentWeather, setCurrentWeather] = useState(null); // data object is stored for the current weather of a selected city
    const [hourlyForecast, setHourlyForecast] = useState([]); // for the 24 hour forecast data of the selected city (8 x 3h entries)
    const [dailyForecast, setDailyForecast] = useState([]); // Stores 5-day daily forecast summary
    const [searchQuery, setSearchQuery] = useState(""); // to store the user input when searching for city in search bar

    useEffect(() => { // to fetch the weather and forecast data each time a user searches a new city or a change in temperature unit
        async function getData() { // setup an asynch function to use await

            try {
                const currentWeatherData = await fetchCurrentWeather(selectedCity, temperatureUnit); // calls the function containing the api to fetch for the selectedCity and it's unit of temperature
                if (!currentWeatherData || currentWeatherData.cod !== 200) { // if the data for current weather does not exist or we get an error code from the api (due to city not being available)
                    setCurrentWeather(null); // set current weather as null to clear the data
                    setHourlyForecast([]); // this set as empty array and gets cleared
                    setDailyForecast([]); // this set as empty array and gets cleared
                    return; // exits the function
                }
                setCurrentWeather(currentWeatherData); // if the current weather data was fetched with no errors then it will be stored and displayed on the user interface
                 
                // For the 24 hour period contains 8 entries with 3 hour intervals each
                const forecastData = await fetchForecast(selectedCity, temperatureUnit); // fetches for the forecast data of the selected city and unit of temperature
                const dataStorage = []; // created an empty array to store the data
                for (let i = 0; i < 8 && i < forecastData.list.length; i++) { // loops the forecast list from 0 to 7 for the first 8 forecast entries 
                    dataStorage.push(forecastData.list[i]); // each of entries will then get added to the dataStorage array
                }
                setHourlyForecast(dataStorage) // then stored in the state so that data gets updated

                // Daily forecast for the first 5 days by grouping them by date
                const storage = {} // empty object for storing the grouped entries
                for (let i = 0; i < forecastData.list.length; i++) { // loops through each forecast entry
                    const entry = forecastData.list[i]; // gets the forecast entry at the specific index
                    const date = entry.dt_txt.split(" ")[0]; // extracts the date
                    if (!storage[date]) { // if the date is not already in the storage
                        storage[date] = []; // then an empty array is made to store it in there
                    }

                    storage[date].push(entry); // the foecast entry gets added to the array
                }

                const dates = Object.keys(storage).slice(0, 5); // gets all date keys for first 5 days
                const dailySummary = []; // empty array to store the daily summary data

                for (let i = 0; i < dates.length; i++) { // loops through each date key 
                    const date = dates[i]; // gets the date string for each index
                    const dayEntry = storage[date]; // get all the forecast entries at the specific date
                    let minimumTemperature = Number.POSITIVE_INFINITY; // minimum temperature of the day
                    let maximumTemperature = Number.NEGATIVE_INFINITY; // maximum temperature of the day

                    for (let j = 0; j < dayEntry.length; j++) { // loops through the forecast entries on that specifc date
                        const tempMin = dayEntry[j].main.temp_min; // the minimum temperature for the 3 hour entry
                        const tempMax = dayEntry[j].main.temp_max; // the maximum temperature for the 3 hour entry

                        if (tempMin < minimumTemperature) { // if the current minimum temperature is lower than minimum temperature
                            minimumTemperature = tempMin; // then our minimum temperature will be our current 
                        }

                        if (tempMax > maximumTemperature) { // if the current maximum temperature is higher than maximum temperature
                            maximumTemperature = tempMax; // then our maximum temperature will be our current 
                        }

                    }

                    dailySummary.push({ // adds the daily summary to the array
                        date, // the date
                        minimumTemperature, // minimum temp that day
                        maximumTemperature, // maximum temp that day
                        main: dayEntry[0].weather[0].main, // the weather for the initial forecast
                        icon: dayEntry[0].weather[0].icon, // the weather icon for the initial forecast
                    });
                }

                setDailyForecast(dailySummary); // then stored it in the state so that it gets updated
                
            } catch (e) { // catch error to show error message if an error happens and then stops fetching data
                setCurrentWeather(null);
                setHourlyForecast([]);
                setDailyForecast([]);
            }
        }
        getData(); // calls the function
    }, [selectedCity, temperatureUnit]); // gets updated once there is a change in city or unit of temperature

    const handleCitySearch = (city) => { // the function gets called each time a user searches for a city 
        setSelectedCity(city); // state gets updated with the new city the user searched for
        setSearchQuery(""); //update the the state so that it clears the input box once the city has been searched for

    };

    const handleTemperatureUnitChange = (unit) => { // the function gets called when the user changes between Celsius and Fahrenheit
        setTemperatureUnit(unit); // updates the state when toggles to a different unit
    };

    const handleSearchQueryChange = (event) => { // the function gets called when the user write in the search box
        setSearchQuery(event.target.value); // updates the state for the users input

    };

    const handleSearch = () => { // this function gets called when the user clicks enter on keyboard or clicks search
         if (searchQuery.trim()) { // If the input is not empty
            handleCitySearch(searchQuery.trim()); // Trigger city search
         }
    };

    return (
        <div className="weather-app"> {/*Wrapper for the entire app layout*/}
            <div className="left-panel"> {/*Left column: search, toggle, current weather, city cards*/}
                <div className="search-and-toggle"> {/*Row with search bar and Celsius/Fahrenheit toggle*/}
                    <SearchCity
                    value={searchQuery} // Pass state value to input
                    onChange={handleSearchQueryChange} // Update state when typing
                    onSearch={handleSearch} // Trigger search on Enter or button
                    />
                    <TemperatureConversion
                    unit={temperatureUnit} // Current selected unit
                    onToggle={handleTemperatureUnitChange} // Handler when toggled
                    />
                </div>
                <CurrentWeather weatherData={currentWeather}/> {/*To show the current weather of the selected city */}
                <CityWeather temperatureUnit={temperatureUnit}/> {/*Shows summary of major cities and makes sure to fetch the correct temperature unit*/}
            </div>

            <div className="right-panel"> {/*Right column: hourly and daily forecast*/}
                <HourlyForecast 
                    forecastData={hourlyForecast} // Pass hourly forecast data
                    cityTimeZone={currentWeather ? currentWeather.timezone : 0} // Pass city timezone (0 if null)
                /> 
                <DailyForecast forecastData={dailyForecast}/> {/*Show 5-day forecast summary */}   
            </div>
        </div>
       );
     }

export default WeatherApp; // Export component so it can be imported in App.jsx
