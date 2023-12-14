import {
  FETCH_SPEAKERS_REQUEST,
  FETCH_SPEAKERS_SUCCESS,
  FETCH_SPEAKERS_FAILED,
} from "../types";

export const fetchSpeakersData = (page, language) => {
  return (dispatch) => {
    dispatch(fetchSpeakersRequest());
    fetch(`/api/speakers/${page}?lng=${language}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchSpeakersSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchSpeakersFailure(errorMsg));
      });
  };
};

export const fetchSpeakersRequest = () => {
  return {
    type: FETCH_SPEAKERS_REQUEST,
  };
};

const fetchSpeakersSuccess = (data) => {
  const speakersData = data ? data : [];
  return {
    type: FETCH_SPEAKERS_SUCCESS,
    payload: { speakersData },
  };
};

const fetchSpeakersFailure = (error) => {
  return {
    type: FETCH_SPEAKERS_FAILED,
    payload: { error },
  };
};
