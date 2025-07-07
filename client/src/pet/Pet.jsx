import React, { useState, useEffect } from 'react'
import PetCard from './PetCard'

const Pet = () => {
    const [petName, setPetName] = useState("");

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

    useEffect(() => {
        getPetName();
    }, []);

  return (
    <div className='min-h-screen p-6 mb-12 lg:mb-0 rounded-lg shadow justify-center'>
      <PetCard name={petName} />
    </div>
  )
}

export default Pet
