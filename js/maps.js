class googleMap {
  constructor(lat, lng) {
    // this.clearOverLays = this.clearOverLays.bind(this);
    // this.updateLocation = this.updateLocation.bind(this),
    // this.events = events,
    // this.biz = biz,
    this.setMapOnAll = this.setMapOnAll.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.updateLocation = this.updateLocation.bind(this)
    this.lat = lat,
    this.lng = lng,
    this.mapObj = null
    this.markers = {
      events: [],
      biz: [],
      user: null
    }
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

    const userMarker = new Marker(this.mapObj, {name: "You"}, undefined, this.updateLocation, this.closeWindows);
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

    this.markers = {
      events: [],
      biz: []
    }
  }

  clearMarkers() {
    this.markers = {
      events: [],
      biz: []
    }
    this.setMapOnAll(null);
  }

  closeWindows = () => {
    for (let eventMarker of this.markers.events) {
      console.log(eventMarker)
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
      const eventMarker = new Marker(this.mapObj, event, `.event${index}`, this.updateLocation, this.closeWindows);
      this.markers.events.push(eventMarker);
      eventMarker.renderEvent(event);
    });
  }


  addBiz(businesses) {
    businesses.map((biz, index) => {
      const bizMarker = new Marker(this.mapObj, biz, `.business${index}`, this.updateLocation, this.closeWindows);
      this.markers.biz.push(bizMarker);
      bizMarker.renderBiz(biz);
    })
  }
  // addMarkers(businesses)
}
