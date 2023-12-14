import React, { useState, useEffect, useContext } from "react";
import "./ContactsFirstBlock.css";
import { LanguageContext } from "../../../App";
import { useCookies } from "react-cookie";

function ContactsFirstBlock({className}) {
  const translatedData = useContext(LanguageContext);
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];
  return (
    <div className="first-contact-and-second-contact">
      <p className={`first-contact  font-size-14 ${className}`} lang={lng}>
        {/* Feel free to reach out if you want to collaborate with us, or simply
        have a chat. */}
        {translatedData.contactsDesc ?? "Feel free to reach out if you want to collaborate with us, or simply have a chat."}
      </p>
      <div className="second-contact">
        <p className={`second-contact-item  font-size-14 ${className}`} lang={lng}>
          contact@monopo.london →
        </p>
        <p className={`second-contact-item  font-size-14 ${className}`} lang={lng}>
          +374 95 678 654
        </p>
        <p className={`second-contact-item  font-size-14 ${className}`} lang={lng}>
          Facebook Instagram
        </p>
      </div>
    </div>
  );
}

export default ContactsFirstBlock;
