//data needed name, location, start date. Store description, picture, price

/* Class definition for EventBrite AJAX Handler*/
class Eventbrite {

  /*
   *
   */
  constructor(lat, lng) {
    this.key = 'YT37TJX32QTNUIJPS4NG';
    this.eventStorage = [];
    this.data = eventBriteData["events"];
    this.lat = lat;
    this.lng = lng;
    this.domContainer = $(".eventContainer");
    this.render = this.render.bind(this);
  }

  retrieveData() {
    return new Promise((resolve, reject) =>
    {
      $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer YT37TJX32QTNUIJPS4NG'
        },
        data: {
          'location.longitude': `${this.lng}`,
          'location.latitude': `${this.lat}`,
          'categories': '103',
          'start_date.range_end': '2019-09-24T23:59:59Z',
          'location.within': '10mi',
          'expand': 'venue'
        },
        success: (response) => {
          this.data = response;
          this.render();
          resolve(response)
        },
        error: function(response) {
          reject(response);
        }
      })
    })
  }

  render(){
    for (let eventIndex = 0; eventIndex < this.data.length; eventIndex++){
      let thisEvent = this.data[eventIndex];
      let newEvent = {};
      let startDateTime =  parseDateTime(thisEvent.start.local);
      let endDateTime = parseDateTime(thisEvent.end.local);
      newEvent.name = thisEvent.name.text;
      newEvent.description = thisEvent.description;
      newEvent.times = { startDate: startDateTime[0], startTime: startDateTime[1],
                      endDate: endDateTime[0], endTime: endDateTime[1] };
      newEvent.address = thisEvent.venue.localized_multi_line_address_display;
      this.eventStorage.push(newEvent);
      let eventDom = $("<p>", {class: "event" + eventIndex, text: thisEvent.name});
      this.domContainer.append(eventDom);
    }
  }

  parseDateTime(str){
    let dateTime = str.split("T");
    dateTime[1] = dateTime[1].substr(0, 5);
    var hours  = parseInt(dateTime[1]);
    if (hours > 12){
      hours = hours - 12;
      dateTime[1] = hours + dateTime[1].substr(2) + "pm";
    } else {
      dateTime[1] += "am";
    }
    return dateTime;
  }


}
