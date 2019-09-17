class Yelp {
  constructor(userLatitude, userLongitude) {
    this.apiKey = 'Bearer a_BrDbXlVK8u3TbVbpFRC9EP6Ye_73iUJQvTRDbJBrbD_e0t9x4OqWni0XZK8hE_VLr2GLWHBfgrEDdY6jZO16i1Gq5tMTBIBczxbqU1e2P3-cOOmkTUVgNE0TiAXXYx';
    this.userLatitude = userLatitude;
    this.userLongitude = userLongitude;
    this.processData = this.processData.bind(this);
    this.businessesData = null;
    this.businessesToDisplay = null;
    this.errorProcessingData = this.errorProcessingData.bind(this);
    this.domElements = {
      businessContainer: $('.businessContainer')
    }
  }
//call the php file
//php file makes the call

  retrieveData() {
    $.ajax({
      'url': `php/yelp.php`,
      'dataType' : 'JSON',
      'headers': {
        "Authorization": 'Bearer a_BrDbXlVK8u3TbVbpFRC9EP6Ye_73iUJQvTRDbJBrbD_e0t9x4OqWni0XZK8hE_VLr2GLWHBfgrEDdY6jZO16i1Gq5tMTBIBczxbqU1e2P3-cOOmkTUVgNE0TiAXXYx',
      },
      data: {
        'term' : 'bars',
        'latitude': this.userLatitude,
        'longitude': this.userLongitude,
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
    this.displayToBusinessList();
  }
  displayToBusinessList() {
    // this.businessesToDisplay = this.businessesData.map(function(business) {
    //   return business.name
    // })
    for(let bizIndex = 0; bizIndex < this.businessesData.businesses.length; bizIndex++) {
      var businessName = this.businessesData.businesses[bizIndex].name;
      var businessRating = this.businessesData.businesses[bizIndex].rating
      var businessNameContainer = $('<div>').addClass('businessName').text(businessName);
      var businessRatingContainer = $('<div>').addClass('rating').text(businessRating);
      var businessContainer = $('<div>').addClass('business');
      businessContainer.append(businessNameContainer, businessRatingContainer);
      this.domElements.businessContainer.append(businessContainer);
    }
  }

  errorProcessingData() {
    console.log('There was an error recieving data on the yelp object.');
  }

  getData() {
    return this.businessesData;
  }
}
