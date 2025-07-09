import React, { useState, useEffect } from 'react'
import PetCard from './PetCard'
import StreakCard from './StreakCard';

const Pet = () => {
    const [petName, setPetName] = useState("");
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, setStreak] = useState(0);
    const [mood, setMood] = useState("");

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
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

    useEffect(() => {
        getPetName();
        getUserData();
    }, []);

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
      <PetCard name={petName} level={level} />
      <StreakCard streak={streak} />
    </div>
  )
}

export default Pet
