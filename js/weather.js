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
    let currentWeather = `Currently: ${this.currentTemp} °F ${this.currentCondition} Today's high: ${this.forcast[0].high} Today's low: ${this.forcast[0].low}`;
    let weatherP = $("<p>").text(currentWeather);
    let weatherStrings = [];
    weatherStrings.push(currentWeather);
    this.domElements.current = weatherP;
    this.domElements.container.append(weatherP);
    for (var forcastIndex = 1; forcastIndex < this.forcast.length; forcastIndex++) {
      let forcastString = `${this.days[this.forcast[forcastIndex].date.getDay()]} ${(this.forcast[forcastIndex].date.getMonth() + 1)}-${(this.forcast[forcastIndex].date.getDate())} ${this.forcast[forcastIndex].summary} high: ${this.forcast[forcastIndex].high}° low: ${this.forcast[forcastIndex].low}`;
      weatherStrings.push(forcastString);
      let forcastP = $("<p>").text(forcastString);
      this.domElements.container.append(forcastP);
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
