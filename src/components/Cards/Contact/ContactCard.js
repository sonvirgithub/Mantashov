import React, { useContext } from "react";
import { connect } from "react-redux";
import { LanguageContext } from "../../../App";
import { handleFormChange } from "../../../store";
import "./ContactCard.css";
import { useCookies } from "react-cookie";

function ContactCard({
  id,
  image,
  address,
  workingHours,
  workingDays,
  phone,
  timeZone,
  handleFormChange,
}) {
  const translatedData = useContext(LanguageContext);

  const [cookies] = useCookies();

  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const openJoinPage = () => {
    document.body.classList.add("sideBar-opened");
    handleFormChange("joinOpen", true);
  };

  return (
    <div className="contacts-card-container background-white" key={id}>
      <div className="card-data-container">
        <div className="cont-arrow">
          <img src={image} alt="exit right arrow" className="contact-arrow" />
        </div>
        <p className="cont-address" lang={lng}>
          {address}
        </p>
        <div className="working-hours-container">
          <p className="working-hours color-black" lang={lng}>
            {workingHours}
          </p>
          <p className="working-days" lang={lng}>
            {workingDays}
          </p>
        </div>
        <div className="phone-and-timezone">
          <p className="phone-contact color-black" lang={lng}>
            {phone}
          </p>
          <p className="timezone" lang={lng}>
            {timeZone}
          </p>
        </div>
        <p
          className="more-contacts-texts"
          lang={lng}
        >
          {/* one that suits you to learn more about it. */}
          {translatedData.contactsCardDesc}
          <span className="more-link" onClick={() => openJoinPage()} lang={lng}>
            {" "}
            {translatedData.more}
          </span>
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

export default connect(null, mapDispatchToProps)(ContactCard);
