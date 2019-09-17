//data needed name, location, start date. Store description, picture, price

/* Class definition for EventBrite AJAX Handler*/
class Eventbrite {

  /*
   *
   */
  constructor(lat, lng) {
    this.key = 'YT37TJX32QTNUIJPS4NG';
    this.eventStorage = {};
    this.data = null;
    this.lat = lat;
    this.lng = lng;
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
        success: function (response) {
          this.data = response;
          console.log('eventbrite done')
          resolve(response);
        },
        error: function(response) {
          reject(response);
        }
      })
    })
  }





}
