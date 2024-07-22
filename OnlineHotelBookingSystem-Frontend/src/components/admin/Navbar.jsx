import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-40 top-0 left-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-white flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
          </button>
        </div>
        <div>
          <Link to="/logout" className="text-white mx-2">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
