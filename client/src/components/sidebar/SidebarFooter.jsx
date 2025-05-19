import React from 'react'
import { FiSettings, FiLogOut } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const routes = [
    { to: '/settings', label: 'Settings', icon: <FiSettings /> },
    { to: '/logout', label: 'Logout', icon: <FiLogOut /> },
]

const SidebarFooter = () => {
  return (
    <div className='space-y-2 border-t border-stone-300 pt-2 mb-8 mt-auto'>
      {routes.map(({ to, label, icon }) => (
        <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 
                `block text-sm flex items-center gap-2 px-2 py-1 rounded transition-colors ${
                    isActive ? 'bg-orange-500 text-white font-semibold mr-4' : 'text-neutral-500 font-semibold hover:bg-stone-200 mr-4'
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

export default SidebarFooter
