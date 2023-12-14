import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILED,
  FETCH_NEWS_BY_ID_REQUEST,
  FETCH_NEWS_BY_ID_SUCCESS,
  FETCH_NEWS_BY_ID_FAILED,
} from "./types";

const initialState = {
  loading: true,
  error: null,
  newsData: [],
  newsDetails: [],
  newsImages: [],
  newsCount: 0,
  newsName: "",
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
        newsData: [],
        newsCount: 0,
      };
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        newsData: action.payload.newsData,
        newsCount: action.payload.newsCount,
        error: null,
        loading: false,
      };
    case FETCH_NEWS_FAILED:
      return {
        ...state,
        newsData: [],
        newsCount: 0,
        error: action.payload.error,
        loading: false,
      };
    case FETCH_NEWS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        newsDetails: [],
        newsImages: [],
        newsName: "",
      };
    case FETCH_NEWS_BY_ID_SUCCESS:
      return {
        ...state,
        newsDetails: action.payload.newsDetails,
        newsImages: action.payload.newsImages,
        newsName: action.payload.newsName,
        error: null,
        loading: false,
      };
    case FETCH_NEWS_BY_ID_FAILED:
      return {
        ...state,
        newsDetails: [],
        newsImages: [],
        newsName: "",
        error: action.payload.error,
        loading: false,
      };

    default:
      return { ...state };
  }
};

export default newsReducer;
