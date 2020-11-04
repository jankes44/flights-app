var express = require("express");
var router = express.Router();
var path = require("path");
var fcsv = require("fast-csv");
var fs = require("fs");
var flights = require("../../resources/flights-database.json");
var iata = require("../../resources/IATA.json");
var iataTimezones = require("../../resources/iata-timezone.json");
var moment = require("moment");
var tz = require("moment-timezone");

/**
 * Convert the records to JSON using fast-csv node package
 */
const csvToJson = function () {
  let rows = [];
  fs.createReadStream(path.resolve(__dirname, "../../resources/flightdata.csv"))
    .pipe(fcsv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      iataTimezones.forEach((el) => {
        //assign timezones (from a file of IATA -> TIMEZONE) to every flight - needed to get journey time, know the difference of time, etc.
        if (row.depair === el.iata) row.deptz = el.timezone;
        if (row.destair === el.iata) row.desttz = el.timezone;
        if (row.indepartcode === el.iata) row.indeparttz = el.timezone;
      });
      rows.push(row);
    })
    .on("end", (rowsCount) => {
      let data = JSON.stringify(rows);
      fs.writeFileSync("./resources/flights-database.json", data);
      console.log("Parsed", rowsCount);
    });
};

/* 
  Formatter function - takes in array of flights, formats depart and arrival times and calculates
  the duration of the flight - taking care of timezones
*/
const formatTravelTime = async (journeys) => {
  let promise = new Promise((resolve, reject) => {
    let journeysFormatted = [];

    //format date and time then use moment js to format it to standard timestamp to perform calculations
    journeys.forEach((el) => {
      //format "out" flights
      let outDepartDate = el.outdepartdate + " ";
      let outDepartTime = el.outdeparttime;
      let outDepartDateTime = moment(
        outDepartDate.concat(outDepartTime)
      ).format("DD/MM/YYYY HH:mm:ss");

      //convert datetime to utc
      var outdepartutc = moment.tz(
        outDepartDateTime,
        "DD/MM/YYYY HH:mm:ss",
        el.deptz //timezone
      );

      let outArrivalDate = el.outarrivaldate + " ";
      let outArrivalTime = el.outarrivaltime;
      let outArrivalDateTime = moment(
        outArrivalDate.concat(outArrivalTime)
      ).format("DD/MM/YYYY HH:mm:ss");

      //convert datetime to utc
      var outarrivalutc = moment.tz(
        outArrivalDateTime,
        "DD/MM/YYYY HH:mm:ss",
        el.desttz
      );

      //check if there is return flights
      if (el.inarrivaldate !== "" && el.inarrivalcode !== "") {
        //format "in" flights
        let inDepartDate = el.indepartdate + " ";
        let inDepartTime = el.indeparttime;
        let inDepartDateTime = moment(inDepartDate.concat(inDepartTime)).format(
          "DD/MM/YYYY HH:mm:ss"
        );

        //convert datetime to utc
        var indepartutc = moment.tz(
          inDepartDateTime,
          "DD/MM/YYYY HH:mm:ss",
          el.indeparttz //timezone
        );

        let inArrivalDate = el.inarrivaldate + " ";
        let inArrivalTime = el.inarrivaltime;
        let inArrivalDateTime = moment(
          inArrivalDate.concat(inArrivalTime)
        ).format("DD/MM/YYYY HH:mm:ss");

        //convert datetime to utc
        var inarrivalutc = moment.tz(
          inArrivalDateTime,
          "DD/MM/YYYY HH:mm:ss",
          el.deptz
        );
        var induration = moment.duration(inarrivalutc.diff(indepartutc));
        var inminutes = induration.asMinutes();
        //in assign to JSON data elements
        el.injourneytime = inminutes;
        el.indepartutc = indepartutc;
        el.inarrivalutc = inarrivalutc;
      }
      //use moment JS to help format the duration to minutes
      var outduration = moment.duration(outarrivalutc.diff(outdepartutc));
      var outminutes = outduration.asMinutes();

      //out assign to JSON data elements
      el.outjourneytime = outminutes;
      el.outdepartutc = outdepartutc;
      el.outarrivalutc = outarrivalutc;

      journeysFormatted.push(el);
    });
    resolve(journeysFormatted);
  });
  let result = promise;
  return result;
};

