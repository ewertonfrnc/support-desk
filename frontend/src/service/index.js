import axios from "axios";

export default function api() {
  return axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  });
}
