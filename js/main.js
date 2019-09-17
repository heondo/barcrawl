$(document).ready(initializeApp)
let userPositionLat = null;
let userPositionLong = null;

function initializeApp() {
  navigator.geolocation.getCurrentPosition(retrieveUserPositon)
}

function retrieveUserPositon(data) {
  console.log(data);
  userPositionLat = data.coords.latitude;
  userPositionLong = data.coords.longitude;
  console.log(`The latitude is ${userPositionLat} and the longitude is ${userPositionLong}`);
  const yelpObject = new Yelp(userPositionLat, userPositionLong);
  const map = new googleMap(userPositionLat, userPositionLong);
  map.render();
  initializeWeather();
}

function initializeWeather(){
  const weather = new WeatherData(userPositionLat, userPositionLong);
  weather.getWeatherData();
  // initFirstMap(userPositionLat, userPositionLong, undefined);
}
