import { Link } from 'react-router-dom';

const BookingConfirmationPage = () => {
  return (
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold my-8">Booking Confirmed!</h1>
      <p className="text-gray-700 mb-8">Thank you for booking with us. We look forward to your stay.</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
        Go to Home
      </Link>
    </div>
  );
};

export default BookingConfirmationPage;
