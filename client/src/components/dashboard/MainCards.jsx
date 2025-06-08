import React from 'react'
import starIcon from '../../assets/star.png'
import fireIcon from '../../assets/fire.png'

const MainCards = () => {
  return (
    <div className='grid grid-cols-2 mt-4 gap-4'>
      <div className='border border-neutral-300 shadow rounded-xl'>
        <div className='flex items-center p-2 gap-1'>
            <img src={fireIcon} alt='Streak' className='w-8 h-8'/>
            <div className='flex flex-col'>
                <h3 className='text-sm'>27</h3>
                <span className='text-neutral-400 text-xs'>day streak</span>
            </div>
        </div>
      </div>
      <div className='border border-neutral-300 shadow rounded-xl'>
      </div>
    </div>
  )
}

export default MainCards
