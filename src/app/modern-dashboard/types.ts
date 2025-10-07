// Enums for dashboard status and types
export enum ProjectStatus {
  ON_TRACK = 'On Track',
  AT_RISK = 'At Risk',
  COMPLETED = 'Completed',
  DELAYED = 'Delayed'
}

export enum WorkloadLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum ActivityType {
  GOAL_CLARIFIED = 'goal_clarified',
  TASK_ASSIGNED = 'task_assigned',
  STATUS_INQUIRY = 'status_inquiry',
  PROJECT_UPDATED = 'project_updated'
}

// Props types (data passed to components)
export interface DashboardProps {
  user: UserProfile;
  metrics: DashboardMetrics;
  atRiskProjects: AtRiskProject[];
  activityFeed: ActivityItem[];
  activeProjects: Project[];
  teamWorkload: TeamMember[];
  salesData: SalesDataPoint[];
  activeUsersStats: ActiveUsersStats;
  satisfactionRate: SatisfactionRate;
  referralTracking: ReferralTracking;
}

export interface UserProfile {
  name: string;
  avatar: string;
  role: 'Founder' | 'Manager' | 'Developer' | 'Designer';
}

export interface DashboardMetrics {
  todaysMoney: MetricValue;
  todaysUsers: MetricValue;
  newClients: MetricValue;
  totalSales: MetricValue;
}

export interface MetricValue {
  value: number;
  change: number;
}

export interface AtRiskProject {
  id: string;
  name: string;
  issue: string;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  name: string;
  progress: number;
  status: ProjectStatus;
  summary: string;
}

export interface TeamMember {
  id: string;
  name: string;
  workload: WorkloadLevel;
  tasksCount: number;
}

export interface SalesDataPoint {
  month: string;
  value: number;
}

export interface ActiveUsersStats {
  users: number;
  clicks: number;
  sales: number;
  items: number;
  weeklyChange: number;
}

export interface SatisfactionRate {
  percentage: number;
  basedOnLikes: boolean;
}

export interface ReferralTracking {
  invited: number;
  bonus: number;
  safetyScore: number;
}

// Root component receives all dashboard data as props
export type ModernDashboardProps = DashboardProps;