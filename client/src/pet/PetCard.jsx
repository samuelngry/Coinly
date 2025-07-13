import React from 'react'
import petImage from '../assets/petimage.png'
import boyIcon from '../assets/boy.png'

const PetCard = ({ name, level, mood }) => {

  return (
    <div className='relative overflow-hidden bg-white border border-gray-200 mx-auto shadow-xl rounded-2xl lg:w-1/2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
        <div className='absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg'>
            LVL {level}
        </div>
        <div className='flex'>
            <img src={petImage} className='w-45 h-45'/>
            <div>
                <h3 className='mt-12'>{name}</h3>
                <span className='text-neutral-400 text-xs lg:text-md'>Shiba Inu</span>
            </div>
        </div>
        <div className='border-t border-neutral-300 pt-5 pl-12 mb-6'>
            <div className='flex'>
                <h4 className='w-33 text-xs'>AGE</h4>
                <span className='text-xs'>24 days</span>
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
