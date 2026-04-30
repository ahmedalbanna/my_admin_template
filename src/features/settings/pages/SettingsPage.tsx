import React from 'react';
import { Card, Typography, Form, Input, Button, Divider, Switch, Row, Col, notification, Space } from 'antd';
import { SaveOutlined, GlobalOutlined } from '@ant-design/icons';
import { APP_CONFIG } from '../../../core/config/app.config';

const { Title, Text } = Typography;

const SettingsPage: React.FC = () => {
  const [form] = Form.useForm();

  const handleSave = (values: Record<string, unknown>) => {
    // TODO: wire to PATCH /admin/settings once backend module is added
    console.info('Settings saved:', values);
    notification.success({ message: 'Settings saved successfully!' });
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <Title level={2} style={{ color: '#f1f5f9', margin: 0, fontWeight: 700 }}>
          Application Settings
        </Title>
        <Text style={{ color: '#64748b' }}>
          Configure global platform settings.
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {/* General */}
        <Col xs={24} lg={14}>
          <Card
            title={
              <Space>
                <GlobalOutlined style={{ color: '#6366f1' }} />
                <Text style={{ color: '#f1f5f9', fontWeight: 600 }}>General</Text>
              </Space>
            }
            style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16 }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={{ appName: APP_CONFIG.appName, apiUrl: APP_CONFIG.apiUrl }}
            >
              <Form.Item
                name="appName"
                label={<Text style={{ color: '#94a3b8' }}>Application Name</Text>}
                rules={[{ required: true, message: 'App name is required' }]}
              >
                <Input placeholder="My App" style={{ background: '#0f172a', borderColor: '#334155' }} />
              </Form.Item>

              <Form.Item
                name="apiUrl"
                label={<Text style={{ color: '#94a3b8' }}>API Base URL</Text>}
              >
                <Input
                  placeholder="https://api.example.com"
                  disabled
                  style={{ background: '#0f172a', borderColor: '#334155' }}
                />
              </Form.Item>

              <Divider style={{ borderColor: '#334155' }} />
              <Text style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 12 }}>
                Feature Flags
              </Text>

              <Form.Item name="emailNotifications" label={<Text style={{ color: '#94a3b8' }}>Email Notifications</Text>} valuePropName="checked" initialValue>
                <Switch />
              </Form.Item>

              <Form.Item name="maintenanceMode" label={<Text style={{ color: '#94a3b8' }}>Maintenance Mode</Text>} valuePropName="checked" initialValue={false}>
                <Switch />
              </Form.Item>

              <Form.Item style={{ marginTop: 8 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    borderRadius: 8,
                  }}
                >
                  Save Settings
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Info panel */}
        <Col xs={24} lg={10}>
          <Card
            title={<Text style={{ color: '#f1f5f9', fontWeight: 600 }}>System Info</Text>}
            style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16 }}
          >
            {[
              { label: 'Template Version', value: APP_CONFIG.appVersion },
              { label: 'Stack', value: 'React + Vite + Ant Design' },
              { label: 'Backend', value: 'NestJS + Prisma' },
              { label: 'State', value: 'TanStack Query v5' },
              { label: 'Routing', value: 'React Router v6' },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #1e293b',
                }}
              >
                <Text style={{ color: '#64748b', fontSize: 13 }}>{label}</Text>
                <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>{value}</Text>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
