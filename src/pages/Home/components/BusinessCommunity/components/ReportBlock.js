import React from "react";
import "./ReportBlock.css";

function ReportData({ count, text, id }) {
  return (
    <>
      <div className="report-count-and-text">
        <p className="count-in-report font-medium-500 font-size-21 color-white mln-report">
          {count}
        </p>
        <p className="text-in-report font-medium-500 font-size-18 text-report">
          {text}
        </p>
      </div>
      <div className="report-action-container">
        <img
          alt=""
          src={require("../../../../../images/report-action.svg").default}
          className="points-report"
        />
      </div>
    </>
  );
}

export default ReportData;
