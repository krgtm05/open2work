import axios from "axios";

const instance = axios.create({
  baseURL: "https://open2work.onrender.com",
});

export default instance;
