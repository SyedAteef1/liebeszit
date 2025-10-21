'use client';

import { Card, CardContent, Typography, Stack, LinearProgress, Chip, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getStatusColor } from '@/app/modern-dashboard/utils';
import type { Project } from '@/app/modern-dashboard/types';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(76, 59, 207, 0.2)',
  borderRadius: '20px'
}));

const ProjectItem = styled(Box)(({ theme }) => ({
  padding: '20px',
  backgroundColor: 'rgba(76, 59, 207, 0.08)',
  borderRadius: '16px',
  border: '1px solid rgba(76, 59, 207, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(76, 59, 207, 0.15)',
    border: '1px solid rgba(76, 59, 207, 0.4)',
    transform: 'translateX(6px)',
    boxShadow: '0 4px 20px rgba(76, 59, 207, 0.2)'
  }
}));

const GlowingLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '10px',
  borderRadius: '5px',
  backgroundColor: 'rgba(76, 59, 207, 0.15)',
  '& .MuiLinearProgress-bar': {
    borderRadius: '5px',
    background: 'linear-gradient(90deg, #4C3BCF, #6B5FE8)',
    boxShadow: '0 0 15px rgba(76, 59, 207, 0.6)'
  }
}));

interface ActiveProjectsCardProps {
  projects: Project[];
}

export default function ActiveProjectsCard({ projects }: ActiveProjectsCardProps) {
  return (
    <GlassCard>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FolderOpenOutlinedIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              Active Project Progress
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {projects.map((project) => (
              <ProjectItem key={project.id}>
                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                      {project.name}
                    </Typography>
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        backgroundColor: `${getStatusColor(project.status)}20`,
                        color: getStatusColor(project.status),
                        border: `1px solid ${getStatusColor(project.status)}40`,
                        fontWeight: 600
                      }}
                    />
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <GlowingLinearProgress variant="determinate" value={project.progress} sx={{ flex: 1 }} />
                    <Typography variant="body2" fontWeight="bold" color="primary.main">
                      {project.progress}%
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {project.summary}
                  </Typography>
                </Stack>
              </ProjectItem>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </GlassCard>
  );
}
