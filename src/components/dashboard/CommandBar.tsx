'use client';

import { TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(17, 17, 17, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(76, 59, 207, 0.3)',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    '&:hover': {
      border: '1px solid rgba(76, 59, 207, 0.5)',
      boxShadow: '0 0 30px rgba(76, 59, 207, 0.2)'
    },
    '&.Mui-focused': {
      border: '1px solid rgba(76, 59, 207, 0.8)',
      boxShadow: '0 0 40px rgba(76, 59, 207, 0.3)'
    },
    '& fieldset': {
      border: 'none'
    }
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary,
    fontSize: '1rem',
    padding: '16px'
  }
}));

export default function CommandBar() {
  return (
    <StyledTextField
      fullWidth
      placeholder="Delegate a new goal to Feeta..."
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon sx={{ color: 'primary.main' }} />
            </InputAdornment>
          )
        }
      }}
    />
  );
}
