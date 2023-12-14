import React, { useContext } from "react";
import "./OneStory.css";
import { LanguageContext } from "../../../../../App";
import emptyImage from "../../../../../images/empty.jpg";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

function OneStory({ cardData }) {
  // const translatedData = useContext(LanguageContext);
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];
  const history = useHistory();

  const openNewsDetails = () => {
    history.push(`/pages/NewsCard/${cardData.id}`);
  };
  return (
    <div className="one-story-container" 
    // onClick={openNewsDetails}
    >
      <img
        src={require("../../../../../images/stories/story1.jpeg")}
        alt="story"
        className="stories-block-img"
      />
      <p className="one-story-text color-white font-medium-500" lang={lng}>
        {cardData.title}
      </p>
    </div>
  );
}

export default OneStory;
