import React, { useEffect, useContext } from "react";
import List from "../../../../components/List/List";
import "./Speakers.css";
import SpeakerCard from "../../../../components/Cards/Speaker/Speaker";
import img1 from "../../../../images/img-card-speaker.svg";
import { fetchSpeakersData } from "../../../../store";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { LanguageContext } from "../../../../App";

function Speakers({ fetchSpeakersData, speakersData, id }) {
  const [cookies] = useCookies();
  const translatedData = useContext(LanguageContext);
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  // useEffect(() => {
  //   fetchSpeakersData(1, cookies.lang);
  // }, [cookies.lang]);

  return (
    <div
      className="speakers-block background-black"
      id={id}
      style={{ background: "#000000" }}
    >
      <div className="speakers-block-desc">
        <p className="speakers-block-desc-first-content color-white" lang={lng}>
          Our Speakers
          {/* {translatedData.speakersTitle} */}
        </p>
        <div className="speakers-block-desc-second-and-three-content">
          <p
            className="speakers-block-desc-second-content color-white font-bold-600"
            lang={lng}
          >
            Meet our speakers: honorary successful businessmen and businesswomen
            in Armenia and abroad who have a lot to teach. Each speaker has a
            field of his or her expertise and years of powerful experience.{" "}
            {/* {translatedData.speakersDesc} */}
          </p>
          <p
            className="speakers-block-desc-three-content color-dark-gray font-bold-600"
            lang={lng}
          >
            They are choosen to share their knowledge and explain their path of
            success.{" "}
            {/* {translatedData.speakerDescSmall} */}
          </p>
        </div>
      </div>
      <div className="speakersListComponent">
        <List
          Component={SpeakerCard}
          // data={speakersData}
          arrowColor="white"
          url="/api/speakers"
          className="speakersList"
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    speakersData: state.speakersReducer.speakersData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpeakersData: (page, language) =>
      dispatch(fetchSpeakersData(page, language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speakers);
