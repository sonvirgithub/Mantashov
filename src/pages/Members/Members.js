import React, { useCallback, useState, useEffect, useContext } from "react";
import SearchBar from "../../components/SearchBar";
import "./Members.css";
import MemberCard from "../../components/Cards/Member/MemberCard";
import memberImg1 from "../../images/member1.svg";
import memberImg2 from "../../images/member2.svg";
import orgLogo from "../../images/member-name-card.svg";
import List from "../../components/List/List";
import Select from "../../components/Select";
import { useQuery } from "../../functions/useQuery";
import { handleFormChange, fetchMembersData } from "../../store";
import { connect } from "react-redux";
import { LanguageContext } from "../../App";
import { useCookies } from "react-cookie";

function Members({ handleFormChange, membersData, fetchMembersData }) {
  const query = useQuery();
  const [open, setOpen] = useState(false);
  const translatedData = useContext(LanguageContext);
  const [cookies, setCookie] = useCookies(["lang"]);

  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  useEffect(() => {
    handleFormChange("headerColorBlack", true);
    // handleFormChange("currentPageName", "Members");
    handleFormChange("currentPageName", translatedData.members);
  }, []);

  const fetchMembers = useCallback(() => {
    let searchValue = query.get("search");
  }, [query]);

  const openJoinPage = () => {
    document.body.classList.add("sideBar-opened");
    handleFormChange("joinOpen", true);
  };

  return (
    <div className="members-page">
      <div className="flex-space-between search-and-select-members">
        <div className=" all-members-and-search">
          <p className="color-white all-members" lang={lng}>
            All members
          </p>
          <div className="members-page-searchbar">
            <SearchBar
              open={open}
              setOpen={setOpen}
              inputClass={"members-page-search-input"}
              className="members-page-search"
              placeholder={
                window.innerWidth >= 200 && window.innerWidth <= 1024
                  ? ""
                  : "search"
              }
              classSearchInput={
                window.innerWidth >= 200 && window.innerWidth <= 1024
                  ? "members-page-search-input"
                  : ""
              }
              classNameSearchIcon={
                window.innerWidth >= 200 && window.innerWidth <= 1024
                  ? "members-page-search-icon"
                  : ""
              }
            />
          </div>
        </div>
        <Select
          className="new-members-select "
          placeholder="new"
          id="newMember"
        />
      </div>
      <div className="members-page-list">
        <List
          Component={MemberCard}
          // data1={data}
          className="membersList"
          arrowColor="white"
          url="/api/members"
          search={query.get("search")}
        />
        <div className="flex-space-between communic-partner">
          <p className="color-white font-medium-500 font-size-14 color-dark-gray communic-partner-text">
            EVERY RESIDENT OF THE BUSINESS CLUB IS OPEN TO COMMUNICATION AND
            PARTNERSHIP.
            <span
              className="color-white font-medium-700 communic-partner-join "
              lang={lng}
              onClick={() => openJoinPage()}
            >
              {/* JOIN */}
              {translatedData.join}
            </span>
          </p>
          {/* <label
            className="color-white font-medium-700 communic-partner-join "
            lang={lng}
            onClick={() => openJoinPage()}
          >
            {translatedData.join}
          </label> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Members);
