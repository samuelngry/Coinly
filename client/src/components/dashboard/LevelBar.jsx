import React from 'react'
import { ProgressBar } from 'primereact/progressbar';
import { PawPrint } from 'lucide-react';

const LevelBar = ({xp, level}) => {
  const currentLevelUpXp = 100 + (level - 1) * 50;
  const progress = Math.min((xp / currentLevelUpXp) * 100, 100);

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between mb-2'>
        <h1 className='text-md'>LV {level}</h1>
        <div className='flex items-end gap-1.5'>
          <span className='text-xs leading-none'>{xp}</span>
          <PawPrint alt='Paw' className='w-4 h-4 text-orange-500'/>
        </div>
        
      </div>
      <ProgressBar className="custom-xp-bar" value={ progress } showValue={ false } style={{ height: '0.6rem' }}></ProgressBar>
    </div>
  )
}

export default LevelBar
