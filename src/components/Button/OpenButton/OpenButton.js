import React from "react";
import "./OpenButton.css";
import { useCookies } from "react-cookie";
function OpenButton({
  name,
  classname,
  color,
  textClassname,
  disabled = false,
  onClick = () => {},
}) {
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];
  return (
    <>
      <button
        className={`open-btn ${classname}`}
        style={{ background: color }}
        disabled={disabled}
        onClick={onClick}
      >
        <p className={`button-text ${textClassname}`} lang={lng}>
          {name}
        </p>
      </button>
    </>
  );
}

export default OpenButton;
