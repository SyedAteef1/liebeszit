'use client';

import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatCurrency, formatNumber, formatPercentage } from '@/app/modern-dashboard/utils';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(76, 59, 207, 0.2)',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '1px solid rgba(76, 59, 207, 0.5)',
    boxShadow: '0 8px 32px rgba(76, 59, 207, 0.3)',
    transform: 'translateY(-6px)'
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(76, 59, 207, 0.2), rgba(76, 59, 207, 0.1))',
  border: '1px solid rgba(76, 59, 207, 0.3)',
  boxShadow: '0 4px 16px rgba(76, 59, 207, 0.2)'
}));

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  isCurrency?: boolean;
}

export default function MetricCard({ title, value, change, icon, isCurrency = false }: MetricCardProps) {
  const formattedValue = isCurrency ? formatCurrency(value) : formatNumber(value);
  const isPositive = change >= 0;

  return (
    <GlassCard>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {formattedValue}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {isPositive ? (
                <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
              )}
              <Typography
                variant="body2"
                sx={{ color: isPositive ? 'success.main' : 'error.main', fontWeight: 600 }}
              >
                {formatPercentage(change)}
              </Typography>
            </Stack>
          </Stack>
          <IconWrapper>{icon}</IconWrapper>
        </Stack>
      </CardContent>
    </GlassCard>
  );
}
