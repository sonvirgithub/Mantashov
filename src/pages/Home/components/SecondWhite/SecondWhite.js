import React, { useContext } from "react";
import "./SecondWhite.css";
import { LanguageContext } from "../../../../App";
import { useCookies } from "react-cookie";

function SecondWhite({ id }) {
  const translatedData = useContext(LanguageContext);
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  return (
    <div className="second-white" id={id}>
      {/* <div className="second-white-component"> */}
      <div>
        <p className="second-white-component-first-content " lang={lng}>
          {/* BUSINESS club for entrepreneurs who want not just to strengthen their
          professional quality, but to improve the quality of life */}
          {translatedData.aboutTitle ?? "BUSINESS club for entrepreneurs who want not just to strengthen their professional quality, but to improve the quality of life"}
        </p>
        <p
          className="second-white-component-second-content font-size-21"
          lang={lng}
        >
          {/* business community residents are market leaders with an average
          business turnover of rub 650 million per year. No business school can
          meet the needs of today's entrepreneurs. the best tool for development
          is live communication and exchange of experience between people who
          are engaged in business and are experts in their field. */}
          {translatedData.aboutDesc ?? "business community residents are market leaders with an average business turnover of rub 650 million per year. No business school can meet the needs of today's entrepreneurs. the best tool for development is live communication and exchange of experience between people who are engaged in business and are experts in their field."}
          
        </p>
        </div>
      {/* </div> */}
    </div>
  );
}

export default SecondWhite;
