import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RoomCard from '../../components/user/RoomCard';

const RoomListPage = () => {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/rooms/getAll');
        const filteredRooms = response.data.filter(room => room.hotelId === parseInt(hotelId));
        setRooms(filteredRooms);
      } catch (error) {
        console.error('Error fetching room details:', error);
        if (error.response && error.response.status === 403) {
          setError('You do not have permission to access this resource.');
        } else {
          setError('Failed to fetch room details. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (rooms.length === 0) {
    return <div>No rooms available.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Rooms in Hotel {hotelId}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomListPage;