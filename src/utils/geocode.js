const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FlZWQtc2FicmEiLCJhIjoiY2xncGt3Y3hnMDBxOTNlbWltYmEyc2xyNyJ9.aNUFCxfglP5jq1aqEwmJjw&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location!, Try another search.", undefined);
    } else {
      callback(undefined, {
        Location: body.features[0].place_name,
        Latitude: body.features[0].center[1],
        Longitude: body.features[0].center[0],
      });

      // console.log(
      //   chalk.green("Latitude: " + response.body.features[0].center[1])
      // );
      // console.log(
      //   chalk.green("Longitude: " + response.body.features[0].center[0])
      // );
    }
  });
};

module.exports = geocode;
