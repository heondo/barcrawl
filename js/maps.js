function initMap(/*I COULD TAKE IN A LIST OF YELP BREWERY BUSINESSES AND MAP THE TOP FIVE OR SOMETHING*/) {
  const map = new google.maps.Map(document.getElementById('mapDisplay'), {
    zoom: 14,
    center: {
      lat: 33.637,
      lng: -117.739 },
    mapTypeId: 'terrain'
  });

  const marker1 = new Marker(map, {
    lat: 33.637,
    lng: -117.739
  }, {name: "whatsup"})
  marker1.render()

  const marker2 = new Marker(map, {
    lat: 33.652,
    lng: -117.721
  }, {name: "idk"})
  marker2.render()

  const marker3 = new Marker(map, {
    lat: 33.637,
    lng: -117.712
  }, {name: "something"})
  marker3.render()

}

class Marker {
  constructor(map, position, business){
    this.business = business;
    this.map = map;
    this.marker = null;
    this.position = position;
  }

  render() {
    // var/
    this.marker = new google.maps.Marker({
                      position: this.position,
                      map: this.map,
                      name: this.business.name
                    })
                      .addListener('click', ()=> {

                    })
  }
}


// class Map {
//   constructor(position) {
//     this.initMap = this.initMap.bind(document)
//     this.position = {
//       lat: 33.637,
//       lng: -117.739
//     };
//     this.api_key = "AIzaSyCWq6apxh7IJs8njuJgCEJf5QPenKjrCYc";
//   }

//   initMap(lat, lng){
//     const s = document.createElement("script");
//     document.head.append(s);
//     let map;
//     s.addEventListener("load", () => {
//       map = new google.maps.Map(document.getElementById('mapDisplay'), {
//         zoom: 14,
//         center: {
//           lat: lat,
//           lng: lng
//         },
//         mapTypeId: 'terrain'
//       })
//     });
//     s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWq6apxh7IJs8njuJgCEJf5QPenKjrCYc"
//   }

// }


// class Map {
//   constructor(position) {
//     // this.initMap = this.initMap.bind(this);
//     this.position = {
//       lat: 33.637,
//       lng: -117.739
//     // POSITION};
//   }
//     this.map = null;
//   }
//   // generateMap(){
//   //   console.log(this.position.lat, this.position.lng)
//   //   let map = new google.maps.Map(document.getElementById('mapDisplay'), {
//   //     center: {
//   //       lat: this.position.lat,
//   //       lng: this.position.lng
//   //     },
//   //     zoom: 8
//   //   });
//   //   console.log(map)
//   // }

//   initMap() {
//     // let s = $("<script>");
//     // s.on("load", () => {
//     //   this.map = new google.maps.Map(document.getElementById('mapDisplay'), {
//     //     center: {
//     //       lat: this.position.lat,
//     //       lng: this.position.lng
//     //     },
//     //     zoom: 8
//     //   });
//     //   s.attr("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWq6apxh7IJs8njuJgCEJf5QPenKjrCYc");
//     // });
//     // // s.attr("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWq6apxh7IJs8njuJgCEJf5QPenKjrCYc");
//     // $("body").append(s)
//     // $("<script>")
//     var map = new google.maps.Map(document.getElementById('mapDisplay'), {
//       center: {
//         lat: 33.637,
//         lng: -117.739
//        },
//       zoom: 8
//     });
//     // console.log(map)
//   }
// }
