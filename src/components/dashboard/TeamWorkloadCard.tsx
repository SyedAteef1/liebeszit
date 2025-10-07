'use client';

import { Card, CardContent, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { getWorkloadColor } from '@/app/modern-dashboard/utils';
import type { TeamMember } from '@/app/modern-dashboard/types';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(76, 59, 207, 0.2)',
  borderRadius: '20px'
}));

interface TeamWorkloadCardProps {
  teamMembers: TeamMember[];
}

export default function TeamWorkloadCard({ teamMembers }: TeamWorkloadCardProps) {
  const chartData = teamMembers.map((member) => ({
    name: member.name,
    tasks: member.tasksCount,
    color: getWorkloadColor(member.workload)
  }));

  return (
    <GlassCard>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <GroupsOutlinedIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              Team Workload at a Glance
            </Typography>
          </Stack>
          <BarChart
            dataset={chartData}
            xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
            series={[
              {
                dataKey: 'tasks',
                label: 'Tasks',
                color: '#4C3BCF'
              }
            ]}
            height={300}
            margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
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
              }
            }}
          />
          <Stack direction="row" spacing={2} justifyContent="center">
            {['Low', 'Medium', 'High'].map((level) => (
              <Stack key={level} direction="row" alignItems="center" spacing={0.5}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    backgroundColor: getWorkloadColor(level as any)
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {level}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </GlassCard>
  );
}