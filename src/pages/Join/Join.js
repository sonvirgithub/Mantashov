import React, { useEffect, useRef, useState, useContext } from "react";
import "./Join.css";
import Input from "../../components/Input";
import ContactsFirstBlock from "../../components/Contacts/ContactsFirstBlock";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  handleFormChange,
  getTurnovers,
  addApplicant,
  cleanForm,
} from "../../store";

import { LanguageContext } from "../../App";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useCookies } from "react-cookie";

function Join({
  joinOpen,
  handleFormChange,
  getTurnovers,
  turnovers,
  addApplicant,
  cleanForm,
  joinName,
  joinEmail,
  joinPhone,
}) {
  const [clickMoney, setClickMoney] = useState(false);
  const [text, setText] = useState("");
  const [smsInfo, setSmsInfo] = useState(false);
  const [sendClick, setSendClick] = useState(false);
  const [fixedClass, setFixedClass] = useState("");
  const ref = useRef(null);

  let history = useHistory();

  const translatedData = useContext(LanguageContext);
  const [cookies, setCookie] = useCookies(["lang"]);

  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const location = useLocation();
  useEffect(() => {
    if (joinOpen) {
      ref.current.scrollTo(0, 0);
    }
    getTurnovers();
  }, [joinOpen]);

  useEffect(() => {
    handleFormChange("headerColorBlack", true);
  }, []);

  const showMoney = (item) => {
    setText(item.value);
    handleFormChange("turnoverId", item.id);
    setClickMoney(!clickMoney);
  };

  const openHomePage = () => {
    setClickMoney(false);
    setText("");
    setSendClick(false);
    document.body.classList.remove("sideBar-opened");
    handleFormChange("joinOpen", false);
    setFixedClass("close-join");
    // cleanForm();
    handleFormChange("joinName", undefined);
    handleFormChange("joinEmail", undefined);
    handleFormChange("joinPhone", undefined);
    handleFormChange("turnoverId", undefined);
  };

  const handleAddApplicant = () => {
    if (
      joinName === "" ||
      joinEmail === "" ||
      joinPhone === "" ||
      text === ""
    ) {
    } else {
      addApplicant();
      setSendClick(!sendClick);
      setText("");
      setClickMoney(false);
      cleanForm();
      handleFormChange("joinOpen", true);
    }
  };
  useEffect(() => {
    if (joinOpen) {
      setTimeout(() => setFixedClass("position-fixed"), 300);
    }
  }, [joinOpen]);

  return (
    <div
      className={`join-page ${joinOpen ? "join-open" : "join-close"}`}
      ref={ref}
    >
      <div className={`close-and-contacts ${fixedClass}`}>
        <div className="join-close-icon">
          <img
            src={require("../../images/close-sideBar.svg").default}
            alt="close-join-page"
            className="close-join-img cursor-pointer"
            onClick={() => openHomePage()}
          />
        </div>
        <div className="join-contacts-big-width">
          <ContactsFirstBlock className="first-contact-for-join" />
        </div>
      </div>

      <div className="join-content" id="join">
        {/* <div className="join-famaly-and-desc"></div> */}
        <div
          className={`color-white  join-famaly ${
            cookies.lang === "am" ? "join-famaly-am" : ""
          }`}
          lang={lng}
        >
          {/* Join famaly */}
          {translatedData.joinTitle ?? "Join famaly"}
        </div>
        <div
          className={`join-title-container position-relative ${
            cookies.lang === "am" ? "join-title-container-am" : ""
          }`}
        >
          <div className="join-title-and-desc">
            <p className="font-regular-400 color-white">
              {/* ONE STEP FROM CLUB Mantashov */}
              {translatedData.joinSmallDesc1 ?? "ONE STEP FROM CLUB Mantashov"}
            </p>
            {/* <p className="font-regular-400 color-white join-desc">
              2 min in typing
              {translatedData.joinSmallDesc2}
            </p> */}
          </div>

          <div className="join-3d-div2"></div>

          <div className="join-3d-div3"></div>
        </div>

        <div
          className={`firts-input ${
            cookies.lang === "am" ? "firts-input-am" : ""
          }`}
        >
          <Input
            name={`${translatedData.inputName ?? "Name"}`}
            placeholder={`${translatedData.inputNamePlaceholder ?? "Name"}`}
            className=""
            id="joinName"
          />
        </div>
        <div className="input-margin">
          <Input
            name={`${translatedData.inputEmail ?? "Email"}`}
            placeholder={`${translatedData.inputEmailPlaceholder ?? "e-mail"}`}
            className=""
            id="joinEmail"
          />
        </div>
        <div className="input-margin">
          <Input
            name={`${translatedData.inputPhone ?? "Phone"} `}
            placeholder="+374 -- -- --"
            className=""
            id="joinPhone"
            // type="number"
          />
        </div>
        <div className="input-margin">
          <div style={{ margin: "39px 0 0 0" }}>
            <p
              className="input_label color-white font-medium-500 font-size-14"
              lang={lng}
            >
              {/* Company turnover */}
              {translatedData.inputTurnover ?? "Company turnover"}
            </p>
            <div
              style={{ position: "relative" }}
              className="flex-space-between"
            >
              <div className={`input_component font-bold-700`}>
                {text === "" ? "+ 000 mln $" : ""}{" "}
              </div>
              {text === "" ? null : (
                <div
                  className={`font-bold-700 mln-and-bln-content mln-content-width 
                  ${
                    clickMoney
                      ? "company-turnover-close-animation "
                      : "company-turnover-animation"
                  } 
                  company-turnover-close `}
                >
                  {text}
                </div>
              )}

              <div
                className={`font-bold-700 mln-and-bln-content mln-content-width  cursor-pointer
               ${
                 clickMoney
                   ? "company-turnover-animation "
                   : "company-turnover-close-animation"
               }  
               company-turnover`}
              >
                {text}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mln-and-bln-contents ${
            sendClick ? "unclickible-btn" : ""
          }`}
        >
          {/* <div className="font-bold-700 flex-space-between mln-contents"> */}

          <div className="flex-space-between join-money-content">

            {turnovers?.map((item, i) => (

              <div
                key={item.id}
                className={`font-bold-700 mln-and-bln-content mln-content-width cursor-pointer ${
                  i === turnovers.length - 1 ? "bln" : ""
                }`}
                onClick={() => showMoney(item)}
              >
                {item.value}
              </div>
            ))}
          </div>

          <div className="flex-space-between sms-informing">
            <p className="sms-informing-text  color-darker-gray font-bold-700">
              I agree to the processing personal data and SMS informing
            </p>

            {smsInfo ? (
              <img
                alt=""
                src={require("../../images/sms-informing2.svg").default}
                onClick={() => setSmsInfo(!smsInfo)}
              />
            ) : (
              <img
                alt=""
                src={require("../../images/sms-informing.svg").default}
                onClick={() => setSmsInfo(!smsInfo)}
              />
            )}
          </div>
          <div
            className={`join-send-btn  ${
              joinName === "" ||
              joinEmail === "" ||
              joinPhone === "" ||
              text === ""
                ? "not-allowed"
                : "cursor-pointer"
            } ${sendClick ? "join-send-btn-padding" : ""}`}
            onClick={handleAddApplicant}
          >
            <p
              lang={lng}
              className={`join-send-btn-backclr color-white   color-darker-gray
            ${sendClick ? "send-btn-display-none" : ""}`}
            >
              {translatedData.send ?? "Send"}
            </p>

            <p
              lang={lng}
              className={`join-send-btn-backclr color-white font-bold-700 thank-you-animation color-darker-gray
           ${sendClick ? "thank-you-open" : ""} 
            ${!sendClick ? "send-btn-display-none" : ""}`}
            >
              Thank you, we will be in touch with you when we look at your
              application.
            </p>
          </div>
        </div>
        <div className="join-contacts-small-width">
          <ContactsFirstBlock />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    joinOpen: state.formReducer.joinOpen,
    turnovers: state.joinReducer.turnovers,
    joinPhone: state.formReducer.joinPhone ?? "",
    joinEmail: state.formReducer.joinEmail ?? "",
    joinName: state.formReducer.joinName ?? "",
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    getTurnovers: () => dispatch(getTurnovers()),
    addApplicant: () => dispatch(addApplicant()),
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Join);
