import React, { useContext, useEffect, useState } from "react";
import "./TermsAndConditions.css";
import { handleFormChange } from "../../store";
import { connect } from "react-redux";
import { LanguageContext } from "../../App";

function TermsAndConditions({ handleFormChange }) {
  const [termsDescription, setTermsDescription] = useState(null);
    const translatedData = useContext(LanguageContext);

  useEffect(() => {
    fetch(`/api/other/privacy-policy`)
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        setTermsDescription(data);
      })
      .catch((e) => {
        console.log(e);
      });
    handleFormChange("currentPageName", translatedData.terms);
  }, []);
  return (
    <div className="terms-page-container">
      {/* <p className="terms-header font-bold-600 color-black">
        {"Terms & conditions"}
      </p> */}

      <p
        className="terms-description font-bold-600 font-size-21"
        dangerouslySetInnerHTML={{ __html: termsDescription }}
      ></p>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(null, mapDispatchToProps)(TermsAndConditions);
