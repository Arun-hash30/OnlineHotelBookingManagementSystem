import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Hotel Booking</Link>
        <div>
          {isLoggedIn ? (
            <>
              <Link to="/" className="mx-2">Home</Link>
              <Link to="/hotels" className="mx-2">Hotels</Link>
              <Link to="/logout" className="mx-2">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/" className="mx-2">Home</Link>
              <Link to="/logout" className="text-white mx-2">Logout</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;