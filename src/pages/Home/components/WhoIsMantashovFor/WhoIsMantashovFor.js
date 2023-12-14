import React, { useContext, useEffect, useState } from "react";
import ScrollingItem from "./components/ScrollingItem";
import "./whoIsMantashovFor.css";
import { LanguageContext } from "../../../../App";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

function WhoIsMantashovFor({ id, data }) {
  const translatedData = useContext(LanguageContext);

  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  return (
    <div
      className="mantashov-for-page-container background-black"
      id={id}
      style={{ background: "#000000" }}
    >
      <div className="mantashov-for-page-content">
        <div>
          <p className="who-is-header color-white " lang={lng}>
            {/* Who is Mantashov for */}
            {/* For whom Mantashov */}
            {translatedData.whoIs}
          </p>
          <p className="who-is-description " lang={lng}>
            {/* Mantashov Entrepreneurs Union prioritises the education and
            continuous progress. Within the union, 100 events are organized
            annually on various topics, during which issues related to business,
            community and other social problems are discussed.{" "} */}
            {translatedData.whoIsDesc}
          </p>
        </div>
        <ScrollingItem data={data} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state.formReducer.data1,
  };
};

export default connect(mapStateToProps, null)(WhoIsMantashovFor);
