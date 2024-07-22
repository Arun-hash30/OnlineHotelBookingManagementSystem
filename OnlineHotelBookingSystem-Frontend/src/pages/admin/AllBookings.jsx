import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bookings/getAll');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        // Optionally handle error state or show a message to the user
      }
    };

    fetchBookings();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  // Pagination logic
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const paginatedBookings = bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">No bookings available.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-Out Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.userId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.roomId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.checkInDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.checkOutDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <button
                onClick={() => handleChangePage(page - 1)}
                disabled={page === 0}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-l-md hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-gray-200 text-gray-600">
                Page {page + 1} of {Math.ceil(bookings.length / rowsPerPage)}
              </span>
              <button
                onClick={() => handleChangePage(page + 1)}
                disabled={page >= Math.ceil(bookings.length / rowsPerPage) - 1}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-r-md hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={25}>25 rows</option>
              <option value={50}>50 rows</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
}

export default AllBookings;
