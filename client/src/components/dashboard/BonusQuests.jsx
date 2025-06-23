import React from 'react'
import starIcon from '../../assets/stars.png'
import { Gift, Star, CheckIcon, PawPrint, Clock, CircleCheck } from 'lucide-react'

const BonusQuests = ({ quests, onComplete, completedCount, totalCount  }) => {
    return (
        <div className='flex flex-col mt-6'>
            <div className='flex items-center gap-3 mb-2 justify-center lg:justify-start'>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-800 p-2 rounded-xl shadow-lg">
                        <Gift className='w-4 h-4 text-white' />
                    </div>
                    <h3 className='text-sm lg:text-lg'>Bonus Quests</h3>
                    <div className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs lg:text-sm font-bold flex items-center gap-1'>
                        <Star className="w-3 h-3 fill-current" />
                        <span>{completedCount}/{totalCount}</span>
                    </div>
            </div>
            <div className='space-y-1 grid grid-cols-1 lg:grid-cols-3 lg:space-x-2 lg:space-y-0'>
                {quests.length > 0 ? (
                    quests.map((quest) => (
                        <div key={quest.id} className={`mt-3 p-3 rounded-xl ${quest.status === 'Completed' ? 'bg-green-100' : 'bg-white'} shadow-none transition-shadow duration-300 hover:shadow-gray-400 hover:shadow-lg border border-neutral-300 flex justify-between items-center gap-2`}>
                            <div className='flex items-center gap-2 flex-1'>
                                {quest.status !== 'Completed' ? (
                                    <img src={starIcon} alt='Quest' className='w-10 h-10'/>
                                ) : (
                                    <CircleCheck className='w-10 h-10 text-green-500'/>
                                )}
                                <span className={`text-xs break-words font-semibold ${quest.status === 'Completed' ? 'line-through text-green-500' : ''}`}>{quest.quest_text}</span>
                            </div>

                            <div className='flex items-center shrink-0'>
                                {quest.status !== 'Completed' && (
                                    <div className="bg-orange-100 text-orange-600 px-1.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <span>{quest.xp}</span>
                                        <PawPrint className="w-3 h-3" />
                                    </div>
                                )}

                                {quest.status !=='Completed' && (
                                    <button
                                        onClick={() => onComplete(quest.id, quest.type)}
                                    >
                                        <div className='w-8 h-8 cursor-pointer rounded-xl border border-neutral-300 shadow-xl flex items-center justify-center hover:bg-green-100 ml-1.5'>
                                            <CheckIcon className='w-5 h-5 text-green-500'/>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ): (
                    <p className='text-sm text-center text-gray-500 col-span-3'>No bonus quests found</p>
                )}
            </div>
        </div>
    )
}

export default BonusQuests
