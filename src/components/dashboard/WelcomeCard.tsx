'use client';

import { Card, CardContent, Typography, Stack, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(76, 59, 207, 0.2)',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden'
}));

const BackgroundImage = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width: '50%',
  backgroundImage: 'url(/images/dashboard-cover.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.3,
  filter: 'blur(2px)'
});

const RecordButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(76, 59, 207, 0.2)',
  border: '1px solid rgba(76, 59, 207, 0.4)',
  borderRadius: '12px',
  padding: '10px 20px',
  color: theme.palette.text.primary,
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(76, 59, 207, 0.35)',
    boxShadow: '0 4px 24px rgba(76, 59, 207, 0.4)',
    border: '1px solid rgba(76, 59, 207, 0.6)'
  }
}));

interface WelcomeCardProps {
  userName: string;
}

export default function WelcomeCard({ userName }: WelcomeCardProps) {
  return (
    <GlassCard>
      <BackgroundImage />
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Welcome back,
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {userName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Glad to see you again!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ask me anything.
          </Typography>
          <RecordButton startIcon={<MicOutlinedIcon />}>
            Tap to record
          </RecordButton>
        </Stack>
      </CardContent>
    </GlassCard>
  );
}
