import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';

export const DASHBOARD_KEYS = {
  stats: ['dashboard', 'stats'] as const,
  activity: ['dashboard', 'activity'] as const,
};

export const useDashboardStats = () =>
  useQuery({
    queryKey: DASHBOARD_KEYS.stats,
    queryFn: dashboardApi.getStats,
    refetchInterval: 30_000, // Auto-refresh every 30 s
    select: (r) => r.data,
  });

export const useRecentActivity = () =>
  useQuery({
    queryKey: DASHBOARD_KEYS.activity,
    queryFn: dashboardApi.getRecentActivity,
    select: (r) => r.data,
  });
