import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserRouter from './UserRouter';
import ManagerRouter from './ManagerRouter';
import AdminRouter from './AdminRouter';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';  // Import the Signup component

const MainRoute = () => {
  const userRole = localStorage.getItem('userRole');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />  // Add the signup route
        {!userRole && <Route path="*" element={<Navigate to="/login" replace />} />}
        {userRole === 'CUSTOMER' && <Route path="/*" element={<UserRouter />} />}
        {userRole === 'HOTELMANAGER' && <Route path="/*" element={<ManagerRouter />} />}
        {userRole === 'ADMIN' && <Route path="/*" element={<AdminRouter />} />}
      </Routes>
    </Router>
  );
};

export default MainRoute;
