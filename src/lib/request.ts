import axios, { AxiosError } from "axios";

export { AxiosError };

/**
 * Axios 設定
 */
const request = axios.create({
  baseURL: `/api`
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
