import axios from "axios";

const publicApi = axios.create({
  baseURL: "https://connections-api.goit.global/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicApi;
