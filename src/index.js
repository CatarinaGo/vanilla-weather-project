function formatDate(timestamp) {
  let today = new Date(timestamp);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = today.getDay();
  let weekDayFinal = weekDays[weekDay];
  let hours = today.getHours();
  let minutes = today.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${weekDayFinal}, ${hours}:${minutes}`;
}

function handleSubmit(event) {
  let city = document.querySelector("#userInput");
  let apiKey = "51f2d4f68f9aa7784343201bc371d158";
  let units = "metric";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;

  event.preventDefault();
  axios.get(urlApi).then(getTempCity);
}
let form = document.querySelector("#submit-form");
form.addEventListener("submit", handleSubmit);

function getTempCity(response) {
  let temp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let tempToday = document.querySelector("#tempone");
  let currentCity = document.querySelector("#current-city");
  let currentDescription = document.querySelector("#descriptionone");
  let currentWind = document.querySelector("#wind");
  let currentHumidity = document.querySelector("#humidity");
  let dateElement = document.getElementById("current-date");
  console.log(response.data);
  tempToday.innerHTML = `${temp}°C`;
  currentCity.innerHTML = `${response.data.name}`;
  currentDescription.innerHTML = `${response.data.weather[0].description}`;
  currentWind.innerHTML = `Wind: ${wind} m/s`;
  currentHumidity.innerHTML = `Humidity: ${humidity} %`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function showPosition(response) {
  let longitude = response.coords.longitude;
  let latitude = response.coords.latitude;
  let apiKey = "51f2d4f68f9aa7784343201bc371d158";
  let units = "metric";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(urlApi).then(getTempCity);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".select");
//button.addEventListener("click", getCurrentPosition);
