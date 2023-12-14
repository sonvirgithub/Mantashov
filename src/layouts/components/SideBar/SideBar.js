import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./SideBar.css";
import {
  setSidebarOpen,
  setSidebarClose,
  setSideBarClosed,
  handleFormChange,
} from "../../../store";
import { useHistory } from "react-router";
import ContactsFirstBlock from "../../../components/Contacts/ContactsFirstBlock";
import ContactsSecondBlock from "../../../components/Contacts/ContactsSecondBlock";
import SelectLanguage from "../../../components/SelectLanguage";
import { LanguageContext } from "../../../App";
import { useCookies } from "react-cookie";

function SideBar({
  sideBarOpen,
  sideBarClose,
  setSidebarClose,
  className,
  position,
  setSideBarClosed,
  handleFormChange,
  joinOpen,
  barOpen,
}) {
  // const history = useHistory();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const translatedData = useContext(LanguageContext);

  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const languages = [
    {
      lang: "en",
      name: "En",
    },
    {
      lang: "am",
      name: "Հայ",
    },
    {
      lang: "ru",
      name: "Ру",
    },
  ];
  useEffect(() => {
    const newWidth = windowWidth;
    setWindowWidth(newWidth);
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    setWindowWidth(window.innerWidth);
  };
  // const navigation = () => {};

  const handleClose = () => {
    window.pageYOffset = position;
    setSidebarClose();
    document.body.classList.remove("sideBar-opened");
  };

  const sidebarClosed = () => {
    document.body.classList.remove("sideBar-opened");
    setSideBarClosed();
    // window.location.reload();
  };

  const joinPageOpen = () => {
    setSidebarClose();
    handleFormChange("joinOpen", true);
  };

  return (
    <div
      className={
        sideBarOpen
          ? "sidebar background-black "
          : sideBarClose
          ? "sidebar-closed background-black "
          : "sideBar"
        // `bar-page ${barOpen ? "bar-open": "bar-close"}`
      }
    >
      <img
        src={require("../../../images/close-sideBar.svg").default}
        alt="close-sideBar"
        className={`close-sideBar cursor-pointer ${className}`}
        onClick={handleClose}
      />
      <div className="join-and-navlink">
        <div className="page-name-list-and-join">
          <ul className="all-pages-list  size-and-height" lang={lng}>
            <li className="page-name-li">
              <NavLink
                activeClassName="activeclass"
                className="color-white"
                to="/pages/NewsRoom"
                // onClick={() => navigation()}
                onClick={() => sidebarClosed()}
                // onClick={()=>setSideBarClosed()} sidebarn aranc animacia pakelu function a
              >
                {" "}
                {/* Newsroom{" "} */}
                {translatedData.newsRoom ?? "Newsroom"}
              </NavLink>
            </li>
            <li className="page-name-li">
              {" "}
              <NavLink
                activeClassName="activeclass"
                className="color-white"
                to="/pages/Events"
                onClick={() => sidebarClosed()}
              >
                {" "}
                {/* Events */}
                {translatedData.events ?? "Events"} 
              </NavLink>
            </li>
            <li className="page-name-li">
              <NavLink
                activeClassName="activeclass"
                className="color-white"
                to="/pages/Members"
                onClick={() => sidebarClosed()}
              >
                {" "}
                {/* Members{" "} */}
                {translatedData.members ?? "Members"}
              </NavLink>
            </li>
            <li className="">
              {" "}
              <NavLink
                activeClassName="activeclass"
                className="color-white"
                to="/pages/Contacts"
                onClick={() => sidebarClosed()}
              >
                {" "}
                {/* Contacts{" "} */}
                {translatedData.contacts ?? "Contacts"} 
              </NavLink>
            </li>
            <li className="contact-li">
              <ContactsFirstBlock />
            </li>
          </ul>
        </div>
        <div className="join-block">
          <div
            className="join-btn cblue join-font-size  "
            lang={lng}
            // to="/pages/Join"
            // activeClassName="activeclass"
            onClick={() => joinPageOpen()}
          >
            {/* Join */}
            {translatedData.join ?? "Join"}
          </div>
          <ContactsSecondBlock />
          <div className="language-cont menu-lengauge" lang={lng}>
            <SelectLanguage
              languages={languages}
              selected="En"
              className="sidebar-language-container"
              ulClassName="sidebar-ul"
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    sideBarOpen: state.sideBarReducer.sideBarOpen,
    sideBarClose: state.sideBarReducer.sideBarClose,
    position: state.formReducer.position,
    joinOpen: state.formReducer.joinOpen,
    barOpen: state.formReducer.barOpen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSidebarOpen: () => dispatch(setSidebarOpen()),
    setSidebarClose: () => dispatch(setSidebarClose()),
    setSideBarClosed: () => dispatch(setSideBarClosed()),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
