var darkSkyApi = "10645085591c29ce58fa6f682ac0ae69";

class WeatherData {
  constructor(lat, lng) {
    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.coord = { "lat": lat, "lng": lng };
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
    var currentWeather = "Currently: " + this.currentTemp + "deg " + this.currentCondition + " Today's high: " + this.forcast[0].high + " Today's low: " + this.forcast[0].low;
    var weatherP = $("<p>").text(currentWeather);
    var weatherStrings = [];
    weatherStrings.push(currentWeather);
    this.domElements.current = weatherP;
    this.domElements.container.append(weatherP);
    for (var forcastIndex = 1; forcastIndex < this.forcast.length; forcastIndex++) {
      var forcastString = this.days[this.forcast[forcastIndex].date.getDay()] + " " + (this.forcast[forcastIndex].date.getMonth() + 1) + "-" + (this.forcast[forcastIndex].date.getDate()) + " " + this.forcast[forcastIndex].summary + " high: " + this.forcast[forcastIndex].high + " low: " + this.forcast[forcastIndex].low;
      weatherStrings.push(forcastString);
      var forcastP = $("<p>").text(forcastString);
      this.domElements.container.append(forcastP);
    }
  }
  getWeatherData() {
    if (this.currentDate) {
      return;
    }
    var ajaxConfigObject = {
      dataType: "json",
      url: " https://api.darksky.net/forecast/" + darkSkyApi + "/" + this.coord.lat + "," + this.coord.lng,
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
    this.currentTemp = data.currently.temperature;
    this.currentCondition = data.currently.summary;
    this.currentIcon = data.currently.icon;
    var eachDaysWeather = data.daily.data;
    for (var dayIndex = 0; dayIndex < eachDaysWeather.length - 1; dayIndex++) {
      var forcastDay = {};
      forcastDay["date"] = this.createNewDate(eachDaysWeather[dayIndex].time);
      forcastDay["high"] = eachDaysWeather[dayIndex].temperatureHigh;
      forcastDay["low"] = eachDaysWeather[dayIndex].temperatureLow;
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
  createNewDate(linuxTime) {
    return new Date(linuxTime * 1000);
  }
}
