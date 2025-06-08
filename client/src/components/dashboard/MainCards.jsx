import React from 'react'
import questIcon from '../../assets/quest.png'
import fireIcon from '../../assets/fire.png'

const MainCards = () => {
  return (
    <div className='grid grid-cols-2 mt-4 gap-4'>
      <div className='border border-neutral-300 shadow rounded-xl'>
        <div className='flex items-center p-2 gap-2'>
            <img src={fireIcon} alt='Streak' className='w-7 h-7'/>
            <div className='flex flex-col'>
                <h3 className='text-sm'>27</h3>
                <span className='text-neutral-400 text-xs -mt-0.5'>day streak</span>
            </div>
        </div>
      </div>
      <div className='border border-neutral-300 shadow rounded-xl'>
        <div className='flex items-center p-2 gap-2'>
            <img src={questIcon} alt='Quest' className='w-7 h-7'/>
            <div className='flex flex-col'>
                <h3 className='text-sm'>3/5</h3>
                <span className='text-neutral-400 text-xs -mt-0.5'>daily quests</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MainCards
