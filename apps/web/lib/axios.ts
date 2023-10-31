import _axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axios = _axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axios;
