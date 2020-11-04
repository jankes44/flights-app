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
  var h = mins / 60,
    m = mins % 60;
  return moment.utc().hours(h).minutes(m).format("hh:mm");
}
/* ATTENTION */
/* ATTENTION */
/* ATTENTION */
/* ATTENTION */
/* ATTENTION */
/* ATTENTION */
/* ATTENTION */
/* Thank You :) I know this div table is probably not something "incredible" but I didn't want to use
any packages in making this table. If it matters I have experience with react-bootstrap-table-next and all it's
advanced features. Thank you for attention
*/
/* ATTENTION */
/* ATTENTION */
/* ATTENTION */
/* ATTENTION */
/* ATTENTION */
/* ATTENTION */
/* ATTENTION */
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
            <div className="divTableHead">Flight duration</div>
            <div className="divTableHead">Out flight class</div>
            <div className="divTableHead">ReturnAir</div>
            <div className="divTableHead">Rtrn depart date/time</div>
            <div className="divTableHead">Rtrn arrival date/time</div>
            <div className="divTableHead">Rtrn flight duration</div>
            <div className="divTableHead">Rtrn flight class</div>
          </div>
        </div>

        <div className="divTableBody">
          {props.data ? (
            props.data.map((el) => {
              var outdur = moment.duration(el.outjourneytime, "minutes");
              var outhours = Math.floor(outdur.asHours());
              var outmins = Math.floor(outdur.asMinutes()) - outhours * 60;

              var outresult = outhours + ":" + outmins;

              var indur = moment.duration(el.injourneytime, "minutes");
              var inhours = Math.floor(indur.asHours());
              var inmins = Math.floor(indur.asMinutes()) - inhours * 60;

              var inresult = inhours + ":" + inmins;
              return (
                <div className="divTableRow" key={el.id}>
                  <div className="divTableCell">{el.carrier}</div>
                  <div className="divTableCell">{el.depair}</div>
                  <div className="divTableCell">{el.destair}</div>
                  <div className="divTableCell">
                    {moment(el.outdepartutc).format("HH:mm:ss DD/MM/YYYY")}
                  </div>
                  <div className="divTableCell">
                    {moment(
                      el.outarrivaltime.concat(` ${el.outarrivaldate}`)
                    ).format("HH:mm:ss DD/MM/YYYY")}
                  </div>
                  <div className="divTableCell">{outresult}</div>
                  <div className="divTableCell">{el.outflightclass}</div>
                  {el.indepartcode ? (
                    <div className="divTableCell">{el.indepartcode}</div>
                  ) : (
                    <div className="divTableCell">Return Unavailable</div>
                  )}
                  {el.indepartcode ? (
                    <div className="divTableCell">
                      {moment(
                        el.indeparttime.concat(` ${el.indepartdate}`)
                      ).format("HH:mm:ss DD/MM/YYYY")}
                    </div>
                  ) : null}
                  {el.indepartcode ? (
                    <div className="divTableCell">
                      {" "}
                      {moment(
                        el.inarrivaltime.concat(` ${el.inarrivaldate}`)
                      ).format("HH:mm:ss DD/MM/YYYY")}
                    </div>
                  ) : null}
                  {el.indepartcode ? (
                    <div className="divTableCell">{inresult}</div>
                  ) : null}
                  {el.indepartcode ? (
                    <div className="divTableCell">{el.inflightclass}</div>
                  ) : null}
                </div>
              );
            })
          ) : (
            <div className="divTableCell">
              Sorry, nothing was found for this search.
            </div>
          )}
        </div>
      </div>
      <p>&nbsp;</p>
    </div>
  );
}
