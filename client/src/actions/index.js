import axios from 'axios';

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCHING_USERS_SUCCESS = 'FETCHING_USERS_SUCCESS';
export const FETCHING_USERS_FAILURE = 'FETCHING_USERS_FAILURE';

export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCHING_USERS });
  axios
    .get('https://focustimer-labs11.herokuapp.com/api/users')
    .then(response => {
      dispatch({ type: FETCHING_USERS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: FETCHING_USERS_FAILURE, payload: error });
    });
};

export const START_TIME = 'START_TIME';
export const START_TIME_SUCCESS = 'START_TIME_SUCCESS';
export const START_TIME_FAILURE = 'START_TIME_FAILURE';

export const timer = (time) => dispatch => {
  dispatch({ type: START_TIME });
  axios
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
    .get(`https://localhost:8000/api/timer/checkTimer/${id}`)
    .then(response => {
      dispatch({ type: GET_TIME_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: GET_TIME_FAILURE, payload: error });
    });
};