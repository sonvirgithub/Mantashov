import React, { useCallback, useContext, useEffect, useState } from "react";

import "./NewsArchive.css";
import archivedNews1 from "../../../images/archivedNews1.svg";
import archivedNews2 from "../../../images/archivedNews2.svg";
import SearchBar from "../../../components/SearchBar";
import ArchiveCard from "../../../components/Cards/News/Archive";
import Pagination from "../../../components/Pagination/Pagination";
import { LanguageContext } from "../../../App";
import store, { handleFormChange, fetchNewsData } from "../../../store";
import { useQuery } from "../../../functions/useQuery";
import { connect } from "react-redux";
import emptyImage from "../../../images/empty.jpg";
import { useCookies } from "react-cookie";
function NewsArchive({
  fetchNewsData,
  newsData,
  handleFormChange,
  newsCount,
  loading,
}) {
  const translatedData = useContext(LanguageContext);
  const [cookies, setCookie] = useCookies(["lang"]);

  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const query = useQuery();
  const [open, setOpen] = useState(false);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    handleFormChange("headerColorBlack", false);
    handleFormChange("currentPageName", translatedData.newsRoom);
    fetchNewsData({
      page: 1,
      lang: cookies.lang,
      searchValue: "",
    });
    let number =
      newsCount % 10 === 0
        ? parseInt(newsCount / 10)
        : parseInt(newsCount / 10) + 1;
    setPages(number);
  }, [cookies.lang]);

  useEffect(() => {
    handleFormChange("headerColorBlack", false);
    handleFormChange("currentPageName", translatedData.newsRoom);
    fetchNewsData({
      page: 1,
      lang: cookies.lang,
      searchValue: "",
    });
    let number =
      newsCount % 10 === 0
        ? parseInt(newsCount / 10)
        : parseInt(newsCount / 10) + 1;
    setPages(number);
  }, []);

  useEffect(() => {
    if (newsCount !== 0) {
      let number =
        newsCount % 10 === 0
          ? parseInt(newsCount / 10)
          : parseInt(newsCount / 10) + 1;
      setPages(number);
    } else {
      setPages(1);
    }
  }, [newsData]);

  //need to change, it is only for test
  const prevExist = false;
  const nextExist = true;

  return (
    <div className="news-achive-container background-white">
      <SearchBar
        className="news-searchbar"
        inputClass="archive-input"
        open={open}
        setOpen={setOpen}
        pageName="news/archive"
      />
      <p className="news-archive-header color-black" lang={lng}>
        Newsroom Archive
        {/* {translatedData.newsRoomArchive} */}
      </p>

      <div className="news-achive-cards-container">
        {newsData?.map((item) => (
          <div className="one-news-achive-card" key={item.id}>
            <ArchiveCard
              image={item.image ?? emptyImage}
              createdDate={item.createdDate}
              title={item.title}
              description={item.description}
              address={item.address}
              id={item.id}
              text={item.text}
            />
          </div>
        ))}
      </div>

      {pages !== 0 ? (
        <Pagination
          className="news-pagination"
          leftArrowColor={prevExist ? "#000000" : "#C9C9C9"}
          rightArrowColor={nextExist ? "#000000" : "#C9C9C9"}
          currentPage={1}
          pages={pages}
        />
      ) : null}

      {/* ) : null} */}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    newsData: state.newsReducer.newsData,
    newsCount: state.newsReducer.newsCount,
    loading: state.newsReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchNewsData: (obj) => dispatch(fetchNewsData(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsArchive);
