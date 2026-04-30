import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { PrivateRoute } from './PrivateRoute';

// ── Lazy-loaded Layouts ───────────────────────────────────────────────────────
const MainLayout = lazy(() => import('../../layouts/MainLayout'));
const AuthLayout = lazy(() => import('../../layouts/AuthLayout'));

// ── Lazy-loaded Pages ─────────────────────────────────────────────────────────
const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../../features/auth/pages/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('../../features/dashboard/pages/DashboardPage'));
const UsersListPage = lazy(() => import('../../features/users/pages/UsersListPage'));
const SettingsPage = lazy(() => import('../../features/settings/pages/SettingsPage'));
const AuditLogPage = lazy(() => import('../../features/audit-log/pages/AuditLogPage'));
const RolesPage = lazy(() => import('../../features/roles/pages/RolesPage'));
const UnauthorizedPage = lazy(() => import('../../shared/pages/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('../../shared/pages/NotFoundPage'));

// ── Fallback ──────────────────────────────────────────────────────────────────
const PageLoader: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f172a' }}>
    <Spin size="large" />
  </div>
);

// ── Router Definition ─────────────────────────────────────────────────────────
const router = createBrowserRouter([
  // Public routes
  {
    element: <Suspense fallback={<PageLoader />}><AuthLayout /></Suspense>,
    children: [
      { path: '/login', element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense> },
      { path: '/forgot-password', element: <Suspense fallback={<PageLoader />}><ForgotPasswordPage /></Suspense> },
      { path: '/unauthorized', element: <Suspense fallback={<PageLoader />}><UnauthorizedPage /></Suspense> },
    ],
  },
  // Protected routes (admin only)
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Suspense fallback={<PageLoader />}><MainLayout /></Suspense>,
        children: [
          { path: '/', element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: <Suspense fallback={<PageLoader />}><DashboardPage /></Suspense> },
          { path: '/users', element: <Suspense fallback={<PageLoader />}><UsersListPage /></Suspense> },
          { path: '/settings', element: <Suspense fallback={<PageLoader />}><SettingsPage /></Suspense> },
          { path: '/audit-logs', element: <Suspense fallback={<PageLoader />}><AuditLogPage /></Suspense> },
          { path: '/roles', element: <Suspense fallback={<PageLoader />}><RolesPage /></Suspense> },
        ],
      },
    ],
  },
  // Catch-all
  { path: '*', element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
