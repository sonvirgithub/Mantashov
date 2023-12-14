import {
    FETCH_CONTACT_REQUEST,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_FAILED,
  } from "./types";
  
  const initialState = {
    contactsData: [],
    error: null,
    loading: true,
  };
  
  const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CONTACT_REQUEST:
        return {
          ...state,
          loading: true,
          contactsData: [],
        };
      case FETCH_CONTACT_SUCCESS:
        return {
          ...state,
          contactsData: action.payload.contactsData,
          error: null,
          loading: false,
        };
      case FETCH_CONTACT_FAILED:
        return {
          ...state,
          contactsData: [],
          error: action.payload.error,
          loading: false,
        };
  
      default:
        return { ...state };
    }
  };
  
  export default contactsReducer;
  