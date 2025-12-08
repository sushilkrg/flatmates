import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "/api/v1", // IMPORTANT: Frontend rewrite path
  withCredentials: true, // For cookies/JWT
});

// Global 429 handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      // alert("Too many requests. Please slow down.");
      if (error.response?.status === 429) {
        toast.error("Too many requests. Try again after 10 - 15 minutes.");
      }

      // optional redirect
      window.location.href = "/rate-limit";
    }

    return Promise.reject(error);
  }
);

export default api;
