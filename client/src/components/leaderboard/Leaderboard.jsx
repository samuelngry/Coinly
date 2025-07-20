import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import TopLeaderboard from './TopLeaderboard';
import LeaderboardTable from './LeaderboardTable';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    
    useEffect(() => {
    const fetchLeaderboard = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/leaderboard", {
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
        <LeaderboardTable data={leaderboard} />
    </div>
  )
}

export default Leaderboard
