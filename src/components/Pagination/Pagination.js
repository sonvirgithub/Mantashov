import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useQuery } from "../../functions/useQuery";
import store, { fetchNewsData, handleFormChange } from "../../store";
import Arrow from "./components/Arrow";
import "./Pagination.css";
import { useCookies } from "react-cookie";

function Pagination({ pageCount, className, fetchNewsData, pages }) {
  const [cookies] = useCookies(["lang"]);

  function generateUrlParams(newPage) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage);
    return urlParams;
  }

  // const page = window.location.pathname;
  let query = useQuery();
  let cp = query.get("page");
  let currentPage = cp ? parseInt(cp) : 1;
  const history = useHistory();
  let searchValue = query.get("search");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", currentPage);
    history.push("?" + urlParams);
  }, []);
  useEffect(() => {
    handleFormChange("currentPage", currentPage);
    handleFormChange("rowCount", 5);
    fetchNewsData({
      page: currentPage,
      lang: cookies.lang,
      searchValue: searchValue ? searchValue : "",
    });
  }, [currentPage, searchValue]);

  if (pageCount == 0) {
    return null;
  }

  return (
    <div className={`pagination ${className}`}>
      <Arrow
        color={currentPage > 1 ? "black" : "#C9C9C9"}
        className={`left-arrow ${currentPage > 1 ? "" : "cursor-initial"}`}
        handleClick={() => {
          currentPage > 1 &&
            currentPage !== pageCount &&
            history.push(`?${generateUrlParams(currentPage - 1)}`);
        }}
      />
      <p className="pagination-text font-medium-500">
        {currentPage} of {pages}
      </p>
      <Arrow
        color={currentPage !== pages ? "black" : "#C9C9C9"}
        className={`right-arrow ${
          currentPage != pages ? "" : "cursor-initial"
        }`}
        handleClick={() => {
          currentPage !== pages &&
            history.push(`?${generateUrlParams(currentPage + 1)}`);
        }}
      />
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
    handleFormChange: (key, name) => dispatch(handleFormChange(key, name)),
    fetchNewsData: (obj) => dispatch(fetchNewsData(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
