import React from 'react'
import petImage from '../assets/petimage.png'

const PetCard = ({ name }) => {
  return (
    <div className='flex flex-col border border-neutral-300 mx-auto shadow-lg rounded-xl lg:w-1/2'>
      <div className='flex'>
        <img src={petImage} className='w-45 h-45'/>
        <h3 className='mt-12'>{name}</h3>
      </div>
    </div>
  )
}

export default PetCard
