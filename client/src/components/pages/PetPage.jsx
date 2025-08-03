import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import BottomNavbar from '../sidebar/BottomNavbar'
import Pet from '../../pet/Pet'

const PetPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    avatarUrl: '',
    xp: 0,
    level: 1,
    streak: 0,
    mood: '',
    accountAge: 0,
    badges: null
  });

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

      setUserData({
        username: data.username,
        avatarUrl: data.avatar_url,
        xp: data.xp,
        level: data.level,
        streak: data.streak,
        mood: data.mood,
        accountAge: data.accountAge,
        badges: data.badges
      });

    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const handleAvatarUpload = async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch("http://localhost:3000/api/users/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload avatar");

      const data = await res.json();
      
      setUserData(prev => ({
        ...prev,
        avatarUrl: data.avatar_url
      }));
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const updateUserData = (newData) => {
    setUserData(prev => ({
      ...prev,
      ...newData
    }));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className='grid gap-4 lg:p-4 lg:grid-cols-[220px_1fr] min-h-screen bg-white'>
        <div className='hidden lg:block'>
          <Sidebar 
            username={userData.username} 
            avatarUrl={userData.avatarUrl} 
          />
        </div>
        <Pet 
          userData={userData}
          onAvatarUpload={handleAvatarUpload}
          onUserDataUpdate={updateUserData}
        />
      </div>
      <BottomNavbar />
    </>
  )
}

export default PetPage