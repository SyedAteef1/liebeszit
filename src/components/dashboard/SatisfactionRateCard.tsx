'use client';

import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Gauge } from '@mui/x-charts/Gauge';
import type { SatisfactionRate } from '@/app/modern-dashboard/types';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(76, 59, 207, 0.2)',
  borderRadius: '20px'
}));

interface SatisfactionRateCardProps {
  satisfactionRate: SatisfactionRate;
}

export default function SatisfactionRateCard({ satisfactionRate }: SatisfactionRateCardProps) {
  return (
    <GlassCard>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmojiEmotionsOutlinedIcon sx={{ color: 'success.main' }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              Satisfaction Rate
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            From all projects
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <Gauge
              value={satisfactionRate.percentage}
              startAngle={-90}
              endAngle={90}
              width={200}
              height={150}
              sx={{
                '& .MuiGauge-valueArc': {
                  fill: 'url(#gaugeGradient)'
                },
                '& .MuiGauge-referenceArc': {
                  fill: 'rgba(76, 59, 207, 0.1)'
                }
              }}
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4C3BCF" />
                  <stop offset="100%" stopColor="#6B5FE8" />
                </linearGradient>
              </defs>
            </svg>
          </Box>
          <Typography variant="h3" fontWeight="bold" color="primary.main">
            {satisfactionRate.percentage}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Based on likes
          </Typography>
          <Stack direction="row" spacing={4} sx={{ width: '100%', justifyContent: 'space-around', mt: 2 }}>
            <Stack alignItems="center">
              <Typography variant="caption" color="text.secondary">
                0%
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography variant="caption" color="text.secondary">
                100%
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </GlassCard>
  );
}