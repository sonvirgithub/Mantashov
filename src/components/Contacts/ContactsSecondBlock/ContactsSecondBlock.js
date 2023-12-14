import React, { useContext } from "react";
import "./ContactsSecondBlock.css";
import { LanguageContext } from "../../../App";
import { Link, useHistory } from "react-router-dom";
import { setSideBarClosed } from "../../../store";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";

function ContactsSecondBlock({ setSideBarClosed }) {
  const translatedData = useContext(LanguageContext);
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const history = useHistory();
  const closeMenu = () => {
    setSideBarClosed();
    document.body.classList.remove("sideBar-opened");
  };
  return (
    <div className="three-contact-and-four-contact">
      <p className="three-contact font-bold-700 font-size-14" lang={lng}>
        {/* Copyright © 2021 Mantashov Inc. All rights reserved. */}
        {translatedData.copyright ?? "Copyright © 2021 Mantashov Inc. All rights reserved."}
      </p>
      <Link
        onClick={() => closeMenu()}
        className="four-contact  font-size-14"
        lang={lng}
        to="/privacy"
      >
        {/* This website use cookies. Learn more. */}
        {translatedData.cookies ?? "This website use cookies. Learn more."} 
      </Link>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setSideBarClosed: () => dispatch(setSideBarClosed()),
  };
};
export default connect(null, mapDispatchToProps)(ContactsSecondBlock);
