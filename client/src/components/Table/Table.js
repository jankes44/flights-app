import React from "react";
import "./table.css";
import moment from "moment";

function getTimeFromMins(mins) {
  // do not include the first validation check if you want, for example,
  // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
  if (mins >= 24 * 60 || mins < 0) {
    throw new RangeError(
      "Valid input should be greater than or equal to 0 and less than 1440."
    );
  }
  var h = (mins / 60) | 0,
    m = mins % 60 | 0;
  return moment.utc().hours(h).minutes(m).format("hh:mm");
}

export default function Table(props) {
  return (
    <div>
      <div className="divTable">
        <div className="divTableHeading">
          <div className="divTableRow">
            <div className="divTableHead">Carrier</div>
            <div className="divTableHead">DepartureAir</div>
            <div className="divTableHead">Destination</div>
            <div className="divTableHead">Depart date/time</div>
            <div className="divTableHead">Arrival date/time</div>
            <div className="divTableHead">Flight Duration</div>
          </div>
        </div>

        <div className="divTableBody">
          {props.data
            ? props.data.map((el) => (
                <div className="divTableRow" key={el.id}>
                  <div className="divTableCell">{el.carrier}</div>
                  <div className="divTableCell">{el.depair}</div>
                  <div className="divTableCell">{el.destair}</div>
                  <div className="divTableCell">
                    {moment(el.departutc).format("HH:mm:ss DD/MM/YYYY")}
                  </div>
                  <div className="divTableCell">
                    {moment(
                      el.outarrivaltime.concat(` ${el.outarrivaldate}`)
                    ).format("HH:mm:ss DD/MM/YYYY")}
                    {/* {moment(el.arrivalutc).format("HH:mm:ss DD/MM/YYYY")} */}
                  </div>
                  <div className="divTableCell">
                    {getTimeFromMins(el.journeytime)}
                    {/* {(el.journeytime / 60).toFixed(0)}:{el.journeytime % 60} */}
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <p>&nbsp;</p>
    </div>
  );
}
