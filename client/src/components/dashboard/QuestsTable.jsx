import React from 'react'

const quests = [
    { 
        name: "Skip coffee today",
        category: "Food",
        xp: 5 * 1,
        status: "Pending",
        timeLeft: "12h"
    },
    {
        quest: "Make your own lunch for two days",
        category: "Food",
        xp: 5 * 2, 
        status: "Pending",
        timeLeft: "2d"
    },
    {
        quest: "Find a cheaper alternative to subscription this week",
        category: "Entertainment",
        xp: 15 * 7,
        status: "Accepted",
        timeLeft: "2d"
    },
    {
        quest: "Cook at home instead of getting takeout food for the weekend",
        category: "Food",
        xp: 12 * 2,
        status: "Accepted",
        timeLeft: "2d"
    },
    {
        quest: "Use public transit instead of rideshare today",
        category: "Transport",
        xp: 20 * 1, 
        status: "Completed",
        timeLeft: "1d"
    },
    {
        quest: "Share subscription with friends instead of paying individually for today",
        category: "Entertainment",
        xp: 15 * 3,
        status: "Expired",
        timeLeft: "-"
    }
]

const statusColors = {
    Pending: 'bg-gray-400',
    Accepted: 'bg-orange-500',
    Completed: 'bg-green-500',
    Expired: 'bg-red-500',
};

const categoryColors = {
    Food: 'text-emerald-400',
    Transport: 'text-blue-400',
    Entertainment: 'text-purple-400',
    Shopping: 'text-pink-400',
}

const QuestsTable = () => {
  return (
    <div className='p-4 col-span-12 rounded-2xl bg-white shadow'>
        <h3 className='font-semibold mb-4'>Quest Hub</h3>

        {/* Cards on small screen */}
        <div className='space-y-4 lg:hidden'>
            {quests.map((quest, index) => (
                <div key={index} className='p-4 rounded-2xl shadow bg-neutral-100 flex flex-col'>
                    <div className='border-b border-stone-300 flex flex-col p-2'>
                        <span className='text-neutral-500 text-sm'>Quest</span>
                        <span className='text-sm font-semibold mt-2'>{quest.name || quest.quest}</span>
                    </div>
                    <div className='p-2 flex border-b border-stone-300 items-center justify-between'>
                        <span className='text-neutral-500 text-sm'>Category</span>
                        <span className={`text-sm ${categoryColors[quest.category]}`}>{quest.category}</span>
                    </div>
                    <div className='p-2 flex border-b border-stone-300 items-center justify-between'>
                        <span className='text-neutral-500 text-sm'>XP</span>
                        <span className='text-orange-500 text-sm'>{quest.xp}</span>
                    </div>
                    <div className='p-2 flex items-center justify-between'>
                        <span className='text-neutral-500 text-sm'>Time Left</span>
                        <span className='text-sm'>{quest.timeLeft}</span>
                    </div>
                    <div className='p-2 flex justify-center'>
                        <span className={`text-center px-3 py-1 text-white rounded-full ${statusColors[quest.status]}`}>{quest.status}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Table on medium+ screens*/}
        <table className='hidden w-full md:table text-sm rounded-xl overflow-hidden table-fixed'>
            <thead>
                <tr style={{ backgroundColor: 'var(--old-lace)' }} className='text-left'>
                    <th className='p-4'>Quest</th>
                    <th className='p-4'>Category</th>
                    <th className='p-4'>XP</th>
                    <th className='p-4'>Time Left</th>
                    <th className='p-4'>Status</th>
                </tr>
            </thead>
            <tbody>
                {quests.map((quest, index) => (
                    <tr key={index} className='border-t border-stone-300'>
                        <td className='p-4 max-w-xs'>{quest.name || quest.quest}</td>
                        <td className={`p-4 ${categoryColors[quest.category]}`}>{quest.category}</td>
                        <td className='p-4 text-orange-500'>{quest.xp}</td>
                        <td className='p-4'>{quest.timeLeft}</td>
                        <td className='p-4'>
                            <span className={`px-3 py-1 text-white rounded-full ${statusColors[quest.status]}`}>{quest.status}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default QuestsTable
