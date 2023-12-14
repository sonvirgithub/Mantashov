import React, { useContext, useEffect, useState } from "react";
import "./Contacts.css";

import exitRightImg1 from "../../images/exitRight1.svg";
import exitRightImg2 from "../../images/exitRight2.svg";
import ContactCard from "../../components/Cards/Contact/ContactCard";

import { fetchContacts, handleFormChange } from "../../store";
import { connect } from "react-redux";
import { LanguageContext } from "../../App";
import ContactForJoin from "../../components/Cards/Contact/components/ContactForJoin";
import { useCookies } from "react-cookie";

function Contacts({
  fetchContacts,
  handleFormChange,
  // contactsData
}) {
  const translatedData = useContext(LanguageContext);
  const [cookies] = useCookies();

  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const contactsData = [
    {
      id: 1,
      image: exitRightImg1,
      address: "Yerevan, Armenia",
      workingHours: "Mo-Fr: 9:00am - 18:00pm",
      workingDays: "Sa-Su:Weekend",
      phone: "+374 550 101",
      timeZone: "(Yerevan time)",
    },
    {
      id: 2,
      image: exitRightImg2,
      address: "USA, Los Angelos",
      workingHours: "Mo-Fr: 9:00am - 18:00pm",
      workingDays: "Sa-Su:Weekend",
      phone: "+374 550 101",
      timeZone: "(Yerevan time)",
    },
  ];

  useEffect(() => {
    handleFormChange("currentPageName", translatedData.contacts);
    handleFormChange("headerColorBlack", false);
  }, []);

  return (
    <div className="contacts-page-container">
      <div className="contacts-page-content">
        <div>
          <p
            className="contacts-header color-black"
            lang={lng}
          >
            Mantashyants Contacts
          </p>
          <p
            className="contacts-text color-darker-gray"
            lang={lng}
          >
            {/* {translatedData.contactsPageDesc} */}
            American Sign Language (ASL) interpreters are available for all your online shopping needs, right in your web browser.
          </p>
        </div>
        <div className="contacts-cards-container">
          {contactsData?.map((item) => (
            <ContactCard
              id={item.id}
              image={item.image}
              address={item.address}
              workingHours={item.workingHours}
              workingDays={item.workingDays}
              phone={item.phone}
              timeZone={item.timeZone}
            />
          ))}
        </div>
        <ContactForJoin />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  contactsData: state.contactsReducer.contactsData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContacts: () => dispatch(fetchContacts()),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
