import React from 'react';
import { MovieCard } from '../components/MovieCard.jsx';
import { movies } from '../data/movies.js';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Your Movie Tickets
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Experience the magic of cinema with premium seating and the latest movies
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 text-lg">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">✨</span>
              <span>Premium Experience</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">🎬</span>
              <span>Latest Movies</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">🎫</span>
              <span>Easy Booking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Now Showing
          </h2>
          <p className="text-lg text-gray-600">
            Choose from our selection of the hottest movies in theaters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}; 