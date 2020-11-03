var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var flightsRouter = require("./routes/api/flights");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(function (req, res, next) {
  res.setTimeout(180000, function () {
    console.log("Request has timed out.");
    res.send(408);
  });

  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/flights", flightsRouter);

module.exports = app;
