import React from 'react'
import { FiCalendar } from 'react-icons/fi'

const TopBar = () => {
  return (
    <div className='border-b mb-4 pb-4 mt-2 border-stone-300 px-4'>
        <div className='flex items-center justify-between p-0.5'>
            <div>
                <span className='text-sm font-semibold block'>Hey, Yi Jing!</span>
                <span className='text-neutral-500 block text-xs'>  
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
            </div>
            <button className='flex text-sm items-center gap-1.5 bg-orange-500 hover:bg-orange-800 text-white rounded-md px-2 py-1'>
                <FiCalendar className='text-white' />
                <span>Prev 6 Months</span>
            </button>
        </div>
    </div>
  )
}

export default TopBar