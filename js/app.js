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

  updateLocation(data) {
    this.apiList.map.clearMarkers();
    $('.eventsContainer').empty();
    $('.businessContainer').empty();
    this.initAJAX();
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

    $('.eventsContainer').on('click', '.event', this.domClickHandler);
    $('.businessContainer').on('click', '.business', this.domClickHandler);
  }

  domClickHandler = (event) => {
    if ($(event.target).is("a")){
      return;
    }
    let lastLetter = $(event.currentTarget).attr('id').match(/\d+/);
    if ($(event.currentTarget).hasClass('business')) {
      this.apiList.map.updateLocation({ lat: parseFloat(this.apiList.yelp.businessesData.businesses[lastLetter].coordinates.latitude),
                                        lng: parseFloat(this.apiList.yelp.businessesData.businesses[lastLetter].coordinates.longitude)});
      if ($(event.currentTarget).hasClass("expanded")){
        $(".business").removeClass("collapsed");
        $(".business").removeClass("expanded");
        return;
      }
      else{
        $(".business").removeClass("expanded");
        $(".business").addClass("collapsed")
        $(event.currentTarget).removeClass("collapsed").addClass("expanded");
      }
    } else {
      this.apiList.map.updateLocation({ lat: parseFloat(this.apiList.eventbrite.data.events[lastLetter].venue.address.latitude),
                                        lng: parseFloat(this.apiList.eventbrite.data.events[lastLetter].venue.address.longitude)});
      if ($(event.currentTarget).hasClass("expanded")) {
        $(".event").removeClass("collapsed");
        $(".event").removeClass("expanded");
        return;
      }
      else {
        $(".event").removeClass("expanded");
        $(".event").addClass("collapsed")
        $(event.currentTarget).removeClass("collapsed").addClass("expanded");
      }
    }

  }

  getCurrentDate() {
    this.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
  }
}
