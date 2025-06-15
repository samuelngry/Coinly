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
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [mood, setMood] = useState("");
  const [streak, setStreak] = useState(0);

  const getQuests = async () => {
    try {
        const res = await fetchQuests();
        setDailyQuests(res.daily || []);
        setBonusQuests(res.bonus || []);
      } catch (err) {
        console.error("Failed to load quests:", err);
      }
    };

  const getPetUpdates = async (id) => {
    try {
      const res = await completeQuest(id);
      setXp(res.xp);
      setLevel(res.level);
      setMood(res.mood);
      setStreak(res.streak);
    } catch (err) {
      console.error("Failed to load pet updates:", err);
    }
  };
  
  const handleCompleteQuest = async (id, type) => {
    try {
      await completeQuest(id);
      await getPetUpdates(id);

      if (type === 'daily') {
        setDailyQuests(prev => prev.filter(q => q.id !== id));
      } else if (type === 'bonus') {
        setBonusQuests(prev => prev.filter(q => q.id !== id));
      }
    } catch (err) {
      console.error("Failed to complete quest:", err);
    }
  };

  useEffect(() => {
    getQuests();
  }, []);

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
        <LevelBar xp={xp} level={level} />
        <RivePet />
        <PetName />
        <MainCards streak={streak} />
        <DailyQuests quests={dailyQuests} onComplete={handleCompleteQuest} />
        <BonusQuests quests={bonusQuests} onComplete={handleCompleteQuest} />
    </div>
  )
}

export default Dashboard
