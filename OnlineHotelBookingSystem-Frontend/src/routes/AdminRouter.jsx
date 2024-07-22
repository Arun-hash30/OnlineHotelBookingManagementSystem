import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/admin/MainLayout'; // Import the MainLayout
import AllHotels from '../pages/admin/AllHotels';
import AllRooms from '../pages/admin/AllRooms';
import EditHotel from '../pages/admin/EditHotel';
import AllBookings from '../pages/admin/AllBookings';
import AddHotel from '../pages/admin/AddHotel';
import AllUsers from '../pages/admin/AllUsers';
import Logout from '../components/Logout';

function AdminRouter() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
      <Routes>
        <Route path="/bookings/all" element={<AllBookings />} />
        <Route path="/rooms/all" element={<AllRooms />} />
        <Route path="/hotels/all" element={<AllHotels />} />
        <Route path="/hotels/add" element={<AddHotel />} />
        <Route path="/hotels/edit" element={<EditHotel />} />
        <Route path="/users/all" element={<AllUsers />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </MainLayout>
  );
}

export default AdminRouter;
