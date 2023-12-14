import React, { useState, useEffect, useContext } from "react";
import "./DesktopPresenceCard.css";
import { connect } from "react-redux";
import { handleFormChange } from "../../../../../store";
import { LanguageContext } from "../../../../../App";
import { useCookies } from "react-cookie";

function DesktopPresenceCard({
  images = [],
  moreDescPresBlock,
  handleFormChange,
  moreDescPresenceCard2,
  closebottom,
  closeTwocontent,
}) {
    const translatedData = useContext(LanguageContext);
    const [largeDescription, setLargeDescription] = useState("");
  
    const [cookies] = useCookies();
    var userLang = navigator.language || navigator.userLanguage;
    const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];
  
    useEffect(() => {
      if (moreDescPresenceCard2) {
        setLargeDescription(
          translatedData.locations ? translatedData.locations[1].description 
          : 
          "At present, the Mantashov Union of Workers has three branches in the USSR, Los Angeles, the Russian Federation, Moscow and Krasnodar."
          
        );
      } else {
        setLargeDescription(
          translatedData.locations ? translatedData.locations[0].description :    "At present, the Mantashov Union of Workers has three branches in the USSR, Los Angeles, the Russian Federation, Moscow and Krasnodar."
          
        );
      }
    }, [moreDescPresenceCard2, translatedData]);

  const closeMoreDesc = () => {
    if (moreDescPresenceCard2) {
      handleFormChange("closeTwocontent", true);
    } else {
      handleFormChange("closeTwocontent", false);
    }

    handleFormChange("moreDescPresBlock", false);

    handleFormChange("moreDescPresenceCard2", false);

    if (window.innerWidth > 1024) {
      handleFormChange("closebottom", false);
    }
  };

  return (
    <div className={`desktop-presence-card
    ${
        moreDescPresenceCard2
          ? `more-desc-presence-card2-desktop`
          : moreDescPresBlock
          ? "more-desc-presence-card-desktop  "
          : closeTwocontent
          ? "more-desc-presence-closed-card2-desktop"
          : 
            "more-desc-closed-desktop position-absolute"
      }
     `} >
    <div
        className={`font-size-14 color-white large-desc-presence-card 
             ${
               !moreDescPresenceCard2 && !moreDescPresBlock
                 ? "desc-opacity"
                 : ""
             } 
             ${
               moreDescPresenceCard2
                 ? "desc-right"
                 : moreDescPresBlock
                 ? ""
                 : closeTwocontent
                 ? "desc-right"
                 : ""
             }
             ${
               moreDescPresenceCard2
                 ? `desc-pos`
                 : moreDescPresBlock
                 ? ""
                 : closeTwocontent
                 ? "large-desc-margin-top"
                 : "large-desc-margin-top"
             }
               `}
      lang={lng}>
          <span className="more">{largeDescription}</span>
        
      </div>

      <div
        className={`flex-space-between more-presence-block-imgs  
                 ${
                   moreDescPresenceCard2
                     ? `more-presence-block-imgs-margin-top`
                     : ""
                 }
             `}
      >
        <img
          src={
            require("../../../../../images/presence-card-right-img1.svg")
              .default
          }
          alt="first"
          className="more-presence-card-img1 more-presence-card-img-padding"
        />
        <img
          src={
            require("../../../../../images/presence-card-right-img2.svg")
              .default
          }
          alt="second"
          className="more-presence-card-img2 more-presence-card-img-padding"
        />
        <img
          src={
            require("../../../../../images/more-presence-card-img3.svg").default
          }
          alt="first"
          className="more-presence-card-img3 more-presence-card-img-padding"
        />
        <img
          src={
            require("../../../../../images/more-presence-card-img4.svg").default
          }
          alt="second"
          className="more-presence-card-img4 "
        />
      </div>
      <div
        className="close-icon-more-desc-presence-block cursor-pointer"
        onClick={() => closeMoreDesc()}
      >
        <img
          src={
            require("../../../../../images/close-icon-more-desc-presence-block.svg")
              .default
          }
          className="close-img-more-desc-block"
          alt="second"
        />
      </div>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopPresenceCard);
