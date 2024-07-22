import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ toggleSidebar }) => (
  <div className="fixed top-0 left-0 w-full bg-gray-800 text-gray-100 p-4 shadow-md flex justify-between items-center z-20">
    <div className="flex items-center">
      <button onClick={toggleSidebar} className="text-gray-400 focus:outline-none mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <h2 className="text-xl font-semibold">Manager Panel</h2>
    </div>
    <div>
      <Link to="/logout" className="text-sm hover:text-white">Logout</Link>

    </div>
  </div>
);

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;