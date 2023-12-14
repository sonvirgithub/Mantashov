import React from "react";
import "./Speaker.css";
import empty from "../../../images/empty.jpg";
import { useCookies } from "react-cookie";
function Speaker({ cardData }) {
  // /images/${page}/${id}/:name

  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  return (
    <div className="card-speaker">
      <img
        // src={cardData.image ?? empty}
        src={require("../../../images/speakers/speaker1.jpeg")}

        className="img-speaker"
        alt="speaker"
      />
      <div className="card-speaker-notific-and-icon">
        <img
          src={require("../../../images/icon-card-speaker-notific.svg").default}
          alt="card-speaker"
          className="icon-speaker"
        />
        <div className="card-speaker-notific">
          <p
            className="card-sp-desc color-white card-speaker-desc-pointers"
            lang={lng}
          >
            {/* Julia Hoffman */}
            {cardData.fullName}
          </p>
          <p
            className="card-sp-desc color-white card-speaker-desc-pointers"
            lang={lng}
          >
            {/* ZCTC Comapny */}
            {cardData.organization}
          </p>
          <p
            className="card-sp-desc color-orange card-speaker-desc-pointers font-medium-500"
            lang={lng}
          >
            Exclusive performance
          </p>
        </div>
      </div>
    </div>
  );
}

export default Speaker;
