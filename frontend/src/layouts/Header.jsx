import { Box, IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header({ height = 60 }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        height,
        bgcolor: '#ffffff',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 24px',
        borderBottom: '1px solid #e0e0e0',
        top: '0',
      }}
    >
      <Avatar
        alt="User Avatar"
        src="/path/to/avatar.jpg"
        sx={{
          width: '40px',
          height: '40px',
          '&:hover': {
            cursor: 'pointer',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
          },
        }}
        onClick={() => navigate('/profile')}
      />
    </Box>
  );
}
