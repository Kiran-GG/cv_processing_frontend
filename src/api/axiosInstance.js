import axios from "axios";
import { getToken } from "../utils/auth";

const instance = axios.create({
  baseURL: "http://13.201.93.202:8080/api",
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
