import React from 'react'
import EditIcon from '../../assets/edit.png'

const PetName = () => {
  return (
    <div className='px-3 py-1 flex items-center justify-center gap-2'>
      <h2 className='lg:text-lg'>Bueno</h2>
      <button
      >
        <img src={EditIcon} alt='Edit' className='w-3.5 h-3.5'/>
      </button>
    </div>
  )
}

export default PetName
