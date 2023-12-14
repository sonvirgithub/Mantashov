import React, { useCallback, useState, useEffect, useContext } from "react";
import "./NewsRoom.css";
import SearchBar from "../../../components/SearchBar";
import newsImg1 from "../../../images/image-newsRoom-card.svg";
import List from "../../../components/List/List";
import { useHistory } from "react-router-dom";
import { LanguageContext } from "../../../App";
import { handleFormChange, fetchNewsData } from "../../../store";
import { useQuery } from "../../../functions/useQuery";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import emptyImage from "../../../images/empty.jpg";
import NewsRoomCard from "../../../components/Cards/News/NewsRoom/NewsRoomCard";

function NewsRoom({ fetchNewsData, newsData, handleFormChange, newsCount }) {
  let history = useHistory();
  const translatedData = useContext(LanguageContext);
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const query = useQuery();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleFormChange("headerColorBlack", false);
    handleFormChange("currentPageName", "News");
  }, []);

  const handleClick = () => {
    //open news archive page
    history.push(`/news/archive`);
  };

  return (
    <div className="newsroom-container background-white">
      <div className="header-and-search flex-space-between">
        <p className="newsroom-header font-size-62 color-black " lang={lng}>
          Mantashov NewsRoom
          {/* {translatedData.newsRoom} */}
        </p>
        <div className="searchbar-container">
          <SearchBar open={open} setOpen={setOpen} pageName="NewsRoom" />
        </div>
      </div>
      <div className="position-relative news-list-container">
        <div className="news-list-component">
          <List
            Component={NewsRoomCard}
            // data1={newsData1}
            className="newsList"
            url="/api/news"
            search={query.get("search")}
          />
        </div>
        <div className="news-description-container position-absolute">
          <span className="news-description-text font-bold-700 font-size-18">
            allow you to receive payments regardless of where your clients{" "}
            {/* {translatedData.newsRoomDecs} */}
          </span>
          <span
            className="view-achive-text  font-size-18"
            onClick={handleClick}
            lang={lng}
          >
            {/* view archive */}
            {translatedData.viewAchive}
          </span>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    newsData: state.newsReducer.newsData,
    newsCount: state.newsReducer.newsCount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchNewsData: (obj) => dispatch(fetchNewsData(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsRoom);
