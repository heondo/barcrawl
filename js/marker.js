class Marker {
  constructor(map, data) {
    this.clickHandler = this.clickHandler.bind(this)
    this.data = data;
    this.map = map;
    this.type = null;
    this.marker = null;
    this.name = null;
  }

  renderEvent = (event) => {
    // var/
    // console.log(event.venue.address)
    const position = {
      lat: parseFloat(event.venue.address.latitude),
      lng: parseFloat(event.venue.address.longitude)
    }
    const icon = {
      url: "assets/images/icons8-event-64.png", // url
      scaledSize: new google.maps.Size(35, 35), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    // console.log(position)
    this.type = "events"
    this.name = event.name.text;
    this.marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: event.name.text,
      icon: icon
    })
      .addListener('click',
        this.clickHandler)
  }

  renderBiz = (biz) => {
    const position = {
      lat: parseFloat(biz.coordinates.latitude),
      lng: parseFloat(biz.coordinates.longitude)
    }

    const icon = {
      url: "assets/images/icons8-beer-48.png", // url
      scaledSize: new google.maps.Size(35, 35), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    this.type = "business";
    this.name = biz.name;
    this.marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: biz.name
    })
      .addListener('click',
        this.clickHandler)
  }

  clickHandler = () => {
    // should open up information about
    console.log(this.name);
  }
}
