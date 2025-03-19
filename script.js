// localStorage.removeItem("weatherData");
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

var localData = localStorage.getItem("weatherData");

console.log("Data has been loaded successfully from local storage:\n", localData);
if (localData) {
  localData = JSON.parse(localData);
  displayWeatherCard(localData);
} else {
  console.log("No data found in local storage");
}

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("search-bar").value;
  const key = "f527ddffd52e46f286372143250703";
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.current) {
        const weatherData = {
          location: `${data.location.name}, ${data.location.region}`,
          temperature: `${data.current.temp_c}°C`,
          description: data.current.condition.text,
          wind_kph: data.current.wind_kph,
          humidity: data.current.humidity,
          feelslike_c: data.current.feelslike_c,
          uv: data.current.uv,
          icon: data.current.condition.icon,
        };

        displayWeatherCard(weatherData);

        localStorage.setItem("weatherData", JSON.stringify(weatherData));
        
        console.log("Data Stored Successfully:", weatherData);
      } else {
        console.error("Weather data could not be fetched. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function displayWeatherCard(weatherData) {
  const weatherContainer = document.querySelector(".weather-container");
  const weatherCard = document.createElement("section");
  weatherCard.id = "weather-card";
  weatherCard.className = "weather-card";
  weatherCard.innerHTML = `
    <img class="weather-icon" src="${weatherData.icon}" alt="${weatherData.description}">
    <section class="temperature">${weatherData.temperature}</section>
    <section class="description">${weatherData.description}</section>
    <section class="location">${weatherData.location}</section>
    <section class="expanded-weather-card" style="display:none;">
      <section class="wind">Wind: ${weatherData.wind_kph} km/h</section>
      <section class="humidity">Humidity: ${weatherData.humidity}%</section>
      <section class="feels-like">Feels Like: ${weatherData.feelslike_c}°C</section>
      <section class="uv">UV: ${weatherData.uv}</section>
    </section>
  `;
  
  weatherContainer.appendChild(weatherCard);

  const expandedWeatherCard = weatherCard.querySelector(".expanded-weather-card");

  weatherCard.addEventListener("mouseover", () => {
    weatherCard.style.transform = "scale(1.3)";
    weatherCard.style.transition = "0.5s";
    expandedWeatherCard.style.display = "block";
  });

  weatherCard.addEventListener("mouseout", () => {
    weatherCard.style.transform = "scale(1)";
    weatherCard.style.transition = "0.5s";
    expandedWeatherCard.style.display = "none";
  });
}
