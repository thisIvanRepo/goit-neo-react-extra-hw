import axios from "axios";

const privateApi = axios.create({
  baseURL: "https://connections-api.goit.global/",
});

privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const code = error && error.response ? error.response.status : 0;
    if (code === 401 || code === 403) {
      console.log("error code", code);
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default privateApi;
