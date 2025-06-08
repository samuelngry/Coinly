import React from 'react'
import RivePet from './RivePet';
import LevelBar from './LevelBar';
import PetName from './PetName';

const Dashboard = () => {
  return (
    <div className='min-h-screen p-10 rounded-lg shadow'>
        <LevelBar />
        <RivePet />
        <PetName />
    </div>
  )
}

export default Dashboard
