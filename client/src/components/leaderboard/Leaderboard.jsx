import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import TopLeaderboard from './TopLeaderboard';
import LeaderboardTable from './LeaderboardTable';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    
    useEffect(() => {
        const fetchLeaderboard = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_BASE}/api/leaderboard`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (!res.ok) {
                throw new Error("Failed to fetch leaderboard");
            }
            
            const data = await res.json();
            setLeaderboard(data);
        };
        fetchLeaderboard();
    }, []);

    const topThree = leaderboard.slice(0, 3);
    const others = leaderboard.slice(3);

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
        <TopLeaderboard topThree={topThree} />
        <LeaderboardTable data={others} />        
    </div>
  )
}

export default Leaderboard
