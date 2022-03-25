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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDayFinal = weekDays[day];
  return weekDayFinal;
}

function handleSubmit(event) {
  let city = document.querySelector("#userInput");
  let apiKey = "51f2d4f68f9aa7784343201bc371d158";
  let units = "metric";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;

  event.preventDefault();
  axios.get(urlApi).then(getTempCity);
}

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
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;
  console.log(response.data);
  tempToday.innerHTML = `Currently ${temp}°C`;
  currentCity.innerHTML = `${response.data.name}`;
  currentDescription.innerHTML = `${response.data.weather[0].description}`;
  currentWind.innerHTML = `Wind: ${wind} m/s`;
  currentHumidity.innerHTML = `Humidity: ${humidity} %`;
  dateElement.innerHTML = `Last updated on ${formatDate(
    response.data.dt * 1000
  )}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "51f2d4f68f9aa7784343201bc371d158";
  let units = "metric";
  let urlApiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(urlApiForecast);
  axios.get(urlApiForecast).then(displayForecast);
}

function showPosition(response) {
  let longitude = response.coords.longitude;
  let latitude = response.coords.latitude;
  let apiKey = "51f2d4f68f9aa7784343201bc371d158";
  let units = "metric";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(urlApi).then(getTempCity);
}
//function getCurrentPosition() {
//  navigator.geolocation.getCurrentPosition(showPosition);
//}

//let button = document.querySelector(".select");
//button.addEventListener("click", getCurrentPosition);

function changeTempFarh(event) {
  event.preventDefault();
  let tempfirst = document.querySelector("#tempone");
  let ftemp = Math.round((celsiusTemp * 9) / 5 + 32);

  tempfirst.innerHTML = `${ftemp}°F`;
}
function changeTempCel(event) {
  event.preventDefault();
  let tempfirst = document.querySelector("#tempone");
  let celsius = Math.round(celsiusTemp);
  tempfirst.innerHTML = `${celsius}°C`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="card text-center">
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" width="35" height="35" id="icontwo"/>
                <div class="card-body">
                  <h5 class="card-title" id="temptwo"> 
                    <div class="weather-forecast-temp">
                      <span class="weather-forecast-temp-max">${Math.round(
                        forecastDay.temp.max
                      )}°</span>
                      <span class="weather-forecast-temp-min">${Math.round(
                        forecastDay.temp.min
                      )}°</span>
                    </div></h5>
                  <p class="card-text weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</p>
                  <p class="card-text  weather-forecast-description">${
                    forecastDay.weather[0].description
                  }
                  </p>
                </div>
              </div>`;
    }
    forecastElement.innerHTML = forecastHTML;
  });
}
let form = document.querySelector("#submit-form");
form.addEventListener("submit", handleSubmit);
let celsiusTemp = null;
let changetempF = document.querySelector("#change-temp-one-F");
let changetempC = document.querySelector("#change-temp-one-C");
changetempF.addEventListener("click", changeTempFarh);
changetempC.addEventListener("click", changeTempCel);
