import { INIT_FORM, CLEAN_FROM, HANDLE_FORM_CHANGE } from "./types";

const initialState = {};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_FORM_CHANGE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case CLEAN_FROM:
      return {};
    case INIT_FORM:
      return {
        ...action.payload.form,
      };
    default:
      return state;
  }
};

export default formReducer;
