import React from 'react'
import starIcon from '../../assets/stars.png'
import { Gift, Star, CheckIcon, PawPrint, Clock, CircleCheck } from 'lucide-react'

const BonusQuests = ({ quests, onComplete, completedCount, totalCount  }) => {

    const sortedQuests = quests.sort((a, b) => {
        if (a.status === 'Completed' && b.status !== 'Completed') return 1;
        if (b.status === 'Completed' && a.status !== 'Completed') return -1;
        return 0;
    });

    return (
        <div className='flex flex-col mt-10 lg:mt-15'>
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

            {/* Table Layout for Laptop and Above */}
            <div className='lg:w-full hidden lg:block'>
                <table className='w-full table-fixed text-left'>
                    <thead>
                        <tr className='border-b-2 border-gray-300'>
                            <th className='px-6 py-3 text-sm font-semibold text-gray-700 w-1/2'>Quest</th>
                            <th className='px-6 py-3 text-sm font-semibold text-gray-700 w-1/6'><PawPrint alt='Paw' className='w-5 h-5 text-orange-500'/></th>
                            <th className='px-6 py-3 text-sm font-semibold text-gray-700 w-1/6'>Status</th>
                            <th className='px-6 py-3 w-1/6'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedQuests.map((quest) => (
                            <tr
                                key={quest.id}
                                className={`${quest.status === 'Completed' ? 'bg-green-100' : 'bg-white hover:bg-green-50'} transition-all duration-300 ease-in-out border-b border-gray-200 rounded-lg`}
                            >
                                <td className='px-6 py-4 flex items-center'>
                                    {quest.status !== 'Completed' ? (
                                        <img src={starIcon} alt='Quest' className='w-10 h-10 inline' />
                                    ) : (
                                        <CircleCheck className='w-10 h-10 text-green-500 inline' />
                                    )}
                                    <span className={`text-sm font-semibold ml-3 ${quest.status === 'Completed' ? 'text-green-500' : ''}`}>
                                        {quest.quest_text}
                                    </span>
                                </td>
                                <td className='px-6 py-4 text-sm text-gray-700'>
                                    {quest.xp}
                                </td>
                                <td className='px-6 py-4'>
                                    <span className={`text-xs font-semibold ${quest.status === 'Completed' ? 'text-green-500' : 'text-gray-500'}`}>
                                        {quest.status}
                                    </span>
                                </td>
                                <td className='px-6 py-4'>
                                    {quest.status !== 'Completed' && (
                                        <button
                                            onClick={() => onComplete(quest.id, quest.type)}
                                            className='bg-gradient-to-r from-orange-500 to-orange-700 text-white px-3 py-1 rounded-full hover:from-orange-600'
                                        >
                                            <CheckIcon className='w-5 h-5' />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='lg:hidden space-y-1 grid grid-cols-1 lg:grid-cols-3 lg:space-x-2 lg:space-y-0'>
                {quests.length > 0 ? (
                    sortedQuests.map((quest) => (
                        <div key={quest.id} className={`mt-3 p-3 rounded-xl ${quest.status === 'Completed' ? 'bg-green-100' : 'bg-white'} shadow-none transition-shadow duration-300 hover:shadow-gray-400 hover:shadow-lg border border-neutral-300 flex justify-between items-center gap-2`}>
                            <div className='flex items-center gap-2 flex-1'>
                                {quest.status !== 'Completed' ? (
                                    <img src={starIcon} alt='Quest' className='w-10 h-10'/>
                                ) : (
                                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                        <CircleCheck className='text-green-500' style={{ width: '100%', height: '100%' }}/>
                                    </div>
                                )}
                                <span className={`text-xs break-words font-semibold ${quest.status === 'Completed' ? 'text-green-500' : ''}`}>{quest.quest_text}</span>
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
