import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import BottomNavbar from '../sidebar/BottomNavbar'
import Pet from '../../pet/Pet'
import Leaderboard from '../leaderboard/Leaderboard'

const LeaderboardPage = () => {
  return (
    <>
      <div className='grid gap-4 lg:p-4 lg:grid-cols-[220px_1fr] min-h-screen bg-white'>
        <div className='hidden lg:block'>
          <Sidebar />
        </div>
        <Leaderboard />
      </div>
      <BottomNavbar />
    </>
  )
}

export default LeaderboardPage
