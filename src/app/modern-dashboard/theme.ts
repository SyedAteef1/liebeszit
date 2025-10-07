import { createTheme } from '@mui/material/styles';

// Theme configuration for Feeta Modern Dashboard
export const dashboardTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4C3BCF',
      light: '#6B5FE8',
      dark: '#3A2D9F',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#4C3BCF',
      light: '#6B5FE8',
      dark: '#3A2D9F',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#000000',
      paper: 'rgba(17, 17, 17, 0.8)'
    },
    text: {
      primary: '#EAEAEA',
      secondary: '#A0A0A0',
      disabled: '#6B7280'
    },
    divider: 'rgba(76, 59, 207, 0.2)',
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669'
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626'
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706'
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB'
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    }
  },
  typography: {
    fontFamily: "'Inter', 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(138, 43, 226, 0.1), 0 1px 2px 0 rgba(138, 43, 226, 0.06)',
    '0 4px 6px -1px rgba(138, 43, 226, 0.1), 0 2px 4px -1px rgba(138, 43, 226, 0.06)',
    '0 10px 15px -3px rgba(138, 43, 226, 0.1), 0 4px 6px -2px rgba(138, 43, 226, 0.05)',
    '0 20px 25px -5px rgba(138, 43, 226, 0.1), 0 10px 10px -5px rgba(138, 43, 226, 0.04)',
    '0 25px 50px -12px rgba(138, 43, 226, 0.25)',
    '0 0 0 1px rgba(138, 43, 226, 0.05)',
    '0 0 20px rgba(138, 43, 226, 0.3)',
    '0 0 30px rgba(138, 43, 226, 0.4)',
    '0 0 40px rgba(138, 43, 226, 0.5)',
    '0 0 50px rgba(138, 43, 226, 0.6)',
    '0 0 60px rgba(255, 0, 255, 0.3)',
    '0 0 70px rgba(255, 0, 255, 0.4)',
    '0 0 80px rgba(255, 0, 255, 0.5)',
    '0 0 90px rgba(255, 0, 255, 0.6)',
    '0 0 100px rgba(255, 0, 255, 0.7)',
    'inset 0 2px 4px 0 rgba(138, 43, 226, 0.06)',
    'inset 0 0 20px rgba(138, 43, 226, 0.2)',
    'inset 0 0 30px rgba(138, 43, 226, 0.3)',
    '0 0 0 3px rgba(138, 43, 226, 0.5)',
    '0 0 0 4px rgba(255, 0, 255, 0.3)',
    '0 10px 40px rgba(138, 43, 226, 0.2)',
    '0 15px 50px rgba(138, 43, 226, 0.3)',
    '0 20px 60px rgba(255, 0, 255, 0.2)',
    '0 25px 70px rgba(255, 0, 255, 0.3)'
  ]
});