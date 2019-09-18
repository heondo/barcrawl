class Marker {
  constructor(map, data, domElement, updateCenterCallback, closeWindows, markerExpandClickHandler) {
    this.eventClickHandler = this.eventClickHandler.bind(this)
    this.bizClickHandler = this.bizClickHandler.bind(this);
    // this.removeMarker = this.removeMarker.bind(this)
    this.closeWindows = closeWindows;
    this.updateCenterCallback = updateCenterCallback;
    this.domElement = $(domElement);
    this.data = data;
    this.map = map;
    this.type = null;
    this.marker = null;
    this.name = null;
    this.infoWindow = null;
    this.position = null;
    this.markerExpandClickHandler = markerExpandClickHandler;
  }

  renderUser = (position) => {
    console.log(position);
    const userMark = new google.maps.Marker({
      position: position,
      map: this.map,
      title: this.data.name,
      // icon: icon
    })
  }


  renderEvent = (event, index) => {
    const position = {
      lat: parseFloat(event.venue.address.latitude),
      lng: parseFloat(event.venue.address.longitude)
    }
    this.position = position;

    const icon = {
      url: "assets/images/icons8-event-64.png", // url
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    // console.log(this.data.venue.address.localized_multi_line_address_display[0])
    // console.log(position)
    this.type = "events"
    this.name = event.name.text;

    // console.log(someMarker.setMap)
    const infoWindow = new google.maps.InfoWindow({
      content: `<div>${this.name}</div>
                <div>${this.data.venue.address.localized_multi_line_address_display[0]}</div>
                <div>${this.data.venue.address.localized_multi_line_address_display[1]}</div>
                <div id="event${index}" class="event addLocation">Add location to route</div>`
    })
    this.infoWindow = infoWindow;
    this.marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: event.name.text,
      icon: icon
    });
    this.marker.addListener('click', this.eventClickHandler);
    this.marker.addListener('click', () => {
      this.closeWindows();
      infoWindow.open(this.map, this.marker)
      this.markerExpandClickHandler(this.domElement);
    });

  }

  renderBiz = (biz, index) => {
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

    const infoWindow = new google.maps.InfoWindow({
      content: `<div>${this.name}</div>
                <div id="business${index}" class="business addLocation">Add location to route</div>`
    })
    this.infoWindow = infoWindow;

    this.marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: biz.name,
      icon: icon
    })
    this.marker.addListener('click', this.eventClickHandler);
    this.marker.addListener('click', () => {
      this.closeWindows();
      infoWindow.open(this.map, this.marker)
      this.markerExpandClickHandler(this.domElement);
    });
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
