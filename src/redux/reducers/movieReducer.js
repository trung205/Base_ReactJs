import {
  REQUEST_MOVIE,
  REQUEST_MOVIE_SUCCESS,
  REQUEST_MOVIE_FAIL,
} from "../action/type";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_MOVIE:
      return { ...state, loading: true };
    case REQUEST_MOVIE_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload};
    case REQUEST_MOVIE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default movieReducer;
