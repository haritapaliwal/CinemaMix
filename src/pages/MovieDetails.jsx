import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../data/movies.js';
import { Clock, Star, Calendar, DollarSign, ArrowLeft } from 'lucide-react';

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const movie = movies.find(m => m.id === parseInt(id || ''));
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Movie Not Found</h2>
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

  const handleBooking = (showtime) => {
    navigate(`/booking/${movie.id}`, { state: { showtime } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <button
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Movies</span>
          </button>
          
          <div className="text-white mt-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            <div className="flex flex-wrap items-center space-x-6 text-lg">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span>{movie.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-1" />
                <span>${movie.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Movie Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Movie</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{movie.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Genre</h3>
                  <p className="text-gray-600">{movie.genre}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Duration</h3>
                  <p className="text-gray-600">{movie.duration}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Rating</h3>
                  <p className="text-gray-600">{movie.rating}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Price</h3>
                  <p className="text-gray-600">${movie.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Showtimes */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2" />
                Showtimes
              </h2>
              
              <div className="space-y-4">
                {movie.showtimes.map((showtime, index) => (
                  <button
                    key={index}
                    onClick={() => handleBooking(showtime)}
                    className="w-full bg-gray-50 hover:bg-yellow-50 border border-gray-200 hover:border-yellow-300 rounded-lg p-4 text-left transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600">
                        {showtime}
                      </span>
                      <span className="text-sm text-gray-500 group-hover:text-yellow-500">
                        Available
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Select a showtime to proceed with booking your tickets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 