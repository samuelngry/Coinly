import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

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
    <div>
      
    </div>
  )
}

export default Leaderboard
