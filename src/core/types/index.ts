// ─── Unified API Response (matches NestJS GlobalResponse interceptor) ─────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
  error?: ApiError;
}

export interface ApiError {
  statusCode: number;
  message: string;
  details?: string[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

// ─── Query Params ─────────────────────────────────────────────────────────────
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  search?: string;
}

// ─── User / Auth ──────────────────────────────────────────────────────────────
export type UserRole = 'user' | 'admin' | 'super_admin';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/** Flat response from NestJS: { ...tokens, user } */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// ─── Form ─────────────────────────────────────────────────────────────────────
export interface SelectOption {
  label: string;
  value: string | number;
}
