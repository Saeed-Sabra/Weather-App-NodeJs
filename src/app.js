const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Saeed Sabra",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me!",
    name: "Saeed Sabra",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "If you need help, you can contact us here:",
    title: "help",
    name: "Saeed Sabra",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No Address Entered",
    });
  }

  geocode(
    req.query.address,
    (error, { Latitude, Longitude, Location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(Latitude, Longitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          Address: req.query.address,
          Location: Location,
          Forecast: data,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "No search param",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Saeed",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Saeed",
    errorMessage: "404 - Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
