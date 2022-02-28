import {
  REQUEST_ACTOR,
  REQUEST_ACTOR_SUCCESS,
  REQUEST_ACTOR_FAIL,
} from "../action/type";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

function actorReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ACTOR:
      return { ...state, loading: true };
    case REQUEST_ACTOR_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case REQUEST_ACTOR_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default actorReducer;
