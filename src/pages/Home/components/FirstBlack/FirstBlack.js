import React, { useContext, useRef } from "react";
import "./FirstBlack.css";
import { LanguageContext } from "../../../../App";
import { useCookies } from "react-cookie";
import mantashov from "../../../../images/mantashov.jpg"

function FirstBlack({ id }) {
  const translatedData = useContext(LanguageContext);
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  return (
    <div
      className="first-block-component"
      id={id}
      style={{ background: "#000000" }}
    >
    <img alt="mantashov" src={mantashov} className="mantashov-img"/>
      <p className="first-block-component-title color-white" lang={lng}>
        {translatedData.mainTitle}
      </p>

      <div
        className="first-block-component-scroll font-medium-500 font-size-16"
        lang={lng}
      >
        Scrole
      </div>

      
    </div>
  );
}

export default FirstBlack;
