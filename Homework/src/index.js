function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
// this is how to obtain the entered locaton with current weather info
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.getElementById("temperature").textContent = temperature;
  document.getElementById("city").textContent = response.data.name;
  document.getElementById("humidity").textContent =
    response.data.main.humidity + "%";
  document.getElementById("wind").textContent =
    Math.round(response.data.wind.speed) + " km/h";
  document.getElementById("description").textContent =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "1af6f0ea9fa74d2791d157ee7e52e1ee"; // Replace with your OpenWeatherMap API key
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {
    searchLocation(position);
  });
}

function searchLocation(position) {
  let apiKey = "1af6f0ea9fa74d2791d157ee7e52e1ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let dateElement = document.getElementById("date");
let currentTime = new Date();
dateElement.textContent = formatDate(currentTime);

let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInput = document.getElementById("city-input");
  searchCity(cityInput.value);
});

let currentLocationButton = document.getElementById("current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London"); // this is the default city to display
