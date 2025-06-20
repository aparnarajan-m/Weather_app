const apiKey = "e961576a04b1914f5fc6cb5e971fb4d2";
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather() {

  const city = document.getElementById("cityInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  //Input validation
  if (city === "") {
    resultBox.innerHTML = "<p class='error'>❗Please enter a city name.</p>";
    return;
  }

  // Show loading message
  resultBox.innerHTML = `<p class="loading">⏳ Loading weather data...</p>`;

  const url = `${baseURL}?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    //Handling API response error
    if (data.cod === "404") {
      document.getElementById("weatherResult").innerText = "⚠️City not found!";
      return;
    }

    //Time Setting
    const timezoneOffset = data.timezone * 1000; //convert seconds to milliseconds, because JavaScript Date uses milliseconds
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000; //This gives current UTC time in milliseconds (Coordinated Universal Time-It's like the base time from which all other timezones are calculated.)
    const cityTime = new Date(utcTime + timezoneOffset); // Create new Date for the city's local time
    const options = {    // Format the local time and date
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const localDateTime = cityTime.toLocaleString('en-IN', options);

   const rain = data.rain && data.rain["1h"] ? data.rain["1h"] : "0";

    //show current weather
    document.getElementById("weatherResult").innerHTML = `
    <div class = "weatherHeadeInfo">
    <div class = "weatherHeadSec">
    <div> 
    <h3 class = "country"> ${data.name}, ${data.sys.country}</h3> 
    <p class = "local-time">${localDateTime}</p> </div>
    <div>${data.main.feels_like}°C</div>
    </div> 
    <div class = "weatherResult-Img"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon"></div>
    </div>

    <div class="weather-info-row">
    <div class = "weatherinfoRow1">
    <div class="info-box"><span class="info-Title">🌧️Rain</span> ${rain} mm/h</div>
    <div class="info-box"><span class = "info-Title">🌡️Temperature </span> ${data.main.temp}°C</div>
    <div class="info-box"><span class = "info-Title">💧 Humidity </span>  ${data.main.humidity}%</div>
    </div>
    <div class = "weatherinfoRow2">
    <div class="info-box"><span class = "info-Title">💨 Wind Speed </span>  ${data.wind.speed} m/s</div>
    <div class="info-box"><span class = "info-Title">🌎Longitude</span>  ${data.coord.lon} m/s</div>
    <div class="info-box"><span class = "info-Title">🌐Latitude</span>  ${data.coord.lat} m/s</div>
    </div>
    </div>
    `; 
  } catch (error) {
    document.getElementById("weatherResult").innerText = "⚠️Error fetching data!";
    console.error(error);
  }

}

// Show a logo on app load
document.getElementById("weatherResult").innerHTML = `
<div class ="logoName">
<h5 class = "name">skyLence</h5>
<i class="fa-brands fa-skyatlas"></i>  
</div>
`;

//When the inputBox empty show a search icon in weatherResult body
document.getElementById("cityInput").addEventListener("input", function () {
  const resultBox = document.getElementById("weatherResult");

  if (this.value.trim() === "") {
    resultBox.innerHTML = `<i class="fa-solid fa-magnifying-glass-location"></i>`;
  }
});

//Adding KeyBoard Support
document.getElementById("cityInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});