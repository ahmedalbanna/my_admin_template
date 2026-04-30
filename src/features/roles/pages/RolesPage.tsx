import React, { useState } from 'react';
import { Typography, Card, Table, Tag, Space, Button } from 'antd';
import { EditOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import FormModal from '../../../shared/FormModal/FormModal';
import { Form, Input, Checkbox, Skeleton } from 'antd';
import { useRolesQuery } from '../hooks/useRoles';
import type { RoleItem } from '../api/rolesApi';

const { Title, Text } = Typography;

const RolesPage: React.FC = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<RoleItem | null>(null);
  const [form] = Form.useForm();

  const { data: roles = [], isLoading } = useRolesQuery();

  const columns = [
    {
      title: 'Role Name',
      key: 'name',
      render: (_: any, record: any) => (
        <Space>
          <SafetyCertificateOutlined style={{ color: record.isSystem ? '#6366f1' : '#94a3b8' }} />
          <Text style={{ fontWeight: 500, color: '#f1f5f9' }}>{record.name}</Text>
          {record.isSystem && <Tag color="purple">System</Tag>}
        </Space>
      ),
    },
    {
      title: 'Permissions',
      key: 'permissions',
      render: (_: any, record: any) => (
        <Space wrap>
          {record.permissions.map((p: string) => (
            <Tag key={p} color="default" style={{ background: '#334155', border: 'none' }}>{p}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right' as const,
      render: (_: any, record: any) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          style={{ color: '#6366f1' }}
          onClick={() => {
            setCurrentRole(record);
            form.setFieldsValue(record);
            setEditOpen(true);
          }}
          disabled={record.isSystem && record.name === 'Super Admin'} // Cannot edit super admin
        />
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ color: '#f1f5f9', margin: 0, fontWeight: 700 }}>
            Roles & Permissions
          </Title>
          <Text style={{ color: '#64748b' }}>
            Manage access control and define roles.
          </Text>
        </div>
        <Button type="primary" onClick={() => { setCurrentRole(null); form.resetFields(); setEditOpen(true); }}>
          Create Role
        </Button>
      </div>

      <Card style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16 }} bodyStyle={{ padding: 0 }}>
        {isLoading ? (
          <div style={{ padding: 24 }}>
            <Skeleton active />
          </div>
        ) : (
          <Table
            dataSource={roles}
            columns={columns}
            rowKey="id"
            pagination={false}
            style={{ borderRadius: 16 }}
          />
        )}
      </Card>

      <FormModal
        open={editOpen}
        title={currentRole ? `Edit Role: ${currentRole.name}` : 'Create New Role'}
        onCancel={() => setEditOpen(false)}
        onFinish={(v) => { console.log('Saved role:', v); setEditOpen(false); }}
        form={form}
      >
        <Form.Item name="name" label="Role Name" rules={[{ required: true }]}>
          <Input placeholder="e.g. Moderator" disabled={currentRole?.isSystem} />
        </Form.Item>
        <Form.Item name="permissions" label="Permissions">
          <Checkbox.Group style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Checkbox value="read:users">Read Users</Checkbox>
              <Checkbox value="write:users">Write Users</Checkbox>
              <Checkbox value="read:products">Read Products</Checkbox>
              <Checkbox value="write:products">Write Products</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>
      </FormModal>
    </div>
  );
};

export default RolesPage;
