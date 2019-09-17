//data needed name, location, start date. Store description, picture, price

/* Class definition for EventBrite AJAX Handler*/
class Eventbrite {

  /*
   *
   */
  constructor() {
    this.key = 'YT37TJX32QTNUIJPS4NG';
    this.eventStorage = {};
  }

  retrieveData() {
    let settings = {
      url: `https://www.eventbriteapi.com/v3/events/search?
                                        location.longitude=${userPositionLong}
                                        &location.latitude=${userPositionLat}`,
      method: 'GET',
      type: 'JSON',
      headers: {
        'Authorization': `Bearer ${this.key}`
      },
      data: {
        'location.longitude': '-117.7490541',
        'location.latitude': '33.6239515',
        'categories': '103',
        'start_date.range_end': '2019-09-24T23:59:59Z',
        'location.within': '10mi'
      },
      success: function(data) {
        console.log(data);
        for(let event in data.events) {
          this.eventStorage[]
        }
      },
      error: function(data) {
        console.log(data);
      }
    };

    $.ajax(settings);
  }



}
