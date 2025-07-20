import React from 'react'
import { PawPrint } from 'lucide-react'
import firstIcon from '../../assets/first.png'
import secondIcon from '../../assets/second.png'
import thirdIcon from '../../assets/third.png'
import defaultIcon from '../../assets/default.png'

const LeaderboardTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500">No leaderboard data available.</p>;
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
            return <span className='text-sm md:text-base'>{rank}</span>;
        }
        };

    const currentUserId = parseInt(localStorage.getItem("userId"));

  return (
   <div className="bg-white rounded-2xl max-w-7xl shadow-md overflow-hidden mx-auto mt-12">
      <table className="w-full text-left table-auto">
        <thead className="bg-gray-100 text-gray-700">
          <tr className="text-sm">
            <th className="py-2 px-4 md:w-1/14 border-r w-1/6 border-neutral-300">Rank</th>
            <th className="py-2 px-4 md:w-4/14 border-r w-3/6 border-neutral-300">User</th>
            <th className="py-2 px-4 md:w-3/14 border-r hidden sm:table-cell border-neutral-300">Level</th>
            <th className="py-2 px-4 w-2/6 md:w-3/14 md:border-r md:border-neutral-300">
              <PawPrint className='w-4 h-4 text-orange-500 inline-block' />
            </th>
            <th className="py-2 px-4 md:w-3/14 hidden sm:table-cell">Streak</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, idx) => (
            <tr
              key={idx}
              className={`border-b text-sm hover:bg-gray-50 border-neutral-300 transition-all ${
                user.id === currentUserId ? 'bg-yellow-100 font-semibold' : ''
              }`}
            >
              <td className="py-2 px-4 border-r border-neutral-300">{getTrophy(user.rank)}</td>
              <td className="flex items-center gap-3 py-3 px-4 border-r border-neutral-300">
                <img
                  src={user.avatar_url || defaultIcon}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="truncate">{user.username}</span>
              </td>
              <td className="py-3 px-4 hidden sm:table-cell border-r border-neutral-300">{user.level}</td>
              <td className="py-3 px-4 font-medium text-orange-500 md:border-r md:border-neutral-300">{user.xp}</td>
              <td className="py-3 px-4 hidden sm:table-cell ">{user.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardTable
