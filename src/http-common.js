import axios from "axios";
import { getToken } from "./Utils/Common";

export default axios.create({
  // baseURL: "http://192.168.0.101:8088/api",
  baseURL: "http://localhost:8088/api",
  headers: {
    "Content-type": "application/json",
    authorization: getToken(),
  },
});
