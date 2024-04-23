import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { cn } from '../../utils';
import Sidebar from '../Sidebar';
import Header from '../Header';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={cn('relative flex min-h-[1080px] w-screen flex-row gap-4 overflow-hidden bg-bg-main', 'md:p-2')}>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className={cn('flex flex-1 flex-col rounded-lg border bg-bg-inner', 'border-border-dimmed')}>
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main className="w-full flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
