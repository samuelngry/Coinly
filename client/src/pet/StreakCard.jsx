import React from 'react'
import fireCuteIcon from '../assets/firecute.png'

const StreakCard = ({ streak }) => {
  return (
    <div className='flex flex-col items-center bg-white border border-neutral-300 mx-auto shadow-lg rounded-2xl mt-5 p-4'>
      <img src={fireCuteIcon} className='w-10 h-10 mr-3'/>
      <div className='flex items-baseline gap-1'>
        <h3 className='text-md lg:text-lg'>{streak}</h3>
        <span className='text-xs lg:text-md'>day streak</span>
      </div>
      <span className='text-xs text-neutral-400'>Longest: 4 days</span>
    </div>
  )
}

export default StreakCard
