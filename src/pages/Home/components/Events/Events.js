
import React, { useEffect, useContext } from "react";
import "./Events.css";
import EventCard from "../../../../components/Cards/Event/EventCard";
import List from "../../../../components/List/List";
// import img1 from "../../../../images/1.png";
// import img2 from "../../../../images/2.png";
import img1 from "../../../../images/events-block-img1.svg";
import img2 from "../../../../images/member1.svg";
import img3 from "../../../../images/events-block-img3.svg";
import { fetchEventsData } from "../../../../store";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { LanguageContext } from "../../../../App";

function Events({ fetchEventsData, eventsData, id }) {
  const [cookies] = useCookies();
  const translatedData = useContext(LanguageContext);

  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  // useEffect(() => {
  //   fetchEventsData({page:1, lng:cookies.lang,searchvalue:""});
  // }, [cookies.lang]);

  return (
    <div className="events-block" id={id}>
      <div className="events-block-desc flex-space-between">
        <p className="events-block-title color-black" lang={lng}>
          More than one hundred events each year
          {/* {translatedData.eventsTitle} */}
        </p>
      </div>
      <div className="events-block-desc flex-space-between">
        <p className="events-block-text color-black " lang={lng}>
          Mantashov Entrepreneurs Union prioritises the education and continuous
          progress. Within the union, 100 events are organized annually on
          various topics, during which issues related to business, community and
          other social problems are discussed.
          {/* {translatedData.eventsDesc} */}
        </p>
      </div>

      <div className="events-list-home-page">
        <List
          Component={EventCard}
          // data={eventsData}
          // data={events}
          url="/api/events"
          className="eventsList"
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    eventsData: state.eventsReducer.eventsData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEventsData: (obj) => dispatch(fetchEventsData(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
