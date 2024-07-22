import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="mt-16 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
