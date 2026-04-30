import apiClient from '../../../core/api/apiClient';
import type { ApiResponse } from '../../../core/types';
import type { DashboardStats, ActivityItem } from '../types';

export const dashboardApi = {
  getStats: () =>
    apiClient.get<ApiResponse<DashboardStats>>('/admin/stats').then((r) => r.data),

  getRecentActivity: () =>
    apiClient.get<ApiResponse<ActivityItem[]>>('/admin/activity').then((r) => r.data),
};
