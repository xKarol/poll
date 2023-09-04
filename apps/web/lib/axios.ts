import _axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axios = _axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axios;
