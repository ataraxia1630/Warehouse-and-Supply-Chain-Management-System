import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header />
      <main style={{ flex: 1 }}>
        {/* Outlet = chỗ hiển thị page con */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
