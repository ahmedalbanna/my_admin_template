import apiClient from '../../../core/api/apiClient';
import type { ApiResponse, User, PaginationParams } from '../../../core/types';
import type { UpdateUserDto } from '../types';
import { toQueryString } from '../../../core/utils';

export interface UsersListParams extends PaginationParams {
  search?: string;
}

export const usersApi = {
  getAll: (params: UsersListParams = {}) =>
    apiClient
      .get<ApiResponse<User[]>>(`/users${toQueryString(params as Record<string, unknown>)}`)
      .then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<User>>(`/users/${id}`).then((r) => r.data),

  update: (id: string, data: UpdateUserDto) =>
    apiClient.put<ApiResponse<User>>(`/users/${id}`, data).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/users/${id}`).then((r) => r.data),
};
