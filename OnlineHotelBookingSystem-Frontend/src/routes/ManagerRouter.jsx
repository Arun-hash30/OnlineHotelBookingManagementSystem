import { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import AllBookings from '../pages/manager/AllBookings';
import AllRooms from '../pages/manager/AllRooms';
import Logout from '../components/Logout';
import MainLayout from '../components/manager/MainLayout';

function ManagerRouter() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
      <MainLayout>
        <Routes>
          <Route path="/bookings/all" element={<AllBookings />} />
          <Route path="/rooms/all" element={<AllRooms />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </MainLayout>


  );
}

export default ManagerRouter;
