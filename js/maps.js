class googleMap {
  constructor(lat, lng){
    this.lat = lat,
    this.lng = lng
    this.mapObj = null;
  }

  render() {
    const map = new google.maps.Map(document.getElementById('mapDisplay'), {
      zoom: 14,
      center: {
        lat: this.lat,
        lng: this.lng
      },
      mapTypeId: 'terrain'
    });
    this.mapObj = map;
  }

  // addMarkers(businesses)
}



class Marker {
  constructor(map, position, business, type){
    this.clickHandler = this.clickHandler.bind(this)
    this.type = type;
    this.business = business;
    this.map = map;
    this.marker = null;
    this.position = position;
  }

  render = () => {
    // var/
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
