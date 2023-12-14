import React, { useContext, useEffect, useState } from "react";
import "./PrivacyPolicy.css";
import request from "../../store/request";
import { connect } from "react-redux";
import { handleFormChange } from "../../store";
import { LanguageContext } from "../../App";

function PrivacyPolicy({ handleFormChange }) {
  const [privacyDescription, setPrivacyDescription] = useState(null);
  const translatedData = useContext(LanguageContext);

  useEffect(() => {
    handleFormChange("headerColorBlack", false);
    handleFormChange("currentPageName", translatedData.privacyPolicy);
  }, []);

  useEffect(() => {
    fetch(`/api/other/privacy-policy`)
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        setPrivacyDescription(data);
      })
      .catch((e) => {
        console.log(e);
      });
    handleFormChange("currentPageName", translatedData.privacyPolicy);
  }, []);

  return (
    <div className="privacy-page-container">
      {/* <p className="privacy-header color-black font-bold-600">Privacy policy</p> */}
      <p
        className="privacy-description"
        dangerouslySetInnerHTML={{ __html: privacyDescription }}
      ></p>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(null, mapDispatchToProps)(PrivacyPolicy);
