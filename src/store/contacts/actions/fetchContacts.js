import {
    FETCH_CONTACT_REQUEST,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_FAILED,
  } from "../types";
  
  export const fetchContacts = () => {
    return (dispatch) => {
      dispatch(fetchContactsRequest());
      fetch("/api/contacts")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            dispatch(fetchContactsSuccess(data));
          }
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchContactsFailure(errorMsg));
        });
    };
  };
  
  export const fetchContactsRequest = () => {
    return {
      type: FETCH_CONTACT_REQUEST,
    };
  };
  
  const fetchContactsSuccess = (data) => {
    const contactsData = data ? data : [];
    return {
      type: FETCH_CONTACT_SUCCESS,
      payload: { contactsData },
    };
  };
  
  const fetchContactsFailure = (error) => {
    return {
      type: FETCH_CONTACT_FAILED,
      payload: { error },
    };
  };
  