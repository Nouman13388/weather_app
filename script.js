function getWeather() {
    const city = document.getElementById('search-bar').value;
    const key = 'f527ddffd52e46f286372143250703';
    const days = 1;
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&days=${days}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.current) {
                document.getElementById('temperature').textContent = `${data.current.temp_c}°C`;
                document.getElementById('description').textContent = data.current.condition.text;
                document.getElementById('location').textContent = `${data.location.name}, ${data.location.region}`;
                const weatherIcon = document.getElementById('weather-icon');
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