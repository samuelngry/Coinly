import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import BottomNavbar from '../sidebar/BottomNavbar'
import League from '../league/League'

const LeaguePage = () => {
  return (
    <>
      <div className='grid gap-4 lg:p-4 lg:grid-cols-[220px_1fr] min-h-screen bg-white'>
        <div className='hidden lg:block'>
          <Sidebar />
        </div>
        <League />
      </div>
      <BottomNavbar />
    </>
  )
}

export default LeaguePage
