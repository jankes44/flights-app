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
  const [percentageFlightsDest, setPercentageFlightsDest] = useState("DXB");
  const [busiestAirportObj, setBusiestAirportObj] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [from, setFrom] = useState("LHR");
  const [to, setTo] = useState("DXB");
  const [iata, setIata] = useState([]);

  const handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  const busiestAirport = async () => {
    let result = await axios.get(
      `${global.BASE_URL}/api/flights/busiest-airport`
    );
    return result;
  };

  const busiestAirportDay = async () => {
    let result = await axios.get(
      `${global.BASE_URL}/api/flights/busiest-day/${from.toUpperCase()}`
    );
    return result;
  };

  const percentageFlightsTo = async () => {
    let result = await axios.get(
      `${global.BASE_URL}/api/flights/percentage-of-flights/${to.toUpperCase()}`
    );
    return result;
  };

  const proportionBusinessClass = async () => {
    let result = await axios.get(
      `${
        global.BASE_URL
      }/api/flights/proportion-business-class/${from.toUpperCase()}/${to.toUpperCase()}`
    );
    return result;
  };

  const avgJourneyTime = async () => {
    let result = await axios.get(
      `${
        global.BASE_URL
      }/api/flights/average-journey-time/${from.toUpperCase()}/${to.toUpperCase()}`
    );

    return result;
  };

  const checkFlights = async () => {
    let result = await axios.get(
      `${
        global.BASE_URL
      }/api/flights/travel-time/${from.toUpperCase()}/${to.toUpperCase()}`
    );
    return result;
  };

  const getIata = async () => {
    let result = await axios.get(`${global.BASE_URL}/api/flights/iata`);

    return result;
  };

  const callAll = () => {
    setFlights([]);
    setAvgTime(null);
    setBusiestDay();
    setBusinessPercentage(null);
    setPercentageFlights(null);
    setBusiestAirportObj();
    setButtonDisabled(true);

    checkFlights().then((resFlights) => {
      setFlights(resFlights.data);

      avgJourneyTime().then((resAvg) => {
        setAvgTime(resAvg.data.averagetime);
        busiestAirportDay().then((resBusyDay) => {
          setBusiestDay(resBusyDay.data);

          proportionBusinessClass().then((resBusClass) => {
            if (resBusClass.data.percentage % 1 !== 0) {
              setBusinessPercentage(resBusClass.data.percentage.toFixed(2));
            } else if (resBusClass.data.percentage !== null)
              setBusinessPercentage(resBusClass.data.percentage.toFixed(0));

            percentageFlightsTo().then((resPercFlightsTo) => {
              if (resPercFlightsTo.data.percentagetotalflights % 1 !== 0) {
                setPercentageFlights(
                  resPercFlightsTo.data.percentagetotalflights.toFixed(2)
                );
              } else
                setPercentageFlights(
                  resPercFlightsTo.data.percentagetotalflights.toFixed(0)
                );
              setPercentageFlightsDest(resPercFlightsTo.data.destair);

              busiestAirport().then((resBusAir) => {
                setBusiestAirportObj(resBusAir.data);
                setButtonDisabled(false);
              });
            });
          });
        });
      });
    });
  };

  useEffect(() => {
    getIata().then((resIata) => {
      setIata(resIata.data);
      callAll();
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
        <button
          className="btn btn-lg"
          disabled={buttonDisabled}
          onClick={callAll}
        >
          {buttonDisabled ? "LOADING" : "FIND FLIGHTS"}
        </button>
        {avgTime !== null && flights.length ? (
          <h4>
            1. Average journey time from {flights[0].depair} to{" "}
            {flights[0].destair} is{" "}
            {moment
              .utc(moment.duration(avgTime, "minutes").asMilliseconds())
              .format("HH:mm")}
          </h4>
        ) : (
          <h4>1. Loading...</h4>
        )}
        {busiestDay && flights.length ? (
          <h4>
            2. {busiestDay.date} has the most departures from{" "}
            {busiestDay.depair}
            <b style={{ fontSize: "1.3em" }}> - {busiestDay.count}</b>
          </h4>
        ) : (
          <h4>2. Loading...</h4>
        )}
        {businessPercentage !== null && flights.length ? (
          <h4>
            3. <b style={{ fontSize: "1.3em" }}>{businessPercentage}%</b> of
            flights in this search are business class
          </h4>
        ) : (
          <h4>3. Loading...</h4>
        )}
        {percentageFlights !== null ? (
          <h4>
            4. From a total set of flights{" "}
            <b style={{ fontSize: "1.3em" }}>{percentageFlights}%</b> flies to{" "}
            {percentageFlightsDest}
          </h4>
        ) : (
          <h4>4. Loading...</h4>
        )}
        {busiestAirportObj ? (
          <h4>
            5. Busiest airport from a total set is{" "}
            <b style={{ fontSize: "1.3em" }}>{busiestAirportObj.depair}</b> with
            a total of{" "}
            <b style={{ fontSize: "1.3em" }}>{busiestAirportObj.count}</b>{" "}
            flights
          </h4>
        ) : (
          <h4>5. Loading...</h4>
        )}

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
