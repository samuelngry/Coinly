import React from 'react'
import questIcon from '../../assets/quest.png'
import fireIcon from '../../assets/fire.png'

const MainCards = ({streak, completedCount, totalCount}) => {
  return (
    <div className='grid grid-cols-2 mt-4 gap-4 max-w-lg mx-auto'>
      <div className='border border-neutral-300 shadow-lg shadow-black/10 rounded-xl'>
        <div className='flex items-center p-2 gap-2'>
            <img src={fireIcon} alt='Streak' className='w-7 h-7'/>
            <div className='flex flex-col'>
                <h3 className='text-sm lg:text-lg'>{streak}</h3>
                <span className='text-neutral-400 text-xs -mt-0.5 lg:text-md'>day streak</span>
            </div>
        </div>
      </div>
      <div className='border border-neutral-300 shadow-lg shadow-black/10 rounded-xl'>
        <div className='flex items-center p-2 gap-2'>
            <img src={questIcon} alt='Quest' className='w-7 h-7'/>
            {completedCount == totalCount ? (
                <div className='flex flex-col'>
                  <h3 className='text-sm lg:text-lg'>{completedCount}/{totalCount}</h3>
                  <span className='text-neutral-400 text-xs -mt-0.5 lg:text-md'>quests</span>
              </div>
            ) : (
                <div className='flex flex-col'>
                  <h3 className='text-sm lg:text-lg text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text font-bold'>{completedCount}/{totalCount}</h3>
                  <span className='text-yellow-600 text-xs -mt-0.5 lg:text-md font-medium'>quests</span>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default MainCards
