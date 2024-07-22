import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditRoom from './EditRoom';
import AddRoom from './AddRoom';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';

function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page

  useEffect(() => {
    fetchRooms();
    fetchHotels();
  }, []);

  const fetchRooms = () => {
    axios.get('http://localhost:8080/rooms/getAll')
      .then(response => setRooms(response.data))
      .catch(error => {
        console.error('Error fetching rooms:', error);
        setError('Failed to fetch rooms');
      });
  };

  const fetchHotels = () => {
    axios.get('http://localhost:8080/hotels/getAll')
      .then(response => setHotels(response.data))
      .catch(error => {
        console.error('Error fetching hotels:', error);
        setError('Failed to fetch hotels');
      });
  };

  const handleAddRoom = () => {
    setIsAddRoomOpen(true);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
  };

  const handleDeleteRoom = (roomId) => {
    axios.delete(`http://localhost:8080/rooms/${roomId}`)
      .then(response => {
        if (response.status === 204) {
          toast.success('Room deleted successfully');
          setRooms(rooms.filter(room => room.id !== roomId));
        } else {
          throw new Error('Failed to delete room');
        }
      })
      .catch(error => {
        console.error('Error deleting room:', error);
        setError('Failed to delete room: ' + error.message);
        toast.error('Failed to delete room: ' + error.message);
        fetchRooms();
      });
  };

  const handleCloseAddRoom = () => {
    setIsAddRoomOpen(false);
  };

  const handleSaveRoom = (newRoomData) => {
    axios.post('http://localhost:8080/rooms/create', newRoomData)
      .then(response => {
        setRooms([...rooms, response.data]);
        setIsAddRoomOpen(false);
        toast.success('Room added successfully');
      })
      .catch(error => {
        console.error('Error adding room:', error);
        setError('Failed to add room');
        toast.error('Failed to add room: ' + error.message);
      });
  };

  const handleUpdateRoom = (updatedRoomData) => {
    axios.put(`http://localhost:8080/rooms/${updatedRoomData.id}`, updatedRoomData)
      .then(response => {
        setRooms(rooms.map(room => (room.id === updatedRoomData.id ? response.data : room)));
        setEditingRoom(null);
        toast.success('Room updated successfully');
      })
      .catch(error => {
        console.error('Error updating room:', error);
        setError('Failed to update room');
        toast.error('Failed to update room: ' + error.message);
      });
  };

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
    setPage(0); // Reset to the first page
  };

  const paginatedRooms = mergedRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
      <h1 className="text-3xl font-bold mb-6 text-center">All Rooms</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">{error}</div>}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddRoom}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Room
        </button>
      </div>
      {mergedRooms.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">No rooms available.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Rooms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Night</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedRooms.map(room => (
                  <tr key={room.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{room.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{room.hotelName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{room.numberAvailable}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{room.pricePerNight}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{room.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button
                        onClick={() => handleEditRoom(room)}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Edit"
                      >
                        <PencilAltIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
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

      {/* Edit Room Dialog */}
      {editingRoom && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <EditRoom
                room={editingRoom}
                hotels={hotels}
                onSave={handleUpdateRoom}
                onClose={() => setEditingRoom(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add Room Dialog */}
      {isAddRoomOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <AddRoom
                hotels={hotels}
                onSave={handleSaveRoom}
                onClose={() => setIsAddRoomOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllRooms;
