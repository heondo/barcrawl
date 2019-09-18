//data needed name, location, start date. Store description, picture, price

/* Class definition for EventBrite AJAX Handler*/
class Eventbrite {

  /*
   *
   */
  constructor(lat, lng) {
    this.key = 'YT37TJX32QTNUIJPS4NG';
    this.eventStorage = [];
    this.data = null;
    this.lat = lat;
    this.lng = lng;
    this.domContainer = $(".eventsContainer");
    this.render = this.render.bind(this);
  }

  retrieveData() {
    return new Promise((resolve, reject) =>
    {
      let today = new Date();
      let dateInput = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 7}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      console.log(dateInput);
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
          'start_date.range_end': dateInput,
          'location.within': '10mi',
          'expand': 'venue'
        },
        success: (response) => {
          this.data = response;
          this.render();
          resolve(response);
        },
        error: (response) => {
          reject(response);
        }
      })
    })
  }

  render(){
    for (let eventIndex = 0; eventIndex < this.data.events.length; eventIndex++){
      let thisEvent = this.data.events[eventIndex];
      let newEvent = {};
      let startDateTime =  this.parseDateTime(thisEvent.start.local);
      let endDateTime = this.parseDateTime(thisEvent.end.local);
      newEvent.name = thisEvent.name.html;
      newEvent.description = thisEvent.description;
      // newEvent.times = { startDate: startDateTime[0], startTime: startDateTime[1],
      //                 endDate: endDateTime[0], endTime: endDateTime[1] };
      newEvent.address = thisEvent.venue.localized_multi_line_address_display;
      this.eventStorage.push(newEvent);
      console.log("event summary", thisEvent.summary)
      let eventDom = $("<div>", {
        id: "event"+eventIndex,
        class: "event event" + eventIndex,
        html: `<div class="event-name">${newEvent.name}</div>
              <div class="address">${thisEvent.venue.address.localized_multi_line_address_display[0]}
              <br>${thisEvent.venue.address.localized_multi_line_address_display[1]}</div>
              <div class='event-time'>${startDateTime.month}/${startDateTime.dayNum} ${startDateTime.hour}:${startDateTime.minute} ${startDateTime.ampm} - ${endDateTime.hour}:${endDateTime.minute} ${endDateTime.ampm}</div>
              <div class="event-info">Event Summary:<br>${thisEvent.summary}</div>
              <a class="event-url" href="${thisEvent.url} target=_blank">Visit Event Site</a>`});

      eventDom.css('background-image', `url('assets/images/icons8-event-64.png')`)
      this.domContainer.append(eventDom);
    }
  }

  parseDateTime(str){
    // let dateTime = str.split("T");
    // dateTime[1] = dateTime[1].substr(0, 5);
    // var hours  = parseInt(dateTime[1]);
    // if (hours > 12){
    //   hours = hours - 12;
    //   dateTime[1] = hours + dateTime[1].substr(2) + "pm";
    // } else {
    //   dateTime[1] += "am";
    // }
    // return dateTime;
    let date = new Date(str);
    // console.log(`${date.getMonth()}/${date.getDate()} `)
    let minute = date.getMinutes();
    if (!minute){
      minute = '00'
    }
    let ampm = null;
    let hour = date.getHours();
    if (hour > 12 ){
      hour -= 12;
      ampm = "PM"
    }
    else{
      ampm = "AM"
    }
    return {
      dayNum: date.getDate(),
      month: date.getMonth(),
      hour: hour,
      minute: minute,
      ampm: ampm
    }
  }


}
