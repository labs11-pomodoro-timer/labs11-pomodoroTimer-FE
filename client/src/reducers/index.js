import {
    FETCHING_USERS,
    FETCHING_USERS_SUCCESS,
    FETCHING_USERS_FAILURE,
    GET_TIME,
    GET_TIME_SUCCESS,
    GET_TIME_FAILURE
  } from "../actions";
  
  const initialState = {
    users: [], isFetching: false, error: null, gettingTime: false
  };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      
      case FETCHING_USERS:
        return { ...state, isFetching: true} ;
      case FETCHING_USERS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          users: [...state.users, ...action.payload]
        };
        case FETCHING_USERS_FAILURE:
          return { ...state, isFetching: false, error: action.payload };
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
  