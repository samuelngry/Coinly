import React from 'react'

const TopLeaderboard = ({ leaderboard }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Daily Leaderboard</h1>

      <div className="flex justify-center gap-6 mb-12">
        {leaderboard.slice(0, 3).map((user, index) => (
          <div
            key={user.username}
            className="bg-white text-black rounded-2xl p-6 w-64 shadow-lg flex flex-col items-center"
          >
            <img
              src={user.avatar_url || '/default-avatar.png'}
              alt={user.username}
              className="w-20 h-20 rounded-full mb-4 border-4 border-blue-400"
            />
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-gray-600 mb-2">Level {user.level}</p>
            <p className="text-yellow-600 font-bold">Earn {user.xp} XP</p>
            <p className="text-blue-700 mt-2 text-sm">
              💎 {index === 0 ? '10,000' : index === 1 ? '5,000' : '2,500'} Prize
            </p>
          </div>
        ))}
        </div>
    </div>
  )
}

export default TopLeaderboard
