import { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchIcon } from '@heroicons/react/outline'; // Import the SearchIcon component
import HotelCard from '../../components/user/HotelCard';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const hotelsResponse = await axios.get('http://localhost:8080/hotels/getAll');
        const roomsResponse = await axios.get('http://localhost:8080/rooms/getAll');

        const hotelsData = hotelsResponse.data;
        const roomsData = roomsResponse.data;

        // Merge hotels with room data
        const mergedHotels = hotelsData.map(hotel => {
          const roomsForHotel = roomsData.filter(room => room.hotelId === hotel.id);
          return {
            ...hotel,
            images: hotel.images || [], // Assuming images is an array of strings
          };
        });

        setHotels(mergedHotels);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        setLoading(false);
      }
    };

    fetchHotelData();
  }, []);

  useEffect(() => {
    // Filter hotels based on locationFilter
    const filtered = hotels.filter(hotel => {
      // You can adjust this condition based on how your location/address data is structured
      return hotel.address.toLowerCase().includes(locationFilter.toLowerCase());
    });
    setFilteredHotels(filtered);
  }, [hotels, locationFilter]);

  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8 text-center">Hotels</h1>

      {/* Centered Location filter input */}
      <div className="mb-8 flex justify-center">
        <label htmlFor="locationFilter" className="block text-lg font-medium text-gray-700 mr-4">
          Filter by Location
        </label>
        <div className="relative">
          <input
            type="text"
            id="locationFilter"
            className="pl-10 pr-4 py-2 block w-full max-w-md border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={locationFilter}
            onChange={handleLocationFilterChange}
            placeholder="Enter location or address"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pl-4 pr-4">
          {/* Render filtered hotels */}
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelsList;
