import axios from "axios";
import { BASE_API } from "../constant/app";

export default axios.create({
  baseURL: BASE_API,
});
