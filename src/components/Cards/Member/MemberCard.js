import React from "react";
import "./memberCard.css";
import orgLogo from "../../../images/member-name-card.svg";
import emptyImage from "../../../images/empty.jpg";
// import { LanguageContext } from "../../../App";
import { useCookies } from "react-cookie";

function Member({
  // picture,
  // firstName,
  // lastName,
  // organizationName,
  // organizationLogo,

  cardData,
}) {
  // const translatedData = useContext(LanguageContext);
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  return (
    <div className="member-card-container">
      <div className="member-img-container">
        {console.log(cardData.image)}
        <img
          className="member-img"
          src={require("../../../images/members/Hrayr.png") ?? emptyImage}
          alt="one member"
        />
      </div>
      <div className="member-name-container">
        <div>
          <img src={orgLogo} alt="organization logo" />
        </div>

        <div className="member-name-and-description">
          <p
            className="member-name color-white "
            lang={lng}
          >{`${cardData.firstName} ${cardData.lastName}`}</p>
          <p className="member-name color-white member-description " lang={lng}>
            {cardData.organizationName}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Member;
