import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  CalendarIcon,
  DocumentTextIcon,
  OfficeBuildingIcon,
  CogIcon,
  UserIcon // Import UserIcon
} from '@heroicons/react/outline';

const Sidebar = ({ isOpen }) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [hotelOpen, setHotelOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-900 text-gray-100 w-64 overflow-y-auto shadow-md z-30 transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setBookingOpen(!bookingOpen)}
              className="w-full flex justify-between items-center py-2.5 px-4 text-sm focus:outline-none rounded-lg hover:bg-gray-800 hover:text-white"
            >
              <CalendarIcon className="w-5 h-5 mr-2" /> Booking
              <svg className={`w-4 h-4 ml-2 transition-transform ${bookingOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {bookingOpen && (
              <ul className="ml-4">
                <li><Link to="/bookings/all" className="block py-2 px-4 text-sm rounded-lg hover:bg-gray-800 hover:text-white">All Bookings</Link></li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => setRoomsOpen(!roomsOpen)}
              className="w-full flex justify-between items-center py-2.5 px-4 text-sm focus:outline-none rounded-lg hover:bg-gray-800 hover:text-white"
            >
              <DocumentTextIcon className="w-5 h-5 mr-2" /> Rooms
              <svg className={`w-4 h-4 ml-2 transition-transform ${roomsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {roomsOpen && (
              <ul className="ml-4">
                <li><Link to="/rooms/all" className="block py-2 px-4 text-sm rounded-lg hover:bg-gray-800 hover:text-white">All Rooms</Link></li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => setHotelOpen(!hotelOpen)}
              className="w-full flex justify-between items-center py-2.5 px-4 text-sm focus:outline-none rounded-lg hover:bg-gray-800 hover:text-white"
            >
              <OfficeBuildingIcon className="w-5 h-5 mr-2" /> Hotel
              <svg className={`w-4 h-4 ml-2 transition-transform ${hotelOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {hotelOpen && (
              <ul className="ml-4">
                <li><Link to="/hotels/all" className="block py-2 px-4 text-sm rounded-lg hover:bg-gray-800 hover:text-white">All Hotels</Link></li>
                <li><Link to="/hotels/add" className="block py-2 px-4 text-sm rounded-lg hover:bg-gray-800 hover:text-white">Add New Hotel</Link></li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => setUsersOpen(!usersOpen)}
              className="w-full flex justify-between items-center py-2.5 px-4 text-sm focus:outline-none rounded-lg hover:bg-gray-800 hover:text-white"
            >
              <UserIcon className="w-5 h-5 mr-2" /> Users
              <svg className={`w-4 h-4 ml-2 transition-transform ${usersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {usersOpen && (
              <ul className="ml-4">
                <li><Link to="/users/all" className="block py-2 px-4 text-sm rounded-lg hover:bg-gray-800 hover:text-white">All Users</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
