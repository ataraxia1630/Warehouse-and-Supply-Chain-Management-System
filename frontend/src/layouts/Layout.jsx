import Header from './Header';
import Footer from './Footer';
import Sidebar from '@components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const SIDEBAR_WIDTH = 208;
  const HEADER_HEIGHT = 48;
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header height={HEADER_HEIGHT} />
      <div style={{ display: 'flex' }}>
        <Sidebar width={SIDEBAR_WIDTH} headerHeight={HEADER_HEIGHT + 1} />
        <main
          style={{
            flex: 1,
            marginLeft: SIDEBAR_WIDTH, // chừa chỗ cho sidebar
            marginTop: HEADER_HEIGHT, // chừa chỗ cho header
            padding: 16,
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
