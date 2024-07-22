import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../pages/user/HomePage';
import RoomListPage from '../pages/user/RoomListPage';
import RoomDetailsPage from '../pages/user/RoomDetailsPage';
import BookingConfirmationPage from '../pages/user/BookingConfirmationPage';
import Navbar from '../components/user/Navbar';
import Footer from '../components/user/Footer';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import HotelsList from '../pages/user/HotelsList';
import Logout from '../components/Logout';

const UserRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomListPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels/:hotelId/rooms" element={<RoomListPage />} />
        <Route path="/rooms/:roomId" element={<RoomDetailsPage />} />
        <Route path="/hotels" element={<HotelsList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default UserRouter;
