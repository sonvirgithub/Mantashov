import React, { useContext } from "react";
import LargerDescriptionOfPresenceCard from "./LargerDescriptionOfPresenceCard/LargerDescriptionOfPresenceCard";
import "./Presence.css";
import PresenceCardBottom from "./PresenceCardBottom/PresenceCardBottom";
import PresenceCardRight from "./PresenceCardRight/PresenceCardRight";
import { connect } from "react-redux";
import img1 from "../../../../images/presence-card-bottom-img1.svg";
import img2 from "../../../../images/presence-card-bottom-img2.svg";
import arrowbottom from "../../../../images/exit-bottom-arrow.svg";
import { LanguageContext } from "../../../../App";
import { useCookies } from "react-cookie";
import DesktopPresenceCard from "./DesktopPresenceCard/DesktopPresenceCard";
import MobilePresenceCard from "./MobilePresenceCards/MobilePresenceCard";
import "./DesktopPresenceCard/DesktopPresenceCard.css";

function Presence({ id ,mobile1}) {
  const translatedData = useContext(LanguageContext);

  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  return (
    <div
      className="presence-block background-black"
      id={id}
      style={{ background: "#000000" }}
    >
      <div className="presence-title-and-text">
        <p className="presence-block-title color-white" lang={lng}>
          {/* Presence card */}
          {translatedData.presenceTitle ?? "Presence card"}
        </p>
        <p className="presence-block-text color-white font-size-18 " lang={lng}>
          {/* Today Mantashov club has 2 branches. Choose the one located in
            Yerevan 🇦🇲 or the one in Los angelos 🇱🇷. You can leave a request to
            join! */}
          {translatedData.presenceDesc ?? "Today Mantashov club has 2 branches. Choose the one located in Yerevan 🇦🇲 or the one in Los angelos 🇱🇷. You can leave a request to join!"}
        </p>
      </div>
     
        <div className="all desktop">
 
       <DesktopPresenceCard/>
        <div
        className="flex-space-between presence-block-first-and-second-content ">
        <PresenceCardRight id="1" />

        <PresenceCardRight
          id="2"
          city={`${
            translatedData.locations
              ? translatedData.locations[1].location
              : "Los Angeles, USA"
          }`}
      
          img1={img1}
          img2={img2}
          arrow={arrowbottom}
        />
      </div>
      </div>
      <div className="all mobile">
 
  
      <div
        className="flex-space-between presence-block-first-and-second-content "
        
      >
        <div className="mobile-presence-card">
           <MobilePresenceCard className="mobile1"/> 
          
         
        <PresenceCardRight id="1" />
        </div>
      <div className="mobile-presence-card">
      <MobilePresenceCard className="mobile2"/>
        <PresenceCardRight
          id="2"
          city={`${
            translatedData.locations
              ? translatedData.locations[1].location
              : "Los Angeles, USA"
          }`}
      
          img1={img1}
          img2={img2}
          arrow={arrowbottom}
        />
        </div>
      </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    moreDescPresBlock: state.formReducer.moreDescPresBlock,
    moreDescPresenceCard2: state.formReducer.moreDescPresenceCard2,
    mobile1:state.formReducer.mobile1,
  };
};

export default connect(mapStateToProps, null)(Presence);
