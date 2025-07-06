import React, { useEffect, useState } from 'react'
import RivePet from './RivePet';
import LevelBar from './LevelBar';
import PetName from './PetName';
import MainCards from './MainCards';
import DailyQuests from './DailyQuests';
import BonusQuests from './BonusQuests';
import CustomQuests from './CustomQuests';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const Dashboard = () => {
  const [customQuests, setCustomQuests] = useState([]);
  const [dailyQuests, setDailyQuests] = useState([]);
  const [bonusQuests, setBonusQuests] = useState([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [mood, setMood] = useState("");
  const [streak, setStreak] = useState(0);
  const [petName, setPetName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();
  const navigate = useNavigate();

  const getCustomQuests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/custom", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Failed to fetch custom quests");
      }

      const data = await res.json();
      setCustomQuests(data.quests);
    } catch (err) {
      console.error("Failed to fetch custom quests data:", err);
    }
  };

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await res.json();
      setXp(data.xp);
      setLevel(data.level);
      setStreak(data.streak);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const getPetName = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/pet", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch pet name');
      }

      const data = await res.json();
      setPetName(data.name);
    } catch (err) {
      console.error("Failed to fetch pet name:", err);
    }
  }

  const getQuests = async () => {
    try {
        const token = localStorage.getItem("token");

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
        setIsLoading(false);

      } catch (err) {
        console.error("Failed to load quests:", err);
      }
    };

  const addCustomQuest = async (questText) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify( {quest_text: questText} )
      });

      if (!res.ok) {
        throw new Error("Failed to add custom quest");
      }

      const data = await res.json();
      console.log("Custom Quest Added:", data.quest);

      setCustomQuests((prev) => [...prev, data.quest]);
    } catch (err) {
        console.error("Failed to add custom quest:", err);
    }
  };

  const updateCustomQuest = async (id, questText) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/custom/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify( {quest_text: questText} )
      });

      if (!res.ok) {
        throw new Error("Failed to update custom quest");
      }

      const data = await res.json();
      console.log("Custom Quest Updated:", data.quest)

      setCustomQuests(prevQuests =>
        prevQuests.map(quest =>
          quest.id === id
            ? data.quest
            : quest
        )
      );
    } catch (err) {
      console.error("Failed to update custom quest:", err);
    }
  };

  const deleteCustomQuest = async (id) => {
    try {
      const token = localStorage.getItem("token");
      
      const res = await fetch(`http://localhost:3000/api/custom/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete custom quest");
      }

      const data = await res.json();
      console.log("Custom Quest Deleted:", data.quest);

      setCustomQuests((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Failed to delete custom quest:", err);
    }
  };

  const handleCompleteQuest = async (id, type) => {
    try {
      const token = localStorage.getItem("token");
      let url;
      let body = {};

      // Determine the URL and body based on the quest type
      if (type === "daily" || type === "bonus") {
        url = `http://localhost:3000/api/quests/${id}/complete`;
        body = {};
      } else if (type === "custom") {
        // Handle custom quest completion
        url = `http://localhost:3000/api/custom/${id}/complete`;
        body = {};  // You can add any additional data if needed
      } else {
        throw new Error("Invalid quest type");
      }

      // Send the request to complete the quest
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
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

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);

      if (type === "daily") {
        setDailyQuests((prev) => prev.map((q) => q.id === id ? { ...q, status: "Completed" } : q ));
      } else if (type === "bonus") {
        setBonusQuests((prev) => prev.map((q) => q.id === id ? { ...q, status: "Completed" } : q ));
      } else if (type === "custom") {
        setCustomQuests((prev) => prev.map((q) => q.id === id ? {...q, status: "Completed" } : q ));
      }
    } catch (err) {
      console.error("Failed to complete quest:", err);
    }
  };

  const handlePetNameChange = async (newName) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/pet/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newName })
      });

      if (!res.ok) {
        throw new Error('Failed to change pet name');
      }

      const data = await res.json();
      console.log("Pet name updated:", data);

      setPetName(data.newPetName);
    } catch (err) {
      console.error("Failed to update pet name:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate('/login');
  };

  useEffect(() => {
    getCustomQuests();
    getUserData();
    getPetName();
    getQuests();
  }, []);

  const totalDaily = dailyQuests.length;
  const completedDaily = dailyQuests.filter(q => q.status === 'Completed').length;

  const totalBonus = bonusQuests.length;
  const completedBonus = bonusQuests.filter(q => q.status === 'Completed').length;

  const totalCustom = customQuests.length;
  const completedCustom = customQuests.filter(q => q.status === 'Completed').length;

  const totalQuest = totalDaily + totalBonus + totalCustom;
  const completedQuest = completedDaily + completedBonus + completedCustom;

  // useEffect(() => {
  //   // Trigger confetti when all daily and bonus quests are completed
  //   if (completedDaily === totalDaily && completedBonus === totalBonus && completedCustom === totalBonus && totalDaily > 0 && totalBonus > 0 && totalCustom > 0) {
  //     setShowConfetti(true);
  //     setTimeout(() => setShowConfetti(false), 4000); // Confetti for 4 seconds
  //   }
  // }, [completedDaily, completedBonus, completedCustom, totalDaily, totalBonus, totalCustom]);

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
        <div className='sticky top-0 left-0 lg:px-60 bg-white backdrop-blur-md'>
          {showConfetti && <Confetti width={width} height={height} numberOfPieces={300} />}
          <div className='py-2'>
            <LevelBar xp={xp} level={level} />
          </div>
        </div>
        <RivePet />
        <PetName name={petName} onComplete={handlePetNameChange} />
        <MainCards streak={streak} completedCount={completedQuest} totalCount={totalQuest}/>
        <DailyQuests quests={dailyQuests} onComplete={handleCompleteQuest} completedCount={completedDaily} totalCount={totalDaily} />
        <BonusQuests quests={bonusQuests} onComplete={handleCompleteQuest} completedCount={completedBonus} totalCount={totalBonus} />
        <CustomQuests quests={customQuests} onComplete={handleCompleteQuest} completedCount={completedCustom} totalCount={totalCustom} onAddCustomQuest={addCustomQuest} onUpdateCustomQuest={updateCustomQuest} onDeleteCustomQuest={deleteCustomQuest} />

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
