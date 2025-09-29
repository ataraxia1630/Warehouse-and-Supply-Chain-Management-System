import React from 'react';
import { Box, IconButton, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '1176px',
        height: '116px',
        bgcolor: '#ffffff',
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Đổ bóng nhẹ
        marginLeft: '264px', // Dịch sang phải để tránh chồng lấp với sidebar
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 24px',
      }}
    >
      {/* Icon thông báo trong hình tròn nổi */}
      <IconButton
        sx={{
          position: 'relative',
          marginRight: '16px',
          '& .MuiIconButton-root': {
            backgroundColor: '#ff7b47', // Màu highlight cho hình tròn
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#ffffff', // Màu icon trắng
            '&:hover': {
              backgroundColor: '#e06b3f', // Hover effect
            },
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: '#ff0000', // Điểm đỏ báo số thông báo
            borderRadius: '50%',
            top: '8px',
            right: '8px',
            border: '2px solid #ffffff', // Viền trắng để nổi bật
          },
        }}
        onClick={() => navigate('/notifications')} // Chuyển đến trang thông báo (tùy chỉnh)
      >
        <NotificationsIcon />
      </IconButton>

      {/* Avatar */}
      <Avatar
        alt="User Avatar"
        src="/path/to/avatar.jpg" // Thay bằng đường dẫn ảnh avatar thực tế
        sx={{
          width: '40px',
          height: '40px',
          '&:hover': {
            cursor: 'pointer',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)', // Hiệu ứng hover
          },
        }}
        onClick={() => navigate('/profile')} // Chuyển đến trang profile (tùy chỉnh)
      />
    </Box>
  );
};

export default Header;
