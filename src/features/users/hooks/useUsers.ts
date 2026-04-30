import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { usersApi, type UsersListParams } from '../api/usersApi';
import type { UpdateUserDto } from '../types';
import { extractErrorMessage } from '../../../core/utils';

export const USERS_KEYS = {
  all: ['users'] as const,
  list: (params: UsersListParams) => ['users', 'list', params] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
};

// ─── List ─────────────────────────────────────────────────────────────────────
export const useUsersQuery = (params: UsersListParams = {}) =>
  useQuery({
    queryKey: USERS_KEYS.list(params),
    queryFn: () => usersApi.getAll(params),
    placeholderData: (prev) => prev,
  });

// ─── Single ───────────────────────────────────────────────────────────────────
export const useUserQuery = (id: string) =>
  useQuery({
    queryKey: USERS_KEYS.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });

// ─── Update ───────────────────────────────────────────────────────────────────
export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) => usersApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: USERS_KEYS.all });
      notification.success({ message: 'User updated successfully' });
    },
    onError: (error) => {
      notification.error({ message: 'Update Failed', description: extractErrorMessage(error) });
    },
  });
};

// ─── Delete ───────────────────────────────────────────────────────────────────
export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: USERS_KEYS.all });
      notification.success({ message: 'User deleted successfully' });
    },
    onError: (error) => {
      notification.error({ message: 'Delete Failed', description: extractErrorMessage(error) });
    },
  });
};
