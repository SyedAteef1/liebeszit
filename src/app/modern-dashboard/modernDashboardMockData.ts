import { ProjectStatus, WorkloadLevel, ActivityType } from './types';

// Data passed as props to the root component
export const mockRootProps = {
  user: {
    name: 'Mark Johnson',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'Founder' as const
  },
  metrics: {
    todaysMoney: {
      value: 53000,
      change: 55
    },
    todaysUsers: {
      value: 2300,
      change: 3
    },
    newClients: {
      value: 3052,
      change: 2
    },
    totalSales: {
      value: 173000,
      change: 5
    }
  },
  atRiskProjects: [
    {
      id: 'proj-1' as const,
      name: 'Payment Gateway' as const,
      issue: 'Backend tasks are blocked pending API key delivery.' as const
    }
  ],
  activityFeed: [
    {
      id: 'act-1' as const,
      type: ActivityType.GOAL_CLARIFIED,
      message: "Clarified 'New Homepage Launch' goal with you." as const,
      timestamp: new Date('2024-01-15T10:15:00')
    },
    {
      id: 'act-2' as const,
      type: ActivityType.TASK_ASSIGNED,
      message: 'Assigned task JIRA-245 to @David.' as const,
      timestamp: new Date('2024-01-15T10:17:00')
    },
    {
      id: 'act-3' as const,
      type: ActivityType.STATUS_INQUIRY,
      message: 'Sent a status inquiry to @Sarah via Slack.' as const,
      timestamp: new Date('2024-01-15T10:20:00')
    }
  ],
  activeProjects: [
    {
      id: 'proj-2' as const,
      name: 'New Homepage Launch' as const,
      progress: 85,
      status: ProjectStatus.ON_TRACK,
      summary: 'Frontend is complete; awaiting backend deployment.' as const
    },
    {
      id: 'proj-3' as const,
      name: 'Payment Gateway Integration' as const,
      progress: 45,
      status: ProjectStatus.AT_RISK,
      summary: 'Waiting on API credentials from vendor.' as const
    },
    {
      id: 'proj-4' as const,
      name: 'Mobile App Beta' as const,
      progress: 92,
      status: ProjectStatus.ON_TRACK,
      summary: 'Final testing in progress, launch scheduled.' as const
    }
  ],
  teamWorkload: [
    {
      id: 'member-1' as const,
      name: 'David Chen' as const,
      workload: WorkloadLevel.MEDIUM,
      tasksCount: 8
    },
    {
      id: 'member-2' as const,
      name: 'Sarah Miller' as const,
      workload: WorkloadLevel.HIGH,
      tasksCount: 12
    },
    {
      id: 'member-3' as const,
      name: 'Alex Kumar' as const,
      workload: WorkloadLevel.LOW,
      tasksCount: 4
    },
    {
      id: 'member-4' as const,
      name: 'Emma Wilson' as const,
      workload: WorkloadLevel.MEDIUM,
      tasksCount: 7
    }
  ],
  salesData: [
    { month: 'Jan' as const, value: 350 },
    { month: 'Feb' as const, value: 420 },
    { month: 'Mar' as const, value: 380 },
    { month: 'Apr' as const, value: 480 },
    { month: 'May' as const, value: 520 },
    { month: 'Jun' as const, value: 450 },
    { month: 'Jul' as const, value: 510 },
    { month: 'Aug' as const, value: 490 },
    { month: 'Sep' as const, value: 550 },
    { month: 'Oct' as const, value: 480 },
    { month: 'Nov' as const, value: 520 },
    { month: 'Dec' as const, value: 580 }
  ],
  activeUsersStats: {
    users: 32984,
    clicks: 2420000,
    sales: 2400,
    items: 320,
    weeklyChange: 23
  },
  satisfactionRate: {
    percentage: 95,
    basedOnLikes: true
  },
  referralTracking: {
    invited: 145,
    bonus: 1465,
    safetyScore: 9.3
  }
};