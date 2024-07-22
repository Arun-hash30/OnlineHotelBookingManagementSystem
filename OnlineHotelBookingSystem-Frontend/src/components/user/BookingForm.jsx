import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const BookingForm = ({ onSubmit }) => {
  const { roomId } = useParams(); // Retrieve roomId from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "checkIn") {
      setFormData((prevState) => ({
        ...prevState,
        checkOut: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage

    if (!userId) {
      setError("User ID is missing. Please log in."); // Error handling for missing userId
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/bookings/create", {
        userId: parseInt(userId, 10), // Parsing userId as integer
        roomId: parseInt(roomId, 10), // Parsing roomId as integer
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
      });

      onSubmit(response.data);

      // Optionally, reset form after submission
      setFormData({
        checkIn: "",
        checkOut: "",
      });

      navigate("/booking-confirmation");
    } catch (error) {
      console.error("Error creating booking:", error);

      if (error.response) {
        setError(error.response.data.message || "Failed to book. Please try again later.");
      } else {
        setError("Failed to book. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        <span className="font-bold">Book Your Stay</span>
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Check-in Date</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            min={minDate}
            className="p-2 border rounded w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Check-out Date</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            min={formData.checkIn || minDate}
            className="p-2 border rounded w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

BookingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default BookingForm;
