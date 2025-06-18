const apiKey = "e961576a04b1914f5fc6cb5e971fb4d2";
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather() {

  const city = document.getElementById("cityInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (city === "") {
    resultBox.innerHTML = "<p class='error'>❗ Please enter a city name.</p>";
    return;
  }

  const url = `${baseURL}?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("weatherResult").innerText = "City not found!";
      return;
    }

    document.getElementById("weatherResult").innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    <p>Temperature🌡️: ${data.main.temp}°C</p>
    <p>Weather⛅ : ${data.weather[0].main}</p>
    <p>Humidity💧: ${data.main.humidity}%</p>
    <p>Wind Speed🍃: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerText = "Error fetching data!";
    console.error(error);
  }

}

document.getElementById("cityInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});