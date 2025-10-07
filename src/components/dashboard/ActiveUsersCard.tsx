'use client';

import { Card, CardContent, Typography, Stack, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { formatNumber } from '@/app/modern-dashboard/utils';
import type { ActiveUsersStats } from '@/app/modern-dashboard/types';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(76, 59, 207, 0.2)',
  borderRadius: '20px'
}));

const StatItem = styled(Box)(({ theme }) => ({
  padding: '14px',
  backgroundColor: 'rgba(76, 59, 207, 0.08)',
  borderRadius: '12px',
  border: '1px solid rgba(76, 59, 207, 0.15)',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flex: 1,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(76, 59, 207, 0.15)',
    border: '1px solid rgba(76, 59, 207, 0.3)',
    transform: 'translateY(-2px)'
  }
}));

interface ActiveUsersCardProps {
  stats: ActiveUsersStats;
}

export default function ActiveUsersCard({ stats }: ActiveUsersCardProps) {
  const chartData = [
    { category: 'Users', value: 500 },
    { category: 'Clicks', value: 400 },
    { category: 'Sales', value: 600 },
    { category: 'Items', value: 450 }
  ];

  return (
    <GlassCard>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              Active Users
            </Typography>
            <Chip
              label={`(+${stats.weeklyChange}) than last week`}
              size="small"
              sx={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'success.main',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 600
              }}
            />
          </Stack>
          <BarChart
            dataset={chartData}
            xAxis={[{ scaleType: 'band', dataKey: 'category' }]}
            series={[
              {
                dataKey: 'value',
                color: '#4C3BCF'
              }
            ]}
            height={200}
            margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
            sx={{
              '& .MuiChartsAxis-tickLabel': {
                fill: '#A0A0A0',
                fontSize: '0.75rem'
              },
              '& .MuiChartsAxis-line': {
                stroke: 'rgba(76, 59, 207, 0.2)'
              }
            }}
          />
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <StatItem>
              <PeopleOutlinedIcon sx={{ color: 'info.main', fontSize: 20 }} />
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  Users
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  {formatNumber(stats.users)}
                </Typography>
              </Stack>
            </StatItem>
            <StatItem>
              <MouseOutlinedIcon sx={{ color: 'warning.main', fontSize: 20 }} />
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  Clicks
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  {formatNumber(stats.clicks)}
                </Typography>
              </Stack>
            </StatItem>
            <StatItem>
              <ShoppingCartOutlinedIcon sx={{ color: 'success.main', fontSize: 20 }} />
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  Sales
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  {formatNumber(stats.sales)}
                </Typography>
              </Stack>
            </StatItem>
            <StatItem>
              <InventoryOutlinedIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  Items
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  {formatNumber(stats.items)}
                </Typography>
              </Stack>
            </StatItem>
          </Stack>
        </Stack>
      </CardContent>
    </GlassCard>
  );
}