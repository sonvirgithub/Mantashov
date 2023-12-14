import {
  FETCH_TURNOVERS_REQUEST,
  FETCH_TURNOVERS_SUCCESS,
  FETCH_TURNOVERS_FAILED,
  ADD_APPLICANT_REQUEST,
  ADD_APPLICANT_SUCCESS,
  ADD_APPLICANT_FAILED,
} from "./types";

const initialState = {
  loading: true,
  error: null,
  turnovers: [],
};

const joinReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TURNOVERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        turnovers: [],
      };
    case FETCH_TURNOVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        turnovers: action.payload.turnovers,
      };
    case FETCH_TURNOVERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        turnovers: [{id:1,value:"200mln"},{id:1,value:"500mln"},{id:1,value:"+500mln"}],
      };

    default:
      return { ...state };
  }
};

export default joinReducer;
