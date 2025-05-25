import React from 'react'
import { FiHome, FiFlag, FiStar, FiAward } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const routes = [
    { to: '/dashboard', icon: <FiHome />, color: 'text-blue-500' },
    { to: '/quests', icon: <FiFlag />, color: 'text-emerald-500' },
    { to: '/pet', icon: <FiStar />, color: 'text-yellow-500' },
    { to: '/leaderboard', icon: <FiAward />, color: 'text-purple-500' }, 
]

const BottomNavbar = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full bg-white border-t border-stone-300 lg:hidden flex justify-around py-2 items-center'>
      {routes.map(({ to, icon, color }) => (
        <NavLink 
            key={to}
            to={to}
            className={({ isActive }) => 
                `${
                    isActive ? 'bg-orange-500 p-2 rounded-lg text-white' : 'bg-white'
                }`
            }
        >
            {({ isActive }) => (
                <span className={`text-lg ${isActive ? 'text-white': color}`}>{icon}</span>
            )}
        </NavLink>
      ))}
    </div>
  )
}

export default BottomNavbar
