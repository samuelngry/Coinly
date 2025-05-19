import React from 'react'
import { FiHome, FiFlag, FiStar, FiAward } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const routes = [
    { to: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { to: '/quests', label: 'Quests', icon: <FiFlag /> },
    { to: '/pet', label: 'Coin Pet', icon: <FiStar /> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <FiAward /> }, 
]

const RouteSelect = () => {
  return (
    <div className='space-y-2'>
      {routes.map(({ to, label, icon }) => (
        <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 
                `block text-sm flex items-center gap-2 px-2 py-1 rounded transition-colors ${
                    isActive ? 'bg-stone-200 text-stone-900 font-semibold mr-4' : 'text-stone-400 font-semibold'
                }`
            }
        >
            {icon}
            {label}
        </NavLink>
      ))}
    </div>
  )
}

export default RouteSelect
