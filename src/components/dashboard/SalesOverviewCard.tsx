'use client';

import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import type { SalesDataPoint } from '@/app/modern-dashboard/types';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(76, 59, 207, 0.2)',
  borderRadius: '20px'
}));

interface SalesOverviewCardProps {
  salesData: SalesDataPoint[];
}

export default function SalesOverviewCard({ salesData }: SalesOverviewCardProps) {
  return (
    <GlassCard>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <TrendingUpIcon sx={{ color: 'success.main' }} />
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Sales overview
              </Typography>
            </Stack>
            <Chip
              label="(+5) more in 2021"
              size="small"
              sx={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'success.main',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 600
              }}
            />
          </Stack>
          <LineChart
            dataset={salesData as any}
            xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
            series={[
              {
                dataKey: 'value',
                label: 'Sales',
                color: '#4C3BCF',
                area: true,
                showMark: false
              }
            ]}
            height={300}
            margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
            grid={{ horizontal: true }}
            sx={{
              '& .MuiChartsAxis-tickLabel': {
                fill: '#A0A0A0',
                fontSize: '0.75rem'
              },
              '& .MuiChartsAxis-line': {
                stroke: 'rgba(76, 59, 207, 0.2)'
              },
              '& .MuiChartsAxis-tick': {
                stroke: 'rgba(76, 59, 207, 0.2)'
              },
              '& .MuiAreaElement-root': {
                fill: 'url(#salesGradient)'
              }
            }}
          />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4C3BCF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4C3BCF" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </Stack>
      </CardContent>
    </GlassCard>
  );
}
