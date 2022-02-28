import {
    REQUEST_POST,
    REQUEST_POST_SUCCESS,
    REQUEST_POST_FAIL,
  } from "../action/type";
  
  const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  function postReducer(state = initialState, action) {
    switch (action.type) {
      case REQUEST_POST:
        return { ...state, loading: true };
      case REQUEST_POST_SUCCESS:
        return { ...state, loading: false, error: null, data: action.payload };
      case REQUEST_POST_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  export default postReducer;
  