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
    events.events.map((event) => {
      const eventMarker = new Marker(this.mapObj, event);
      this.markers.events.push(eventMarker);
      eventMarker.renderEvent(event);
    })
  }


  addBiz(businesses) {
    businesses.map((biz) => {
      const bizMarker = new Marker(this.mapObj, biz);
      this.markers.biz.push(bizMarker);
      bizMarker.renderBiz(biz);
    })
  }
  // addMarkers(businesses)
}
