import { handleFormChange } from "../../form/actions";
import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILED,
} from "../types";

export const fetchNewsData = (obj) => {
  return (dispatch) => {
    dispatch(fetchNewsRequest());
    fetch(
      `/api/news/archive/${obj.page}?lng=${obj.lang ?? "en"}&searchValue=${
        obj.searchValue
      }&itemCount=10`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchNewsSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchNewsFailure(errorMsg));
      });
  };
};

export const fetchNewsRequest = () => {
  return {
    type: FETCH_NEWS_REQUEST,
  };
};

const fetchNewsSuccess = (data) => {
  const newsData = data ? data.news : [];
  const newsCount = data ? data.count : 0;
  return {
    type: FETCH_NEWS_SUCCESS,
    payload: { newsData, newsCount },
  };
};

const fetchNewsFailure = (error) => {
  return {
    type: FETCH_NEWS_FAILED,
    payload: { error },
  };
};
