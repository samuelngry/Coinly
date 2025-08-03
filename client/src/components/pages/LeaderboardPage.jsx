import React from 'react'
import AppLayout from '../layout/AppLayout'
import Leaderboard from '../leaderboard/Leaderboard'

const LeaderboardPage = () => {
  return (
    <AppLayout className="bg-white">
      <Leaderboard />
    </AppLayout>
  )
}

export default LeaderboardPage