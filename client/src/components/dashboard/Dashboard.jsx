import React from 'react'
import RivePet from './RivePet';
import LevelBar from './LevelBar';
import PetName from './PetName';
import MainCards from './MainCards';
import QuestsList from './QuestsList';

const Dashboard = () => {
  return (
    <div className='min-h-screen p-6 rounded-lg shadow'>
        <LevelBar />
        <RivePet />
        <PetName />
        <MainCards />
        <QuestsList />
    </div>
  )
}

export default Dashboard
