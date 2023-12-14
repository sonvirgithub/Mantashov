import { SIDEBAR_CLOSED } from "../types";

export const setSideBarClosed = () => {
  return (dispatch) => {
    dispatch({
      type: SIDEBAR_CLOSED,
     
    });
  };
};
