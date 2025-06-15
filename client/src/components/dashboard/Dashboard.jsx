import React, { useEffect, useState } from 'react'
import RivePet from './RivePet';
import LevelBar from './LevelBar';
import PetName from './PetName';
import MainCards from './MainCards';
import DailyQuests from './DailyQuests';
import BonusQuests from './BonusQuests';
import { completeQuest, fetchQuests } from '../../services/api';

const Dashboard = () => {
  const [dailyQuests, setDailyQuests] = useState([]);
  const [bonusQuests, setBonusQuests] = useState([]);

  const getQuests = async () => {
    try {
        const res = await fetchQuests();
        setDailyQuests(res.daily || []);
        setBonusQuests(res.bonus || []);
      } catch (err) {
        console.error("Failed to load quests:", err);
      }
    };
  
  const handleCompleteQuest = async (id) => {
    try {
      await completeQuest(id);
      await getQuests();
    } catch (err) {
      console.error("Failed to complete quest:", err);
    }
  };

  useEffect(() => {
    getQuests();
  }, []);

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
        <LevelBar />
        <RivePet />
        <PetName />
        <MainCards />
        <DailyQuests quests={dailyQuests} onComplete={handleCompleteQuest} />
        <BonusQuests quests={bonusQuests} onComplete={handleCompleteQuest} />
    </div>
  )
}

export default Dashboard
