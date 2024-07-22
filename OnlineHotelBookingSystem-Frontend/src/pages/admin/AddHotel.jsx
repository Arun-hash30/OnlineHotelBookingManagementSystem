import { useState } from 'react';
import axios from 'axios';

function AddHotel() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState('');
  const [starRating, setStarRating] = useState('');
  const [images, setimages] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHotel = {
      name,
      address,
      contact,
      description,
      amenities,
      starRating,
      images: images.split(',').map((url) => url.trim())
    };

    try {
      const response = await axios.post('http://localhost:8080/hotels/create', newHotel, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('New Hotel:', response.data);
      setIsPopupVisible(true);
      setName('');
      setAddress('');
      setContact('');
      setDescription('');
      setAmenities('');
      setStarRating('');
      setimages('');
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Hotel</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Hotel Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-2">Amenities (comma separated)</label>
          <textarea
            id="amenities"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="starRating" className="block text-sm font-medium text-gray-700 mb-2">Star Rating</label>
          <input
            id="starRating"
            type="number"
            value={starRating}
            onChange={(e) => setStarRating(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">Hotel Image URLs (comma separated)</label>
          <textarea
            id="images"
            value={images}
            onChange={(e) => setimages(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Hotel
        </button>
      </form>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="text-lg font-medium">Hotel created successfully!</p>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddHotel;