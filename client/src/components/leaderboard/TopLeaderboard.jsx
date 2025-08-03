import React from 'react';
import defaultIcon from '../../assets/default.png'
import TrophyIcon from './TrophyIcon';
import { PawPrint } from 'lucide-react'

const TopLeaderboard = ({ topThree }) => {
  if (!topThree || topThree.length < 3) return null;

  const [first, second, third] = topThree;

  const getTrophyIcon = (rank) => {
    switch (rank) {
      case 1: return <TrophyIcon className='fill-yellow-500 drop-shadow-md' />;
      case 2: return <TrophyIcon className='fill-gray-400 drop-shadow-sm' />;
      case 3: return <TrophyIcon className='fill-amber-600 drop-shadow-sm' />;
    }
  };

  const getTrophyColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-lg shadow-yellow-500/50 animate-pulse-slow';
      case 2: return 'bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg shadow-gray-400/50';
      case 3: return 'bg-gradient-to-br from-amber-300 to-amber-400 shadow-lg shadow-amber-400/50';
    }
  };

  const PlayerCard = ({ player, rank, isCenter = false }) => {

    return (
      <div className={`flex flex-col items-center transform transition-all duration-300 hover:scale-105 ${isCenter ? 'order-2 -translate-y-4' : rank === 2 ? 'order-1 translate-y-2' : 'order-3 translate-y-4'}`}>
        {/* Avatar */}
        <div className={`${isCenter ? 'w-25 h-25 md:w-40 md:h-40' : 'w-20 h-20 md:w-35 md:h-35'} rounded-xl overflow-hidden border border-neutral-300 mb-2`}>
          <img 
            src={player.avatar_url || defaultIcon} 
            alt={player.username}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Username */}
        <h3 className="font-medium text-sm md:text-lg mb-7">{player.username}</h3>
        
        {/* Card */}
        <div className="border border-neutral-300 rounded-lg p-0.5 md:p-4 w-full max-w-[120px] md:max-w-[220px] lg:max-w-[220px] min-w-[100px] flex flex-col items-center relative">
          {/* Trophy Icon */}
          <div className={`${getTrophyColor(rank)} w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-sm absolute -top-5`}>
            {getTrophyIcon(rank)}
          </div>
          
          {/* Stats */}
          <div className='flex justify mt-4'>
            <div className="flex flex-col items-center gap-1 mb-0.5 md:border-r border-neutral-300 md:px-4 lg:px-5">
              <span className="text-neutral-500 text-sm hidden md:block">Level</span>
              <span className="font-bold text-sm hidden md:block">
                {player.level}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 mb-0.5 md:border-r border-neutral-300 mx-auto px-1 md:px-4 lg:px-6 mt-1 md:mt-0">
              <span className="text-neutral-500 text-sm"><PawPrint className='w-3.5 h-3.5 text-orange-500 inline-block' /></span>
              <span className="font-bold text-sm text-orange-500">
                {player.xp}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 mb-0.5 md:px-4 lg:px-5">
              <span className="text-neutral-500 text-sm hidden md:block">Streak</span>
              <span className="font-bold text-sm hidden md:block">
                {player.streak}
              </span>
            </div>
          </div>
          
        </div>
      </div>
    )
  };

  return (
    <div>
      <div className="mx-auto">
        <div className="flex justify-center items-end gap-6 pt-12">
          <PlayerCard player={second} rank={2} />
          <PlayerCard player={first} rank={1} isCenter={true} />
          <PlayerCard player={third} rank={3} />
        </div>
      </div>
    </div>
  );
};

export default TopLeaderboard;