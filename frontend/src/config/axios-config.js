import * as axios from "axios";
import { token } from "../utils/auth.utils";

axios.defaults.headers["Authorization"] = `BEARER ${token}`;
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.timeout = 6000;
