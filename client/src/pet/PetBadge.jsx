import React, { useState } from 'react';

const PetBadge = ({ badge }) => {
  const [showAll, setShowAll] = useState(false);

  if (!badge || badge.length === 0) return null;

  // Sort badges by month (e.g., 01 to 12)
  const sortedBadges = [...badge].sort((a, b) => {
    const monthA = parseInt(a.month.split('-')[1]);
    const monthB = parseInt(b.month.split('-')[1]);
    return monthA - monthB;
  });

  // Show first 3 badges (Jan, Feb, Mar) unless toggled
  const visibleBadges = showAll ? sortedBadges : sortedBadges.slice(0, 3);

  const toggleShowAll = () => setShowAll(prev => !prev);

  return (
    <div className='mt-6 w-full max-w-2xl mx-auto'>
      <h2 className='mb-2 text-center'>Monthly Badges</h2>
      <div className='border border-neutral-300 shadow-lg shadow-black/10 rounded-xl'>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 justify-items-center">
          {visibleBadges.map((b, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center p-3 w-28 transition-transform duration-200`}
            >
              <img
                src={b.image_url}
                alt={`Badge for ${b.month}`}
                className={`w-16 h-16 rounded-full border-2 ${
                  b.unlocked ? 'border-yellow-400 shadow' : 'border-gray-400 grayscale'
                }`}
              />
              <p className="mt-2 text-sm font-medium text-neutral-400 capitalize">
                {b.month.split('-')[1]}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-2 mb-3">
          <button
            onClick={toggleShowAll}
            className="text-sm text-white hover:underline bg-orange-500 rounded-xl w-24 h-5"
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetBadge;
