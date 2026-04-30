export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalUploads: number;
  userGrowth: GrowthPoint[];
}

export interface GrowthPoint {
  date: string;
  count: number;
}

export interface ActivityItem {
  id: string;
  type: 'register' | 'login' | 'upload' | 'update';
  description: string;
  createdAt: string;
}
