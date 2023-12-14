import React, { useEffect, useRef, useState } from "react";
import Events from "./components/Events/Events";
import FirstBlack from "./components/FirstBlack";
import SecondWhite from "./components/SecondWhite";
import MembersBlock from "./components/Members";
import "./Home.css";
import { handleFormChange } from "../../store";
import { connect } from "react-redux";
import WhoIsMantashovFor from "./components/WhoIsMantashovFor/WhoIsMantashovFor";
import Speakers from "./components/Speakers";
import BusinessCommunity from "./components/BusinessCommunity/BusinessCommunity";
import Presence from "./components/Presence";
import Stories from "./components/Stories/Stories";
import MobileApp from "./components/MobileApp/MobileApp";
import { useHistory } from "react-router";

function Home({ handleFormChange }) {
  const scroller = useRef();
  useEffect(() => {
    handleFormChange("headerColorBlack", false);
    // handleFormChange("headerPosFixed", false)
    handleFormChange("currentPageName", "home");
  }, []);

  useEffect(() => {
    handleScroll();
  }, []);

  const handleScroll = (e) => {
    const sections = scroller.current?.childNodes;
    const scrollPosition = window.scrollY;

    if (scrollPosition <= 56) {
      handleFormChange("headerColorBlack", true);
    } else {
      if (sections) {
        for (let section of sections) {
          if (scrollPosition <= section.offsetTop + section.offsetHeight - 50) {
            if (
              document.getElementById(section.id)?.style.background ===
              "rgb(0, 0, 0)"
            ) {
              handleFormChange("headerColorBlack", true);
            } else {
              handleFormChange("headerColorBlack", false);
            }

            break;
          }
        }
      }
    }
  };

  // const handleNavitemClicked = (e) => {
  //   e.preventDefault();
  //   const href = e.target.getAttribute("href");
  //   history.replace(href);
  //   const section = document.getElementById(href.split("#")[1]);
  //   section.scrollIntoView({ behavior: "auto" });
  //   setNavitemClicked(true);
  // };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <main ref={scroller}>
        <FirstBlack id="firstBlack" />
        <SecondWhite id="secondWhite" />
        <MembersBlock id="membersBlock" />
        <Events id="events" />
        {/* <WhoIsMantashovFor id="whoIsMantashovFor" /> */}
        <Stories id="stories" />
        <Speakers id="speakers" />
        {/* <BusinessCommunity id="businessCommunity" /> */}
        <Presence id="presence" />
        <MobileApp id="mobileApp" />
      </main>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    headerPosFixed: state.formReducer.headerPosFixed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
