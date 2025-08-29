const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Reads the OpenWeather API key from the Frontend/.env at build time

// For current weather of the city
export async function fetchCurrentWeather (city, unit = 'metric') { // export used so I can import it to any other files, asynch function used to allow me to use await. The input parameter contains city variable as string to store the city names and set the unit to metric (Celsius).
  const response = await fetch ( // sends a GET request and awaits a response, the HTTP response object will then be stored in the variable response
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}` // added the city name, API key and API temperature unit (I used metric so it will be Celsius, imperial is Fahrenheit, standard is Kelvin) (https://api.openweathermap.org/data/2.5/weather?q=Ottawa&appid=29277f16bd30387ba287ce940a554d39&units=metric, paste it in browser to see json format)
    );

    return response.json(); // reads the HTTP response in JSON then converts it to a javascript object (it is asynchronous) and returns the parsed JSON object (contains he weather data of the city).

}

//Displays the forecast of the next 5 days of the city
export async function fetchForecast (city, unit = 'metric') { // export used so I can import it to any other files, asynch function used to allow me to use await. The input parameter contains city variable as string to store the city names and set the unit to metric (Celsius).
  const response = await fetch ( // sends a GET request and awaits a response, the HTTP response object will then be stored in the variable response
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}` // added the city name, API key and API temperature unit (I used metric so it will be Celsius, imperial is Fahrenheit, standard is Kelvin)
    );

    return response.json(); // reads the HTTP response in JSON then converts it to a javascript object (it is asynchronous) and returns the parsed JSON object (contains he weather data of the city).
}

export function cityLocalTime(dt, timezone) { // The dt is UNIX timestamp in seconds and timezone is the seconds offset from UTC (from API)
  const utc = (dt + timezone) * 1000; // Convert seconds to ms + add timezone offset
  const date = new Date(utc); // Create date from adjusted UTC ms
  let hours = date.getUTCHours(); // Get hours (0-23) in adjusted UTC
  const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Gets minutes (0-59), converts number to string, then ensures it is two digits (e.g., "01")
  const ampm = hours >= 12 ? "PM" : "AM"; // Decide between AM/PM
  hours = hours % 12; // Converts the 24h to a 12h number
  hours = hours === 0 ? 12 : hours;  // Maps from 0 to 12
  return `${hours}:${minutes} ${ampm}`; // Returns formatted 12h time string like "2:10 PM"
}