import React from 'react'
import dailyIcon from '../../assets/daily.png'
import pawIcon from '../../assets/paw.png'
import tickIcon from '../../assets/tick.png'

const QuestsList = () => {
  return (
    <div className='flex flex-col mt-6'>
      <h3 className='text-sm'>Start your day!</h3>
      <div className='space-y-2'>
        <div className='mt-3 p-2 rounded-xl shadow border border-neutral-300 flex items-center gap-2'>
            <img src={dailyIcon} alt='Quest' className='w-10 h-10'/>
            <span className='text-xs max-w-40'>Track all your expenses today</span>
            <div className='flex items-center'>
                <span className='text-xs pl-2'>20</span>
                <img src={pawIcon} alt='Paw' className='w-3 h-3 ml-1'/>
                <button
                >
                    <img src={tickIcon} alt='Tick' className='w-7 h-7 ml-2'/>
                </button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default QuestsList
