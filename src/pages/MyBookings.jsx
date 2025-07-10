import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Trash2, Ticket } from 'lucide-react';

export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('movieBookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleDeleteBooking = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (bookingToDelete) {
      const updatedBookings = bookings.filter(booking => booking.id !== bookingToDelete);
      setBookings(updatedBookings);
      localStorage.setItem('movieBookings', JSON.stringify(updatedBookings));
      setShowDeleteModal(false);
      setBookingToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBookingToDelete(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Bookings Yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't made any movie bookings yet. Start by browsing our latest movies!
            </p>
            <a
              href="/"
              className="bg-yellow-600 text-white px-8 py-3 rounded-md hover:bg-yellow-700 transition-colors font-medium"
            >
              Browse Movies
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-gray-600">
            Manage your movie ticket bookings and view booking history
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={booking.moviePoster} 
                  alt={booking.movieTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                    title="Cancel Booking"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.movieTitle}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{booking.showtime}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">Seats: {booking.seats.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Booked: {formatDate(booking.bookingDate)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">{booking.customerName}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Tickets:</span>
                    <span className="font-medium">{booking.seats.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-lg font-bold text-yellow-600">${booking.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cancel Booking</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 