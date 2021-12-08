let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let formatDate = `${day}, ${month} ${date}, ${hour}:${minutes}`;
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${formatDate}`;

function handleClick(event) {
  event.preventDefault();
  let input = document.querySelector("#user-input");
  let apiKey = "ff769fda7e31b5b213b488e026c99310";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getTemp);
}
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ff769fda7e31b5b213b488e026c99310";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getTemp);
}

function getTemp(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  let tempElement = document.querySelector("#current-temp");
  let minElement = document.querySelector("#min-temp");
  let maxElement = document.querySelector("#max-temp");
  let city = document.querySelector("#city");
  let userCity = response.data.name;
  tempElement.innerHTML = temp;
  minElement.innerHTML = min;
  maxElement.innerHTML = max;
  city.innerHTML = userCity;
}
let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", handleClick);

let currentLocationButton = document.querySelector("#user-location");
currentLocationButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(handlePosition)
);
