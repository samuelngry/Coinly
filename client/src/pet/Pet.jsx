import React, { useState, useEffect } from 'react'
import PetCard from './PetCard'
import StreakCard from './StreakCard';
import PetStat from './PetStat';
import PetBadge from './PetBadge';
import PetMotivation from './PetMotivation';

const Pet = () => {
    const [petName, setPetName] = useState("");
    const [xp, setXp] = useState(0);
    const [levelUpXp, setLevelUpXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, setStreak] = useState(0);
    const [mood, setMood] = useState("");
    const [weeklyXPData, setWeeklyXPData] = useState([]);
    const [totalXP, setTotalXP] = useState(0);
    const [badge, setBadge] = useState(null);
    const [username, setUsername] = useState('');
    const [accountAge, setAccountAge] = useState(0);

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
      setMood(data.mood);
      setLevelUpXp(data.maxXp);
      setUsername(data.username);
      setAccountAge(data.accountAge);

      if (data.badges) {
        setBadge(data.badges);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const handleLogout = () => {
        localStorage.removeItem("token");
        // Add your logout logic here (e.g., redirect to login page, clear user state, etc.)
        window.location.href = "/login"; // or use your router's navigation
    };

    useEffect(() => {
        getPetName();
        getUserData();
    }, []);

    useEffect(() => {
        const fetchWeeklyXP = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:3000/api/stats/weekly-xp", {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch weekly XP");

                const data = await res.json();
                setWeeklyXPData(data.result);
                setTotalXP(data.total);
            } catch (err) {
                console.error("Weekly XP fetch error:", err);
            }
        };

        fetchWeeklyXP();
    }, []);

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='md:col-span-2 space-y-6'>
          <div className='flex justify-between items-center mb-6 md:hidden'>
            <h1 className='text-2xl font-bold text-gray-800'>Coin Pet</h1>
            <button 
              onClick={handleLogout}
              className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors duration-200'
            >
              Log out
            </button>
          </div>
          <PetCard name={petName} level={level} mood={mood} username={username} accountAge={accountAge} />
          <StreakCard streak={streak} />
        </div>
        <div className='md:col-span-2 space-y-6'>
          <PetStat data={weeklyXPData} total={totalXP} />
        </div>
      </div>
      <div>
        <PetMotivation xp={xp} level={level} levelXp={levelUpXp} />
        <PetBadge badge={badge} />
      </div>
    </div>    
  )
}

export default Pet
