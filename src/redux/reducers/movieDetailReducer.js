import {
    REQUEST_MOVIE_DETAIL,
    REQUEST_MOVIE_DETAIL_SUCCESS,
    REQUEST_MOVIE_DETAIL_FAIL,
  } from "../action/type";
  
  const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  function movieDetailReducer(state = initialState, action) {
    switch (action.type) {
      case REQUEST_MOVIE_DETAIL:
        return { ...state, loading: true };
      case REQUEST_MOVIE_DETAIL_SUCCESS:
        return { ...state, loading: false, error: null, data: action.payload};
      case REQUEST_MOVIE_DETAIL_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  export default movieDetailReducer;
  