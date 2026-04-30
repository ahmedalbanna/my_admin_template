import { useQuery } from '@tanstack/react-query';
import { rolesApi } from '../api/rolesApi';

export const ROLES_KEYS = {
  all: ['roles'] as const,
};

export const useRolesQuery = () =>
  useQuery({
    queryKey: ROLES_KEYS.all,
    queryFn: () => rolesApi.getAll(),
    select: (r) => r.data,
  });
