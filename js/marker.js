class Marker {
  constructor(map, data) {
    this.clickHandler = this.clickHandler.bind(this)
    this.data = data;
    this.map = map;
    this.type = null;
    this.marker = null;
    this.name = null;
  }

  renderEvents = (event) => {
    // var/
    // console.log(event.venue.address)
    const position = {
      lat: parseFloat(event.venue.address.latitude),
      lng: parseFloat(event.venue.address.longitude)
    }
    console.log(position)
    this.type = "events"
    this.name = event.name.text;
    this.marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: event.name.text,
      styles: [

      ]
    })
      .addListener('click',
        this.clickHandler)
  }

  renderBiz = () => {
    this.type = "business"
    this.marker = new google.maps.Marker({
      position: this.position,
      map: this.map,
      name: this.data.name
    })
      .addListener('click',
        this.clickHandler)
  }
  clickHandler = () => {
    // should open up information about
    console.log(this.data.name);
  }
}
