import { useState, useEffect } from 'react';

function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page

  useEffect(() => {
    fetch('http://localhost:8080/rooms/getAll')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));

    fetch('http://localhost:8080/hotels/getAll')
      .then(response => response.json())
      .then(data => setHotels(data))
      .catch(error => console.error('Error fetching hotels:', error));
  }, []);

  // Add hotel name to each room
  const mergedRooms = rooms.map(room => {
    const hotel = hotels.find(h => h.id === room.hotelId);
    return { ...room, hotelName: hotel ? hotel.name : 'Unknown' };
  });

  // Pagination logic
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const paginatedRooms = mergedRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Rooms</h1>
      {mergedRooms.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">No rooms available.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Rooms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Night</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedRooms.map(room => (
                  <tr key={room.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{room.hotelName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{room.numberAvailable}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{room.pricePerNight}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{room.type}</td>
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
                Page {page + 1} of {Math.ceil(mergedRooms.length / rowsPerPage)}
              </span>
              <button
                onClick={() => handleChangePage(page + 1)}
                disabled={page >= Math.ceil(mergedRooms.length / rowsPerPage) - 1}
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

export default AllRooms;
