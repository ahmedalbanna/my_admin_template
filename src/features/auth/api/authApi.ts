import apiClient from '../../../core/api/apiClient';
import type { ApiResponse, AuthResponse } from '../../../core/types';
import type { LoginRequest, ForgotPasswordRequest } from '../types';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data).then((r) => r.data),

  logout: () =>
    apiClient.post('/auth/logout'),

  forgotPassword: (data: ForgotPasswordRequest) =>
    apiClient.post<ApiResponse<{ message: string }>>('/auth/forgot-password', data).then((r) => r.data),

  refreshTokens: (refreshToken: string) =>
    apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
      '/auth/refresh',
      { refreshToken },
    ).then((r) => r.data),
};
