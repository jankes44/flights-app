var express = require("express");
var router = express.Router();
var path = require("path");
var fcsv = require("fast-csv");
var fs = require("fs");
var flights = require("../../resources/flights-database.json");
var iata = require("../../resources/IATA.json");
var moment = require("moment");
var tz = require("moment-timezone");
const { resolve } = require("path");

/**
 * Get the records from csv
 */

var now = moment.tz("America/Halifax");
var bar = moment.tz("Europe/Berlin");
var baz = bar.diff(now);

console.log("current time is: " + now.format());
console.log("time diff is: " + moment.duration(baz).asHours());

const csvToJson = function () {
  let rows = [];
  fs.createReadStream(path.resolve(__dirname, "../../resources/flightdata.csv"))
    .pipe(fcsv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => rows.push(row))
    .on("end", (rowsCount) => {
      let data = JSON.stringify(rows);
      fs.writeFileSync("./resources/flights-database.json", data);
      console.log("Parsed", rowsCount);
      createIataCodes();
    });
};

csvToJson();

const createIataCodes = () => {
  let iataCodes = [];
  flights.forEach((el) => {
    if (!iataCodes.includes(el.depair)) iataCodes.push(el.depair);
  });
  let data = JSON.stringify(iataCodes);
  fs.writeFileSync("./resources/IATA.json", data);
};

//c
const formatTravelTime = async (journeys) => {
  let promise = new Promise((resolve, reject) => {
    let journeysFormatted = [];

    //format date and time then use moment js to format it to standard timestamp to perform calculations
    journeys.forEach((el) => {
      let outDepartDate = el.outdepartdate + " ";
      let outDepartTime = el.outdeparttime;
      let departDateTime = moment(outDepartDate.concat(outDepartTime)).format(
        "DD/MM/YYYY HH:mm:ss"
      );

      let outArrivalDate = el.outarrivaldate + " ";
      let outArrivalTime = el.outarrivaltime;
      let arrivalDateTime = moment(
        outArrivalDate.concat(outArrivalTime)
      ).format("DD/MM/YYYY HH:mm:ss");

      //Calculate duration of a flight
      var startTime = moment(el.outdeparttime, "HH:mm:ss a");
      var endTime = moment(el.outarrivaltime, "HH:mm:ss a");
      var duration = moment
        .utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss")))
        .format("HH:mm");

      //calculate duration

      el.journeytime = duration;
      console.log(el);
      journeysFormatted.push(el);
    });
    resolve(journeysFormatted);
  });
  let result = promise;
  return result;
};

/* GET flights listing. */
router.get("/journey/:from/:to", function (req, res, next) {
  const from = req.params.from;
  const to = req.params.to;

  const result = flights.filter((el) => {
    return el.depair === from && el.destair === to;
  });
  res.json(result);
});

/* GET iata codes */
router.get("/journey/:from/:to", function (req, res, next) {
  const from = req.params.from;
  const to = req.params.to;

  const result = flights.filter((el) => {
    return el.depair === from && el.destair === to;
  });
  res.json(result);
});

/* journey with travel time */
router.get("/travel-time/:from/:to", function (req, res, next) {
  const from = req.params.from;
  const to = req.params.to;

  const journeys = flights.filter((el) => {
    return el.depair === from && el.destair === to;
  });

  formatTravelTime(journeys)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

/* GET IATA codes */
router.get("/iata", function (req, res, next) {
  res.json(iata);
});

module.exports = router;
