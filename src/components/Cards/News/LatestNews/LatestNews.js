import React from "react";
import NewsComponent from "../NewsComponent/NewsComponent";
import "./LatestNews.css";

function LatestNews({ cardData }) {
  return (
    // <div className="news-details-component">
    <>
      {" "}
      <NewsComponent
        id={cardData.id}
        title={cardData.title}
        description={cardData.description}
        date={cardData.createdDate}
        text={cardData.text}
        className="news-details-component"
        tabClassName="news-details-component-tab"
      />
    </>

    // </div>
  );
}

export default LatestNews;
