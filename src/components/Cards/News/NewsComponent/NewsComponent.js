import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import OpenButton from "../../../Button/OpenButton/OpenButton";

function NewsComponent({ id, title, date, text, className, tabClassName }) {
  let history = useHistory();
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const handleClick = () => {
    history.push(`/pages/NewsCard/${id}`);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div
      className={`flex-space-between news-info-component-container ${className}`}
    >
      <div className="flex-space-between news-card-text-and-btn">
        <div className="news-card-texts-container">
          <p className="color-white news-card-title" lang={lng}>
            {title}
          </p>
          <p className="color-white news-card-text" lang={lng}>
            {text}
          </p>
        </div>
        <div className="open-button-news">
          <OpenButton
            classname="newsroom-btn"
            name="Open"
            color={""}
            titleColor={"#242426"}
            textClassname="newsroom-btn-text"
            // onClick={handleClick}
          />
        </div>
      </div>

      <div className="flex-space-between open-new-tab-container">
        <div
          className={`flex-space-between open-tab-img-and-text ${tabClassName}`}
          // onClick={() => openInNewTab(`/pages/NewsCard/${id}`)}
        >
          <img
            src={require("../../../../images/open-new-tab.svg").default}
            className="open-tab-img"
            alt=""
          />
          <span className="open-new-tab-text" lang={lng}>
            open in the new tab
          </span>
        </div>
        <div
          className="flex-space-between news-card-date-container"
          // onClick={handleClick}
        >
          <span className="news-card-date" lang={lng}>
            {date}
          </span>
          <img
            src={require("../../../../images/right-arrow.svg").default}
            className="right-arrow-date"
          />
        </div>
      </div>
    </div>
  );
}

export default NewsComponent;
