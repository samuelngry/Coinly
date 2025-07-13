import React, { useState, useEffect } from 'react';

const PetBadge = ({ badge }) => {
  const [showAll, setShowAll] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    handleResize(); // set initial
    window.addEventListener('resize', handleResize); // watch for resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!badge || badge.length === 0) return null;

  // Sort badges by month number (01–12)
  const sortedBadges = [...badge].sort((a, b) => {
    const monthA = parseInt(a.month.split('-')[1]);
    const monthB = parseInt(b.month.split('-')[1]);
    return monthA - monthB;
  });

  // Show all on md+, otherwise only 3 unless toggled
  const visibleBadges = isMediumScreen || showAll ? sortedBadges : sortedBadges.slice(0, 3);

  const toggleShowAll = () => setShowAll(prev => !prev);

  return (
    <div className='mt-6 w-full max-w-2xl mx-auto'>
      <h2 className='mb-2 text-center'>Monthly Badges</h2>
      <div className='border border-neutral-300 shadow-lg shadow-black/10 rounded-2xl bg-white'>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 justify-items-center">
          {visibleBadges.map((b, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-3 w-28 transition-transform duration-200"
            >
              <img
                src={b.image_url}
                alt={`Badge for ${b.month}`}
                className={`w-16 h-16 rounded-full border-2 ${
                  b.unlocked ? 'border-yellow-400 shadow' : 'border-gray-400 grayscale'
                }`}
              />
              <p
                className={`mt-2 text-sm font-medium capitalize ${
                  b.unlocked ? '' : 'text-gray-400'
                }`}
              >
                {b.month.split('-')[1]}
              </p>
            </div>
          ))}
        </div>

        {/* Show toggle button only on small screens */}
        {!isMediumScreen && (
          <div className="text-center mt-2 mb-3">
            <button
              onClick={toggleShowAll}
              className="text-sm text-white hover:underline bg-orange-500 rounded-xl w-24 h-5"
            >
              {showAll ? 'Show Less' : 'View All'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetBadge;
