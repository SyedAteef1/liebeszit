'use client';

import { Card, CardContent, Typography, Stack, List, ListItem, ListItemText, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatTime } from '@/app/modern-dashboard/utils';
import type { ActivityItem } from '@/app/modern-dashboard/types';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(76, 59, 207, 0.2)',
  borderRadius: '20px',
  height: '100%'
}));

const ScrollableList = styled(List)({
  maxHeight: '300px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '3px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(76, 59, 207, 0.5)',
    borderRadius: '3px',
    '&:hover': {
      background: 'rgba(76, 59, 207, 0.7)'
    }
  }
});

interface ActivityFeedCardProps {
  activities: ActivityItem[];
}

export default function ActivityFeedCard({ activities }: ActivityFeedCardProps) {
  return (
    <GlassCard>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AutoAwesomeOutlinedIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              Feeta&apos;s Live Feed
            </Typography>
          </Stack>
          <ScrollableList>
            {activities.map((activity) => (
              <ListItem
                key={activity.id}
                sx={{
                  backgroundColor: 'rgba(76, 59, 207, 0.08)',
                  borderRadius: '12px',
                  mb: 1,
                  border: '1px solid rgba(76, 59, 207, 0.15)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 59, 207, 0.15)',
                    border: '1px solid rgba(76, 59, 207, 0.3)'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Chip
                        label={formatTime(activity.timestamp)}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(76, 59, 207, 0.25)',
                          color: 'primary.light',
                          fontSize: '0.75rem',
                          height: '22px',
                          fontWeight: 600
                        }}
                      />
                      <Typography variant="body2" color="text.primary">
                        {activity.message}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem>
            ))}
          </ScrollableList>
        </Stack>
      </CardContent>
    </GlassCard>
  );
}