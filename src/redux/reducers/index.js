import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import movieDetailReducer from "./movieDetailReducer";
import actorReducer from "./actorReducer";
import listActorReducer from "./listActorReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
  movie: movieReducer,
  movieDetail: movieDetailReducer,
  actor: actorReducer,
  listActor: listActorReducer,
  post: postReducer,
});

export default (state, action) => reducers(state, action);
