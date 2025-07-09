import React from 'react'
import petImage from '../assets/petimage.png'

const PetCard = ({ name, level, mood }) => {
  return (
    <div className='flex flex-col border border-neutral-300 mx-auto shadow-lg rounded-xl lg:w-1/2'>
        <div className='flex'>
            <img src={petImage} className='w-45 h-45'/>
            <div>
                <h3 className='mt-12'>{name}</h3>
                <span className='text-neutral-400 text-xs lg:text-md'>He/Him</span>
            </div>
        </div>
        <div className='border-t border-neutral-300 pt-5 pl-12 mb-6'>
            <div className='flex'>
                <h4 className='w-33 text-xs'>AGE</h4>
                <span className='text-xs'>24 days</span>
            </div>
            <div className='flex mt-1'>
                <h4 className='w-33 text-xs'>LEVEL</h4>
                <span className='text-xs'>{level}</span>
            </div>
            <div className='flex mt-1'>
                <h4 className='w-33 text-xs'>MOOD</h4>
                <span className='text-xs'>{mood}</span>
            </div>
            <div className='flex mt-1'>
                <h4 className='w-33 text-xs'>OWNER</h4>
                <span className='text-xs'>yijinggg</span>
            </div>
        </div>
    </div>
  )
}

export default PetCard
