class Marker {
  constructor(map, data, domElement, updateCenterCallback) {
    this.eventClickHandler = this.eventClickHandler.bind(this)
    this.bizClickHandler = this.bizClickHandler.bind(this)
    this.updateCenterCallback = updateCenterCallback;
    this.domElement = $(domElement);
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
    this.position = position;

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
        this.eventClickHandler)
  }

  renderBiz = (biz) => {
    const position = {
      lat: parseFloat(biz.coordinates.latitude),
      lng: parseFloat(biz.coordinates.longitude)
    }
    this.position = position;
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
      title: biz.name,
      icon: icon
    })
      .addListener('click',
        this.bizClickHandler)
  }

  eventClickHandler = () => {
    // should open up information about
   this.updateCenterCallback(this.position);
    // this.map.setCenter(this.position)
  }

  bizClickHandler = () => {
    this.updateCenterCallback(this.position);
  }
}
