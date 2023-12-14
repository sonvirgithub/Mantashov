import { SIDEBAR_OPEN } from "../types";

export const setSidebarOpen = () => {
  return (dispatch) => {
    dispatch({
      type: SIDEBAR_OPEN,
     
    });
  };
};
