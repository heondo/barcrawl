class googleMap {
  constructor(lat, lng){
    // this.updateLocation = this.updateLocation.bind(this),
    // this.events = events,
    // this.biz = biz,
    this.lat = lat,
    this.lng = lng,
    this.mapObj = null
  }

  initMap() {
    // could render initial businesses
    const map = new google.maps.Map(document.getElementById('mapDisplay'), {
      zoom: 14,
      center: {
        lat: this.lat,
        lng: this.lng
      },
      // mapTypeId: 'terrain',
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }]
        }
      ]
    });
    this.mapObj = map;
  }

  updateLocation(lat, lng, biz, events){
    this.mapObj.setCenter({lat: 50, lng: 100})
  }

  addEvents(){
    for( var i of [.1, .2, .3] ){
      var marker = new Marker(this.mapObj, {lat: this.lat+i, lng: this.lng-i}, {name: "name"}, "events");
      marker.render();
    }
  }
  // addMarkers(businesses)
}



class Marker {
  constructor(map, position, business){
    this.clickHandler = this.clickHandler.bind(this)
    this.type = type;
    this.business = business;
    this.map = map;
    this.marker = null;
    this.position = position;
  }

  renderEvents = () => {
    // var/
    this.marker = new google.maps.Marker({
                      position: this.position,
                      map: this.map,
                      name: this.business.name
                    })
                      .addListener('click',
                        this.clickHandler)
  }

  renderBiz = () => {
    this.marker = new google.maps.Marker({
                      position: this.position,
                      map: this.map,
                      name: this.business.name
                    })
                      .addListener('click',
                        this.clickHandler)
  }
  clickHandler = () => {
    // should open up information about
    console.log(this.business.name);
  }
}
