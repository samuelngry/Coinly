import React from 'react'
import { PawPrint } from 'lucide-react';

const PetMotivation = ({ xp, level, levelXp }) => {
  return (
    <div className='border border-neutral-300 shadow-lg bg-white rounded-2xl mt-6 text-center p-6'>
        <h3 className="md:text-xl">So close to leveling up! Don't stop now! ⚡</h3>
        <div className='flex items-center justify-center mt-2 gap-1'>
            <p className="text-sm md:text-base">
                Only <span className="font-semibold text-orange-500">{levelXp - xp}</span>
            </p>
            <PawPrint alt='Paw' className='w-4 h-4 text-orange-500'/>
            <span className='text-sm md:text-base'>to reach Level {level + 1}!</span>
        </div>
        </div>
      
  )
}

export default PetMotivation
