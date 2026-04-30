import { useQuery } from '@tanstack/react-query';
import { auditLogsApi } from '../api/auditLogsApi';
import type { PaginationParams } from '../../../core/types';

export const AUDIT_LOGS_KEYS = {
  all: ['auditLogs'] as const,
  list: (params: PaginationParams) => [...AUDIT_LOGS_KEYS.all, params] as const,
};

export const useAuditLogsQuery = (params: PaginationParams) =>
  useQuery({
    queryKey: AUDIT_LOGS_KEYS.list(params),
    queryFn: () => auditLogsApi.getAll(params),
    placeholderData: (prev) => prev,
  });
