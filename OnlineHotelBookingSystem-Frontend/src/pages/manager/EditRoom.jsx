import React, { useState, useEffect } from 'react';

const EditRoom = ({ room, hotels, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: room.id,
    hotelId: room.hotelId,
    numberAvailable: room.numberAvailable,
    pricePerNight: room.pricePerNight,
    type: room.type,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <h4>Edit Room</h4>
      <div className="mb-4">
        <label htmlFor="hotelId" className="block text-sm font-medium text-gray-700">
          Hotel Name
        </label>
        <select
          id="hotelId"
          name="hotelId"
          value={formData.hotelId}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {hotels.map(hotel => (
            <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="numberAvailable" className="block text-sm font-medium text-gray-700">
          Available Rooms
        </label>
        <input
          type="number"
          id="numberAvailable"
          name="numberAvailable"
          value={formData.numberAvailable}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700">
          Price Per Night
        </label>
        <input
          type="number"
          id="pricePerNight"
          name="pricePerNight"
          value={formData.pricePerNight}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Room Type
        </label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditRoom;
