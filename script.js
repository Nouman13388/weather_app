fetch("cities.json")
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
      } else {
        alert("Weather data could not be fetched. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    });
}