import React, { useContext } from "react";
import "./footer.css";
import { handleFormChange, setSidebarOpen } from "../../../store";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { LanguageContext } from "../../../App";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router";
import SelectLanguage from "../../../components/SelectLanguage";

function Footer({ handleFormChange, setSidebarOpen, currentPageName }) {
  const [cookies] = useCookies();
  // const history = useHistory();

  const translatedData = useContext(LanguageContext);

  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const languages = [
    {
      lang: "en",
      name: "English",
    },
    {
      lang: "am",
      name: "Հայերեն",
    },
    {
      lang: "ru",
      name: "Русский",
    },
  ];

  const openJoinPage = () => {
    document.body.classList.add("sideBar-opened");
    handleFormChange("headerPosFixed", true);
    handleFormChange("joinOpen", true);
  };

  const openMenu = () => {
    // setFixed(true)
    handleFormChange("headerPosFixed", true);
    setSidebarOpen();
    document.body.classList.add("sideBar-opened");
  };

  // const openContacts = () => {
  //   history.push("/pages/Contacts");
  // };

  return (
    <footer className="footer-container background-black">
      <div className="flex-space-between footer-component">
        <div className="footer-m-to-home">
          <div className="footer-m-content">
            <p className="color-white footer-M">M</p>
          </div>
          <div className="arrow-right">
            <img
              src={require("../../../images/arrow-right.svg").default}
              alt="arrow right"
            />
          </div>
          <div className="home-text-container">
            <p className="home-text color-white  font-size-14" lang={lng}>
              {/* {/ home /} */}
              {currentPageName}
            </p>
          </div>
        </div>
        {/* <div className="about-matashov-and-media"> */}
        <div className="display-flex-footer">
          <div>
            <p
              className="section-header section-text  color-darker-gray font-size-16"
              lang={lng}
            >
              {/* {/ About Mantashov /} */}
              {translatedData.about ?? "About Mantashov" }
            </p>
            <p
              className="section-text color-white  pb-10 font-size-16 cursor-pointer"
              lang={lng}
            >
              <Link
                className="section-text color-white  pb-10 font-size-16"
                to="/pages/Events"
                onClick={() => {
                  handleFormChange("currentPageName", translatedData.events);
                }}
              >
                {/* {/ Events /} */}
                {translatedData.events ?? "Events"}
              </Link>
            </p>
            <p
              className="section-text color-white  pb-10 font-size-16 cursor-pointer"
              lang={lng}
            >
              <Link
                className="section-text color-white  pb-10 font-size-16"
                to="/pages/NewsRoom"
                onClick={() => {
                  handleFormChange("currentPageName", translatedData.newsRoom);
                }}
              >
                {/* {/ Newsroom /} */}
                {translatedData.newsRoom ?? "Newsroom"}
              </Link>
            </p>
            <p
              className="section-text color-white  pb-10 font-size-16 cursor-pointer"
              lang={lng}
            >
              <Link
                className="section-text color-white  pb-10 font-size-16"
                to="/pages/Members"
                onClick={() => {
                  handleFormChange("currentPageName", translatedData.members);
                }}
              >
                {/* {/ Members /} */}
                {translatedData.members ?? "Members"}
              </Link> 
            </p>
            <p
              className="section-text color-white  pb-10 font-size-16 cursor-pointer"
              lang={lng}
            >
              <Link
                className="section-text color-white  pb-10 font-size-16"
                to="/pages/Contacts"
                onClick={() => {
                  handleFormChange("currentPageName", translatedData.contacts);
                }}
              >
                {/* {/ Contacts /} */}
                {translatedData.contacts ?? "Contacts"}
              </Link>
            </p>
            <p
              className="section-text color-white  pb-10 font-size-16 cursor-pointer"
              lang={lng}
            >
              <Link
                className="section-text color-white  pb-10 font-size-16"
                to="/privacy"
                onClick={() => {
                  handleFormChange(
                    "currentPageName",
                    translatedData.privacyPolicy
                  );
                }}
              >
                {/* Privacy + Cookies */}
                {translatedData.privacyPolicy ?? "Privacy + Cookies"}
              </Link>
            </p>
            <p
              className="section-text color-white  pb-10 font-size-16 cursor-pointer"
              lang={lng}
            >
              <Link
                className="section-text color-white pb-10 font-size-16"
                to="/terms"
                onClick={() => {
                  handleFormChange("currentPageName", translatedData.terms);
                }}
              >
                {/* {/ Terms of Use /} */}
                {translatedData.terms ?? "Terms of Use"}
              </Link>
            </p>
            <p
              className="section-text color-white font-bold-700 cursor-pointer"
              onClick={openMenu}
              lang={lng}
            >
              {/* Menu */}
              {translatedData.menu ?? "Menu"}
            </p>
          </div>
          <div className="display-none-min1024">
            <p className="section-header section-text font-bold-700 color-darker-gray font-size-16">
              Social media
            </p>
            <p className="section-text color-white font-bold-700 pb-10 font-size-16 cursor-pointer">
              <a
                className="section-text color-white font-bold-700 pb-10 font-size-16"
                href="https://www.instagram.com/mantashoventrepreneurs/"
                target="__blank"
              >
                Instagram
              </a>
            </p>
            <p className="section-text color-white font-bold-700 pb-10 font-size-16 cursor-pointer">
              <a
                className="section-text color-white font-bold-700 pb-10 font-size-16"
                href="https://www.facebook.com/mantashoveu"
                target="__blank"
              >
                Facebook
              </a>
            </p>
            <p className="section-text color-white font-bold-700 font-size-16 cursor-pointer">
              <a
                className="section-text color-white font-bold-700 pb-10 font-size-16"
                href="https://www.linkedin.com/company/mantashov/"
                target="_blank"
              >
                Linkedin
              </a>
            </p>
          </div>
        </div>
        <div className="display-none">
          <p className="section-header section-text font-bold-700 color-darker-gray font-size-16">
            {translatedData.socialMedia ?? "Social media"}
          </p>
          <p className="section-text color-white font-bold-700 pb-10 font-size-16 cursor-pointer">
            <a
              className="section-text color-white font-bold-700 pb-10 font-size-16"
              href="https://www.instagram.com/mantashoventrepreneurs/"
              target="__blank"
            >
              Instagram
            </a>
          </p>
          <p className="section-text color-white font-bold-700 pb-10 font-size-16 cursor-pointer">
            <a
              className="section-text color-white font-bold-700 pb-10 font-size-16"
              href="https://www.facebook.com/mantashoveu"
              target="__blank"
            >
              Facebook
            </a>
          </p>
          <p className="section-text color-white font-bold-700 font-size-16 cursor-pointer">
            <a
              className="section-text color-white font-bold-700 pb-10 font-size-16"
              href="https://www.linkedin.com/company/mantashov/"
              target="_blank"
            >
              Linkedin
            </a>
          </p>
        </div>
        <div className="contacts-our-address-section">
          <p
            className="section-header section-text  color-darker-gray font-size-16"
            lang={lng}
          >
            {/* {/ Contacts /} */}
            {translatedData.contacts ?? "Contacts"}
          </p>
          <p className="section-text color-white font-bold-700 mail font-size-16">
            {/* contact@monopo.london → */}
            {translatedData.contactEmail ?? "contact@monopo.london"} →
          </p>
          <p className="section-text color-white font-bold-700 font-size-16">
            {/* +374 95 678 654 */}
            {translatedData.contactPhone ?? "+374 95 678 654 "}
          </p>
          <p className="contacts-section-text  font-size-14" lang={lng}>
            {/* Feel free to reach out if you want to collaborate with us, or simply
            have a chat. */}
            {translatedData.contactsDesc ?? "Feel free to reach out if you want to collaborate with us, or simplyhave a chat."}
          </p>
        </div>
        <div className="contacts-our-address-section">
          <p
            className="section-text color-white font-bold-700 color-darker-gray"
            lang={lng}
          >
            {/* Our address */}
            {translatedData.ourAddress ?? "Our address"}
          </p>
          <div className="first-and-second-address">
            <div className="first-address-container">
              <img
                src={require("../../../images/exit-right-arrow.svg").default}
                alt="arrow right"
              />
              <p className="address-city font-size-14" lang={lng}>
                {/* Yerevan */}
                {translatedData.locations
                  ? translatedData.locations[0].location
                  : "Moscow, Russia"}
              </p>
              <p
                className="address-street section-text color-white font-bold-700 font-size-16 address-desc"
                lang={lng}
              >
                {/* 67 Hanrapetutyan St,Republic Business Center, 3nd Floor, */}
                {translatedData.locations
                  ? translatedData.locations[0].address
                  : "Businessmen united, preferring the strengthening of the Armenian factor in two Russian cities, Moscow and Krasnodar. Continuous learning, shared values make collaboration easy, and even the most complex and ambitious programs are feasible. Currently, about 60 businessmen are united in two Russian clubs."}
              </p>
            </div>

            <div className="second-address-container">
              <img
                src={require("../../../images/exit-bottom-arrow.svg").default}
                alt="arrow bottom"
                className="exit-bottom-arrow"
              />
              <p className="address-city losAngeles font-size-14" lang={lng}>
                {/* Los Angeles */}
                {translatedData.locations
                  ? translatedData.locations[1].location
                  : "Los Angeles, USA"}
              </p>
              <p
                className="address-street-losAngeles-text section-text color-white font-bold-700 font-size-16 address-desc"
                lang={lng}
              >
                {/* 2800 E Observatory Rd, Los Angeles, CA 90027, */}
                {translatedData.locations
                  ? translatedData.locations[1].address
                  : "27 businessmen are members of our union in Los Angeles.  Thus, the uniting platform of progressive businessmen is gradually increasing. Therefore, Armenians working in different parts of the world get to know each other and give priority to cooperation with Armenians in their various initiatives."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-links-container flex-space-between">
        <div className="website-cookies-and-join">
          <div className="website-cookies-and-copyright">
            <Link
              className="cookies-and-copyright  color-white font-size-14"
              lang={lng}
              to="/privacy"
            >
              {/* This website use cookies. Learn more. */}
              {translatedData.cookies ?? "This website use cookies. Learn more."}
            </Link>
            <p
              className="cookies-and-copyright copyright-text font-medium-500 font-size-14"
              lang={lng}
            >
              {/* {/ Copyright © 2021 Mantashov Inc. All rights reserved. /} */}
              {translatedData.copyright ?? "Copyright © 2021 Mantashov Inc. All rights reserved."}
            </p>
            <p
              className="join-text cursor-pointer color-blue  font-size-14 language-desktop"
              lang={lng}
              onClick={() => openJoinPage()}
            >
              {/* Join */}
              {translatedData.join ?? "Join"}
            </p>
          </div>

          {/* {/ <Link onClick={()=> alert("Must be go to Join page!")} className="join-text">Join</Link> /} */}
          <div className="language-mobile">
            <p
              className="join-text cursor-pointer color-blue  font-size-14"
              lang={lng}
              onClick={() => openJoinPage()}
            >
              {/* Join */}
              {translatedData.join ?? "Join"}
            </p>
            <div className="language-cont">
              {/* <img
            src={require("../../../images/arrow-bottom.svg").default}
            alt="arrow bottom"
            className="arrow-bottom-icon "
          />
          <span className="lang-text color-white font-bold-700 font-size-14">
            {languages.map((l) => {
              return l.lang === cookies.lang && l.name;
            })}
          </span> */}
              <SelectLanguage
                languages={languages}
                selected="English"
                className={"footer-language-container"}
                textClassName="lang-text"
                ulClassName="ul-className"
              />
            </div>
          </div>
        </div>
        <div className="language-cont language-desktop">
          {/* <img
            src={require("../../../images/arrow-bottom.svg").default}
            alt="arrow bottom"
            className="arrow-bottom-icon "
          />
          <span className="lang-text color-white font-bold-700 font-size-14">
            {languages.map((l) => {
              return l.lang === cookies.lang && l.name;
            })}
          </span> */}
          <SelectLanguage
            languages={languages}
            selected="English"
            className={"footer-language-container"}
            textClassName="lang-text lang-text-footer"
            ulClassName="ul-className"
          />
        </div>
      </div>
    </footer>
  );
}

const mapStateToProps = (state) => {
  return {
    currentPageName: state.formReducer.currentPageName ?? "home",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSidebarOpen: () => dispatch(setSidebarOpen()),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
