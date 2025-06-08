import React from 'react'
import RivePet from './RivePet';
import LevelBar from './LevelBar';

const Dashboard = () => {
  return (
    <div className='min-h-screen p-10 rounded-lg shadow'>
        <LevelBar />
        <RivePet />
    </div>
  )
}

export default Dashboard
