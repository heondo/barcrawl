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
      forcast1: null,
      forcast2: null,
      forcast3: null,
      forcast4: null,
      forcast5: null
    }
    this.getWeatherDataSuccess = this.getWeatherDataSuccess.bind(this);
  }
  render() {
    let currentWeatherContainer = $("<div>", {class: "currentWeatherContainer"});
    let currentWeatherHeader = $("<p>",{class: "currentWeatherHeader", text: `Currently ${this.currentTemp}°`});
    let currentWeatherIcon = $("<div>", {class: "currentWeatherIcon"}).css("background-image", `url("images/${this.currentIcon}.png)`);
    let todayHighLow = $("<p>",{class: "todayHighLow", text: `${this.forcast[0].high} ${this.forcast[0].low}`});
    currentWeatherContainer.append(currentWeatherHeader, currentWeatherIcon, todayHighLow);
    this.domElements.current = currentWeatherContainer;
    this.domElements.container.append(currentWeatherContainer);
    for (var forcastIndex = 1; forcastIndex < this.forcast.length; forcastIndex++) {
      let forcastWeatherContainer = $("<div>", { class: `forcast${forcastIndex}WeatherContainer` });
      let forcastWeatherHeader = $("<p>", { class: `forcast${forcastIndex}WeatherHeader`, text: this.days[this.forcast[forcastIndex].date.getDay()] });
      let forcastWeatherIcon = $("<div>", { class: `forcast${forcastIndex}WeatherIcon`}).css("background-image", `url("images/${this.forcast[forcastIndex].icon}.png")`);
      let forcastHighLow = $("<p>", {class: `forcast${forcastIndex}HighLow`, text: `${this.forcast[forcastIndex].low} ${this.forcast[forcastIndex].high}`});
      forcastWeatherContainer.append(forcastWeatherHeader, forcastWeatherIcon, forcastHighLow);
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
