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
      case 1: return 'bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-lg shadow-yellow-200/50';
      case 2: return 'bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg shadow-gray-200/50';
      case 3: return 'bg-gradient-to-br from-amber-300 to-amber-400 shadow-lg shadow-amber-200/50';
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
        
        {/* XP to Earn */}
        <p className="text-xs mb-2 mt-2 border-b border-neutral-300 px-24 p-1">
          {rank === 1 ? 'Earn 1000XP' : rank === 2 ? 'Earn 600XP' : rank === 3 ? 'Earn 400XP' : ''}
        </p>
        
        {/* Stats */}
        <div className='flex'>
          <div className="flex flex-col items-center gap-1 mb-0.5 border-r border-neutral-300 px-4">
            <span className="text-neutral-500 text-sm">Level</span>
            <span className="font-bold text-sm">
              {player.level}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 mb-0.5 border-r border-neutral-300 px-4">
            <span className="text-neutral-500 text-sm"><PawPrint className='w-3.5 h-3.5 text-orange-500 inline-block' /></span>
            <span className="font-bold text-sm">
              {player.xp}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 mb-0.5 px-4">
            <span className="text-neutral-500 text-sm">Streak</span>
            <span className="font-bold text-sm">
              {player.streak}
            </span>
          </div>
        </div>
        
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