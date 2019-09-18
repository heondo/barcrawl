const darkSkyApi = "10645085591c29ce58fa6f682ac0ae69";

/* Class WeatherData takes in user's latitude and longitude coordinates
*
*/
class WeatherData {
  constructor(lat, lng, date) {
    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.coord = { lat, lng };
    this.date = date;
    this.currentDate = null;
    this.currentTemp = null;
    this.currentCondition = null;
    this.currentIcon = null;
    this.forcast = [];
    this.domElements = {
      container: $(".weatherContainer"),
      current: null,
      day1: null,
      day2: null,
      day3: null,
      day4: null,
      day5: null
    }
    this.getWeatherDataSuccess = this.getWeatherDataSuccess.bind(this);
  }
  render() {
    // let currentWeatherContainer = $("<div>", { sclass: "currentWeatherContainer" }).css("background-image", `url("assets/images/weather/${this.currentIcon}.png")`);
    // let currentWeatherHeader = $("<div>", { class: "currentWeatherHeader", text: this.days[this.forcast[forcastIndex].date.getDay()] });
    // let currentWeatherIcon = $("<div>", { class: "currentWeatherIcon weatherIcon" });
    // let todayHighLow = $("<div>", { class: "todayHighLow", html: `${this.forcast[0].high} / ${this.forcast[0].low}&#176;F` });
    // currentWeatherContainer.append(currentWeatherHeader, todayHighLow);
    // this.domElements.current = currentWeatherContainer;
    // this.domElements.container.append(currentWeatherContainer);
    for (var forcastIndex = 0; forcastIndex < this.forcast.length; forcastIndex++) {
      let forcastWeatherContainer = $("<div>", { class: `forcast${forcastIndex}WeatherContainer` }).css("background-image", `url("assets/images/weather/${this.forcast[forcastIndex].icon}.png")`);
      let forcastWeatherHeader = $("<div>", { class: `forcast${forcastIndex} WeatherHeader`, text: this.days[this.forcast[forcastIndex].date.getDay()] });
      //let forcastWeatherIcon = $("<div>", { class: `forcast${forcastIndex}WeatherIcon weatherIcon` }).css("background-image", `url("assets/images/weather/${this.forcast[forcastIndex].icon}.png")`);
      let forcastHighLow = $("<div>", { class: `forcast${forcastIndex} WeatherHeader weather_box_text`, html: `${this.forcast[forcastIndex].high}/${this.forcast[forcastIndex].low}&#176;F`});
      forcastWeatherContainer.append(forcastWeatherHeader, forcastHighLow);
      this.domElements["forcast" + forcastIndex] = forcastWeatherContainer;
      this.domElements.container.append(forcastWeatherContainer);
    }
  }
  getWeatherData() {
    let ajaxConfigObject = {
      dataType: "json",
      url: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyApi + "/" + this.coord.lat + "," + this.coord.lng,
      method: "get",
      data: {

        exclude: "minutely"
      }
    }
    $.ajax(ajaxConfigObject).done(this.getWeatherDataSuccess).fail(this.getWeatherDataError).always(this.getWeatherDataAlways);
  }
  getWeatherDataSuccess(data) {
    console.log(data);
    this.currentDate = this.createNewDate(data.currently.time);
    this.currentTemp = parseInt(data.currently.temperature);
    this.currentCondition = data.currently.summary;
    this.currentIcon = data.currently.icon;
    let eachDaysWeather = data.daily.data;
    for (var dayIndex = 0; dayIndex < eachDaysWeather.length - 1; dayIndex++) {
      let forcastDay = {};
      forcastDay["date"] = this.createNewDate(eachDaysWeather[dayIndex].time);
      forcastDay["high"] = parseInt(eachDaysWeather[dayIndex].temperatureHigh);
      forcastDay["low"] = parseInt(eachDaysWeather[dayIndex].temperatureLow);
      forcastDay["icon"] = eachDaysWeather[dayIndex].icon;
      forcastDay["summary"] = eachDaysWeather[dayIndex].summary;
      this.forcast.push(forcastDay);
    }
    this.render();
  }
  getWeatherDataError() {
    console.log("There was an error getting weather data");
  }
  getWeatherDataAlways() {
    console.log("Get weather data complete");
  }
  getNewWeather(lat, lng){
    this.coord = { lat, lng };
    this.getWeatherData();
  }
  createNewDate(linuxTime) {
    return new Date(linuxTime * 1000);
  }
}
