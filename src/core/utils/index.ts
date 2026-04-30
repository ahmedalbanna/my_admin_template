import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

/** Format ISO date string → "Apr 30, 2026" */
export const formatDate = (iso: string) => dayjs(iso).format('MMM D, YYYY');

/** Format ISO date string → "Apr 30, 2026  03:52" */
export const formatDateTime = (iso: string) => dayjs(iso).format('MMM D, YYYY  HH:mm');

/** Format ISO date string → "3 hours ago" */
export const fromNow = (iso: string) => dayjs(iso).fromNow();

/** Capitalize first letter */
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

/** Build query-string from object (skips undefined/null values) */
export const toQueryString = (params: Record<string, unknown>): string => {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return qs ? `?${qs}` : '';
};

/** Extract axios/api error message */
export const extractErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object') {
    const e = error as { response?: { data?: { error?: { message?: string }; message?: string } }; message?: string };
    return (
      e.response?.data?.error?.message ??
      e.response?.data?.message ??
      e.message ??
      'An unexpected error occurred'
    );
  }
  return 'An unexpected error occurred';
};
