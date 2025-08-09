import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import BottomNavbar from '../sidebar/BottomNavbar'
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AppLayout = ({ children, className = 'bg-white' }) => {
  const [userData, setUserData] = useState({
    username: '',
    avatarUrl: '',
    xp: 0,
    level: 1,
    streak: 0,
    longestStreak: 0,
    mood: '',
    accountAge: 0,
    badges: null
  });

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

      setUserData({
        username: data.username,
        avatarUrl: data.avatar_url,
        xp: data.xp,
        level: data.level,
        streak: data.streak,
        longestStreak: data.longestStreak,
        mood: data.mood,
        accountAge: data.accountAge,
        badges: data.badges
      });

    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const handleAvatarUpload = async (file) => {
    console.log('🔍 Frontend Upload Started');
    console.log('🔍 File details:', {
        name: file?.name,
        size: file?.size,
        type: file?.type
    });
    console.log('🔍 API_BASE:', API_BASE);

    const token = localStorage.getItem("token");
    console.log('🔍 Token exists:', !!token);

    if (!token) {
        console.error('❌ No auth token found');
        alert('Please log in again');
        return;
    }

    if (!file) {
        console.error('❌ No file provided');
        return;
    }

    const formData = new FormData();
    formData.append('avatar', file);
    console.log('🔍 FormData created');

    const uploadUrl = `${API_BASE}/api/users/avatar`;
    console.log('🔍 Upload URL:', uploadUrl);

    try {
        console.log('🔍 Sending fetch request...');
        
        const res = await fetch(uploadUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        console.log('🔍 Response received:', {
            status: res.status,
            ok: res.ok
        });

        const data = await res.json();
        console.log('🔍 Response data:', data);

        if (!res.ok) {
            throw new Error(data.error || "Failed to upload avatar");
        }

        setUserData(prev => ({
            ...prev,
            avatarUrl: data.public_url || data.avatar_url
        }));

        await getUserData();

    } catch (err) {
        console.error("❌ Upload error:", err);
        alert(`Avatar upload failed: ${err.message}`);
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
      <div className={`grid gap-4 lg:p-4 lg:grid-cols-[220px_1fr] min-h-screen ${className}`}>
        <div className='hidden lg:block'>
          <Sidebar 
            username={userData.username} 
            avatarUrl={userData.avatarUrl} 
          />
        </div>
        {/* Pass user data and functions to children */}
        {React.cloneElement(children, {
          userData,
          onAvatarUpload: handleAvatarUpload,
          onUserDataUpdate: updateUserData
        })}
      </div>
      <BottomNavbar />
    </>
  )
}

export default AppLayout