import React, { useState } from 'react';
import { Typography, Card, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import DataTable from '../../../shared/DataTable/DataTable';
import { useAuditLogsQuery } from '../hooks/useAuditLogs';
import type { AuditLogItem } from '../api/auditLogsApi';

const { Title, Text } = Typography;

const AuditLogPage: React.FC = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const { data: response, isLoading } = useAuditLogsQuery(pagination);
  const logs = Array.isArray(response?.data) ? (response.data as AuditLogItem[]) : [];
  const meta = response?.meta;

  const columns = [
    { title: 'User', dataIndex: 'user', key: 'user' },
    { title: 'Action', dataIndex: 'action', key: 'action', render: (text: string) => <Tag color="blue">{text}</Tag> },
    { title: 'Resource', dataIndex: 'resource', key: 'resource' },
    { title: 'IP Address', dataIndex: 'ipAddress', key: 'ipAddress' },
    { title: 'Date', dataIndex: 'date', key: 'date', render: (d: string) => new Date(d).toLocaleString() },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ color: '#f1f5f9', margin: 0, fontWeight: 700 }}>
          {t('dashboard.title', 'Audit Log')}
        </Title>
        <Text style={{ color: '#64748b' }}>
          Track system changes and administrative actions.
        </Text>
      </div>

      <Card style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16 }} bodyStyle={{ padding: 0 }}>
        <DataTable<AuditLogItem>
          dataSource={logs}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          meta={meta}
          onPageChange={(page, limit) => setPagination({ page, limit })}
        />
      </Card>
    </div>
  );
};

export default AuditLogPage;
