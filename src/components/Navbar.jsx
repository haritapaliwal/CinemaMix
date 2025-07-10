import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Ticket } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors">
            <Film className="h-8 w-8" />
            <span className="text-xl font-bold">CinemaMax</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-yellow-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/my-bookings" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/my-bookings') 
                  ? 'bg-yellow-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Ticket className="h-4 w-4" />
              <span>My Bookings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 