import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Space, Typography, Button, Tooltip } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  TeamOutlined,
  AppstoreOutlined,
  BulbOutlined,
  GlobalOutlined,
  HistoryOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../core/providers/AuthProvider';
import { useTheme } from '../core/providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import type { MenuProps } from 'antd';

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

// ─── Menu Items ───────────────────────────────────────────────────────────────
const menuItems: MenuProps['items'] = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/users',
    icon: <TeamOutlined />,
    label: 'Users',
  },
  {
    key: '/roles',
    icon: <SafetyCertificateOutlined />,
    label: 'Roles',
  },
  {
    key: '/audit-logs',
    icon: <HistoryOutlined />,
    label: 'Audit Log',
  },
  {
    type: 'divider',
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

// ─── Main Layout ──────────────────────────────────────────────────────────────
const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = '/' + location.pathname.split('/')[1];

  const avatarMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: async () => {
        await logout();
        navigate('/login');
      },
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        width={240}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          background: 'var(--sider-bg, #0f172a)',
          borderRight: '1px solid #1e293b',
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? 0 : '0 20px',
            borderBottom: '1px solid #1e293b',
            transition: 'all 0.3s',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AppstoreOutlined style={{ color: '#fff', fontSize: 16 }} />
          </div>
          {!collapsed && (
            <Text
              strong
              style={{
                color: '#f1f5f9',
                fontSize: 16,
                marginLeft: 10,
                whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AdminPanel
            </Text>
          )}
        </div>

        {/* Navigation */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>

      {/* ── Right Side ──────────────────────────────────────────────── */}
      <Layout style={{ marginInlineStart: collapsed ? 80 : 240, transition: 'all 0.3s' }}>
        {/* Header */}
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 99,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            background: '#1e293b',
            borderBottom: '1px solid #334155',
            height: 64,
            boxShadow: '0 1px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Collapse Toggle */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ color: '#94a3b8', fontSize: 18 }}
          />

          {/* Right: notifications + avatar */}
          <Space size={16}>
            <Tooltip title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}>
              <Button
                type="text"
                icon={<BulbOutlined />}
                onClick={toggleTheme}
                style={{ color: '#94a3b8', fontSize: 18 }}
              />
            </Tooltip>

            <Dropdown
              menu={{
                items: [
                  { key: 'en', label: 'English', onClick: () => i18n.changeLanguage('en') },
                  { key: 'ar', label: 'العربية', onClick: () => i18n.changeLanguage('ar') },
                ],
              }}
              placement="bottomRight"
            >
              <Button type="text" icon={<GlobalOutlined />} style={{ color: '#94a3b8', fontSize: 18 }} />
            </Dropdown>

            <Tooltip title="Notifications">
              <Badge count={3} size="small">
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  style={{ color: '#94a3b8', fontSize: 18 }}
                />
              </Badge>
            </Tooltip>

            <Dropdown menu={{ items: avatarMenuItems }} placement="bottomRight" arrow>
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  size={36}
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', flexShrink: 0 }}
                  src={user?.avatarUrl}
                >
                  {user?.firstName?.[0]?.toUpperCase() ?? 'A'}
                </Avatar>
                <div style={{ lineHeight: 1.3 }}>
                  <Text style={{ color: '#f1f5f9', display: 'block', fontSize: 13, fontWeight: 600 }}>
                    {user?.firstName ?? 'Admin'}
                  </Text>
                  <Text style={{ color: '#6366f1', display: 'block', fontSize: 11, textTransform: 'capitalize' }}>
                    {user?.role ?? 'admin'}
                  </Text>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: '24px',
            padding: 0,
            minHeight: 'calc(100vh - 64px - 48px - 70px)',
          }}
        >
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center', background: 'transparent', color: '#475569', padding: '16px 24px' }}>
          AdminPanel © {new Date().getFullYear()} — Built with NestJS + React
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
