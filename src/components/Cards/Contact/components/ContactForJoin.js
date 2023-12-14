import React, { useContext } from "react";
import { LanguageContext } from "../../../../App";
import { useCookies } from "react-cookie";
import { handleFormChange } from "../../../../store";
import { connect } from "react-redux";
import "./ContactForJoin.css";

function ContactForJoin({ containerClassName, handleFormChange }) {
  const [cookies] = useCookies();
  const translatedData = useContext(LanguageContext);

  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const openJoinPage = () => {
    document.body.classList.add("sideBar-opened");
    handleFormChange("joinOpen", true);
  };

  return (
    <div className={`contacts-for-join ${containerClassName}`}>
      <div className="connect-and-contacts-texts">
        <p className="connect-text color-white" lang={lng}>
          {/* {translatedData.contactsConnectTitle} */}
          Connect to magical ease
        </p>
        <p className="contact-for-question color-gray" lang={lng}>
          {/* {translatedData.contactsConnectText} */}
          We are always ready to help Do you have any questions? by phone 8-800-333-51-73 or chat.
        </p>
      </div>
      <div
        className="join-from-contacts cursor-pointer"
        onClick={openJoinPage}
        lang={lng}
      >
        <p className="join-from-contacts-text color-blue" lang={lng}>
          {/* {translatedData.join} */}
          Join
        </p>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(null, mapDispatchToProps)(ContactForJoin);
