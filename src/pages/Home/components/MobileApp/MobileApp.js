import React, { useContext } from "react";
import "./MobileApp.css";
import { LanguageContext } from "../../../../App";
import { useCookies } from "react-cookie";
function MobileApp({ id }) {
  const translatedData = useContext(LanguageContext);

  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  return (
    <div
      className="mobile-app-block-container background-black"
      id={id}
      style={{ background: "#000000" }}
    >
      <p className="mobile-app-block-header " lang={lng}>
        Mobile Application
        {/* {translatedData.mobileAppTitle} */}
      </p>
      <div className="app-description-container" lang={lng}>
        <p className="mobile-app-description  color-white font-size-18">
          The exclusive Mantashov app is an electronic access key to all the
          features of our community. Any inquiries, contacts, events, closed
          chats, constant networking - this is just a small part of what the
          Mantashov application will open for you. The exclusive Mantashov app
          is an electronic access key to all the features of our community. Any
          inquiries, contacts, events, closed chats, constant networking - this
          is just a small part of what the Mantashov application will open for
          you.{" "}
          {/* {translatedData.mobileAppDesc} */}
        </p>
      </div>
      <div className="app-screenshots-container">
        <div className="screenshot-container">
          <img
            className="screenshot"
            src={require("../../../../images/mobile-app1.png")}
            alt="app screenshot"
          />
        </div>
        <div className="screenshot-text">
          <p className="text1  color-dark-gray font-size-18" lang={lng}>
            Find about our events that are going to take place.Find about our
            events that are going
            {/* {translatedData.mobileAppHorizontal1} */}
          </p>
        </div>
        <div className="screenshot-container">
          <img
            className="screenshot"
            src={require("../../../../images/mobile-app2.png")}
            alt="app screenshot"
          />
        </div>
        <div className="screenshot-text">
          <p
            className="text2 font-medium-500 color-dark-gray font-size-18"
            lang={lng}
          >
            Every event is presented in details.
            {/* {translatedData.mobileAppHorizontal2} */}
          </p>
        </div>
        <div className="screenshot-container">
          <img
            className="screenshot"
            alt="app screenshot"
            src={require("../../../../images/mobile-app3.png")}

          />
        </div>
      </div>
      <div className="stores-for-app-container">
        <p className="find-app-text color-dark-gray font-size-14" lang={lng}>
        You can find our applications on App Store and Google Play.
          {/* {translatedData.mobileAppFooterDesc} */}
        </p>
        <div className="stores-for-app">
          <div
            className="app-store"
            // onClick={() => alert("Բացվելու է App Store -ը։")}
          >
            <img
              className="app-store-logo store-for-app"
              src={require("../../../../images/app-store-logo.svg").default}
              alt="app store"
            />
          </div>
          <div
            className="google-play"
            // onClick={() => alert("Բացվելու է Google Play -ը։")}
          >
            <img
              className="google-play-logo store-for-app"
              src={require("../../../../images/google-play-logo.svg").default}
              alt="google play"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MobileApp;
