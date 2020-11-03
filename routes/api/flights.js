var express = require("express");
var router = express.Router();
var path = require("path");
var fcsv = require("fast-csv");
var fs = require("fs");
var database = require("../../resources/flights-database.json");
var moment = require("moment");
const { resolve } = require("path");

/**
 * Get the records from csv
 */

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
    });
};

csvToJson();

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
        .format("HH:mm:ss");

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

  const result = database.filter((el) => {
    return el.depair === from && el.destair === to;
  });
  res.json(result);
});

router.get("/travel-time/:from/:to", function (req, res, next) {
  const from = req.params.from;
  const to = req.params.to;

  const journeys = database.filter((el) => {
    return el.depair === from && el.destair === to;
  });

  formatTravelTime(journeys)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
