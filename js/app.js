class App {
  constructor() {
    this.apiList = {};
    this.date = new Date();
    this.userPositionLat = null;
    this.userPositionLong = null;
    this.retrieveUserPositon = this.retrieveUserPositon.bind(this);
    this.initApp = this.initApp.bind(this);
  }

  initApp() {
    navigator.geolocation.getCurrentPosition(this.retrieveUserPositon);
  }

  retrieveUserPositon(data) {
    this.userPositionLat = data.coords.latitude;
    this.userPositionLong = data.coords.longitude;
    this.initAJAX();
  }

  initAJAX() {
    this.apiList['map'] = new googleMap(this.userPositionLat, this.userPositionLong);
    this.apiList['eventbrite'] = new Eventbrite(this.userPositionLat, this.userPositionLong);
    this.apiList['yelp'] = new Yelp(this.userPositionLat, this.userPositionLong);
    this.apiList['weather'] = new WeatherData(this.userPositionLat, this.userPositionLong);

    this.apiList.map.initMap();
    this.apiList.weather.getWeatherData();

    this.apiList.eventbrite.retrieveData().then(data => this.apiList.map.addEvents(data.events))
                                          .catch(data => console.log(data));

    this.apiList.yelp.retrieveData().then(data => this.apiList.map.addBiz(data.businesses))
                                    .catch(data => console.log(data));
  }

  getCurrentDate() {
    this.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
  }

}
