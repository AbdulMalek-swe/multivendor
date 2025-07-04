// import { getToken } from "@/utils/helpers";
import { getToken } from "@/utils/helpers";
import axios from "axios";

let apiUrl;
if (process?.env?.NODE_ENV === "development") {
  apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}api/`;
} else {
  apiUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_API_SERVER}api/`;
}
axios.defaults.headers.post["Content-Type"] = "application/json";
const publicRequest = axios.create({
  baseURL: apiUrl,
});
const privateRequest = axios.create({
  baseURL: apiUrl,
});
/* Public request config */
publicRequest.interceptors.request.use(
  async (config) => {
    if (config.headers === undefined) {
      config.headers = {};
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

/* Private request config */
privateRequest.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (config.headers === undefined) {
      config.headers = {};
    }
    if (token) {
      config.headers["content-type"] = "multipart/form-data";
      config.headers["Authorization"] = "Bearer " + token || "";
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

export { publicRequest, privateRequest };
