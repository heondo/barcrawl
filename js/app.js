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
    console.log(this.apiList.map);
    this.apiList.map.clearMarkers();
    $('.eventsContainer').empty();
    $('.businessContainer').empty();
    $('.weatherContainer').empty();
    const userMarker = new Marker(this.apiList.map.mapObj, { name: "You" }, undefined, this.apiList.map.updateLocation, this.apiList.map.closeWindows, this.apiList.map.expandClickHandler);
    userMarker.renderUser({
      lat: this.userPositionLat,
      lng: this.userPositionLong
    });
    this.apiList.map.markers.user = userMarker;
    this.initAJAX();
  }

  retrieveUserPositon(data) {
    this.userPositionLat = data.coords.latitude;
    this.userPositionLong = data.coords.longitude;
    this.initializeMap();
    this.initAJAX();
  }

  initializeMap() {
    this.apiList['map'] = new googleMap(this.userPositionLat, this.userPositionLong);
    this.apiList.map.initMap();
  }

  initAJAX() {
    // this.apiList['map'] = new googleMap(this.userPositionLat, this.userPositionLong);
    this.apiList['eventbrite'] = new Eventbrite(this.userPositionLat, this.userPositionLong);
    this.apiList['yelp'] = new Yelp(this.userPositionLat, this.userPositionLong);
    this.apiList['weather'] = new WeatherData(this.userPositionLat, this.userPositionLong);

    // this.apiList.map.initMap();
    this.apiList.weather.getWeatherData();

    this.apiList.eventbrite.retrieveData().then(data => this.apiList.map.addEvents(data.events))
                                          .catch(data => console.log(data));

    this.apiList.yelp.retrieveData().then(data => this.apiList.map.addBiz(data.businesses))
                                    .catch(data => console.log(data));

    $('.eventsContainer').on('click', '.event', this.domClickHandler);
    $('.businessContainer').on('click', '.business', this.domClickHandler);
    $('.mapContainer').on('click', '.addLocation', this.addLocationClickHandler);
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

  addLocationClickHandler = (event) => {
    console.log("add location clicked", event.currentTarget);
    let target = $(event.currentTarget);
    let clickId = target.attr('id');
    let type = '';
    if (target.hasClass("business")){
      type = "biz";
      clickId = clickId.substr(8);
    } else {
      type = "event";
      clickId = clickId.substr(5);
    }
    console.log(clickId);
    this.apiList['map'].addRouteDestination(type, clickId);
  }

}
