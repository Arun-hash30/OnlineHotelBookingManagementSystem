import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../../components/user/BookingForm';

const RoomDetailsPage = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        console.log(`Fetching details for room ID: ${roomId}`);
        const response = await axios.get(`http://localhost:8080/rooms/${roomId}`);
        console.log('Response:', response);
        setRoom(response.data);
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

    if (roomId) {
      fetchRoomDetails();
    } else {
      setLoading(false);
      setError('Room ID is not defined.');
    }
  }, [roomId]);

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6">{error}</div>;
  }

  if (!room) {
    return <div className="container mx-auto p-6">No room details available.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-center md:space-x-6">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{room.type} Room Details</h1>
            <p className="text-gray-700 mb-2">Hotel ID: {room.hotelId}</p>
            <p className="text-gray-700 mb-2">Available: {room.numberAvailable}</p>
            <p className="text-gray-800 font-bold mb-2">${room.pricePerNight} / night</p>
            {room.images && room.images.length > 0 && (
              <img src={room.images[0]} alt={room.type} className="w-full h-auto rounded-md" />
              // Adjusted className to maintain aspect ratio and rounded corners
            )}
          </div>
        </div>
        <div className="md:w-1/2">
          <BookingForm onSubmit={(data) => console.log('Booking submitted:', data)} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
