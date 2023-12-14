import {
  ADD_APPLICANT_REQUEST,
  ADD_APPLICANT_SUCCESS,
  ADD_APPLICANT_FAILED,
} from "../types";
import store from '../../../store'
import request from '../../request'

export const addApplicant = (applicantData) => {
    let fullName = store.getState().formReducer.joinName;
    let email = store.getState().formReducer.joinEmail;
    let phone = store.getState().formReducer.joinPhone;
    let turnoverId = store.getState().formReducer.turnoverId;

  return (dispatch) => {
    dispatch({
      type: ADD_APPLICANT_REQUEST,
    })
      request(`/api/members/add-applicant`, "POST", {
      fullName,
      email,
      phone,
      turnoverId,
    })
      .then((data) => {
        dispatch(fetchTurnoversSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchTurnoversFailure(e.message));
      });
  };
};
const fetchTurnoversSuccess = (data) => {
  const turnovers = data ? data : [];
  return {
    type: ADD_APPLICANT_SUCCESS,
    payload: { turnovers },
  };
};

const fetchTurnoversFailure = (error) => {
  return {
    type: ADD_APPLICANT_FAILED,
    payload: { error },
  };
};
