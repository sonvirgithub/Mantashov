import React from "react";
import "./Contacts.css";
import ContactsFirstBlock from "./ContactsFirstBlock/ContactsFirstBlock";
import ContactsSecondBlock from "./ContactsSecondBlock/ContactsSecondBlock";

function Contacts() {
  return (
    <div className="contacts flex-space-between">
    <ContactsFirstBlock/>
    <ContactsSecondBlock/>
     
    </div>
  );
}

export default Contacts;
