import type { ProjectStatus, WorkloadLevel } from './types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value}%`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}m`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).toUpperCase();
};

export const getStatusColor = (status: ProjectStatus): string => {
  switch (status) {
    case 'On Track':
      return '#10B981';
    case 'At Risk':
      return '#EF4444';
    case 'Completed':
      return '#8A2BE2';
    case 'Delayed':
      return '#F59E0B';
    default:
      return '#6B7280';
  }
};

export const getWorkloadColor = (level: WorkloadLevel): string => {
  switch (level) {
    case 'Low':
      return '#10B981';
    case 'Medium':
      return '#F59E0B';
    case 'High':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};