import React from "react";
import "./table.css";

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
                    {el.outdepartdate} - {el.outdeparttime}
                  </div>
                  <div className="divTableCell">{el.journeytime}h</div>
                </div>
              ))
            : null}
        </div>
      </div>
      <p>&nbsp;</p>
    </div>
  );
}
