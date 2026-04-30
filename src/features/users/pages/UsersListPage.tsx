import React, { useState } from 'react';
import {
  Typography,
  Input,
  Select,
  Space,
  Tag,
  Avatar,
  Switch,
  Button,
  Form,
  Row,
  Col,
  Card,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { User } from '../../../core/types';
import DataTable from '../../../shared/DataTable/DataTable';
import FormModal from '../../../shared/FormModal/FormModal';
import ConfirmDelete from '../../../shared/ConfirmDelete/ConfirmDelete';
import { useUsersQuery, useUpdateUser, useDeleteUser } from '../hooks/useUsers';
import { formatDateTime } from '../../../core/utils';
import ExportButton from '../../../shared/ExportButton/ExportButton';
import type { UserFilters } from '../types';

const { Title, Text } = Typography;
const { Option } = Select;

// ─── Edit Modal ───────────────────────────────────────────────────────────────
interface EditModalState { open: boolean; user: User | null }

const UsersListPage: React.FC = () => {
  const [filters, setFilters] = useState<UserFilters>({ page: 1, limit: 10 });
  const [editState, setEditState] = useState<EditModalState>({ open: false, user: null });
  const [form] = Form.useForm();

  const { data: response, isLoading, refetch } = useUsersQuery({
    page: filters.page,
    limit: filters.limit,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const users: User[] = Array.isArray(response?.data) ? (response.data as User[]) : [];
  const meta = response?.meta;

  // ── Open edit modal ────────────────────────────────────────────
  const openEdit = (user: User) => {
    form.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
    });
    setEditState({ open: true, user });
  };

  const handleEditFinish = (values: Record<string, unknown>) => {
    if (!editState.user) return;
    updateUser(
      { id: editState.user.id, data: values },
      { onSuccess: () => setEditState({ open: false, user: null }) },
    );
  };

  // ── Table Columns ──────────────────────────────────────────────
  const columns: ColumnsType<User> = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar
            size={36}
            src={record.avatarUrl}
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', flexShrink: 0 }}
          >
            {record.firstName?.[0]?.toUpperCase() ?? record.email[0].toUpperCase()}
          </Avatar>
          <div>
            <Text style={{ color: '#f1f5f9', display: 'block', fontWeight: 500 }}>
              {record.firstName ?? ''} {record.lastName ?? ''}
            </Text>
            <Text style={{ color: '#64748b', fontSize: 12 }}>{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const normalizedRole = role.toLowerCase();
        return (
          <Tag
            color={normalizedRole === 'super_admin' ? 'purple' : normalizedRole === 'admin' ? 'blue' : 'default'}
            style={{ textTransform: 'capitalize', borderRadius: 6 }}
          >
            {role.toLowerCase().replace('_', ' ')}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, record) => (
        <Switch
          checked={isActive}
          size="small"
          onChange={(checked) => updateUser({ id: record.id, data: { isActive: checked } })}
          style={{ background: isActive ? '#22c55e' : undefined }}
        />
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (v: string) => <Text style={{ color: '#94a3b8', fontSize: 12 }}>{formatDateTime(v)}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            style={{ color: '#6366f1' }}
            onClick={() => openEdit(record)}
          />
          <ConfirmDelete
            onConfirm={() => deleteUser(record.id)}
            loading={isDeleting}
            title={`Delete ${record.email}?`}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ color: '#f1f5f9', margin: 0, fontWeight: 700 }}>
          User Management
        </Title>
        <Text style={{ color: '#64748b' }}>
          {meta ? `${meta.total} total users` : 'Manage platform users'}
        </Text>
      </div>

      {/* Filters */}
      <Card
        style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16, marginBottom: 16 }}
        bodyStyle={{ padding: '16px 20px' }}
      >
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search by email or name…"
              prefix={<SearchOutlined style={{ color: '#475569' }} />}
              id="users-search"
              style={{ background: '#0f172a', borderColor: '#334155', borderRadius: 8 }}
              onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value, page: 1 }))}
              allowClear
            />
          </Col>
          <Col xs={24} sm={8} md={5}>
            <Select
              placeholder="Role"
              allowClear
              style={{ width: '100%' }}
              onChange={(v) => setFilters((p) => ({ ...p, role: v, page: 1 }))}
              id="users-role-filter"
            >
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
              <Option value="super_admin">Super Admin</Option>
            </Select>
          </Col>
          <Col>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => refetch()}
                style={{ borderColor: '#334155', color: '#94a3b8' }}
              >
                Refresh
              </Button>
              <ExportButton 
                data={users} 
                filename="users_export" 
                columns={[
                  { title: 'First Name', dataIndex: 'firstName' }, 
                  { title: 'Last Name', dataIndex: 'lastName' }, 
                  { title: 'Email', dataIndex: 'email' }, 
                  { title: 'Role', dataIndex: 'role' }, 
                  { title: 'Status', dataIndex: 'isActive' }
                ]} 
              />
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Table */}
      <Card
        style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16 }}
        bodyStyle={{ padding: 0 }}
      >
        <DataTable<User>
          dataSource={users}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          meta={meta}
          onPageChange={(page, limit) => setFilters((p) => ({ ...p, page, limit }))}
        />
      </Card>

      {/* Edit Modal */}
      <FormModal
        open={editState.open}
        title={`Edit User – ${editState.user?.email ?? ''}`}
        onCancel={() => setEditState({ open: false, user: null })}
        onFinish={handleEditFinish}
        isLoading={isUpdating}
        form={form}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="firstName" label="First Name">
              <Input placeholder="First name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lastName" label="Last Name">
              <Input placeholder="Last name" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="role" label="Role">
          <Select>
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
            <Option value="super_admin">Super Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item name="isActive" label="Active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </FormModal>
    </div>
  );
};

export default UsersListPage;
