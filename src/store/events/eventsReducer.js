import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILED,
  FETCH_EVENT_BY_ID_REQUEST,
  FETCH_EVENT_BY_ID_SUCCESS,
  FETCH_EVENT_BY_ID_FAILED,
} from "./types";

const initialState = {
  loading: true,
  error: null,
  eventsData: [],
  eventDetails: [],
  eventImages: [],
  nameEvent: "",
  shortDesc: "",
  speakersOfEvent: [],
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        eventsData: [],
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        eventsData: action.payload.eventsData,
        error: null,
        loading: false,
      };
    case FETCH_EVENTS_FAILED:
      return {
        ...state,
        eventsData: [],
        error: action.payload.error,
        loading: false,
      };
    case FETCH_EVENT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        eventDetails: [],
        eventImages: [],
        nameEvent: "",
        shortDesc: "",
      };
    case FETCH_EVENT_BY_ID_SUCCESS:
      return {
        ...state,
        eventDetails: action.payload.eventDetails,
        eventImages: action.payload.eventImages,
        nameEvent: action.payload.nameEvent,
        shortDesc: action.payload.shortDesc,
        error: null,
        loading: false,
        speakersOfEvent: action.payload.speakersOfEvent,
      };
    case FETCH_EVENT_BY_ID_FAILED:
      return {
        ...state,
        eventDetails: [],
        eventImages: [],
        nameEvent: "",
        shortDesc: "",
        error: action.payload.error,
        loading: false,
        speakersOfEvent: [],
      };

    default:
      return { ...state };
  }
};

export default eventsReducer;
