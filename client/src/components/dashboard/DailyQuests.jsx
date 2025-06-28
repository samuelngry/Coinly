import React from 'react'
import dailyIcon from '../../assets/daily.png'
import { CheckIcon, PawPrint, Zap, Star, CircleCheck } from 'lucide-react'

const DailyQuests = ({ quests, onComplete, completedCount, totalCount }) => {

    const sortedQuests = quests.sort((a, b) => {
        if (a.status === 'Completed' && b.status !== 'Completed') return 1;
        if (b.status === 'Completed' && a.status !== 'Completed') return -1;
        return 0;
    });

    return (
        <div className='flex flex-col mt-6'>
            <div className='flex items-center gap-3 mb-2 justify-center lg:justify-start border-t border-neutral-300 pt-4 lg:pt-6'>
                <div className="bg-gradient-to-r from-orange-500 to-orange-800 p-2 rounded-xl shadow-lg">
                    <Zap className='w-4 h-4 text-white' />
                </div>
                <h3 className='text-sm lg:text-lg'>Daily Quests</h3>
                <div className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs lg:text-sm font-bold flex items-center gap-1'>
                    <Star className="w-3 h-3 fill-current" />
                    <span>{completedCount}/{totalCount}</span>
                </div>
            </div>

            <div className='space-y-1 grid grid-cols-1 lg:grid-cols-3 lg:space-x-2 lg:space-y-0'>
                {quests.length > 0 ? (
                    sortedQuests.map((quest) => (
                        <div key={quest.id} className={`mt-3 p-3 rounded-xl ${quest.status === 'Completed' ? 'bg-green-100' : 'bg-white'} shadow-none transition-shadow duration-300 hover:shadow-gray-400 hover:shadow-lg border border-neutral-300 flex justify-between items-center gap-2`}>
                            <div className='flex items-center gap-2 flex-1'>
                                {quest.status !== 'Completed' ? (
                                    <img src={dailyIcon} alt='Quest' className='w-10 h-10'/>
                                ) : (
                                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                        <CircleCheck className='text-green-500' style={{ width: '100%', height: '100%' }}/>
                                    </div>
                                )}
                                <span className={`text-xs break-words font-semibold ${quest.status === 'Completed' ? 'line-through text-green-500' : ''}`}>
                                    {quest.quest_text}
                                </span>
                            </div>
                            
                            <div className='flex items-center shrink-0'>
                                {quest.status !== 'Completed' && (
                                    <div className="bg-orange-100 text-orange-500 px-1.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <span>{quest.xp}</span>
                                        <PawPrint className="w-3 h-3" />
                                    </div>
                                )}

                                {quest.status !== 'Completed' && (
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
                ) : (
                    <p className='text-sm text-center text-gray-500 col-span-3'>No daily quests found</p>
                )}
            </div>
        </div>
    );
};

export default DailyQuests
