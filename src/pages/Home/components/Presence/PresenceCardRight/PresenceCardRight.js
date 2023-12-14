import React, { useContext, useEffect } from "react";
import "./PresenceCardRight.css";
import { connect } from "react-redux";
import { handleFormChange } from "../../../../../store";
import { LanguageContext } from "../../../../../App";
import { useCookies } from "react-cookie";

function PresenceCardRight({
  handleFormChange,
  moreDescPresBlock,
  moreDescPresenceCard2,
  closebottom,
  closeTwocontent,
  id,
  city,
  img1,
  img2,
  arrow,
}) {
  const translatedData = useContext(LanguageContext);

  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];
  const openRight = () => {
    // if(moreDescPresBlock || moreDescPresenceCard2) {
    //     handleFormChange("moreDescPresBlock", false)
    // } else {
    //     handleFormChange("moreDescPresBlock", true)
    // }

    if (id === "1") {
      handleFormChange("moreDescPresBlock", true);
      handleFormChange("moreDescPresenceCard2", false);
      handleFormChange("mobile1",true)
      handleFormChange("mobile2",false)
    } else {
      handleFormChange("moreDescPresenceCard2", true);
      handleFormChange("moreDescPresBlock", false);
      handleFormChange("mobile1",false)
      handleFormChange("mobile2",true)
    }
    handleFormChange("closebottom", false);
  };

  return (
    <div
      className={`presence-card-right ${moreDescPresBlock ? "height0" : ""}`}
    >
      <div
        className={`presence-card-right-desc 
             ${moreDescPresBlock ? "opacity-0" : "opacity1"} `}
      >
        {id === "2" ? (
          <img
            src={require("../../../../../images/exit-bottom-arrow.svg").default}
            alt="arrow bottom"
            className="arrow-presence-card"
          />
        ) : (
          <img
            src={require("../../../../../images/exit-right-arrow.svg").default}
            alt="arrow right"
            className="arrow-presence-card"
          />
        )}

        <p className="presence-card-right-city  color-white "
        lang={lng}>
          {
            id === "2"
              ? city
              : `${
                  translatedData.locations
                    ? translatedData.locations[0].location
                    : "Moscow, Russia"
                }`
            // "Yerevan, Armenia"
          }
        </p>
        <p className="presence-card-right-text color-white font-size-16">
          Choose the one that suits you to learn more about it
        </p>
      </div>
      <div
        className={`presence-card-right-images flex-space-between 
              ${moreDescPresBlock ? "opacity-0" : "opacity1"}`}
      >
        {id === "2" ? (
          <img
            src={img1}
            alt="first"
            className="presence-card-bottom-img1"
          />
        ) : (
          <img
            src={
              require("../../../../../images/presence-card-right-img1.svg")
                .default
            }
            alt="first"
            className="presence-card-right-img1"
          />
        )}

        {id === "2" ? (
          <img
            src={img2}
            alt="second"
            className="presence-card-bottom-img2"
          />
        ) : (
          <img
            src={
              require("../../../../../images/presence-card-right-img2.svg")
                .default
            }
            alt="second"
            className="presence-card-right-img2"
          />
        )}
      </div>
      <p
      lang={lng}
        className={`color-darker-gray font-medium-500 font-size-16 presence-card-right-more 
           
           ${moreDescPresBlock ? "opacity-0" : "opacity1"}`}
        onClick={() => openRight()}
      >
        {/* one that suits you to learn more about it.{" "} */}
        {translatedData.contactsCardDesc}
        <button className="more-btn  font-size-16">
          {/* more */}
          {translatedData.more ?? "more"}
        </button>
      </p>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    moreDescPresBlock: state.formReducer.moreDescPresBlock,
    moreDescPresenceCard2: state.formReducer.moreDescPresenceCard2,
    closebottom: state.formReducer.closebottom,
    closeTwocontent: state.formReducer.closeTwocontent,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PresenceCardRight);
