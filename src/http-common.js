import axios from "axios";
import { getToken } from "./Utils/Common";
const baseURL = "http://localhost:8088/api";

export default axios.create({
  // baseURL: "http://192.168.0.101:8088/api",
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    authorization: getToken(),
  },
});

export { baseURL };
