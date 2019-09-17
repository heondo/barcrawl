
class Marker {
  constructor(map, position, business){
    this.clickHandler = this.clickHandler.bind(this)
    this.business = business;
    this.map = map;
    this.marker = null;
    this.position = position;
  }

  render = () => {
    // var/
    this.marker = new google.maps.Marker({
                      position: this.position,
                      map: this.map,
                      name: this.business.name
                    })
                      .addListener('click',
                        this.clickHandler)
  }

  clickHandler = () => {
    // we should take in some position
    console.log(this.business.name);

  }
}
