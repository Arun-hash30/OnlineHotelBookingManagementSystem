import React, { useState, useEffect } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import EditHotel from './EditHotel'; // Import the EditHotel component
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS for react-toastify
import axios from 'axios';

function AllHotels() {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editHotelData, setEditHotelData] = useState(null); // State to hold data for editing
  const [addRoomConfirmation, setAddRoomConfirmation] = useState(null); // State for add room confirmation
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:8080/hotels/getAll')
      .then((response) => {
        setHotels(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = (hotelId) => {
    // Find the hotel by ID
    const hotelToEdit = hotels.find((hotel) => hotel.id === hotelId);
    setEditHotelData(hotelToEdit); // Set the data for editing
  };

  const confirmDelete = (hotelId) => {
    setDeleteConfirmation(hotelId); // Set delete confirmation with hotel ID
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null); // Clear delete confirmation
  };

  const handleDelete = (hotelId) => {
    axios.delete(`http://localhost:8080/hotels/${hotelId}`)
      .then(() => {
        setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
        setDeleteConfirmation(null); // Clear delete confirmation after deletion
        toast.success('Hotel deleted successfully!', {
          position: 'top-right'
        });
      })
      .catch((error) => {
        toast.error(`Error deleting hotel: ${error.message}`, {
          position: 'top-right'
        });
      });
  };

  const handleSave = (updatedHotel) => {
    setHotels(hotels.map((hotel) => (hotel.id === updatedHotel.id ? updatedHotel : hotel)));
    setEditHotelData(null);
  };

  const showAddRoomConfirmation = (hotelId) => {
    setAddRoomConfirmation(hotelId); // Set add room confirmation with hotel ID
  };

  const cancelAddRoom = () => {
    setAddRoomConfirmation(null); // Clear add room confirmation
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.address &&
      hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const paginatedHotels = filteredHotels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Hotels</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          {filteredHotels.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No hotels found.</p>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Star Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amenities</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedHotels.map((hotel) => (
                    <tr key={hotel.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hotel.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hotel.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs" style={{ maxWidth: '150px' }}>{hotel.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs" style={{ maxWidth: '100px' }}>{hotel.starRating}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs" style={{ maxWidth: '150px' }}>{hotel.amenities}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.contact}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(hotel.id)}
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none mr-2"
                        >
                          <PencilAltIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => confirmDelete(hotel.id)}
                          className="text-red-600 hover:text-red-900 focus:outline-none"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    Page {page + 1} of {Math.ceil(filteredHotels.length / rowsPerPage)}
                  </span>
                  <button
                    onClick={() => handleChangePage(page + 1)}
                    disabled={page >= Math.ceil(filteredHotels.length / rowsPerPage) - 1}
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
      )}
      {deleteConfirmation !== null && (
        <div className="fixed inset-0 z-10 flex items-center justify-start overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-900 bg-opacity-50">
          <div className="relative w-auto max-w-sm mx-auto my-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col p-4">
              <div className="text-center p-4">
                <p className="text-lg font-semibold">Are you sure you want to delete this hotel?</p>
              </div>
              <div className="flex justify-end p-4 space-x-4">
                <button
                  onClick={() => handleDelete(deleteConfirmation)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Yes
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {addRoomConfirmation !== null && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-900 bg-opacity-50">
          <div className="relative w-auto max-w-sm mx-auto my-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-start p-4">
              <div className="text-center p-4">
                <p className="text-lg font-semibold">Add a new room to this hotel?</p>
              </div>
              <div className="flex items-center justify-end p-4 space-x-4">
                <button
                  onClick={() => navigate(`/add-room/${addRoomConfirmation}`)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                >
                  Yes
                </button>
                <button
                  onClick={cancelAddRoom}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editHotelData && (
        <EditHotel
          hotelData={editHotelData}
          onSave={handleSave}
          onCancel={() => setEditHotelData(null)}
        />
      )}
      {/* Toast Container for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default AllHotels;
