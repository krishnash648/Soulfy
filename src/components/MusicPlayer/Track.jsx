import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex items-center gap-4 min-w-0">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} h-12 w-12 flex-shrink-0 shadow-lg rounded-full overflow-hidden bg-gray-800`}>
      <img
        src={activeSong?.attributes?.artwork?.url?.replace('{w}x{h}', '125x125')}
        alt="cover art"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
    <div className="min-w-0">
      <p className="truncate text-white font-bold text-base">
        {activeSong?.attributes?.name || 'No active Song'}
      </p>
      <p className="truncate text-gray-300 text-sm">
        {activeSong?.attributes?.artistName || 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
