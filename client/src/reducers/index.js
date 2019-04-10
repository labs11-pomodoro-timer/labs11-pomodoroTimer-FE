import {
    START_TIME,
    START_TIME_SUCCESS,
    START_TIME_FAILURE,
    GET_TIME,
    GET_TIME_SUCCESS,
    GET_TIME_FAILURE
  } from "../actions";
  
  const initialState = {
    error: null, timerStarted: false, gettingTime: false
  };
  const reducer = (state = initialState, action) => {
    switch (action.type) {

      case START_TIME:
        return {...state, timerStarted: true};
      case START_TIME_SUCCESS:
        return {
          ...state,
          timerStarted: false
        };
      case START_TIME_FAILURE:
        return { ...state, timerStarted: false, error: action.payload };
      case GET_TIME:
        return { ...state, gettingTime: true };
      case GET_TIME_SUCCESS:
        return { ...state, gettingTime: false };
      case GET_TIME_FAILURE:
        return { ...state, gettingTime: false, error: action.payload };
      default:
        return state;
    }
  };

  export default reducer;
  