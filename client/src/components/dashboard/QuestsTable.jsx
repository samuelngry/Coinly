import React from 'react'

const quests = [
    { 
        name: "Skip coffee today",
        category: "Food & Drink",
        xp: 5 * 1,
        status: "Pending",
        timeLeft: "12h"
    },
    {
        quest: "Make your own lunch for two days",
        category: "Food & Drink",
        xp: 5 * 2, 
        status: "Accepted",
        timeLeft: "2d"
    },
    {
        quest: "Find a cheaper alternative to subscription this week",
        category: "Entertainment",
        xp: 15 * 7,
        status: "Pending",
        timeLeft: "2d"
    },
    {
        quest: "Cook at home instead of getting takeout food for the weekend",
        category: "Food & Drink",
        xp: 12 * 2,
        status: "Accepted",
        timeLeft: "2d"
    },
    {
        quest: "Use public transit instead of rideshare today",
        category: "Transport",
        xp: 20 * 1, 
        status: "Pending",
        timeLeft: "1d"
    },
    {
        quest: "Share subscription with friends instead of paying individually for three days",
        category: "Entertainment",
        xp: 15 * 3,
        status: "Completed",
        timeLeft: "-"
    }
]

const QuestsTable = () => {
  return (
    <div className='p-4 col-span-12 rounded-2xl bg-white shadow'>
        <h3 className='font-semibold mb-4'>Quest Hub</h3>
        <table className='w-full table-auto text-sm rounded-xl overflow-hidden'>
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
                    <tr key={index}>
                        <td className='p-4'>{quest.name}</td>
                        <td className='p-4'>{quest.category}</td>
                        <td className='p-4'>{quest.xp}</td>
                        <td className='p-4'>{quest.timeLeft}</td>
                        <td className='p-4'>{quest.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default QuestsTable
