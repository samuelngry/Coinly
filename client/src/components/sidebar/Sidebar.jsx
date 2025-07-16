import React from 'react'
import Account from './Account'
import Search from './Search'
import RouteSelect from './RouteSelect'
import SidebarFooter from './SidebarFooter'
import { useEffect, useState } from 'react'

const Sidebar = () => {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

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

      setUsername(data.username);
      setAvatarUrl(data.avatar_url);

    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
        <div className='fixed left-4 top-4 h-screen w-56 flex flex-col'>
            <Account username={username} avatarUrl={avatarUrl} />
            <Search />
            <RouteSelect />
            <SidebarFooter />
        </div>
        

    </div>
  )
}

export default Sidebar
