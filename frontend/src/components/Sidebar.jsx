import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', path: '/' },
    { text: 'Order', path: '/order', disabled: true }, // Tạm thời disable
    { text: 'Inventory', path: '/inventory' },
    { text: 'Supplier', path: '/supplier' },
    { text: 'Logistics', path: '/logistics', disabled: true }, // Tạm thời disable
  ];

  return (
    <Box
      sx={{
        width: '264px',
        height: '1024px',
        background: 'linear-gradient(to bottom, #3e468a, #7f408e)',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowY: 'auto', // Cuộn nếu nội dung vượt quá 1024px
        borderRight: '1px solid #e0e0e0',
        zIndex: 1000,
      }}
    >
      <Box sx={{ p: 5, color: 'white', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '20px',
            margin: 0,
          }}
        >
          Warehouse App
        </h2>
      </Box>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => !item.disabled && navigate(item.path)}
                disabled={item.disabled}
                sx={{
                  '&.Mui-selected': {
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 16, // Căn lề trái của gạch
                      top: '50%',
                      transform: 'translateY(-50%)', // Căn giữa theo chiều dọc của text
                      width: '4px', // Độ dày của gạch
                      height: '20px', // Chiều cao bằng với text (khoảng 20px là kích thước mặc định của text trong MUI)
                      backgroundColor: '#ffffff', // Màu gạch trắng
                    },
                    '& .MuiListItemText-primary': {
                      fontWeight: 700, // Text bold khi selected
                      fontSize: '16px', // Kích thước chữ lớn hơn khi selected
                      pl: 2, // Padding trái để đẩy text lùi vào trong
                    },
                  },
                  '&:hover': {
                    backgroundColor: item.disabled ? 'inherit' : '#ff7b4720',
                  },
                  color: item.disabled ? '#757575' : '#ffffff', // Text trắng trên gradient
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '10px',
                  position: 'relative', // Để định vị gạch
                }}
                selected={location.pathname === item.path}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
            {(item.text === 'Suppliers' || item.text === 'Purchase Orders') && (
              <Divider />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
