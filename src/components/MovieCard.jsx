import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';

export const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
          {movie.rating}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm">{movie.genre}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{movie.duration}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            ${movie.price}
          </span>
          <Link 
            to={`/movie/${movie.id}`}
            className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors font-medium"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}; 