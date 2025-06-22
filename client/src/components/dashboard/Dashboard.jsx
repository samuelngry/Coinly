import React, { useEffect, useState } from 'react'
import RivePet from './RivePet';
import LevelBar from './LevelBar';
import PetName from './PetName';
import MainCards from './MainCards';
import DailyQuests from './DailyQuests';
import BonusQuests from './BonusQuests';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [dailyQuests, setDailyQuests] = useState([]);
  const [bonusQuests, setBonusQuests] = useState([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [mood, setMood] = useState("");
  const [streak, setStreak] = useState(0);
  const navigate = useNavigate();

  const getQuests = async () => {
    try {
        const storedQuests = getQuestsFromLocalStorage();

        if (storedQuests.daily.length && storedQuests.bonus.length) {
          setDailyQuests(storedQuests.daily);
          setBonusQuests(storedQuests.bonus);
          return;
        }

        const token = localStorage.getItem("token");

        setDailyQuests([]);
        setBonusQuests([]);

        const res = await fetch("http://localhost:3000/api/quests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({})
        });

        if (!res.ok) {
          throw new Error('Failed to fetch quests');
        }

        const data = await res.json();
        console.log("Quests:", data);

        setDailyQuests(data.daily || []);
        setBonusQuests(data.bonus || []);

        saveQuestsToLocalStorage(data.daily, data.bonus);
      } catch (err) {
        console.error("Failed to load quests:", err);
      }
    };
  
  const saveQuestsToLocalStorage = (daily, bonus) => {
    localStorage.setItem('dailyQuests', JSON.stringify(daily));
    localStorage.setItem('bonusQuests', JSON.stringify(bonus));
  };

  const getQuestsFromLocalStorage = () => {
    const daily = JSON.parse(localStorage.getItem('dailyQuests')) || [];
    const bonus = JSON.parse(localStorage.getItem('bonusQuests')) || [];
    return { daily, bonus };
  };

  const handleCompleteQuest = async (id, type) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/${id}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({})
      });

      if (!res.ok) {
        throw new Error('Failed to complete quest')
      }

      const data = await res.json();
      console.log("Quests Completed:", data);

      setXp(data.xp);
      setLevel(data.level);
      setMood(data.mood);
      setStreak(data.streak);

      if (type === "daily") {
        setDailyQuests((prev) => prev.map((q) => q.id === id ? { ...q, status: "Completed" } : q ));
      } else if (type === "bonus") {
        setBonusQuests((prev) => prev.map((q) => q.id === id ? { ...q, status: "Completed" } : q ));
      }
    } catch (err) {
      console.error("Failed to complete quest:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate('/login');
  };

  useEffect(() => {
    getQuests();
  }, []);

  const totalDaily = dailyQuests.length;
  const completedDaily = dailyQuests.filter(q => q.status === 'Completed').length;

  const totalBonus = bonusQuests.length;
  const completedBonus = bonusQuests.filter(q => q.status === 'Completed').length;

  const totalQuest = totalDaily + totalBonus;
  const completedQuest = completedDaily + completedBonus;

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
        <LevelBar xp={xp} level={level} />
        <RivePet />
        <PetName />
        <MainCards streak={streak} completedCount={completedQuest} totalCount={totalQuest}/>
        <DailyQuests quests={dailyQuests} onComplete={handleCompleteQuest} completedCount={completedDaily} totalCount={totalDaily} />
        <BonusQuests quests={bonusQuests} onComplete={handleCompleteQuest} completedCount={completedBonus} totalCount={totalBonus} />
        
        <button
          onClick={logout}
          className='bg-red-500 text-white py-1 px-4 rounded-lg mt-10 hover:bg-red-600'
        >
          Log Out
        </button>
    </div>
  )
}

export default Dashboard
