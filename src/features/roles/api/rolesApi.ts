import apiClient from '../../../core/api/apiClient';
import type { ApiResponse } from '../../../core/types';

export interface RoleItem {
  id: string;
  name: string;
  isSystem: boolean;
  permissions: string[];
}

export const rolesApi = {
  getAll: () =>
    apiClient.get<ApiResponse<RoleItem[]>>('/admin/roles').then((r) => r.data),
};
