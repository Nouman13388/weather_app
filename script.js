loadCities();
loadWeatherData();
// localStorage.removeItem("weatherData");

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getWeather);

function loadCities() {
  fetch("citiesName.json")
    .then((response) => response.json())
    .then((data) => {
      const suggestions = document.getElementById("suggestions");
      data.cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        suggestions.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error loading city data:", error);
    });
}

function loadWeatherData() {
  const storedData = localStorage.getItem("weatherData");
  if (storedData) {
    try {
      const weatherDataArray = JSON.parse(storedData);
      if (weatherDataArray) {
        const weatherContainer = document.querySelector(".weather-container");
        weatherContainer.innerHTML = "";
        weatherDataArray.forEach((weatherData) => {
          renderWeatherCard(weatherData);
        });
        console.log("Weather data has been loaded from localStorage.");
      } else {
        console.error("Stored weather data is not an array.");
      }
    } catch (error) {
      console.error("Error parsing weather data from localStorage:", error);
    }
  } else {
    console.log("No weather data found in localStorage.");
  }
}

function getWeather() {
  const city = document.getElementById("search-bar").value;
  const key = "f527ddffd52e46f286372143250703";
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.current) {
        renderWeatherCard(data);
        let weatherArray = [];
        const storedArray = localStorage.getItem("weatherData");
        if (storedArray) {
          try {
            weatherArray = JSON.parse(storedArray);
          } catch (error) {
            console.error("Error parsing existing weather data:", error);
          }
        }
        weatherArray.push(data);
        localStorage.setItem("weatherData", JSON.stringify(weatherArray));
        console.log("Weather data stored successfully.");
      } else {
        alert("Weather data could not be fetched. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    });
}

function renderWeatherCard(weatherData) {
  const weatherContainer = document.querySelector(".weather-container");
  const weatherCard = document.createElement("section");
  weatherCard.className = "weather-card";
  weatherCard.innerHTML = `
      <img class="weather-icon" src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">
      <section class="temperature">${weatherData.current.temp_c}°C</section>
      <section class="description">${weatherData.current.condition.text}</section>
      <section class="location">${weatherData.location.name}, ${weatherData.location.region}</section>
  `;
  const expandedWeatherCard = document.createElement("section");
  expandedWeatherCard.className = "expanded-weather-card";
  expandedWeatherCard.style.display = "none";
  expandedWeatherCard.innerHTML = `
      <section class="wind">Wind: ${weatherData.current.wind_kph} km/h</section>
      <section class="humidity">Humidity: ${weatherData.current.humidity}%</section>
      <section class="feels-like">Feels Like: ${weatherData.current.feelslike_c}°C</section>
      <section class="uv">UV: ${weatherData.current.uv}</section>
  `;
  weatherCard.appendChild(expandedWeatherCard);

  weatherCard.addEventListener("mouseover", function () {
    weatherCard.style.transform = "scale(1.3)";
    weatherCard.style.transition = "0.5s";
    expandedWeatherCard.style.display = "block";
  });
  weatherCard.addEventListener("mouseout", function () {
    weatherCard.style.transform = "scale(1)";
    weatherCard.style.transition = "0.5s";
    expandedWeatherCard.style.display = "none";
  });

  weatherContainer.appendChild(weatherCard);
}
