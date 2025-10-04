import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

export default function Layout() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header />
      <main style={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Outlet = chỗ hiển thị page con */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
