import Header from './Header';
import Footer from './Footer';
import Sidebar from '@components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: '264px', padding: '16px' }}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
