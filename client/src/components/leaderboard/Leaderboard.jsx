import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const res = await fetch("http://localhost:3000/api/leaderboard");
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
