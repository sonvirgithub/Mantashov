import React, { useContext } from "react";
import "./BusinessCommunity.css";
import ReportBlock from "./components/ReportBlock";
import { LanguageContext } from "../../../../App";
import { useCookies } from "react-cookie";

function BusinessCommunity({ id }) {
  const translatedData = useContext(LanguageContext);

  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const data = [
    {
      id: 1,
      count: "650 млн. р",
      text: "средний оборот резидента в год",
    },
    {
      id: 2,
      count: "5%",
      text: "резидентов имеют 30+ млн.р. чистой прибыли",
    },
    {
      id: 3,
      count: "40%",
      text: "резидентов имеют 1-5 млн.р. чистой прибыли",
    },
    {
      id: 4,
      count: "650 млн. р",
      text: "средний оборот резидента в год",
    },
    {
      id: 5,
      count: "5%",
      text: "резидентов имеют 30+ млн.р. чистой прибыли",
    },
    {
      id: 6,
      count: "40%",
      text: "резидентов имеют 1-5 млн.р. чистой прибыли",
    },
    {
      id: 7,
      count: "650 млн. р",
      text: "средний оборот резидента в год",
    },
    {
      id: 8,
      count: "5%",
      text: "резидентов имеют 30+ млн.р. чистой прибыли",
    },
    {
      id: 9,
      count: "40%",
      text: "резидентов имеют 1-5 млн.р. чистой прибыли",
    },
  ];

  return (
    <div className="business-community-page-container" id={id}>
      <div className="residents-text-container">
        <p className="business-comm-block-header">
          <span
            className="business-comm-residents-header color-black"
            lang={lng}
          >
            {/* Business community residents */}
            {translatedData.residentsTitle}
          </span>{" "}
          <span className="residents-count" lang={lng}>
            {/* 650 million */}
            {translatedData.residentsRevenue}
          </span>{" "}
          <span
            className="business-comm-residents-text  color-black"
            lang={lng}
          >
            {/* We have created a whole ecosystem for entrepreneurs, which includes
            networking, business education, corporate excursions, meetings with
            a mentor, investment club and joint travel. */}
            {translatedData.residentsDesc}
          </span>
        </p>
      </div>
      <div className="report-container">
        {data?.map((item) => (
          <div key={item.id} className="report-block-container">
            <ReportBlock count={item.count} text={item.text} id={item.id} />
          </div>
        ))}
      </div>
      <div className="who-is-residents-text-container">
        <p className="who-is-residents-text" lang={lng}>
          {/* Business community residents are market leaders with an average
          business turnover of RUB 650 million per year. No business school can
          meet the needs of today's entrepreneurs. The best tool for development
          is live communication and exchange of experience between people who
          are in business and experts in their field. */}
          {translatedData.residentsFooterDesc}
        </p>
      </div>
      {/* <div className="white-seperator"></div> */}
    </div>
  );
}

export default BusinessCommunity;
