import React from 'react';
import defaultIcon from '../../assets/default.png'
import TrophyIcon from './TrophyIcon';

const TopLeaderboard = ({ topThree }) => {
  if (!topThree || topThree.length < 3) return null;

  const [first, second, third] = topThree;

  const getTrophyIcon = (rank) => {
    switch (rank) {
      case 1: return <TrophyIcon className='fill-[#4A3F2C]' />;
      case 2: return <TrophyIcon className='fill-[#5A5A5A]' />;
      case 3: return <TrophyIcon className='fill-[#EAEAEA]' />;
      default: return '🏆';
    }
  };

  const getTrophyColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-yellow-300';
      case 2: return 'bg-gray-300';
      case 3: return 'bg-yellow-600';
      default: return 'bg-gray-400';
    }
  };

  const PlayerCard = ({ player, rank, isCenter = false }) => (
    <div className={`flex flex-col items-center ${isCenter ? 'order-2' : rank === 2 ? 'order-1' : 'order-3'}`}>
      {/* Avatar */}
      <div className={`${isCenter ? 'w-30 h-30' : 'w-25 h-25'} rounded-xl overflow-hidden border border-neutral-300 mb-2`}>
        <img 
          src={player.avatar_url || defaultIcon} 
          alt={player.username}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Username */}
      <h3 className="font-medium text-sm mb-7">{player.username}</h3>
      
      {/* Card */}
      <div className="border border-neutral-300 rounded-lg p-4 w-80 flex flex-col items-center relative">
        {/* Trophy Icon */}
        <div className={`${getTrophyColor(rank)} w-10 h-10 rounded-xl flex items-center justify-center text-sm absolute -top-5`}>
          {getTrophyIcon(rank)}
        </div>
        
        {/* Points to earn */}
        <p className="text-xs mb-2 mt-2">Earn 2,000 points</p>
        
        {/* Prize amount */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-blue-400 text-sm">💎</span>
          <span className="text-white font-bold text-lg">
            {player.prize?.toLocaleString() || (rank === 1 ? '100,000' : rank === 2 ? '50,000' : '20,000')}
          </span>
        </div>
        
        {/* Prize label */}
        <p className="text-gray-400 text-xs">Prize</p>
      </div>
    </div>
  );

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