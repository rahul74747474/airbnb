import axios from "axios";

const api = axios.create({
  baseURL: "https://airbnb-znta.onrender.com/api", // Make sure this matches your backend route
  withCredentials: true, // Only if you're using cookies (optional)
});

export default api;
