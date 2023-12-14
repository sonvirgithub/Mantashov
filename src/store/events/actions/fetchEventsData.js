import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILED,
} from "../types";

export const fetchEventsData = (obj) => {
 
  return (dispatch) => {
    dispatch(fetchEventsRequest());
    fetch(`/api/events/web/${obj.page}?lng=${obj.language}?searchValue=${obj.searchValue}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchEventsSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchEventsFailure(errorMsg));
      });
  };
};

export const fetchEventsRequest = () => {
  return {
    type: FETCH_EVENTS_REQUEST,
  };
};

const fetchEventsSuccess = (data) => {
  const eventsData = data ? data : [];
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: { eventsData },
  };
};

const fetchEventsFailure = (error) => {
  return {
    type: FETCH_EVENTS_FAILED,
    payload: { error },
  };
};
