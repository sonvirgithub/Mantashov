import {
    FETCH_MEMBERS_REQUEST,
    FETCH_MEMBERS_SUCCESS,
    FETCH_MEMBERS_FAILED,
  } from "../types";
  
  export const fetchMembersData = (obj) => {
    console.log("sss");

    return (dispatch) => {
      dispatch(fetchMembersRequest());
      fetch(`/api/members/${obj.page}?lng=en&searchValue='b'&itemCount=10`)
        .then((res) => {

          return res.json();
        })
        .then((data) => {
     
            dispatch(fetchMembersSuccess(data));
            
        })
        .catch((error) => {

          const errorMsg = error.message;
          dispatch(fetchMembersFailure(errorMsg));
        });
    };
  };


export const fetchMembersRequest = () => {
  return {
    type: FETCH_MEMBERS_REQUEST,
  };
};

const fetchMembersSuccess = (data) => {
  const membersData = data ? data : [];
     
  return {
    type: FETCH_MEMBERS_SUCCESS,
    payload: { membersData },
  };
};

const fetchMembersFailure = (error) => {
  return {
    type: FETCH_MEMBERS_FAILED,
    payload: { error },
  };
};
