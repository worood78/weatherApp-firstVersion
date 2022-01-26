function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let today = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${today}, ${hour}:${minutes}`;
}
let date = new Date();
let dayTime = document.querySelector("#date");

dayTime.innerHTML = formatDate(date);

//

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#weather-cond");
  let humidityLevel = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let city = document.querySelector("#city");
  temperatureElement.innerHTML = `${temperature}°`;
  description.innerHTML = response.data.weather[0].description;
  humidityLevel.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  city.innerHTML = response.data.name;
}

//
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  searchCity(city.value);
}
function searchCity(city) {
  let apiKey = "b9c2f1ae4e743c1d744622e272fab8ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Amsterdam");
//

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b9c2f1ae4e743c1d744622e272fab8ed";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentButton = document.querySelector("#current-lucation-button");
currentButton.addEventListener("click", getPosition);
