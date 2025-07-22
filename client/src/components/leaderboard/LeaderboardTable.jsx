import React, { useState } from 'react'
import { PawPrint, Search, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import firstIcon from '../../assets/first.png'
import secondIcon from '../../assets/second.png'
import thirdIcon from '../../assets/third.png'
import defaultIcon from '../../assets/default.png'

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="bg-white rounded-2xl mx-auto shadow-md mt-12 p-4">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="animate-pulse flex items-center space-x-4 py-3 border-b border-neutral-200">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

const LeaderboardTable = ({ data, currentUserId, isLoading = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rank'); // rank, xp, level, streak
    const [sortOrder, setSortOrder] = useState('asc');

    // Loading state
    if (isLoading) {
        return <LoadingSkeleton />;
    }

    // Better empty state
    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-2xl mx-auto shadow-md mt-12 p-12 text-center">
                <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Rankings Yet</h3>
                <p className="text-gray-500">Start your journey to claim the top spot!</p>
            </div>
        );
    }

    const getTrophy = (rank) => {
        switch (rank) {
            case 1:
                return <img src={firstIcon} alt='1st' className='w-6 h-6' />;
            case 2:
                return <img src={secondIcon} alt='2nd' className='w-6 h-6' />;
            case 3:
                return <img src={thirdIcon} alt='3rd' className='w-6 h-6' />;
            default:
                return <span className='text-sm md:text-base font-medium'>{rank}</span>;
        }
    };

    // Calculate XP progress percentage
    const getXPProgress = (currentXP, totalXP) => {
        return Math.min((currentXP / totalXP) * 100, 100);
    };

    // Filter and sort data
    const filteredAndSortedData = data
        .filter(user => 
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            let aValue, bValue;
            switch (sortBy) {
                case 'xp':
                    aValue = a.xp;
                    bValue = b.xp;
                    break;
                case 'level':
                    aValue = a.level;
                    bValue = b.level;
                    break;
                case 'streak':
                    aValue = a.streak;
                    bValue = b.streak;
                    break;
                default: // rank
                    aValue = a.rank;
                    bValue = b.rank;
            }
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    return (
        <div className="bg-white rounded-2xl mx-auto shadow-md overflow-hidden mt-12">
            {/* Search and filter section */}
            <div className="p-4 bg-gray-50 border-b border-neutral-200">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleSort('rank')}
                            className={`px-3 py-1 text-xs rounded ${sortBy === 'rank' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border'}`}
                        >
                            Rank {sortBy === 'rank' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </button>
                        <button
                            onClick={() => handleSort('xp')}
                            className={`px-3 py-1 text-xs rounded ${sortBy === 'xp' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border'}`}
                        >
                            XP {sortBy === 'xp' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="text-left w-full table-auto">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr className="text-sm">
                            <th className="py-3 px-4 md:w-1/14 border-r w-1/6 border-neutral-300 cursor-pointer hover:bg-gray-200" 
                                onClick={() => handleSort('rank')}>
                                Rank {sortBy === 'rank' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="py-3 px-4 md:w-4/14 border-r w-3/6 border-neutral-300">User</th>
                            <th className="py-3 px-4 md:w-3/14 border-r hidden md:table-cell border-neutral-300 cursor-pointer hover:bg-gray-200" 
                                onClick={() => handleSort('level')}>
                                Level {sortBy === 'level' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="py-3 px-4 w-2/6 md:w-3/14 md:border-r md:border-neutral-300 cursor-pointer hover:bg-gray-200" 
                                onClick={() => handleSort('xp')}>
                                <PawPrint className='w-4 h-4 text-orange-500 inline-block mr-1' />
                                {sortBy === 'xp' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="py-3 px-4 md:w-3/14 hidden md:table-cell cursor-pointer hover:bg-gray-200" 
                                onClick={() => handleSort('streak')}>
                                Streak {sortBy === 'streak' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedData.map((user, idx) => (
                            <tr
                                key={user.id || idx}
                                className={`border-b text-sm hover:bg-gray-50 border-neutral-300 transition-all ${
                                    user.id === currentUserId ? 'bg-blue-50 ring-2 ring-blue-200 font-semibold' : ''
                                }`}
                            >
                                <td className="py-3 px-4 border-r border-neutral-300">
                                    <div className="flex items-center gap-2">
                                        {getTrophy(user.rank)}                                    
                                    </div>
                                </td>
                                <td className="py-3 px-4 border-r border-neutral-300">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img
                                                src={user.avatar_url || defaultIcon}
                                                alt="avatar"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="truncate">
                                                {user.username}
                                                {user.id === currentUserId && (
                                                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">You</span>
                                                )}
                                            </span>
                                            {/* Show level progress on mobile */}
                                            <span className="text-xs text-gray-500 md:hidden">Level {user.level}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4 hidden md:table-cell border-r border-neutral-300">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user.level}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 font-medium text-orange-500 md:border-r md:border-neutral-300">
                                    <div className="flex flex-col">
                                        <span>{user.xp.toLocaleString()}</span>
                                        {/* XP progress bar */}
                                        {user.total_xp && (
                                            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                                                <div 
                                                    className="bg-orange-500 h-1 rounded-full transition-all duration-300" 
                                                    style={{width: `${getXPProgress(user.xp, user.total_xp)}%`}}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-3 px-4 hidden md:table-cell">
                                    <div className="flex items-center gap-2">
                                        <span>{user.streak}</span>
                                        {/* Streak fire icon for high streaks */}
                                        {user.streak >= 7 && <span className="text-orange-500">🔥</span>}
                                        {user.streak >= 30 && <span className="text-red-500">💯</span>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Show results count */}
            <div className="p-4 bg-gray-50 text-sm text-gray-600 text-center">
                Showing {filteredAndSortedData.length} of {data.length} users
            </div>
        </div>
    );
}

export default LeaderboardTable