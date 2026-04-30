import React from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '../hooks/useAuthMutations';

const { Title, Text } = Typography;

const ForgotPasswordPage: React.FC = () => {
  const { mutate: sendReset, isPending, isSuccess } = useForgotPassword();

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
      <div style={{ marginBottom: 28 }}>
        <Title level={3} style={{ color: '#f1f5f9', margin: 0, fontWeight: 700 }}>
          Reset Password
        </Title>
        <Text style={{ color: '#64748b', fontSize: 13 }}>
          Enter your email address and we'll send you a reset link.
        </Text>
      </div>

      {!isSuccess ? (
        <Form layout="vertical" onFinish={(v) => sendReset(v)} size="large" requiredMark={false}>
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
              id="forgot-email"
              style={{ background: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isPending}
            id="forgot-submit"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: 10,
              height: 48,
              fontWeight: 600,
            }}
          >
            Send Reset Link
          </Button>
        </Form>
      ) : (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <Text style={{ color: '#22c55e', fontSize: 14 }}>
            ✓ Check your inbox for the reset link.
          </Text>
        </div>
      )}

      <Space style={{ marginTop: 24 }}>
        <Link to="/login" id="back-to-login">
          <Button type="text" icon={<ArrowLeftOutlined />} style={{ color: '#6366f1', padding: 0 }}>
            Back to Sign In
          </Button>
        </Link>
      </Space>
    </div>
  );
};

export default ForgotPasswordPage;
