import React from 'react';
import { Outlet } from 'react-router-dom';
import { Typography } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

const { Text } = Typography;

const AuthLayout: React.FC = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top left, #1e1b4b 0%, #0f172a 50%, #0c0a1e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Decorative glows */}
    <div style={{
      position: 'absolute', top: -200, left: -200, width: 500, height: 500,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', bottom: -200, right: -200, width: 500, height: 500,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />

    {/* Logo */}
    <div style={{ marginBottom: 32, textAlign: 'center' }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 12px',
        boxShadow: '0 0 32px rgba(99,102,241,0.5)',
      }}>
        <AppstoreOutlined style={{ color: '#fff', fontSize: 26 }} />
      </div>
      <Text style={{ color: '#94a3b8', fontSize: 13 }}>Administration Portal</Text>
    </div>

    {/* Page Content */}
    <Outlet />

    {/* Footer */}
    <Text style={{ color: '#334155', marginTop: 32, fontSize: 12 }}>
      © {new Date().getFullYear()} AdminPanel. All rights reserved.
    </Text>
  </div>
);

export default AuthLayout;
