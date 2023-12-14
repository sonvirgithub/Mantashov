import {
  FETCH_SPEAKERS_REQUEST,
  FETCH_SPEAKERS_SUCCESS,
  FETCH_SPEAKERS_FAILED,
} from "./types";

const initialState = {
  loading: true,
  error: null,
  speakersData: [],
};

const speakersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPEAKERS_REQUEST:
      return {
        ...state,
        loading: true,
        speakersData: [],
      };
    case FETCH_SPEAKERS_SUCCESS:
      return {
        ...state,
        speakersData: action.payload.speakersData,
        error: null,
        loading: false,
      };
    case FETCH_SPEAKERS_FAILED:
      return {
        ...state,
        speakersData: [],
        error: action.payload.error,
        loading: false,
      };

    default:
      return { ...state };
  }
};

export default speakersReducer;
