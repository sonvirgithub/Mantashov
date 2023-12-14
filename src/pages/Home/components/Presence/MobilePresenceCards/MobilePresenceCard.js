import React, { useState, useEffect, useContext } from "react";
import "./MobilePresenceCards.css";
import { connect } from "react-redux";
import { handleFormChange } from "../../../../../store";
import { LanguageContext } from "../../../../../App";
import { useCookies } from "react-cookie";

function MobilePresenceCard({
  images = [],
  moreDescPresBlock,
  handleFormChange,
  moreDescPresenceCard2,
  closebottom,
  closeTwocontent,
  mobile1,
  className="",
  value
}) {
  const translatedData = useContext(LanguageContext);
  const [largeDescription, setLargeDescription] = useState("");

  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];
  useEffect(() => {
    if (moreDescPresenceCard2) {
      setLargeDescription(
        translatedData.locations ? translatedData.locations[1].description : ""
      );
    } else {
      setLargeDescription(
        translatedData.locations ? translatedData.locations[0].description : ""
      );
    }
  }, [moreDescPresenceCard2, translatedData]);

  const closeMoreDesc = () => {
    handleFormChange(className,false)
  }
  
  return (
    <div
    className={`presence-card-size position-absolute
     ${
       value ?
           "more-desc-presence-card-mobile "
           : "more-desc-closed-mobile"
     }
    `}
  >
    <div
      className={`font-size-14 color-white large-desc-presence-card-mobile more
           ${
             !moreDescPresenceCard2 && !moreDescPresBlock
               ? "desc-opacity"
               : ""
           } 
           ${value ? "" :"large-desc-margin-top-mobile"}
          
             `}
    lang={lng}>
   
      {largeDescription}
    </div>

    <div
      className={`flex-space-between more-presence-block-imgs  
              
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
const mapStateToProps = (state,ownProps) => {
  return {
    moreDescPresBlock: state.formReducer.moreDescPresBlock,
    moreDescPresenceCard2: state.formReducer.moreDescPresenceCard2,
    closebottom: state.formReducer.closebottom,
    closeTwocontent: state.formReducer.closeTwocontent,
    mobile1:state.formReducer.mobile1,
    value: state.formReducer[ownProps.className],
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
)(MobilePresenceCard);
