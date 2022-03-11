import axios from "axios";

const API_BASE = "http://localhost:3000/api/v1";
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.response.use(
  async (response) => {
    const data = response?.data;
    return data;
  },
  async (error) => {
    if (error.response) {
      const data = error.response?.data;
      const result = data?.result || {};
      result.success = false;
      return result;
    } else if (error.request) {
      // can not execute the request (network error or service is off)
      const data = error.request?.data || {};

      return {
        ...data,
        success: false,
        message: error.message,
      };
    }
  }
);
axiosInstance.interceptors.request.use(
  async (request) => {
    return request;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

function handleResult(api) {
  return api
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((error) => {
      return Promise.reject(new Error("co loi xay ra", error));
    });
}

export function requestAllMovie(page) {
  return handleResult(axiosInstance.get(`/movies?page=${page}`));
}

export function requestSignUp(payload) {
  return handleResult(axiosInstance.post("/auth/signUp", payload));
}

export function requestLoginManual(payload) {
  return handleResult(axiosInstance.post("/auth/loginManual", payload));
}

export function requestListActor(id) {
  return handleResult(axiosInstance.get(`/movies/${id}/cast`));
}

export function requestMovieDetail(id) {
  return handleResult(axiosInstance.get(`/movies/${id}?language=vi-VN`));
}
export function requestActorInfo(id) {
  return handleResult(axiosInstance.get(`/actors/${id}?language=vi-VN`));
}
export function requestImageActor(id) {
  return handleResult(
    axiosInstance.get(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=1025bfc6c758fa3270b91d47122cb4ca`
    )
  );
}

export function requestMovieByActor(id) {
  return handleResult(
    axiosInstance.get(`http://localhost:3000/api/v1/actors/${id}/movies`)
  );
}
export function requestListImageActor(id) {
  return axiosInstance.get(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=1025bfc6c758fa3270b91d47122cb4ca`
  );
}

export function requestCreatePost(payload) {
  return handleResult(axiosInstance.post("/posts", payload));
}

export function requestPost(id, page) {
  return handleResult(axiosInstance.get(`/posts/${id}?page=${page}&limit=10`));
}
export function requestListMovieSearch(payload) {
  return axiosInstance.get(
    `https://api.themoviedb.org/3/search/movie?api_key=1025bfc6c758fa3270b91d47122cb4ca&language=en-US&page=1&include_adult=false&query=${payload}`
  );
}

export default axiosInstance;
