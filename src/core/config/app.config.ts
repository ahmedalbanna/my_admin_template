export const APP_CONFIG = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 10000),
  appName: import.meta.env.VITE_APP_NAME ?? 'Admin Dashboard',
  appVersion: import.meta.env.VITE_APP_VERSION ?? '1.0.0',
  jwtKey: import.meta.env.VITE_JWT_STORAGE_KEY ?? 'admin_access_token',
  refreshKey: import.meta.env.VITE_REFRESH_STORAGE_KEY ?? 'admin_refresh_token',
} as const;
