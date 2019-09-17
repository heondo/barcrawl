class Map {
  constructor(position) {
    this.position = {
      lat: 33.637336,
      lng: -117.739905
    // POSITION};
  }
    this.map = null;
  }
  generateMap(){
    let map = new google.maps.Map($(".mapDisplay"), {
      center: {
        lat: this.position.lat,
        lon: this.position.lon
      },
      zoom: 8
    });
    console.log()
  }
}
