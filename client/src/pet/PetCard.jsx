import React from 'react'
import petImage from '../assets/petimage.png'

const PetCard = ({ name, level, mood }) => {

  return (
    <div className='relative overflow-hidden bg-white border border-neutral-300 mx-auto shadow-lg rounded-2xl'>
        <div className='absolute top-4 right-4 md:text-base bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg'>
            LVL {level}
        </div>
        <div className='flex'>
            <img src={petImage} className='w-45 h-45 md:w-60 md:h-60'/>
            <div>
                <h3 className='mt-12 text-sm md:text-xl'>{name}</h3>
                <span className='text-neutral-400 text-xs md:text-base'>Shiba Inu</span>
            </div>
        </div>
        <div className='border-t border-neutral-300 pt-5 pl-12 mb-6'>
            <div className='flex'>
                <h4 className='w-33 text-xs md:text-sm'>AGE</h4>
                <span className='text-xs md:text-sm'>24 days</span>
            </div>
            <div className='flex mt-1'>
                <h4 className='w-33 text-xs md:text-sm'>MOOD</h4>
                <span className='text-xs md:text-sm'>{mood}</span>
            </div>
            <div className='flex mt-1'>
                <h4 className='w-33 text-xs md:text-sm'>OWNER</h4>
                <span className='text-xs md:text-sm'>yijinggg</span>
            </div>
        </div>
    </div>
  )
}

export default PetCard
