import axios from "axios";
import { getToken } from "../utils/auth";

const instance = axios.create({
  baseURL: "https://nirvana-produces-stay-nn.trycloudflare.com/api",
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
