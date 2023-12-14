import {
  FETCH_TURNOVERS_REQUEST,
  FETCH_TURNOVERS_SUCCESS,
  FETCH_TURNOVERS_FAILED,
} from "../types";

export const getTurnovers = () => {
  return (dispatch) => {
    dispatch(fetchTurnoversRequest());
    fetch(`/api/members/turnovers`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchTurnoversSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTurnoversFailure(errorMsg));
      });
  };
};

export const fetchTurnoversRequest = () => {
  return {
    type: FETCH_TURNOVERS_REQUEST,
  };
};

const fetchTurnoversSuccess = (data) => {
  // const turnovers = data ? data : [];
  const turnovers =  [{id:1,value:"200"},{id:1,value:"500"},{id:1,value:"+500"}]
  return {
    type: FETCH_TURNOVERS_SUCCESS,
    payload: { turnovers },
  };
};

const fetchTurnoversFailure = (error) => {
  return {
    type: FETCH_TURNOVERS_FAILED,
    payload: { error },
  };
};
