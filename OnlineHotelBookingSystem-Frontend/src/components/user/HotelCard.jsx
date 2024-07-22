import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleViewMoreDetails = () => {
    navigate(`/hotels/${hotel.id}/rooms`);
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">{hotel.name}</h2>
      <p className="text-gray-700">Location: {hotel.address}</p>
      {hotel.images && hotel.images.length > 0 && (
        <img src={hotel.images[0]} alt="Hotel" className="w-full h-48 object-cover mt-2" />
      )}
      <button
        onClick={handleViewMoreDetails}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        View More Details
      </button>
    </div>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default HotelCard;
