import React, { useState } from 'react';

export const SeatSelector = ({ onSeatsChange }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;
  
  // Mock some occupied seats
  const occupiedSeats = ['A3', 'A4', 'B5', 'B6', 'C7', 'D2', 'D3', 'E8', 'E9', 'F4', 'F5', 'G6', 'G7'];

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    
    let newSelectedSeats;
    if (selectedSeats.includes(seatId)) {
      newSelectedSeats = selectedSeats.filter(seat => seat !== seatId);
    } else {
      newSelectedSeats = [...selectedSeats, seatId];
    }
    
    setSelectedSeats(newSelectedSeats);
    onSeatsChange(newSelectedSeats);
  };

  const getSeatStatus = (seatId) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const getSeatClass = (status) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-500 cursor-not-allowed';
      case 'selected':
        return 'bg-yellow-500 cursor-pointer hover:bg-yellow-600';
      case 'available':
        return 'bg-gray-300 cursor-pointer hover:bg-gray-400';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Select Your Seats</h3>
      
      {/* Screen */}
      <div className="mb-8">
        <div className="w-full h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-t-full mb-2"></div>
        <p className="text-center text-gray-600 text-sm">SCREEN</p>
      </div>

      {/* Seating Chart */}
      <div className="space-y-4 mb-6">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center space-x-2">
            <span className="w-6 text-center font-semibold text-gray-700">{row}</span>
            <div className="flex space-x-1">
              {[...Array(seatsPerRow)].map((_, index) => {
                const seatNumber = index + 1;
                const seatId = `${row}${seatNumber}`;
                const status = getSeatStatus(seatId);
                
                return (
                  <button
                    key={seatId}
                    onClick={() => handleSeatClick(seatId)}
                    className={`w-8 h-8 rounded-md text-xs font-medium text-white transition-colors ${getSeatClass(status)}`}
                    disabled={status === 'occupied'}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mb-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Occupied</span>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Selected Seats:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span 
                key={seat} 
                className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {seat}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 