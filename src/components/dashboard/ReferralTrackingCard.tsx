'use client';

import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Gauge } from '@mui/x-charts/Gauge';
import type { ReferralTracking } from '@/app/modern-dashboard/types';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(76, 59, 207, 0.2)',
  borderRadius: '20px'
}));

const StatBox = styled(Box)(({ theme }) => ({
  padding: '16px',
  backgroundColor: 'rgba(76, 59, 207, 0.08)',
  borderRadius: '12px',
  border: '1px solid rgba(76, 59, 207, 0.15)',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(76, 59, 207, 0.15)',
    border: '1px solid rgba(76, 59, 207, 0.3)'
  }
}));

interface ReferralTrackingCardProps {
  referralTracking: ReferralTracking;
}

export default function ReferralTrackingCard({ referralTracking }: ReferralTrackingCardProps) {
  return (
    <GlassCard>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ShareOutlinedIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              Referral Tracking
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack spacing={2} sx={{ flex: 1 }}>
              <StatBox>
                <Typography variant="body2" color="text.secondary">
                  Invited
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                  {referralTracking.invited} people
                </Typography>
              </StatBox>
              <StatBox>
                <Typography variant="body2" color="text.secondary">
                  Bonus
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="success.main">
                  {referralTracking.bonus.toLocaleString()}
                </Typography>
              </StatBox>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Safety
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <Gauge
                  value={(referralTracking.safetyScore / 10) * 100}
                  startAngle={0}
                  endAngle={360}
                  width={120}
                  height={120}
                  innerRadius="70%"
                  outerRadius="100%"
                  sx={{
                    '& .MuiGauge-valueArc': {
                      fill: 'url(#safetyGradient)'
                    },
                    '& .MuiGauge-referenceArc': {
                      fill: 'rgba(76, 59, 207, 0.1)'
                    }
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {referralTracking.safetyScore}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Score
                  </Typography>
                </Box>
              </Box>
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="safetyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
              </svg>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </GlassCard>
  );
}
