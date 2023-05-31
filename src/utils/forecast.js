const request = require("request");
const forecast = (Latitude, Longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=42d051af75d7165c3adfa46782752deb&query=" +
    decodeURIComponent(Latitude) +
    "," +
    decodeURIComponent(Longitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to wether Service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out." +
          "It is feel like " +
          body.current.feelslike +
          " degrees out." +
          "The humidity is " +
          body.current.humidity +
          " %."
      );
    }
  });
};

module.exports = forecast;