const averageTime = async (journeys) => {
  let promise = new Promise((resolve, reject) => {
    let durationsArray = [];
    journeys.forEach((el) => durationsArray.push(el.outjourneytime));

    let sum = 0;
    let avg = 0;

    durationsArray.forEach((el) => {
      sum += el;
    });

    avg = sum / durationsArray.length;

    resolve(avg);
  });
  let result = await promise;
  return result;
};

const proportionBusinessClass = async (journeys) => {
  let promise = new Promise((resolve, reject) => {
    let businessClassCount = 0;
    journeys.forEach((el) => {
      if (el.outflightclass === "Business") businessClassCount++;
    });
    resolve(businessClassCount);
  });
  let result = await promise;
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

/* journey with formatted travel time */
router.get("/travel-time/:from/:to", function (req, res, next) {
  const from = req.params.from;
  const to = req.params.to;

  //filter flights based on depair :from and destair :to
  const journeys = flights.filter((el) => {
    return el.depair === from && el.destair === to;
  });

  //format time and return array with formatted times
  formatTravelTime(journeys)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

//get average journey time
router.get("/average-journey-time/:from/:to", function (req, res, next) {
  const from = req.params.from;
  const to = req.params.to;

  const journeys = flights.filter((el) => {
    return el.depair === from && el.destair === to;
  });

  formatTravelTime(journeys)
    .then((result) =>
      averageTime(result).then((
        resultAvg //calculate average time and respond with json object
      ) =>
        res.json({
          depair: req.params.from,
          destair: req.params.to,
          averagetime: resultAvg,
        })
      )
    )
    .catch((err) => console.log(err));
});

//get most departures departures per day
router.get("/departures-per-day/:from/:to", function (req, res, next) {
  const from = req.params.from;
  const to = req.params.to;

  const journeys = flights.filter((el) => {
    return el.depair === from && el.destair === to;
  });
  calcDeparturesPerDay;
});

//get proportion of flights which are business class
router.get("/proportion-business-class/:from/:to", function (req, res, next) {
  const from = req.params.from;
  const to = req.params.to;

  const journeys = flights.filter((el) => {
    return el.depair === from && el.destair === to;
  });

  proportionBusinessClass(journeys).then((result) => {
    const outOf = journeys.length;
    let percentage = (result * 100) / outOf;
    res.json({
      depair: req.params.from,
      destair: req.params.to,
      percentage: percentage,
    });
  });
});

//get percentage of flights that fly to :to
router.get("/percentage-of-flights/:to", function (req, res, next) {
  const to = req.params.to.toUpperCase();

  let count = 0;
  const outOf = flights.length;
  flights.forEach((el) => {
    if (el.destair === to) count++;
  });
  let percentage = (count * 100) / outOf;

  console.log(percentage);
  res.json({
    destair: req.params.to,
    percentagetotalflights: percentage,
  });
});

//get busiest day :from
router.get("/busiest-day/:from", function (req, res, next) {
  const from = req.params.from.toUpperCase();

  let arrayOfDates = [];

  const journeys = flights.filter((el) => {
    return el.depair === from;
  });

  journeys.forEach((el) => {
    const length = journeys.filter((x) => x.outdepartdate === el.outdepartdate)
      .length;
    arrayOfDates.push({ depair: from, date: el.outdepartdate, count: length });
  });

  var resultMaxNumber = Math.max.apply(
    Math,
    arrayOfDates.map(function (o) {
      return o.count;
    })
  );
  var resultObj = arrayOfDates.find(function (o) {
    return o.count === resultMaxNumber;
  });
  console.log(resultMaxNumber);
  res.json(resultObj);
});

/* GET IATA codes */
router.get("/iata", function (req, res, next) {
  res.json(iata);
});

module.exports = router;
//TODO
// let outDepartDate = el.outdepartdate + " ";
// let outDepartTime = el.outdeparttime;
// let departDateTime = moment(outDepartDate.concat(outDepartTime)).format(
//   "DD/MM/YYYY HH:mm:ss"
// );

// let outArrivalDate = el.outarrivaldate + " ";
// let outArrivalTime = el.outarrivaltime;
// let arrivalDateTime = moment(
//   outArrivalDate.concat(outArrivalTime)
// ).format("DD/MM/YYYY HH:mm:ss");

// const createIataCodes = () => {
//   let iataCodes = [];

//   flights.forEach((el) => {
//     if (!iataCodes.includes(el.depair)) iataCodes.push(el.depair);
//   });
//   let data = JSON.stringify(iataCodes);
//   fs.writeFileSync("./resources/IATA.json", data);
// };
