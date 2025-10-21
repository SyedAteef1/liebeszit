'use client';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Avatar, Typography, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import type { UserProfile } from '@/app/modern-dashboard/types';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '280px',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(20px)',
    border: 'none',
    borderRight: '1px solid rgba(76, 59, 207, 0.2)'
  }
}));

const Logo = styled(Box)(({ theme }) => ({
  padding: '24px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #4C3BCF, #6B5FE8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 20px rgba(76, 59, 207, 0.5)'
}));

const NavListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '12px',
  margin: '4px 12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(76, 59, 207, 0.15)',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main
    }
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(76, 59, 207, 0.25)',
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    boxShadow: '0 4px 16px rgba(76, 59, 207, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(76, 59, 207, 0.3)'
    }
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  padding: '16px 24px 8px',
  fontSize: '0.75rem',
  fontWeight: 700,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}));

const UserSection = styled(Box)(({ theme }) => ({
  padding: '16px',
  marginTop: 'auto',
  borderTop: '1px solid rgba(76, 59, 207, 0.2)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: 'rgba(76, 59, 207, 0.05)'
}));

interface NavigationSidebarProps {
  user: UserProfile;
}

const mainNavItems = [
  { text: 'Dashboard', icon: <HomeOutlinedIcon />, selected: true },
  { text: 'Tables', icon: <ListAltOutlinedIcon />, selected: false },
  { text: 'Billing', icon: <CreditCardOutlinedIcon />, selected: false },
  { text: 'RTL', icon: <SwapHorizOutlinedIcon />, selected: false }
];

const accountNavItems = [
  { text: 'Profile', icon: <PersonOutlinedIcon />, selected: false },
  { text: 'Sign In', icon: <LoginOutlinedIcon />, selected: false },
  { text: 'Sign Up', icon: <HowToRegOutlinedIcon />, selected: false }
];

export default function NavigationSidebar({ user }: NavigationSidebarProps) {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Stack sx={{ height: '100%' }}>
        <Logo>
          <LogoIcon>
            <Typography variant="h6" fontWeight="bold" color="white">
              F
            </Typography>
          </LogoIcon>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            VISION UI FREE
          </Typography>
        </Logo>

        <Divider sx={{ borderColor: 'rgba(76, 59, 207, 0.2)' }} />

        <List>
          {mainNavItems.map((item) => (
            <NavListItemButton key={item.text} selected={item.selected}>
              <ListItemIcon sx={{ color: item.selected ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: item.selected ? 600 : 400
                }}
              />
            </NavListItemButton>
          ))}
        </List>

        <SectionTitle>ACCOUNT PAGES</SectionTitle>

        <List>
          {accountNavItems.map((item) => (
            <NavListItemButton key={item.text} selected={item.selected}>
              <ListItemIcon sx={{ color: item.selected ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: item.selected ? 600 : 400
                }}
              />
            </NavListItemButton>
          ))}
        </List>

        <UserSection>
          <Avatar src={user.avatar} alt={user.name} sx={{ width: 40, height: 40 }} />
          <Stack>
            <Typography variant="body2" fontWeight="bold" color="text.primary">
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.role}
            </Typography>
          </Stack>
        </UserSection>
      </Stack>
    </StyledDrawer>
  );
}
