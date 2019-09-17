$(document).ready(initializeApp)
var userPositionLat = null;
var userPositionLong = null;

function initializeApp() {
  navigator.geolocation.getCurrentPosition(retrieveUserPositon)
}

function retrieveUserPositon(data) {
  console.log(data);
  userPositionLat = data.coords.latitude;
  userPositionLong = data.coords.longitude;
  console.log(`The latitude is ${userPositionLat} and the longitude is ${userPositionLong}`);
  const yelpObject = new Yelp(userPositionLat, userPositionLong);
}
