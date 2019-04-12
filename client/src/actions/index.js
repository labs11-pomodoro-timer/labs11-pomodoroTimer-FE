import axios from 'axios';

export const START_TIME = 'START_TIME';
export const START_TIME_SUCCESS = 'START_TIME_SUCCESS';
export const START_TIME_FAILURE = 'START_TIME_FAILURE';

// http://localhost:8000
// https://focustimer-labs11.herokuapp.com
const urlHost = 'http://localhost:8000'

export const timer = (time, id) => dispatch => {
  dispatch({ type: START_TIME });
  axios
    .put(`${urlHost}/api/timer/startTimer/${id}/${time}`)
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
    .get(`${urlHost}/api/timer/checkTimer/${id}`)
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
  dispatch({ type: FETCH_EMAIL });
  axios
    .get(`${urlHost}/api/users/${email}`)
    .then(res => {
      dispatch({ type: FETCH_EMAIL_FOUND, payload: res.data });
      localStorage.setItem('id', res.data[0].id)
    })
    .catch(err => {
      if (FETCH_EMAIL_NOTFOUND) {
        dispatch({ type: FETCH_EMAIL_NOTFOUND, payload: err });
      } else {
        dispatch({ type: FETCH_EMAIL_FAILURE, payload: err });
      }
    });
}
