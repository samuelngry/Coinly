import React from 'react'
import starIcon from '../../assets/stars.png'
import { Gift, Star, CheckIcon, PawPrint, Clock } from 'lucide-react'

const BonusQuests = () => {
  return (
    <div className='flex flex-col mt-6'>
      <div className='flex items-center gap-3 mb-2 justify-center lg:justify-start'>
            <div className="bg-gradient-to-r from-purple-500 to-purple-800 p-2 rounded-xl shadow-lg">
                <Gift className='w-4 h-4 text-white' />
            </div>
            <h3 className='text-sm lg:text-lg'>Bonus Quests</h3>
            <div className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs lg:text-sm font-bold flex items-center gap-1'>
                <Star className="w-3 h-3 fill-current" />
                <span>1/3</span>
            </div>
      </div>
      <div className='space-y-1 grid grid-cols-1 lg:grid-cols-3 lg:space-x-2 lg:space-y-0'>
        <div className='mt-4 p-3 rounded-xl shadow-none transition-shadow duration-300 hover:shadow-gray-400 hover:shadow-lg border border-neutral-300 flex justify-between items-center gap-2'>
            <div className='flex items-center gap-2 flex-1'>
                <img src={starIcon} alt='Quest' className='w-10 h-10'/>
                <span className='text-xs break-words font-semibold'>Take public transport instead of Grab today</span>
            </div>
            <div className='flex items-center shrink-0'>
                <div className="bg-orange-100 text-orange-600 px-1.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <span>10</span>
                    <PawPrint className="w-3 h-3" />
                </div>
                <button
                >
                    <div className='w-8 h-8 cursor-pointer rounded-xl border border-neutral-300 shadow-xl flex items-center justify-center hover:bg-green-100 ml-1.5'>
                        <CheckIcon className='w-5 h-5 text-green-500'/>
                    </div>
                </button>
            </div>
        </div>
        <div className='mt-4 p-3 rounded-xl shadow-none transition-shadow duration-300 hover:shadow-gray-400 hover:shadow-lg border border-neutral-300 flex justify-between items-center gap-2'>
            <div className='flex items-center gap-2 flex-1'>
                <img src={starIcon} alt='Quest' className='w-10 h-10'/>
                <span className='text-xs break-words font-semibold'>Write down one financial win this week</span>
            </div>
            <div className='flex items-center shrink-0'>
                <div className="bg-orange-100 text-orange-600 px-1.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <span>30</span>
                    <PawPrint className="w-3 h-3" />
                </div>
                <button
                >
                    <div className='w-8 h-8 cursor-pointer rounded-xl border border-neutral-300 shadow-xl flex items-center justify-center hover:bg-green-100 ml-1.5'>
                        <CheckIcon className='w-5 h-5 text-green-500'/>
                    </div>
                </button>
            </div>
        </div>
        <div className='mt-3 p-3 rounded-xl shadow-none transition-shadow duration-300 hover:shadow-gray-400 hover:shadow-lg border border-neutral-300 flex justify-between items-center gap-2'>
            <div className='flex items-center gap-2 flex-1'>
                <img src={starIcon} alt='Quest' className='w-10 h-10'/>
                <span className='text-xs break-words font-semibold'>Skip one sugary snack today</span>
            </div>
            <div className='flex items-center shrink-0'>
                <div className="bg-orange-100 text-orange-600 px-1.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <span>25</span>
                    <PawPrint className="w-3 h-3" />
                </div>
                <button
                >
                    <div className='w-8 h-8 cursor-pointer rounded-xl border border-neutral-300 shadow-xl flex items-center justify-center hover:bg-green-100 ml-1.5'>
                        <CheckIcon className='w-5 h-5 text-green-500'/>
                    </div>
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default BonusQuests
