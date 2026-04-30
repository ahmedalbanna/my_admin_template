import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../../../core/providers/AuthProvider';
import { extractErrorMessage } from '../../../core/utils';
import type { LoginRequest } from '../types';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      // Backend returns: { success, data: { accessToken, refreshToken, user } }
      const { user, accessToken, refreshToken } = response.data;
      if (user.role === 'user') {
        notification.error({
          message: 'Access Denied',
          description: 'You do not have admin privileges.',
        });
        return;
      }
      login({ accessToken, refreshToken }, user);
      notification.success({ message: `Welcome back, ${user.firstName ?? 'Admin'}!` });
      navigate('/dashboard');
    },
    onError: (error) => {
      notification.error({
        message: 'Login Failed',
        description: extractErrorMessage(error),
      });
    },
  });
};

export const useForgotPassword = () =>
  useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      notification.success({
        message: 'Email Sent',
        description: 'If an account exists, a reset link has been sent.',
      });
    },
    onError: (error) => {
      notification.error({ message: 'Error', description: extractErrorMessage(error) });
    },
  });
