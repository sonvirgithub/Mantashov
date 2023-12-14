import {
  FETCH_EVENT_BY_ID_REQUEST,
  FETCH_EVENT_BY_ID_SUCCESS,
  FETCH_EVENT_BY_ID_FAILED,
} from "../types";

export const fetchEventById = (id, lng) => {
  return (dispatch) => {
    dispatch(fetchEventByIdRequest());
    fetch(`/api/events/event/details/${id}?lng=${lng}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        
        dispatch(fetchEventByIdSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchEventByIdFailure(errorMsg));
      });
  };
};

export const fetchEventByIdRequest = () => {
  return {
    type: FETCH_EVENT_BY_ID_REQUEST,
  };
};

const fetchEventByIdSuccess = (data) => {
  const eventDetails = data ? data.event.details : [];
  const speakersOfEvent = data ? data.event.speakers : [];
  const eventImages = data ? data.event.fixedImages : [];
  const nameEvent = data ? data.event.name : "";
  const shortDesc = data ? data.event.shortDescription : "";

  return {
    type: FETCH_EVENT_BY_ID_SUCCESS,
    payload: {
      eventDetails,
      eventImages,
      nameEvent,
      shortDesc,
      speakersOfEvent,
    },
  };
};

const fetchEventByIdFailure = (error) => {
  return {
    type: FETCH_EVENT_BY_ID_FAILED,
    payload: { error },
  };
};
