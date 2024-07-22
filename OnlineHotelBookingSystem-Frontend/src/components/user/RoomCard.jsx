import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      {room.images && room.images.length > 0 ? (
        <img src={room.images[0]} alt={room.type} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{room.type} Room</h2>
        <p className="text-gray-700 mb-2">Hotel ID: {room.hotelId}</p>
        <p className="text-gray-700 mb-2">Available: {room.numberAvailable}</p>
        <p className="text-gray-800 font-bold mb-2">${room.pricePerNight} / night</p>
        <Link to={`/rooms/${room.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;