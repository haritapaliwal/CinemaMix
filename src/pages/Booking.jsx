import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { movies } from '../data/movies.js';
import { SeatSelector } from '../components/SeatSelector.jsx';
import { BookingForm } from '../components/BookingForm.jsx';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  
  const movie = movies.find(m => m.id === parseInt(id || ''));
  const showtime = location.state?.showtime;
  
  if (!movie || !showtime) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Information Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = selectedSeats.length * movie.price;

  const handleSeatsChange = (seats) => {
    setSelectedSeats(seats);
  };

  const handleBookingSubmit = (formData) => {
    const booking = {
      id: Date.now().toString(),
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.poster,
      showtime,
      seats: selectedSeats,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      totalPrice,
      bookingDate: new Date().toISOString(),
    };

    // Save to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('movieBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('movieBookings', JSON.stringify(existingBookings));

    setBookingData(booking);
    setShowConfirmation(true);
  };

  const handleNewBooking = () => {
    navigate('/');
  };

  const handleViewBookings = () => {
    navigate('/my-bookings');
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your tickets for <strong>{movie.title}</strong> have been successfully booked.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Booking Details:</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Movie:</strong> {movie.title}</p>
                <p><strong>Showtime:</strong> {showtime}</p>
                <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
                <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleNewBooking}
                className="flex-1 bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors font-medium"
              >
                New Booking
              </button>
              <button
                onClick={handleViewBookings}
                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors font-medium"
              >
                My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Movie Details</span>
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-20 h-30 object-cover rounded-md"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{movie.title}</h1>
                <p className="text-gray-600">{movie.genre}</p>
                <p className="text-lg font-semibold text-yellow-600">{showtime}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <SeatSelector onSeatsChange={handleSeatsChange} />
          </div>
          <div>
            <BookingForm
              onSubmit={handleBookingSubmit}
              selectedSeats={selectedSeats}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 