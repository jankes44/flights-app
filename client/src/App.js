import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Table from "./components/Table/Table";
import moment from "moment";

export default function App() {
  const [flights, setFlights] = useState([]);
  const [avgTime, setAvgTime] = useState(null);
  const [busiestDay, setBusiestDay] = useState();
  const [businessPercentage, setBusinessPercentage] = useState(null);
  const [percentageFlights, setPercentageFlights] = useState(null);
  const [from, setFrom] = useState("LHR");
  const [to, setTo] = useState("DXB");
  const [iata, setIata] = useState([]);

  const handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  const busiestAirportDay = () => {
    axios
      .get(`${global.BASE_URL}/api/flights/busiest-day/${from.toUpperCase()}`)
      .then((res) => {
        console.log(res);
        setBusiestDay(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const percentageFlightsTo = () => {
    axios
      .get(
        `${
          global.BASE_URL
        }/api/flights/percentage-of-flights/${to.toUpperCase()}`
      )
      .then((res) => {
        if (res.data.percentagetotalflights % 1 !== 0) {
          setPercentageFlights(res.data.percentagetotalflights.toFixed(2));
        } else setPercentageFlights(res.data.percentagetotalflights.toFixed(0));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const proportionBusinessClass = () => {
    axios
      .get(
        `${
          global.BASE_URL
        }/api/flights/proportion-business-class/${from.toUpperCase()}/${to.toUpperCase()}`
      )
      .then((res) => {
        if (res.data.percentage % 1 !== 0) {
          setBusinessPercentage(res.data.percentage.toFixed(2));
        } else if (res.data.percentage !== null)
          setBusinessPercentage(res.data.percentage.toFixed(0));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const avgJourneyTime = () => {
    axios
      .get(
        `${
          global.BASE_URL
        }/api/flights/average-journey-time/${from.toUpperCase()}/${to.toUpperCase()}`
      )
      .then((res) => {
        setAvgTime(res.data.averagetime);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const checkFlights = () => {
    axios
      .get(
        `${
          global.BASE_URL
        }/api/flights/travel-time/${from.toUpperCase()}/${to.toUpperCase()}`
      )
      .then((res) => {
        avgJourneyTime();
        proportionBusinessClass();
        percentageFlightsTo();
        busiestAirportDay();
        setFlights(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${global.BASE_URL}/api/flights/iata`)
      .then((res) => {
        setFrom(res.data.find((el) => el === "LHR"));
        setTo(res.data.find((el) => el === "DXB"));
        setIata(res.data);
        checkFlights();
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="form">
          <div className="form-group">
            <label>From</label>
            <select
              className="form-control"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {iata
                ? iata.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))
                : null}
            </select>
          </div>

          <div>
            <label>To</label>
            <select
              className="custom-select"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {iata
                ? iata.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))
                : null}
            </select>
          </div>
        </div>
        <a className="btn btn-lg" onClick={checkFlights}>
          FIND FLIGHTS
        </a>
        {avgTime !== null && flights.length ? (
          <h4>
            1. Average journey time from {flights[0].depair} to{" "}
            {flights[0].destair} is{" "}
            {moment
              .utc(moment.duration(avgTime, "minutes").asMilliseconds())
              .format("HH:mm")}
          </h4>
        ) : null}
        {busiestDay !== null && flights.length ? (
          <h4>
            2. {busiestDay.date} has the most departures from{" "}
            {busiestDay.depair}
            <b style={{ fontSize: "1.3em" }}> - {busiestDay.count}</b>
          </h4>
        ) : null}
        {businessPercentage !== null && flights.length ? (
          <h4>
            3. <b style={{ fontSize: "1.3em" }}>{businessPercentage}%</b> of
            flights in this search are business class
          </h4>
        ) : null}
        {percentageFlights !== null ? (
          <h4>
            4. From a total set of flights{" "}
            <b style={{ fontSize: "1.3em" }}>{percentageFlights}%</b> flies to{" "}
            {to}
          </h4>
        ) : null}

        {flights.length > 0 ? (
          <Table data={flights} />
        ) : (
          <h3>Sorry, nothing was found for this search. :(</h3>
        )}

        {/* <p>carrier - departure - destination - depart date/time</p>
        {flights
          ? flights.map((el) => (
              <p>
                {el.carrier} - {el.depair} - {el.destair} - {el.outdepartdate}{" "}
                {el.outdeparttime}
              </p>
            ))
          : null} */}
      </header>
    </div>
  );
}
