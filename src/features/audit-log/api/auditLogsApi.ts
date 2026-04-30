import apiClient from '../../../core/api/apiClient';
import type { ApiResponse, PaginationParams } from '../../../core/types';

export interface AuditLogItem {
  id: string;
  user: string;
  action: string;
  resource: string;
  date: string;
}

export const auditLogsApi = {
  getAll: (params: PaginationParams = {}) =>
    apiClient
      .get<ApiResponse<AuditLogItem[]>>('/admin/audit-logs', { params })
      .then((r) => r.data),
};
