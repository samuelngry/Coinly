import React from 'react'
import { FiHome, FiCoffee, FiStar, FiAward } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const routes = [
    { to: '/dashboard', label: 'Dashboard', icon: (className) => <FiHome className={className}/>, color: 'text-blue-500' },
    { to: '/hangout', label: 'Hangout', icon: (className) => <FiCoffee className={className} />, color: 'text-emerald-500' },
    { to: '/pet', label: 'Coin Pet', icon: (className) => <FiStar className={className} />, color: 'text-yellow-500' },
    { to: '/leaderboard', label: 'Leaderboard', icon: (className) => <FiAward className={className} />, color: 'text-purple-500' }, 
]

const RouteSelect = () => {
  return (
    <div className='space-y-2'>
      {routes.map(({ to, label, icon, color }) => (
        <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 
                `block text-sm flex items-center gap-2 px-2 py-1 rounded transition-colors ${
                    isActive ? 'bg-orange-500 text-white font-semibold mr-4' : 'text-neutral-500 font-semibold hover:bg-stone-200 mr-4'
                }`
            }
        >
            {({ isActive }) => (
              <>
                {icon(isActive ? 'text-white' : color)}
                {label}
              </>
            )}
        </NavLink>
      ))}
    </div>
  )
}

export default RouteSelect
