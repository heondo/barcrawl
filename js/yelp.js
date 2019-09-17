class Yelp {
  constructor(userLatitude, userLongitude) {
    this.apiKey = 'Bearer a_BrDbXlVK8u3TbVbpFRC9EP6Ye_73iUJQvTRDbJBrbD_e0t9x4OqWni0XZK8hE_VLr2GLWHBfgrEDdY6jZO16i1Gq5tMTBIBczxbqU1e2P3-cOOmkTUVgNE0TiAXXYx';
    this.userLatitude = userLatitude;
    this.userLongitude = userLongitude;
    this.businessesData = null;
  }

  render() {
    this.retrieveData();
  }
//call the php file
//php file makes the call

  retrieveData() {
    return new Promise((resolve, reject) =>
    {
      $.ajax({
        'url': `php/yelp.php`,
        'dataType': 'JSON',
        'headers': {
          "Authorization": 'Bearer a_BrDbXlVK8u3TbVbpFRC9EP6Ye_73iUJQvTRDbJBrbD_e0t9x4OqWni0XZK8hE_VLr2GLWHBfgrEDdY6jZO16i1Gq5tMTBIBczxbqU1e2P3-cOOmkTUVgNE0TiAXXYx',
        },
        data: {
          'term': 'bars',
          'latitude': this.userLatitude,
          'longitude': this.userLongitude,
          'radius': 16093
        },
        success: function(data) {
          this.businessesData = data;
          console.log('yelp', data);
          resolve(data);
        },
        error: function(data) {
          console.log('There was an error recieving data on the yelp object.');
          reject(data);
        }
      })
    })
  }

  getData() {
    return this.businessesData;
  }
}
