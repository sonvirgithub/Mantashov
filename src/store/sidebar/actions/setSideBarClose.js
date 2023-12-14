import { SIDEBAR_CLOSE } from "../types";

export const setSidebarClose = () => {
  return (dispatch) => {
    dispatch({
      type: SIDEBAR_CLOSE,
     
    });
  };
};
