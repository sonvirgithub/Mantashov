import React, { useContext } from "react";
import OneStory from "./components/OneStory";
import "./Stories.css";
import firstStory from "../../../../images/firstStory.svg";
import secondStory from "../../../../images/secondStory.svg";
import List from "../../../../components/List/List";
import { LanguageContext } from "../../../../App";
import { useCookies } from "react-cookie";

function Stories({ id }) {
  const translatedData = useContext(LanguageContext);
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  return (
    <div className="stories-page-container" id={id}>
      <p className="stories-page-header  font-size-42 color-black" lang={lng}>
        Featured Stories
        {/* {translatedData.storiesTitle} */}
        {/* {translatedData.newsRoom} */}
      </p>
      {/* <OneStory cardData={cardData} /> */}
      <div className="position-relative ">
        <List
          // ListHeaderComponent={() => <div className="story-empty-item"></div>}
          Component={OneStory}
          // arrowColor="white"
          className="storiesList"
          url="/api/news"
          storiesClassName="stories-className"
        />
        <div className="stories-block-text-container">
          <p className="stories-block-text font-bold-700 color-black font-size-21">
          Lorem Ipsum is simply dummy text of the printing and 
          typesetting industry. Lorem Ipsum has been the industry's 
            {/* {translatedData.newsDesc} */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stories;
