import React, { useEffect, useRef, useContext } from "react";
import "./PresenceCardBottom.css";
import "../PresenceCardRight/PresenceCardRight.css";
import { connect } from "react-redux";
import { handleFormChange } from "../../../../../store";
import "../LargerDescriptionOfPresenceCard/LargerDescriptionOfPresenceCard.css";
import { LanguageContext } from "../../../../../App";

function PresenceCardBottom({
  handleFormChange,
  moreDescPresBlock,
  moreDescPresenceCard2,
  closebottom,
  closeTwocontent,
}) {
  const translatedData = useContext(LanguageContext);
  const more = useRef();

  const showMoreDesc = () => {
    if (!moreDescPresBlock) {
      handleFormChange("moreDescPresenceCard2", true);
      handleFormChange("closebottom", true);
    } else {
    }

    // handleFormChange("moreDescPresBlock", true)

    if (window.innerWidth > 1024) {
      // handleFormChange("moreDescPresenceCard2",false)
    }
  };

  return (
    <div className={`presence-card-bottom `}>
      <div
        className={`presence-card-right-desc 
            ${moreDescPresenceCard2 ? "opacity-00" : "opacity11"}`}
      >
        <img
          src={require("../../../../../images/exit-bottom-arrow.svg").default}
          alt="arrow bottom"
          className="arrow-right-icon"
        />
        <p className="presence-card-right-city font-medium-500 color-white ">
          {/* USA, Los angeles */}
          {translatedData.locations
            ? translatedData.locations[1].location
            : "Los Angeles, USA"}
        </p>
        <p className="presence-card-right-text color-white font-size-16">
          Choose the one that suits you to learn more about it
        </p>
      </div>
      <div
        className={`presence-card-right-images flex-space-between 
            ${moreDescPresenceCard2 ? "opacity-00" : "opacity11"} `}
      >
        {/* {/ <div > /} */}
        <img
          src={
            require("../../../../../images/presence-card-bottom-img1.svg")
              .default
          }
          alt="first"
          className="presence-card-bottom-img1"
        />

        <img
          src={
            require("../../../../../images/presence-card-bottom-img2.svg")
              .default
          }
          alt="second"
          className="presence-card-bottom-img2"
        />
      </div>
      <p
        className={`color-darker-gray font-medium-500 font-size-16 presence-card-right-more 
            ${moreDescPresenceCard2 ? "opacity-00" : "opacity11"} `}
        onClick={() => showMoreDesc()}
      >
        {/* one that suits you to learn more about it.  */}
        {translatedData.contactsCardDesc}
        <button className="more-btn  font-size-16">
          {translatedData.more}
          {/* more */}
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
export default connect(mapStateToProps, mapDispatchToProps)(PresenceCardBottom);
