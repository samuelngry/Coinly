import React from 'react'
import RivePet from './RivePet';
import LevelBar from './LevelBar';
import PetName from './PetName';
import MainCards from './MainCards';
import DailyQuests from './DailyQuests';
import BonusQuests from './BonusQuests';

const Dashboard = () => {
  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
        <LevelBar />
        <RivePet />
        <PetName />
        <MainCards />
        <DailyQuests />
        <BonusQuests />
    </div>
  )
}

export default Dashboard
