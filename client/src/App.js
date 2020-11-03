import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Table from "./components/Table/Table";

export default function App() {
  const [flights, setFlights] = useState([]);
  const [avgTime, setAvgTime] = useState(null);
  const [from, setFrom] = useState("LHR");
  const [to, setTo] = useState("DXB");
  const [iata, setIata] = useState([]);

  const handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  const avgJourneyTime = () => {
    axios
      .get(
        `${
          global.BASE_URL
        }/api/flights/average-journey-time/${from.toUpperCase()}/${to.toUpperCase()}`
      )
      .then((res) => {
        console.log(res);
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
        console.log(res);
        avgJourneyTime();
        setFlights(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    //get-example-flights

    axios
      .get(`${global.BASE_URL}/api/flights/iata`)
      .then((res) => {
        console.log(res);

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
          <div className="float-left">
            <label>From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {iata
                ? iata.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))
                : null}
            </select>
          </div>

          <div className="float-left">
            <label>To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {iata
                ? iata.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <button onClick={checkFlights}>FIND FLIGHTS</button>
        </div>
        {avgTime && flights.length ? (
          <h4>
            Average journey time from {flights[0].depair} to{" "}
            {flights[0].destair} is {(avgTime / 60).toFixed(0)}h{" "}
            {(avgTime % 60).toFixed(0)}m
          </h4>
        ) : null}
        {flights ? <Table data={flights} /> : null}

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
