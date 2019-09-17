class Yelp {
  constructor(userLatitude, userLongitude) {
    this.apiKey = 'Bearer a_BrDbXlVK8u3TbVbpFRC9EP6Ye_73iUJQvTRDbJBrbD_e0t9x4OqWni0XZK8hE_VLr2GLWHBfgrEDdY6jZO16i1Gq5tMTBIBczxbqU1e2P3-cOOmkTUVgNE0TiAXXYx';
    this.userLatitude = userLatitude;
    this.userLongitude = userLongitude;
    this.processData = this.processData.bind(this);
    this.businessesData = null;
    this.errorProcessingData = this.errorProcessingData.bind(this);
    this.render();
  }

  render() {
    this.retrieveData(this.userLatitude, this.userLongitude);
  }
//call the php file
//php file makes the call

  retrieveData(latitude, longitude) {
    $.ajax({
      'url': `php/yelp.php`,
      'dataType' : 'JSON',
      'headers': {
        "Authorization": 'Bearer a_BrDbXlVK8u3TbVbpFRC9EP6Ye_73iUJQvTRDbJBrbD_e0t9x4OqWni0XZK8hE_VLr2GLWHBfgrEDdY6jZO16i1Gq5tMTBIBczxbqU1e2P3-cOOmkTUVgNE0TiAXXYx',
      },
      data: {
        'term' : 'bars',
        'latitude': latitude,
        'longitude': longitude,
        'radius': 16093
      },
      success: this.processData,
      error: this.errorProcessingData
    })
  }
  processData(data) {
    this.businessesData = data;
    console.log(data);
    console.log('Yelp Data has been recieved');
  }

  errorProcessingData() {
    console.log('There was an error recieving data on the yelp object.');
  }

  getData() {
    return this.businessesData;
  }
}
