'use client';

import { Card, CardContent, Typography, Stack, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import type { AtRiskProject } from '@/app/modern-dashboard/types';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '1px solid rgba(239, 68, 68, 0.5)',
    boxShadow: '0 8px 32px rgba(239, 68, 68, 0.2)'
  }
}));

interface AtRiskProjectsCardProps {
  projects: AtRiskProject[];
}

export default function AtRiskProjectsCard({ projects }: AtRiskProjectsCardProps) {
  if (projects.length === 0) return null;

  return (
    <GlassCard>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <WarningAmberOutlinedIcon sx={{ color: 'error.main' }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              Heads-Up: At-Risk Projects
            </Typography>
          </Stack>
          {projects.map((project) => (
            <Alert
              key={project.id}
              severity="error"
              icon={false}
              sx={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                '& .MuiAlert-message': {
                  width: '100%'
                }
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" color="error.light">
                {project.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {project.issue}
              </Typography>
            </Alert>
          ))}
        </Stack>
      </CardContent>
    </GlassCard>
  );
}