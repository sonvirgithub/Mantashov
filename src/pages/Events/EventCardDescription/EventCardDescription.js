import React, { useEffect, useState, useContext } from "react";
import "./EventCardDescription.css";
import { handleFormChange, fetchEventById } from "../../../store";
import { connect } from "react-redux";
import { useParams } from "react-router";
import SpeakerCard from "../../../components/Cards/Speaker/Speaker";
import { useCookies } from "react-cookie";
import SliderOfImages from "../../../components/SliderOfImages";
// import empty from "../../../images/empty.jpg";
import ListSpeakersOfEvent from "./ListSpeakersOfEvent/ListSpeakersOfEvent";
import { LanguageContext } from "../../../App";
import ContentOfDetails from "../../../components/ComponentOfDetails";
import ContactForJoin from "../../../components/Cards/Contact/components/ContactForJoin";
import List from "../../../components/List/List";

function EventCardDescription({
  handleFormChange,
  fetchEventById,
  eventDetails,
  eventImages,
  nameEvent,
  shortDesc,
  speakersOfEvent,
}) {
  const { eventCardId } = useParams();
  const [cookies] = useCookies();
  const translatedData = useContext(LanguageContext);
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  useEffect(() => {
    handleFormChange("headerColorBlack", true);
    fetchEventById(eventCardId, cookies.lang ? cookies.lang : "en");
    handleFormChange("currentPageName", "Event");
  }, [eventCardId, cookies.lang]);

  // useEffect(() => {
  //   cookies.lang ? setLng(cookies.lang) : setLng("en");
  // }, [cookies.lang]);

  const regex = (url) => {
    const regex1 = /<iframe.*?src=['"](.*?)['"]/;
    return regex1?.exec(url)[1];
  };
  const openJoinPage = () => {
    document.body.classList.add("sideBar-opened");
    handleFormChange("joinOpen", true);
  };

  return (
    <div className="event-details-container background-black">
      <p className="event-title color-white"> {nameEvent}</p>
      <p className="event-short-desc">{shortDesc}</p>
      <p className="scrole-textfont-size-16">Scrole</p>
      {eventImages.length > 0 ? (
        <div className="event-fixed-imgs">
          <div className="imgs-first-row">
            {eventImages[0] ? (
              <div className="img1-event-details ">
                <img
                  src={eventImages[0]}
                  className="img1 border-radius-img"
                  alt="1"
                />
              </div>
            ) : null}
            {eventImages[2] ? (
              <div className="img3-event-details">
                <img
                  src={eventImages[2]}
                  className="img3 border-radius-img"
                  alt="3"
                />
              </div>
            ) : null}

            {
              <div className="imgs-6-7-container">
                {eventImages[5] ? (
                  <div className="img6-event-details">
                    <img
                      src={eventImages[5]}
                      alt="img6"
                      className="img6 border-radius-img"
                    />
                  </div>
                ) : null}
                {eventImages[6] ? (
                  <div className="img7-event-details">
                    <img
                      src={eventImages[6]}
                      alt="img7"
                      className="img7 border-radius-img"
                    />
                  </div>
                ) : null}
              </div>
            }
          </div>
          <div className="imgs-second-row">
            {eventImages[1] ? (
              <div className="img2-event-details ">
                <img
                  src={eventImages[1]}
                  alt="img2"
                  className="img2 border-radius-img"
                />
              </div>
            ) : null}

            <div className="imgs-4-5-8-container">
              {eventImages[3] ? (
                <div className="img4-event-details">
                  <img
                    src={eventImages[3]}
                    alt="img4"
                    className="img4 border-radius-img"
                  />
                </div>
              ) : null}
              <div className="imgs-5-8-container">
                {eventImages[4] ? (
                  <div className="img5-event-details">
                    <img
                      src={eventImages[4]}
                      alt="img5"
                      className="img5 border-radius-img"
                    />
                  </div>
                ) : null}
                {eventImages[7] ? (
                  <div className="img8-event-details">
                    <img
                      src={eventImages[7]}
                      className="img8 border-radius-img"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {eventDetails?.map((event) => {
        return (
          <>
            <p className="top-text font-regular-400 color-white" key={event}>
              {event?.topText}
            </p>
            <div className="event-card-desc-img9 event-carousel-container">
              {event?.images.length > 0 ? (
                <SliderOfImages
                  img={event?.images}
                  carouselClassName="event-carousel"
                />
              ) : null}
            </div>

            {event?.links?.length > 0
              ? event?.links.map((link, index) => {
                  return link.match(/(<iframe.+?<\/iframe>)/g) ? (
                    <iframe
                      key={index}
                      width="560"
                      height="315"
                      className="link-video event-video-links"
                      src={regex(link)}
                    ></iframe>
                  ) : null;
                })
              : null}
            <p className="top-text font-regular-400 color-white">
              {event?.bottomText}
            </p>
            {event?.videos.map((video) => {
              return (
                <div
                  className="event-card-desc-img9 event-video-container video-of-details"
                  key={video}
                >
                  <video className="event-card-desc-img9" controls>
                    <source src={video} type="video/mp4"></source>
                  </video>
                </div>
              );
            })}
          </>
        );
      })}
      {speakersOfEvent.length > 0 ? (
        <div className="member-three-cards">
          <div>
            <p className="exclusive font-bold-700 color-white">
              Exclusive offers throughout the year on hospitality
            </p>

            <div className="speakers-list-event-details">
              <List
                Component={SpeakerCard}
                arrowColor="white"
                url={`/api/events/event/details/${eventCardId}`}
                className="speakersList"
                listSpeakersOfEvent={true}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="event-info-for-share-container">
        <div className="event-sharing-info">
          <ContentOfDetails
            title="Share article"
            containerClassName="share-content-for-event share-info"
            links={["Facebook", "Instagram", "Linkedin", "Twitter"]}
            mode="dark"
          />
          <ContentOfDetails
            title="Reference"
            containerClassName="share-content-for-event"
            mode="dark"
          />
          <ContactForJoin containerClassName="contacts-component" />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    eventDetails: state.eventsReducer.eventDetails ?? [],
    eventImages: state.eventsReducer.eventImages,
    nameEvent: state.eventsReducer.nameEvent,
    shortDesc: state.eventsReducer.shortDesc,
    speakersOfEvent: state.eventsReducer.speakersOfEvent,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchEventById: (id, lng) => dispatch(fetchEventById(id, lng)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCardDescription);
