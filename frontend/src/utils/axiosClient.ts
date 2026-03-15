import axios from "axios";
import toast from "react-hot-toast";
import { getAccessToken, setAccessToken } from "./token";

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Handle rate limit
    if (error.response?.status === 429) {
      toast.error("Too many requests. Try again after 10 - 15 minutes.");
      window.location.href = "/rate-limit";
    }

    // TOKEN EXPIRED
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "/api/v1/auth/refresh",
          {},
          { withCredentials: true },
        );

        const newAccessToken = res.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
