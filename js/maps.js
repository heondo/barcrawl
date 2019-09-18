class googleMap {
  constructor(lat, lng, expandClickHandler) {
    // this.clearOverLays = this.clearOverLays.bind(this);
    // this.updateLocation = this.updateLocation.bind(this),
    // this.events = events,
    // this.biz = biz,
    this.setMapOnAll = this.setMapOnAll.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
    this.lat = lat,
    this.lng = lng,
    this.mapObj = null
    this.markers = {
      events: [],
      biz: [],
      user: null,
      directions: []
    },
    this.directionsRenderer = null;
    this.waypts = [],
    this.expandClickHandler = expandClickHandler;
  }

  initMap() {
    // could render initial businesses
    const map = new google.maps.Map(document.getElementById('mapDisplay'), {
      zoom: 14,
      center: {
        lat: this.lat,
        lng: this.lng
      }
      // mapTypeId: 'terrain',
    });

    this.mapObj = map;
    this.initAutocomplete();

    const userMarker = new Marker(this.mapObj, {name: "You"}, undefined, this.updateLocation, this.closeWindows, this.expandClickHandler);
    userMarker.renderUser({
      lat: this.lat,
      lng: this.lng
    });
    this.markers.user = userMarker;
  }

  updateLocation(position) {
    this.mapObj.panTo(position);
  }

  setMapOnAll(map) {
    for (let eventMarker of this.markers.events) {
      eventMarker.marker.setMap(null);
      // marker.marker.setMap(null);
    }
    for (let bizMarker of this.markers.biz) {

      bizMarker.marker.setMap(null);
    }
    this.markers.user.marker.setMap(null);
    this.markers = {
      events: [],
      biz: [],
      user: null
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
    this.waypts = [];
    this.directionsRenderer.setMap(null);
  }

  closeWindows = () => {
    for (let eventMarker of this.markers.events) {
      eventMarker.infoWindow.close(this.map);
      // marker.marker.setMap(null);
    }
    for (let bizMarker of this.markers.biz) {
      bizMarker.infoWindow.close(this.map);
    }
  }


  addEvents(events) {
    // takes in the array data from eventbrite response and creates/renders Markers
    // on the map
    events.map((event, index) => {// add .
      const eventMarker = new Marker(this.mapObj, event, `.event${index}`, this.updateLocation, this.closeWindows, this.expandClickHandler);
      this.markers.events.push(eventMarker);
      eventMarker.renderEvent(event, index);
    });
  }


  addBiz(businesses) {
    businesses.map((biz, index) => {
      const bizMarker = new Marker(this.mapObj, biz, `.business${index}`, this.updateLocation, this.closeWindows, this.expandClickHandler);
      this.markers.biz.push(bizMarker);
      bizMarker.renderBiz(biz, index);
    })
  }
  // addMarkers(businesses)


  initAutocomplete() {
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    this.mapObj.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', () => {
      var places = searchBox.getPlaces();
      var newUserLat = places[0].geometry.location.lat();
      var newUserLong = places[0].geometry.location.lng();
      console.log(`Changed lat is ${newUserLat}, changed long is ${newUserLong}`);
      this.updateDom(newUserLat, newUserLong);

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach( (marker) => {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach( (place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: this.mapObj,
          title: place.name,
          position: place.geometry.location
        }));
        console.log(markers);

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.mapObj.fitBounds(bounds);
    });
  }
  updateDom(newLat, newLong) {
    barCrawl.userPositionLat = newLat;
    barCrawl.userPositionLong = newLong;
    this.lat = newLat;
    this.lng = newLong;
    barCrawl.updateLocation();
  }
  calculateAndDisplayRoute() {
    var directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    this.directionsRenderer.setMap(this.mapObj);
    this.directionsRenderer.setPanel(document.getElementById('directionsPanel'));
    var waypts = this.waypts;
    directionsService.route({
      origin: {lat: this.lat, lng: this.lng},
      destination: waypts.pop().location,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  addRouteDestination(type, index){
    console.log("type", type);
    this.waypts.push({location: this.markers[type][index].position, stopover: true});
    console.log (this.waypts);
  }

}
