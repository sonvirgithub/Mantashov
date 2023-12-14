import {
    FETCH_MEMBERS_REQUEST,
    FETCH_MEMBERS_SUCCESS,
    FETCH_MEMBERS_FAILED,
  } from "./types";
  
  const initialState = {
    loading: true,
    error: null,
    membersData: [],
  };
  
  const membersReducer = (state = initialState, action) => {
      switch (action.type) {
        case FETCH_MEMBERS_REQUEST:
          return {
            ...state,
            loading: true,
            membersData: [],
          };
        case FETCH_MEMBERS_SUCCESS:
          return {
            ...state,
            membersData: action.payload.membersData,
            error: null,
            loading: false,
          };
        case FETCH_MEMBERS_FAILED:
          return {
            ...state,
            membersData: [],
            error: action.payload.error,
            loading: false,
          };
    
        default:
          return { ...state };
      }
    };
    
    export default membersReducer;
  