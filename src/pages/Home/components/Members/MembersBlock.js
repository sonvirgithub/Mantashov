import React, { useEffect, useContext } from "react";
import "./MembersBlock.css";
import memberImg1 from "../../../../images/member1.svg";
import memberImg2 from "../../../../images/member2.svg";
import orgLogo from "../../../../images/member-name-card.svg";
import MemberCard from "../../../../components/Cards/Member/MemberCard";
import List from "../../../../components/List/List";
import { fetchMembersData, handleFormChange } from "../../../../store";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { LanguageContext } from "../../../../App";
import { useCookies } from "react-cookie";

function MembersBlock({ fetchMembersData, membersData, handleFormChange, id }) {
  let history = useHistory();

  const translatedData = useContext(LanguageContext);

  const [cookies] = useCookies();

  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const openJoinPage = () => {
    document.body.classList.add("sideBar-opened");
    handleFormChange("headerPosFixed", true);

    handleFormChange("joinOpen", true);
  };

  return (
    <div
      className="member-block-container background-black"
      id={id}
      style={{ background: "#000000" }}
    >
      <div>
        <div className="title-and-btn ml-5">
          <p className="members-title color-white" lang={lng}>
            Our Members
            {/* {translatedData.membersTitle} */}
          </p>
          <div
            className="become-a-member-btn cursor-pointer background-dark-blue"
            lang={lng}
            onClick={openJoinPage}
          >
            <span className="become-a-member-text color-white font-size-16">
              Become a member
              {/* {translatedData.becomeAmember} */}
            </span>
            <img
              className="plus-icon"
              src={require("../../../../images/plus-icon.svg").default}
              alt="plus"
            />
          </div>
        </div>
        <div className="who-are-members-container ml-5">
          <p className="who-are-members color-white" lang={lng}>
            Honorary guests of the events are successful businessmen and
            businesswomen in Armenia and abroad, state officials such as Karen
            Gyulbudaghyan, Anna Donchenko and others.
            {/* {translatedData.membersDesc} */}
          </p>
        </div>
      </div>
      <div className="position-relative">
        <div className="members-list-container">
          <List
            Component={MemberCard}
            // data={membersData}
            className="membersList"
            arrowColor="white"
            url="/api/members"
          />
        </div>
        <div className="description-container position-absolute">
          <p
            className="description-text color-dark-gray font-size-16 position-absolute"
            lang={lng}
          >
            EVERY member OF THE BUSINESS CLUB IS OPEN TO COMMUNICATION AND
            PARTNERSHIP. EACH member CAN AND SHOULD BE REQUESTED FOR ADVICE AND
            EXPERIENCE. BECOME A member
            {/* {translatedData.membersFooterDesc} */}
          </p>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    membersData: state.membersReducer.membersData,
  };
};
const mapDispatchToProps = (dispatch) => {

  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),

    fetchMembersData: (obj) => dispatch(fetchMembersData(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersBlock);
