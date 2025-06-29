import React, { useState } from 'react'
import EditIcon from '../../assets/edit.png'
import editNameIcon from '../../assets/editname.png'

const PetName = ({ name, onComplete }) => {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(newName);
    setOpen(false);
  }

  return (
    <div className='px-3 py-1 flex items-center justify-center gap-2'>
        <h2 className='lg:text-lg'>{name}</h2>
        <button onClick={handleOpen} >
          <img src={EditIcon} alt='Edit' className='w-3.5 h-3.5'/>
        </button>

        {/* Dialog for editing pet name */}
        {open && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div 
              className="fixed inset-0" 
              onClick={() => setOpen(false)}
            ></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto transform transition-all duration-300 scale-100">
              <div className="p-6">
                <div className='flex justify-center'>
                  <img src={editNameIcon} className='w-60 h-60 '/>
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    Edit Pet Name 🐾
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Give your pet the perfect name!
                  </p>
                </div>
                
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                  placeholder="Enter your pet name..."
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
                />
                
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleSubmit}
                    disabled={!newName.trim()}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default PetName
