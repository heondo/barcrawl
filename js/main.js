let userPositionLat = null;
let userPositionLong = null;

navigator.geolocation.getCurrentPosition(retrieveUserPositon);
$(document).ready(initializeApp);

function retrieveUserPositon(data) {
  userPositionLat = data.coords.latitude;
  userPositionLong = data.coords.longitude;
  console.log(`The latitude is ${userPositionLat} and the longitude is ${userPositionLong}`);
  const yelpObject = new Yelp(userPositionLat, userPositionLong);
  const map = new googleMap(userPositionLat, userPositionLong);
  map.initMap();
  map.addEvents(eventBriteData);
  // console.log(yelpObject.businessesData)
  // map.addBiz(yelpObject.businessesData)
  initializeWeather();
}

function initializeApp() {

  const map = new googleMap(userPositionLat, userPositionLong);
  const eventbrite = new Eventbrite(userPositionLat, userPositionLong);
  const yelp = new Yelp(userPositionLat, userPositionLong);
  const weather = new WeatherData(userPositionLat, userPositionLong);

  eventbrite.retrieveData()
            .then(data => {console.log(data)})
            .catch(error => {console.log(error)});

  map.initMap();
  map.addEvents(eventBriteData);
  weather.getWeatherData();

}
