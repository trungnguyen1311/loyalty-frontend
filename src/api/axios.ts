import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Cookie-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Track retry count per request
interface RetryConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig;

    if (!config) {
      return Promise.reject(error);
    }

    // Handle 401 - Force logout
    if (error.response?.status === 401) {
      // Clear auth state and redirect to login
      window.dispatchEvent(new CustomEvent("auth:logout"));
      return Promise.reject(error);
    }

    // Initialize retry count
    config._retryCount = config._retryCount || 0;

    // Check if we should retry
    if (
      config._retryCount < MAX_RETRIES &&
      (!error.response ||
        error.response.status >= 500 ||
        !error.response.status)
    ) {
      config._retryCount++;

      // Wait before retrying
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * config._retryCount!),
      );

      return api(config);
    }

    // After max retries, dispatch offline event
    if (config._retryCount >= MAX_RETRIES) {
      window.dispatchEvent(new CustomEvent("api:offline"));
    }

    return Promise.reject(error);
  },
);

export default api;
