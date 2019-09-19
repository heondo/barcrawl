class Yelp {
  /**
 * parameters that get passed in when yelp class is instantiated
 * class for yelp api
 * @param latitude, longitude
 * @return - none
 *
 */
  constructor(userLatitude, userLongitude) {
    this.apiKey = 'Bearer a_BrDbXlVK8u3TbVbpFRC9EP6Ye_73iUJQvTRDbJBrbD_e0t9x4OqWni0XZK8hE_VLr2GLWHBfgrEDdY6jZO16i1Gq5tMTBIBczxbqU1e2P3-cOOmkTUVgNE0TiAXXYx';
    this.userLatitude = userLatitude;
    this.userLongitude = userLongitude;
    this.businessesData = null;
    this.businessesToDisplay = null;
    this.errorProcessingData = this.errorProcessingData.bind(this);
    this.domElements = {
      businessContainer: $('.businessContainer')
    }
  }
  /**
 * contains ajax call for yelp api
 * uses php file for proxy server to bypass CORS
 * @param none
 * @return - none
 *
 */
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
        success: (data) => {
          this.businessesData = data;
          console.log('yelp', data);
          this.displayToBusinessList();
          resolve(data);
        },
        error: (data) => {
          console.log('There was an error recieving data on the yelp object.');
          reject(data);
        }
      })
    })
  }
    /**
 * stores ajax response object
 * @param response data from ajax call
 * @return - none
 *
 */
  processData(data) {
    this.businessesData = data;
    this.displayToBusinessList();
  }
/**
* converts data to be able to be rendered to dom
* @param none
* @return - none
*
*/
  displayToBusinessList() {
    for(let bizIndex = 0; bizIndex < this.businessesData.businesses.length; bizIndex++) {
      let business = this.businessesData.businesses[bizIndex];
      // join category titles by commas, display
      let businessCats = ""
      business.categories.map((cat) => {
        businessCats += cat.title + "<br>";
      });
      let businessInfo = $("<div>", {
                          class: "business-info",
                          html: `
                          <div class=rating-count>reviews: ${business.review_count}</div>
                          <div class="address">
                          ${business.location.display_address[0]}<br>
                          ${business.location.display_address[1]}<br>
                          </div>
                          <div class="categories">
                          ${businessCats}
                          </div>
                          <a href=${business.url} target="_blank" >Visit Yelp<a>`
                          })
      let businessName = business.name;
      let businessRating = business.rating
      let businessNameContainer = $('<div>').addClass('businessName').text(businessName);
      let businessRatingContainer = $('<div>').addClass('rating').css('background-image', `url('assets/images/ratings/${businessRating}.png')`);
      let businessContainer = $('<div>').addClass(`business business${bizIndex}`).css('background-image', `url('assets/images/icons8-beer-48.png')`).attr("id", "business"+bizIndex);
      businessContainer.append(businessNameContainer, businessRatingContainer, businessInfo);
      this.domElements.businessContainer.append(businessContainer);
    }
  }
/**
* Lets app class retrieve data
* @param none
* @return - response object
*
*/
  getData() {
    return this.businessesData;
  }
}
