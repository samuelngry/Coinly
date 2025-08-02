import React, { useEffect, useState } from 'react'
import RivePet from './RivePet';
import LevelBar from './LevelBar';
import PetName from './PetName';
import MainCards from './MainCards';
import DailyQuests from './DailyQuests';
import BonusQuests from './BonusQuests';
import CustomQuests from './CustomQuests';
import CompleteBonusModal from './CompleteBonusModal';
import CompleteDailyModal from './CompleteDailyModal';
import StreakModal from './StreakModel';
import LevelUpModal from './LevelUpModal';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import toast from 'react-hot-toast';

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
  const [showBonusComplete, setShowBonusComplete] = useState(false);
  const [showDailyComplete, setShowDailyComplete] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [prevStreak, setPrevStreak] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(level);

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

      if (prevStreak !== null && data.streak > prevStreak) {
        setShowStreakModal(true);
      }

      setPrevStreak(data.streak);
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

      toast.success("Quest added!");
    } catch (err) {
        console.error("Failed to add custom quest:", err);
        toast.error("Failed to add quest");
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
      toast("Quest updated!", {
        icon: "✏️",
      });
    } catch (err) {
      console.error("Failed to update custom quest:", err);
      toast.error("Failed to update quest!");
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

      toast("Quest deleted!", {
        icon: "🗑️",
      });
    } catch (err) {
      console.error("Failed to delete custom quest:", err);
      toast.error("Failed to delete quest!");
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

      if (prevStreak !== null && data.streak > prevStreak) {
        setShowStreakModal(true);
      }

      setPrevStreak(data.streak);

      setXp(data.xp);
      setLevel(data.level);
      setMood(data.mood);
      setStreak(data.streak);

      if (data.level > level) {
        setNewLevel(data.level);
        setShowLevelUp(true);
      }

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);

      if (type === "daily") {
        const updatedDaily = dailyQuests.map((q) => q.id === id ? { ...q, status: "Completed" } : q );
        setDailyQuests(updatedDaily);

        const completed = updatedDaily.filter(q => q.status === "Completed").length;
        if (completed === updatedDaily.length) {
          setShowDailyComplete(true);
        }
      } else if (type === "bonus") {
        const updatedBonus = bonusQuests.map((q) => q.id === id ? { ...q, status: "Completed" } : q );
        setBonusQuests(updatedBonus);

        const completed = updatedBonus.filter(q => q.status === "Completed").length;
        if (completed === updatedBonus.length) {
          setShowBonusComplete(true);
        }
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

      toast("Pet name updated!", {
        icon: "✏️",
      });
    } catch (err) {
      console.error("Failed to update pet name:", err);
    }
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

  const activeCustomQuests = customQuests.filter(q => q.status != 'Expired');
  const totalCustom = activeCustomQuests.length;
  const completedCustom = activeCustomQuests.filter(q => q.status === 'Completed').length;

  const totalQuest = totalDaily + totalBonus + totalCustom;
  const completedQuest = completedDaily + completedBonus + completedCustom;

  const totalBonusXp = bonusQuests
    .filter(q => q.status === 'Completed')
    .reduce((sum, q) => sum + (q.xp || 0), 0);

  const totalDailyXp = dailyQuests
    .filter(q => q.status === 'Completed')
    .reduce((sum, q) => sum + (q.xp || 0), 0);

  // useEffect(() => {
  //   // Trigger confetti when all daily and bonus quests are completed
  //   if (completedDaily === totalDaily && completedBonus === totalBonus && completedCustom === totalBonus && totalDaily > 0 && totalBonus > 0 && totalCustom > 0) {
  //     setShowConfetti(true);
  //     setTimeout(() => setShowConfetti(false), 4000); // Confetti for 4 seconds
  //   }
  // }, [completedDaily, completedBonus, completedCustom, totalDaily, totalBonus, totalCustom]);

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
      {showBonusComplete && petName && (
        <CompleteBonusModal name={petName} totalXp={totalBonusXp} onClose={() => setShowBonusComplete(false)} />
      )}
      {showDailyComplete && petName && (
        <CompleteDailyModal name={petName} totalXp={totalDailyXp} onClose={() => setShowDailyComplete(false)} />
      )}
      {showStreakModal && (
        <StreakModal streak={streak} onClose={() => setShowStreakModal(false)} />
      )}
      {showLevelUp && petName && (
        <LevelUpModal name={petName} newLevel={newLevel} totalXp={xp} onClose={() => setShowLevelUp(false)} />
      )}
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
    </div>
  )
}

export default Dashboard
