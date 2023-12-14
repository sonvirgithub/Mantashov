import React, { useCallback, useEffect, useState, useContext } from "react";
import "./Events.css";
import SearchBar from "../../components/SearchBar";
import EventCard from "../../components/Cards/Event/EventCard";
import img1 from "../../images/events-block-img1.svg";
import img2 from "../../images/events-block-img2.svg";
import List from "../../components/List/List";
import { handleFormChange, fetchEventsData } from "../../store";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { useQuery } from "../../functions/useQuery";
import { LanguageContext } from "../../App";

function Events({ handleFormChange, eventsData, fetchEventsData }) {
  const translatedData = useContext(LanguageContext);
  const query = useQuery();
  const [open, setOpen] = useState(false);
  const [cookies, setCookie] = useCookies(["lang"]);

  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  useEffect(() => {
    handleFormChange("headerColorBlack", false);
  }, []);

  return (
    <div className="events-page">
      {/* <div> */}
      <div className="flex-space-between events-page-title-and-search">
        <p className="events-page-text " lang={lng}>
          One hundred plus a Event of the mountain
          {translatedData.eventPageTitle}
        </p>

        <SearchBar
          pageName="Events"
          setOpen={setOpen}
          // className="events-page-search"
          inputClass={"members-page-search-input"}
          className="members-page-search"
          placeholder={
            window.innerWidth >= 200 && window.innerWidth <= 1024
              ? ""
              : "search"
          }
          classSearchInput={
            window.innerWidth >= 200 && window.innerWidth <= 1024
              ? "events-page-search-input"
              : ""
          }
          classNameSearchIcon={
            window.innerWidth >= 200 && window.innerWidth <= 1024
              ? "events-page-search-icon"
              : ""
          }
        />
      </div>
      <div className="events-page-list">
        <List
          Component={EventCard}
          // data={eventsData}
          url="/api/events"
          className="eventsList"
          searchValue={query.get("search")}
        />
      </div>
    </div>
    // </div>
  );
}
const mapStateToProps = (state) => {
  return {
    eventsData: state.eventsReducer.eventsData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchEventsData: (obj) => dispatch(fetchEventsData(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Events);
