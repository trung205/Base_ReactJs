import {
    REQUEST_MOVIE,
    REQUEST_MOVIE_SUCCESS,
    REQUEST_MOVIE_FAIL,
} from './type';
import axiosInstance from '../../common/axios';

export const loadMovies = () => async dispatch => {
    try {
        dispatch({ type: REQUEST_MOVIE });

        // const url = "https://jsonplaceholder.typicode.com/posts";
        const response = await axiosInstance.get("/movies");
        // const responseBody = await response.json();
        dispatch({
            type: REQUEST_MOVIE_SUCCESS,
            payload: response
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: REQUEST_MOVIE_FAIL,
            payload: error
        });
    }
}