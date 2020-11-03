import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Table from "./components/Table/Table";

export default function App() {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [iata, setIata] = useState([]);

  const handleChange = (event) => {
    this.setState({ value: event.target.value });
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
        setFlights(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    //get-example-flights
    axios
      .get(`${global.BASE_URL}/api/flights/travel-time/MAN/DXB`)
      .then((res) => {
        console.log(res);
        setFlights(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(`${global.BASE_URL}/api/flights/iata`)
      .then((res) => {
        console.log(res);
        setIata(res.data);
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
