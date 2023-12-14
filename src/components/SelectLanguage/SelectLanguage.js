import React, { useState, useEffect, useRef } from "react";
import "./SelectLanguage.css";
import { useCookies } from "react-cookie";
import { useOutsideClick } from "../../functions/useOutsideClick";

function SelectLanguage({
  languages = [{ id: 1, name: "EN" }],
  className = "",
  selected,
  textClassName = "",
  ulClassName = "",
  containerClass = "",
}) {
  const [openLanguages, setOpenLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [cookies, setCookie] = useCookies(["lang"]);

  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const ref = useRef();

  useEffect(() => {
    if (!cookies.lang) {
      setCookie("lang", "en", { path: "/" });
    }
  }, []);

  useEffect(() => {
    switch (cookies.lang) {
      case "en":
        setSelectedLanguage(0);
        break;
      case "ru":
        setSelectedLanguage(2);
        break;
      case "am":
        setSelectedLanguage(1);
        break;

      default:
        break;
    }
  }, [cookies.lang]);

  const handleClick = (item, i) => {
    setCookie("lang", item.lang, { path: "/" });

    setSelectedLanguage(i);

    setOpenLanguages(false);
  };

  const handleOutsideClick = () => {
    setOpenLanguages(false);
  };

  useOutsideClick(ref, handleOutsideClick);

  return (
    <div className={`${containerClass} cursor-pointer`} ref={ref}>
      <div
        className={`header-selected-language-container position-relative ${className}`}
        onClick={() => setOpenLanguages(!openLanguages)}
      >
        <img
          className="lang-arrow"
          src={require("../../images/arrow-bottom.svg").default}
          alt="arrow bottom"
        />
        <span
          className={`language-text color-white  font-size-16 ${textClassName}`}
          lang={lng}
        >
          {languages?.map((l) => {
            return l.lang === cookies.lang && l.name;
          })}
        </span>
      </div>
      {openLanguages && (
        <ul
          className={`languages-for-choose-container position-absolute `}
        >
          {languages.map((item, i) => {
            return selectedLanguage !== i ? (
              <li
                className={`${ulClassName} language-for-choose header-selected-language-container  color-white  font-size-16 ${textClassName}`}
                lang={item.lang}
                key={item.lang}
                onClick={() => {
                  handleClick(item, i);
                }}
              >
                {/* <span className="lang-arrow"></span> */}
                <span
                  className={`language-for-choose header-selected-language-container  color-white  font-size-16 ${ulClassName}  ${textClassName}`}
                >
                  {item.name}
                </span>
              </li>
            ) : null;
          })}
        </ul>
      )}
    </div>
  );
}

export default SelectLanguage;
