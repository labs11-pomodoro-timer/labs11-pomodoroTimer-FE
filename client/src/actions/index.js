import axios from 'axios';

export const START_TIME = 'START_TIME';
export const START_TIME_SUCCESS = 'START_TIME_SUCCESS';
export const START_TIME_FAILURE = 'START_TIME_FAILURE';

export const timer = (time) => dispatch => {
  dispatch({ type: START_TIME });
  axios
    // http://localhost:8000/api/timer/start/${time}
    // https://focustimer-labs11.herokuapp.com/api/timer/start/${time}
    .get(`http://localhost:8000/api/timer/start/${time}`)
    .then(response => {
      dispatch({ type: START_TIME_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: START_TIME_FAILURE, payload: error });
    });
};

export const GET_TIME = 'GET_TIME';
export const GET_TIME_SUCCESS = 'GET_TIME_SUCCESS';
export const GET_TIME_FAILURE = 'GET_TIME_FAILURE';

export const getTime = (id) => dispatch => {
  dispatch({ type: GET_TIME });
  axios
    // http://localhost:8000/api/timer/checkTimer/${id}
    // https://focustimer-labs11.herokuapp.com/api/timer/checkTimer/${id}
    .get(`http://localhost:8000/api/timer/checkTimer/${id}`)
    .then(response => {
      dispatch({ type: GET_TIME_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: GET_TIME_FAILURE, payload: error });
    });
};

export const FETCH_EMAIL = 'FETCH_EMAIL';
export const FETCH_EMAIL_FOUND = 'FETCH_EMAIL_FOUND';
export const FETCH_EMAIL_NOTFOUND = 'FETCH_EMAIL_NOTFOUND';
export const FETCH_EMAIL_FAILURE = 'FETCH_EMAIL_FAILURE';

export const getEmail = (email) => dispatch => {
  axios
    // .get(`https://focustimer-labs11.herokuapp.com/api/users/${email}`)
    .get(`http://localhost:8000/api/users/${email}`)
    .then(res => {
      dispatch({ type: FETCH_EMAIL_FOUND, payload: res.data });
    })
    .catch(err => {
      if (FETCH_EMAIL_NOTFOUND) {
        dispatch({ type: FETCH_EMAIL_NOTFOUND, payload: err });
      } else {
        dispatch({ type: FETCH_EMAIL_FAILURE, payload: err });
      }
    });
}
