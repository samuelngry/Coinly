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

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
        <LeaderboardTable data={leaderboard} />
    </div>
  )
}

export default Leaderboard
