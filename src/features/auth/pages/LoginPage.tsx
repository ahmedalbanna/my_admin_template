import React from 'react';
import { Form, Input, Button, Typography, Divider, Space } from 'antd';
import { MailOutlined, LockOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuthMutations';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const { mutate: login, isPending } = useLogin();

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 420,
        background: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: 20,
        padding: '40px 36px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 48, height: 48, borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
          border: '1px solid rgba(99,102,241,0.3)',
          marginBottom: 16,
        }}>
          <ThunderboltOutlined style={{ color: '#6366f1', fontSize: 22 }} />
        </div>
        <Title level={3} style={{ color: '#f1f5f9', margin: 0, fontWeight: 700 }}>
          Sign In to Admin
        </Title>
        <Text style={{ color: '#64748b', fontSize: 13 }}>
          Restricted access – Admin accounts only
        </Text>
      </div>

      {/* Form */}
      <Form
        layout="vertical"
        onFinish={(v) => login(v)}
        size="large"
        requiredMark={false}
      >
        <Form.Item
          name="email"
          label={<Text style={{ color: '#94a3b8', fontSize: 13 }}>Email Address</Text>}
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: '#475569' }} />}
            placeholder="admin@example.com"
            id="login-email"
            style={{ background: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<Text style={{ color: '#94a3b8', fontSize: 13 }}>Password</Text>}
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#475569' }} />}
            placeholder="••••••••"
            id="login-password"
            style={{ background: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isPending}
            size="large"
            id="login-submit"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: 10,
              height: 48,
              fontWeight: 600,
              fontSize: 15,
              boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
            }}
          >
            {isPending ? 'Signing In…' : 'Sign In'}
          </Button>
        </Form.Item>
      </Form>

      <Divider style={{ borderColor: '#1e293b', margin: '0 0 16px' }} />

      <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
        <Link to="/forgot-password" id="forgot-link">
          <Text style={{ color: '#6366f1', fontSize: 13 }}>Forgot your password?</Text>
        </Link>
      </Space>
    </div>
  );
};

export default LoginPage;
