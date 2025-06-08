import React from 'react'
import { ProgressBar } from 'primereact/progressbar';
import pawIcon from '../../assets/paw.png'

const LevelBar = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between mb-2'>
        <h1 className='text-md'>LV 26</h1>
        <div className='flex items-end gap-1.5'>
          <span className='text-xs leading-none'>1138/1500</span>
          <img src={pawIcon} alt='Paw' className='w-4 h-4'/>
        </div>
        
      </div>
      <ProgressBar className="custom-xp-bar" value={75} showValue={ false } style={{ height: '0.6rem' }}></ProgressBar>
    </div>
  )
}

export default LevelBar
