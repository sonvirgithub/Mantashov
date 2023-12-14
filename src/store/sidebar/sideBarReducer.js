import { SIDEBAR_OPEN,SIDEBAR_CLOSE,SIDEBAR_CLOSED } from "./types";

const initialState = {
  sideBarOpen:false,
  sideBarClose:false
};

const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:

      return {
        ...state,
        sideBarOpen:true,
        sideBarClose:false
        
      };
      case SIDEBAR_CLOSE:

      return {
        ...state,
        sideBarClose:true,
        sideBarOpen:false
        
      };
      case SIDEBAR_CLOSED:

        return {
          ...state,
          sideBarClose:false,
          sideBarOpen:false
          
        };
    default:
      return state;
  }
};

export default sideBarReducer;
