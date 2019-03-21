import {
    FETCHING_USERS,
    FETCHING_USERS_SUCCESS,
    FETCHING_USERS_FAILURE
  } from "../actions";
  
  const initialState = {
    users: [], isFetching: false, error: null
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
      default:
        return state;
    }
  };

  export default reducer;
  