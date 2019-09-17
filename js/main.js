let userPositionLat = null;
let userPositionLong = null;

$(document).ready(initApp);

function initApp() {
  navigator.geolocation.getCurrentPosition(retrieveUserPositon);
}

function retrieveUserPositon(data) {
  userPositionLat = data.coords.latitude;
  userPositionLong = data.coords.longitude;
  console.log(userPositionLat, userPositionLong);
  initAJAX();
}

function initAJAX() {

  const map = new googleMap(userPositionLat, userPositionLong);
  const eventbrite = new Eventbrite(userPositionLat, userPositionLong);
  const yelp = new Yelp(userPositionLat, userPositionLong);
  const weather = new WeatherData(userPositionLat, userPositionLong);

  map.initMap();
  weather.getWeatherData();

  eventbrite.retrieveData().then(data => map.addEvents(data.events))
                           .catch(data => console.log(data));

  yelp.retrieveData().then(data => map.addBiz(data.businesses))
                     .catch(data => console.log(data));


}
