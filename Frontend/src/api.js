import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure this matches your backend route
  withCredentials: true, // Only if you're using cookies (optional)
});

export default api;
