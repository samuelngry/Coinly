import React from 'react'
import { ProgressBar } from 'primereact/progressbar';

const LevelBar = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between mb-2'>
        <h1 className='text-md'>LV 26</h1>
        <span className='text-xs'>1138/1500 XP</span>
      </div>
      <ProgressBar className="custom-xp-bar" value={75} showValue={ false } style={{ height: '0.6rem' }}></ProgressBar>
    </div>
  )
}

export default LevelBar
