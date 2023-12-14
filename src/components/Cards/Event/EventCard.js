import React from "react";

// import { useHistory } from "react-router";
import OpenButton from "../../Button/OpenButton/OpenButton";
import "./eventCard.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchEventById } from "../../../store";
import { useCookies } from "react-cookie";

function EventCard({ cardData, fetchEventById }) {
  const history = useHistory();
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const date = new Date(cardData.startDate);
  const today = new Date();

  const eventDate = `${date.getDate()}.${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getFullYear()}`;

  const eventStatus = `${date.getTime > today.getTime() ? "must be" : "been"}`;
  const className = `${date.getTime > today.getTime() ? "must-be" : "been"}`;

  const openEventDetailPage = (id) => {
    history.push(`/pages/EventCard/${id}`);
    fetchEventById(id);
  };

  return (
    <div className="event-card-container">
      <div
        className={`event-images-container 
        ${cardData.images?.length === 3 ? "three-images" : "two-images"}
          `}
      >
        {cardData.images?.length === 3 ? (
          cardData.images?.map((img, index) => (
            <div key={index} className="three-images-item">
              <img 
              // src={img}
              src={require("../../../images/events/event1.png")}
               alt="one event" />
            </div>
          ))
        ) : (
          <div className="two-images">
            <div className={`two-images-item firstImage`}>
              <img
                // src={cardData.images ? cardData.images[0] : ""}
                src={require("../../../images/events/event2.png") }

                alt="one event"
              />
            </div>

            <div className={`two-images-item secondImage`}>
              <img
                // src={cardData.images ? cardData.images[1] : ""}
                src={require("../../../images/events/event3.jpeg") }

                alt="one event"
              />
            </div>
          </div>
        )}
      </div>

      <div className="event-name-and-open-btn">
        <div className="event-name-and-desc">
          <p className="event-name color-black " lang={lng}>
            {cardData.name}
          </p>
          <p className="event-description color-black" lang={lng}>
            {cardData.description}
          </p>
        </div>
        <OpenButton
          classname={"background-dark-blue"}
          name="Open"
          color={""}
          textClassname="color-white"
          // onClick={() => openEventDetailPage(cardData.id)}
        />
      </div>

      <div className="event-status-and-date flex-space-between">
        <div className="status-container">
          <p
            className={`event-status-text font-medium-500 ${className}`}
            lang={lng}
          >
            {eventStatus}
          </p>
        </div>
        <div className="date-and-arrow-container">
          <span className="event-date-text " lang={lng}>
            {/* {eventDate} */}
           10.03.2021-13.12.2013
          </span>
          <img
            className="arrow-to-event-img"
            src={require("../../../images/arrow-right-to-event.svg").default}
            alt="arrow right"
          />
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchEventById: (eventId) => dispatch(fetchEventById(eventId)),
  };
};
export default connect(null, mapDispatchToProps)(EventCard);
