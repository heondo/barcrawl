class googleMap {
  constructor(lat, lng) {
    // this.updateLocation = this.updateLocation.bind(this),
    // this.events = events,
    // this.biz = biz,
    this.lat = lat,
    this.lng = lng,
    this.mapObj = null
    this.markers = {
      events: [],
      biz: []
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
  }

  updateLocation(lat, lng, biz, events) {
    this.mapObj.setCenter({ lat: 50, lng: 100 })
  }

  addEvents(events) {
    // console.log(events)
    events.events.map((event) => {
      const eventMarker = new Marker(this.mapObj, event);
      this.markers.events.push(eventMarker);
      eventMarker.renderEvents(event);
    })
  }


  addBiz() {
    // for (var i of [.1, .2, .3]) {
    //   var marker = new Marker(this.mapObj, { lat: this.lat + i, lng: this.lng - i }, { name: "name" });
    //   marker.renderBiz();
    // }
  }
  // addMarkers(businesses)
}
