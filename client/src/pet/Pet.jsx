import React, { useState, useEffect } from 'react'
import PetCard from './PetCard'
import StreakCard from './StreakCard';
import PetStat from './PetStat';
import PetBadge from './PetBadge';
import PetMotivation from './PetMotivation';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Pet = ({ userData = {}, onAvatarUpload, onUserDataUpdate }) => {
    const [petName, setPetName] = useState("");
    const [levelUpXp, setLevelUpXp] = useState(0);
    const [weeklyXPData, setWeeklyXPData] = useState([]);
    const [totalXP, setTotalXP] = useState(0);

    const getPetName = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_BASE}/api/pet`, {
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

            const res = await fetch(`${API_BASE}/api/users`, {
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

            setLevelUpXp(data.maxXp);

            if (onUserDataUpdate) {
                onUserDataUpdate({
                    xp: data.xp,
                    level: data.level,
                    streak: data.streak,
                    mood: data.mood,
                    username: data.username,
                    accountAge: data.accountAge,
                    avatarUrl: data.avatar_url,
                    badges: data.badges
                });
            }

        } catch (err) {
            console.error("Failed to fetch user data:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    useEffect(() => {
        getPetName();
        getUserData();
    }, []);

    useEffect(() => {
        const fetchWeeklyXP = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE}/api/stats/weekly-xp`, {
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
                    <PetCard 
                        name={petName} 
                        level={userData.level || 1} 
                        mood={userData.mood || ''} 
                        username={userData.username || ''} 
                        accountAge={userData.accountAge || 0} 
                        avatarUrl={userData.avatarUrl || ''} 
                        onAvatarUpload={onAvatarUpload} 
                    />
                    <StreakCard streak={userData.streak || 0} longestStreak={userData.longestStreak || 0} />
                </div>
                <div className='md:col-span-2 space-y-6'>
                    <PetStat data={weeklyXPData} total={totalXP} />
                </div>
            </div>
            <div>
                <PetMotivation xp={userData.xp || 0} level={userData.level || 1} levelXp={levelUpXp} />
                <PetBadge badge={userData.badges} />
            </div>
        </div>    
    )
}

export default Pet