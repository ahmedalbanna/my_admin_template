import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { APP_CONFIG } from '../config/app.config';
import type { ApiResponse } from '../types';

// ─── Token Storage Helpers ────────────────────────────────────────────────────
export const tokenStorage = {
  getAccess: () => localStorage.getItem(APP_CONFIG.jwtKey),
  setAccess: (t: string) => localStorage.setItem(APP_CONFIG.jwtKey, t),
  getRefresh: () => localStorage.getItem(APP_CONFIG.refreshKey),
  setRefresh: (t: string) => localStorage.setItem(APP_CONFIG.refreshKey, t),
  clear: () => {
    localStorage.removeItem(APP_CONFIG.jwtKey);
    localStorage.removeItem(APP_CONFIG.refreshKey);
  },
};

// ─── Create Axios Instance ────────────────────────────────────────────────────
const apiClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.apiUrl,
  timeout: APP_CONFIG.apiTimeout,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request Interceptor: Attach Bearer Token ─────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    NProgress.start();
    const token = tokenStorage.getAccess();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  },
);

// ─── Response Interceptor: Refresh Token on 401 ───────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{ resolve: (v: unknown) => void; reject: (e: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => (token ? resolve(token) : reject(error)));
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done();
    return response;
  },
  async (error) => {
    NProgress.done();
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      const refreshToken = tokenStorage.getRefresh();
      if (!refreshToken) {
        tokenStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
          `${APP_CONFIG.apiUrl}/auth/refresh`,
          { refreshToken },
        );
        const { accessToken, refreshToken: newRefresh } = res.data.data;
        tokenStorage.setAccess(accessToken);
        tokenStorage.setRefresh(newRefresh);
        processQueue(null, accessToken);
        if (originalRequest.headers) {
          (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
