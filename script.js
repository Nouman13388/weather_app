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

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("search-bar").value;
  const key = "f527ddffd52e46f286372143250703";
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.current) {
        const weatherCard = document.createElement("section");
        weatherCard.id = "weather-card";
        weatherCard.className = "weather-card";
        weatherCard.innerHTML = `
            <img class="weather-icon" src="" alt="">
            <section class="temperature"></section>
            <section class="description"></section>
            <section class="location"></section>
          `;
        const weatherContainer = document.querySelector(".weather-container");
        weatherContainer.appendChild(weatherCard);

        weatherCard.querySelector(
          ".temperature"
        ).textContent = `${data.current.temp_c}°C`;
        weatherCard.querySelector(".description").textContent =
          data.current.condition.text;
        weatherCard.querySelector(
          ".location"
        ).textContent = `${data.location.name}, ${data.location.region}`;

        const weatherIcon = weatherCard.querySelector(".weather-icon");
        weatherIcon.src = data.current.condition.icon;
        weatherIcon.alt = data.current.condition.text;

        const expandedWeatherCard = document.createElement("section");
        expandedWeatherCard.id = "expanded-weather-card";
        expandedWeatherCard.className = "expanded-weather-card";
        expandedWeatherCard.innerHTML = `
            <section class="wind"></section>
            <section class="humidity"></section>
            <section class="feels-like"></section>
            <section class="uv"></section>
          `;

        weatherCard.appendChild(expandedWeatherCard);
        weatherCard.onmouseover = function () {
          weatherCard.style.transform = "scale(1.1)";
          weatherCard.style.transition = "0.5s";
          expandedWeatherCard.style.display = "block";
          expandedWeatherCard.querySelector(
            ".wind"
          ).textContent = `Wind: ${data.current.wind_kph} km/h`;
          expandedWeatherCard.querySelector(
            ".humidity"
          ).textContent = `Humidity: ${data.current.humidity}%`;
          expandedWeatherCard.querySelector(
            ".feels-like"
          ).textContent = `Feels Like: ${data.current.feelslike_c}°C`;
          expandedWeatherCard.querySelector(
            ".uv"
          ).textContent = `UV: ${data.current.uv}`;
        };

        weatherCard.onmouseout = function () {
          expandedWeatherCard.style.display = "none";
          weatherCard.style.transform = "scale(1)";
          weatherCard.style.transition = "0.5s";
        };
      } else {
        alert("Weather data could not be fetched. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    });
}
