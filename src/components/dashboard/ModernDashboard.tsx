'use client';

import { Box, Stack, TextField, InputAdornment, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NavigationSidebar from './NavigationSidebar';
import CommandBar from './CommandBar';
import MetricCard from './MetricCard';
import AtRiskProjectsCard from './AtRiskProjectsCard';
import ActivityFeedCard from './ActivityFeedCard';
import ActiveProjectsCard from './ActiveProjectsCard';
import TeamWorkloadCard from './TeamWorkloadCard';
import SalesOverviewCard from './SalesOverviewCard';
import SatisfactionRateCard from './SatisfactionRateCard';
import ReferralTrackingCard from './ReferralTrackingCard';
import ActiveUsersCard from './ActiveUsersCard';
import WelcomeCard from './WelcomeCard';
import type { ModernDashboardProps } from '@/app/modern-dashboard/types';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: '280px',
  flex: 1,
  padding: '24px',
  overflow: 'auto'
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  padding: '16px 0'
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(17, 17, 17, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(76, 59, 207, 0.2)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
      border: '1px solid rgba(76, 59, 207, 0.4)'
    },
    '& fieldset': {
      border: 'none'
    }
  }
}));

const MetricsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  marginBottom: '24px'
});

const CardsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '20px'
});

export default function ModernDashboard(props: ModernDashboardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <DashboardContainer>
      <NavigationSidebar user={props.user} />
      
      <MainContent>
        <Header>
          <SearchField
            placeholder="Type here..."
            size="small"
            sx={{ width: '300px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                )
              }
            }}
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton sx={{ color: 'text.secondary' }}>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton sx={{ color: 'text.secondary' }} onClick={handleMenuOpen}>
              <SettingsOutlinedIcon />
            </IconButton>
          </Stack>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Header>

        <Stack spacing={3}>
          <CommandBar />

          <MetricsGrid>
            <MetricCard
              title="Today's Money"
              value={props.metrics.todaysMoney.value}
              change={props.metrics.todaysMoney.change}
              icon={<PaidOutlinedIcon sx={{ fontSize: 28, color: 'primary.main' }} />}
              isCurrency
            />
            <MetricCard
              title="Today's Users"
              value={props.metrics.todaysUsers.value}
              change={props.metrics.todaysUsers.change}
              icon={<Groups2OutlinedIcon sx={{ fontSize: 28, color: 'info.main' }} />}
            />
            <MetricCard
              title="New Clients"
              value={props.metrics.newClients.value}
              change={props.metrics.newClients.change}
              icon={<CardTravelOutlinedIcon sx={{ fontSize: 28, color: 'success.main' }} />}
            />
            <MetricCard
              title="Total Sales"
              value={props.metrics.totalSales.value}
              change={props.metrics.totalSales.change}
              icon={<ShoppingCartOutlinedIcon sx={{ fontSize: 28, color: 'warning.main' }} />}
              isCurrency
            />
          </MetricsGrid>

          <CardsGrid>
            <Box sx={{ gridColumn: 'span 8' }}>
              <WelcomeCard userName={props.user.name} />
            </Box>
            <Box sx={{ gridColumn: 'span 4' }}>
              <SatisfactionRateCard satisfactionRate={props.satisfactionRate} />
            </Box>
          </CardsGrid>

          <CardsGrid>
            <Box sx={{ gridColumn: 'span 4' }}>
              <AtRiskProjectsCard projects={props.atRiskProjects} />
            </Box>
            <Box sx={{ gridColumn: 'span 4' }}>
              <ActivityFeedCard activities={props.activityFeed} />
            </Box>
            <Box sx={{ gridColumn: 'span 4' }}>
              <ReferralTrackingCard referralTracking={props.referralTracking} />
            </Box>
          </CardsGrid>

          <CardsGrid>
            <Box sx={{ gridColumn: 'span 8' }}>
              <SalesOverviewCard salesData={props.salesData} />
            </Box>
            <Box sx={{ gridColumn: 'span 4' }}>
              <ActiveProjectsCard projects={props.activeProjects} />
            </Box>
          </CardsGrid>

          <CardsGrid>
            <Box sx={{ gridColumn: 'span 6' }}>
              <TeamWorkloadCard teamMembers={props.teamWorkload} />
            </Box>
            <Box sx={{ gridColumn: 'span 6' }}>
              <ActiveUsersCard stats={props.activeUsersStats} />
            </Box>
          </CardsGrid>
        </Stack>
      </MainContent>
    </DashboardContainer>
  );
}
