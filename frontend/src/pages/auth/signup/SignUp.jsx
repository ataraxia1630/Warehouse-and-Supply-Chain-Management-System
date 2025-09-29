import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Simulate API call
    if (email && password.length >= 6) {
      navigate('/login'); // Chuyển đến trang login sau khi đăng ký thành công
    } else {
      setError('Password must be at least 6 characters');
    }
    // TODO: Thay bằng fetch API (e.g., POST to /signup)
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: '#ffffff',
          p: 4,
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: '#7f408e', mb: 4, fontFamily: 'Roboto, sans-serif' }}
        >
          Sign Up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: '#7f408e',
              '&:hover': { bgcolor: '#ff7b47' },
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
            }}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, color: '#3e468a' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ color: '#ff7b47', textDecoration: 'none' }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
