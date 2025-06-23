import React, { useState } from 'react'
import EditIcon from '../../assets/edit.png'

const PetName = ({ name, onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(name);

  const openForm = () => setIsOpen(true);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(newName);
    setIsOpen(false);
  }

  const handleCancel = () => {
    setNewName(name);
    setIsOpen(false);
  }

  return (
    <div className='px-3 py-1 flex items-center justify-center gap-2'>
      {!isOpen ? (
        <>
          <h2 className='lg:text-lg'>{name}</h2>
          <button onClick={openForm} >
            <img src={EditIcon} alt='Edit' className='w-3.5 h-3.5'/>
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
          <input
            type='text'
            value={newName}
            onChange={handleNameChange}
            className='border px-2 py-1 rounded'
            autoFocus
          />
          <button type='submit' className='text-orange-500'>
            Save
          </button>
          <button
            type='button'
            onClick={handleCancel}
            className='text-gray-500'
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default PetName
