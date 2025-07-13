import React from 'react'

const PetMotivation = ({ xp, level, levelXp }) => {
  return (
    <div className='border border-neutral-300 shadow-lg bg-white rounded-2xl mt-6 text-center p-6'>
        <h3 className="text-xl font-bold ">You're doing great! 💪</h3>
        <p className="text-sm mt-2">
            Only <span className="font-semibold text-orange-500">{levelXp - xp}</span> XP to reach Level {level + 1}!
        </p>
        </div>
      
  )
}

export default PetMotivation
