'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { dashboardTheme } from './theme';
import ModernDashboard from '@/components/dashboard/ModernDashboard';
import { mockRootProps } from './modernDashboardMockData';

const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true
  });
};

const emotionCache = createEmotionCache();

export default function ModernDashboardPage() {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={dashboardTheme}>
        <CssBaseline />
        <ModernDashboard {...mockRootProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}