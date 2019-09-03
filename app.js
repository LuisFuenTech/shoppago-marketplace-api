//Dependencies
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;

//Routes
const { apiRoutes } = require("./api/index");

//Settings
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "shoppago", "build")));

//Setting Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setting Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-Auth-Token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Expose-Headers", "Authorization, X-Auth-Token");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

//Redirect to HTTPS
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

app.use("/api", apiRoutes);

//Serving the end points that enable the react app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "shoppago", "build", "index.html"));
});

module.exports = app;
