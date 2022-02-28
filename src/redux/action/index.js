import {
  REQUEST_MOVIE,
  REQUEST_MOVIE_SUCCESS,
  REQUEST_MOVIE_FAIL,
  REQUEST_ACTOR,
  REQUEST_ACTOR_SUCCESS,
  REQUEST_ACTOR_FAIL,
  REQUEST_LIST_ACTOR,
  REQUEST_LIST_ACTOR_SUCCESS,
  REQUEST_LIST_ACTOR_FAIL,
  REQUEST_MOVIE_DETAIL,
  REQUEST_MOVIE_DETAIL_SUCCESS,
  REQUEST_MOVIE_DETAIL_FAIL,
  REQUEST_POST,
  REQUEST_POST_SUCCESS,
  REQUEST_POST_FAIL,
} from "./type";
import axiosInstance, {
  requestAllMovie,
  requestListActor,
  requestMovieDetail,
  requestActorInfo,
  requestPost,
} from "../../common/axios";

export const loadMovies = (page) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_MOVIE });
    const response = await requestAllMovie(page);
    dispatch({
      type: REQUEST_MOVIE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: REQUEST_MOVIE_FAIL,
      payload: error,
    });
  }
};

export const loadMoviesDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_MOVIE_DETAIL });
    const response = await requestMovieDetail(id);
    dispatch({
      type: REQUEST_MOVIE_DETAIL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: REQUEST_MOVIE_DETAIL_FAIL,
      payload: error,
    });
  }
};

export const loadActor = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ACTOR });
    const response = await requestActorInfo(id);
    dispatch({
      type: REQUEST_ACTOR_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: REQUEST_ACTOR_FAIL,
      payload: error,
    });
  }
};

export const loadListActor = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LIST_ACTOR });
    const response = await requestListActor(id);
    dispatch({
      type: REQUEST_LIST_ACTOR_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: REQUEST_LIST_ACTOR_FAIL,
      payload: error,
    });
  }
};

export const loadPost = (id, page) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_POST });
    const response = await requestPost(id, page);
    dispatch({
      type: REQUEST_POST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: REQUEST_POST_FAIL,
      payload: error,
    });
  }
};
