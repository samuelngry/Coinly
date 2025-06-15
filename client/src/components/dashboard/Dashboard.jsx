import React, { useEffect, useState } from 'react'
import RivePet from './RivePet';
import LevelBar from './LevelBar';
import PetName from './PetName';
import MainCards from './MainCards';
import DailyQuests from './DailyQuests';
import BonusQuests from './BonusQuests';
import { fetchQuests } from '../../services/api';

const Dashboard = () => {
  const [dailyQuests, setDailyQuests] = useState([]);
  const [bonusQuests, setBonusQuests] = useState([]);

  useEffect(() => {
    async function getQuests() {
      try {
        const res = await fetchQuests();
        setDailyQuests(res.daily || []);
        setBonusQuests(res.bonus || []);
      } catch (err) {
        console.error("Failed to load quests:", err);
      }
    }

    getQuests();
  }, []);
  
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
