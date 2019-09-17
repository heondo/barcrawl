class Yelp {
  constructor(userLatitude, userLongitude) {
    this.apiKey = 'Bearer a_BrDbXlVK8u3TbVbpFRC9EP6Ye_73iUJQvTRDbJBrbD_e0t9x4OqWni0XZK8hE_VLr2GLWHBfgrEDdY6jZO16i1Gq5tMTBIBczxbqU1e2P3-cOOmkTUVgNE0TiAXXYx';
    this.userLatitude = userLatitude;
    this.userLongitude = userLongitude;
    this.processData = this.processData.bind(this);
    this.errorProcessingData = this.errorProcessingData.bind(this);
    this.render();
  }

  render() {
    this.retrieveData(this.userLatitude, this.userLongitude);
  }

  retrieveData(latitude, longitude) {
    $.ajax({
      'url': `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`,
      'headers': {
        "Authorization" : this.apiKey
      },
      success: this.processData,
      error: this.errorProcessingData
    })
  }
  processData(data) {
    console.log(data);
  }

  errorProcessingData() {
    alert('There was an error processing your data.');
  }
}
