$(document).ready(initializeApp)
let userPositionLat = null;
let userPositionLong = null;


const eventbrite = new Eventbrite();

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
  map.initMap();
  map.addEvents(eventBriteData);
  initializeWeather();
}

function initializeWeather(){
  var weather = new WeatherData(userPositionLat, userPositionLong);
  weather.getWeatherData();
  // initFirstMap(userPositionLat, userPositionLong, undefined);
}
