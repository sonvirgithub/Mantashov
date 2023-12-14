import {
  FETCH_NEWS_BY_ID_REQUEST,
  FETCH_NEWS_BY_ID_SUCCESS,
  FETCH_NEWS_BY_ID_FAILED,
} from "../types";

export const fetchNewsDetails = (id, lng) => {
  return (dispatch) => {
    dispatch(fetchNewsDetailsRequest());
    fetch(`/api/news/details/${id}?lng=${lng}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchNewsDetailsSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchNewsDetailsFailure(errorMsg));
      });
  };
};

export const fetchNewsDetailsRequest = () => {
  return {
    type: FETCH_NEWS_BY_ID_REQUEST,
  };
};

const fetchNewsDetailsSuccess = (data) => {
  const newsDetails = data ? data.details : [];
  const newsImages = data ? data.images : [];
  const newsName = data ? data.name : "";
  return {
    type: FETCH_NEWS_BY_ID_SUCCESS,
    payload: { newsDetails, newsImages, newsName },
  };
};

const fetchNewsDetailsFailure = (error) => {
  return {
    type: FETCH_NEWS_BY_ID_FAILED,
    payload: { error },
  };
};
