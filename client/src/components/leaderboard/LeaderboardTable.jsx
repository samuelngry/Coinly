import React from 'react'

const LeaderboardTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500">No leaderboard data available.</p>;
  }

  return (
   <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-center py-4 border-b border-gray-200">🏆 Weekly Leaderboard</h2>
      <table className="w-full text-left table-auto">
        <thead className="bg-gray-100 text-gray-700">
          <tr className="text-sm">
            <th className="py-2 px-4">Rank</th>
            <th className="py-2 px-4">User</th>
            <th className="py-2 px-4 hidden sm:table-cell">Level</th>
            <th className="py-2 px-4">XP</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, idx) => (
            <tr
              key={idx}
              className={`border-b text-sm hover:bg-gray-50 transition-all ${
                idx === 0 ? 'bg-yellow-100 font-semibold' : ''
              }`}
            >
              <td className="py-3 px-4">{user.rank}</td>
              <td className="flex items-center gap-3 py-3 px-4">
                <img
                  src={user.avatar_url || '/default-avatar.png'}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="truncate">{user.username}</span>
              </td>
              <td className="py-3 px-4 hidden sm:table-cell">{user.level}</td>
              <td className="py-3 px-4 font-medium text-blue-600">{user.xp} XP</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardTable
