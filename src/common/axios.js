import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/v1';
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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
  },
);
axiosInstance.interceptors.request.use(
  async (request) => {
    return request;
  },
  async (error) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;
