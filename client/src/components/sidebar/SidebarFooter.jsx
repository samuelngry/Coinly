import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const SidebarFooter = () => {
  const handleLogout = () => {
        localStorage.removeItem("token");
        // Add your logout logic here (e.g., redirect to login page, clear user state, etc.)
        window.location.href = "/login"; // or use your router's navigation
    };

  return (
    <div className='space-y-2 border-t border-stone-300 pt-2 mb-8 mt-auto mr-4'>
      <button
        onClick={handleLogout}
        className='w-full cursor-pointer text-sm flex items-center gap-2 px-2 py-1 rounded transition-colors text-neutral-500 font-semibold hover:bg-stone-200 mr-4'
      >
        <FiLogOut className='text-lg' />
        Logout
      </button>
    </div>      
  )
}

export default SidebarFooter
