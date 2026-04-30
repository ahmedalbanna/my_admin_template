import React from 'react';
import { Row, Col, Card, Statistic, Typography, Timeline, Tag, Skeleton, Alert } from 'antd';
import {
  TeamOutlined,
  CheckCircleOutlined,
  UserAddOutlined,
  FileImageOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useDashboardStats, useRecentActivity } from '../hooks/useDashboard';
import { formatDate, fromNow } from '../../../core/utils';

const { Title, Text } = Typography;

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value?: number;
  icon: React.ReactNode;
  color: string;
  suffix?: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, suffix, loading }) => (
  <Card
    style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      border: '1px solid #334155',
      borderRadius: 16,
      overflow: 'hidden',
      position: 'relative',
    }}
    bodyStyle={{ padding: 24 }}
  >
    {/* Accent stripe */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color }} />

    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <Text style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
          {title}
        </Text>
        {loading ? (
          <Skeleton.Input active style={{ width: 80, height: 32, marginTop: 8 }} />
        ) : (
          <Statistic
            value={value}
            suffix={suffix}
            valueStyle={{ color: '#f1f5f9', fontSize: 32, fontWeight: 700 }}
          />
        )}
      </div>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${color}22`,
        border: `1px solid ${color}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, color,
      }}>
        {icon}
      </div>
    </div>

    {!loading && (
      <div style={{ marginTop: 12 }}>
        <Text style={{ color: '#22c55e', fontSize: 12 }}>
          <ArrowUpOutlined /> Live
        </Text>
      </div>
    )}
  </Card>
);

// ─── Dashboard Page ───────────────────────────────────────────────────────────
const DashboardPage: React.FC = () => {
  const { data: stats, isLoading: statsLoading, isError } = useDashboardStats();
  const { data: activity, isLoading: activityLoading } = useRecentActivity();

  // Fallback mock data when backend not yet connected
  const mockGrowth = Array.from({ length: 14 }, (_, i) => ({
    date: formatDate(new Date(Date.now() - (13 - i) * 86400000).toISOString()),
    count: Math.floor(Math.random() * 40 + 10),
  }));

  const chartData = stats?.userGrowth?.length ? stats.userGrowth : mockGrowth;

  return (
    <div style={{ padding: '0 0 24px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <Title level={2} style={{ color: '#f1f5f9', margin: 0, fontWeight: 700 }}>
          Dashboard Overview
        </Title>
        <Text style={{ color: '#64748b' }}>
          Welcome back! Here's what's happening with your platform.
        </Text>
      </div>

      {isError && (
        <Alert
          message="Could not load live stats – showing placeholder data"
          type="warning"
          showIcon
          closable
          style={{ marginBottom: 24, borderRadius: 10 }}
        />
      )}

      {/* ── Stat Cards ────────────────────────────────────────────── */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} xl={6}>
          <StatCard
            title="Total Users"
            value={stats?.totalUsers ?? 0}
            icon={<TeamOutlined />}
            color="#6366f1"
            loading={statsLoading}
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <StatCard
            title="Active Users"
            value={stats?.activeUsers ?? 0}
            icon={<CheckCircleOutlined />}
            color="#22c55e"
            loading={statsLoading}
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <StatCard
            title="New Today"
            value={stats?.newUsersToday ?? 0}
            icon={<UserAddOutlined />}
            color="#f59e0b"
            loading={statsLoading}
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <StatCard
            title="Total Uploads"
            value={stats?.totalUploads ?? 0}
            icon={<FileImageOutlined />}
            color="#3b82f6"
            loading={statsLoading}
          />
        </Col>
      </Row>

      {/* ── Charts + Activity ──────────────────────────────────────── */}
      <Row gutter={[16, 16]}>
        {/* User Growth Chart */}
        <Col xs={24} lg={16}>
          <Card
            title={<Text style={{ color: '#f1f5f9', fontWeight: 600 }}>User Growth (14 days)</Text>}
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 16,
            }}
            bodyStyle={{ padding: '16px 8px' }}
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#colorUsers)"
                  dot={{ r: 3, fill: '#6366f1' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col xs={24} lg={8}>
          <Card
            title={<Text style={{ color: '#f1f5f9', fontWeight: 600 }}>Recent Activity</Text>}
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 16,
              height: '100%',
            }}
          >
            {activityLoading ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : activity?.length ? (
              <Timeline
                items={activity.slice(0, 8).map((item) => ({
                  color:
                    item.type === 'register' ? '#22c55e' :
                    item.type === 'login' ? '#6366f1' :
                    item.type === 'upload' ? '#3b82f6' : '#f59e0b',
                  children: (
                    <div>
                      <Text style={{ color: '#e2e8f0', fontSize: 13 }}>{item.description}</Text>
                      <br />
                      <Text style={{ color: '#475569', fontSize: 11 }}>{fromNow(item.createdAt)}</Text>
                    </div>
                  ),
                }))}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Tag color="default">No recent activity</Tag>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
