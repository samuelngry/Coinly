import React, { useRef } from 'react';
import { FaPen } from 'react-icons/fa';
import defaultIcon from '../assets/default.png'
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const PetCard = ({ name, level, mood, username, accountAge, avatarUrl, onAvatarUpload }) => {
  const fileInputRef = useRef();

  // Add these debug lines
  console.log('=== PetCard Debug ===');
  console.log('avatarUrl prop received:', avatarUrl);
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);

  const getAvatarUrl = (path) => {
      console.log('getAvatarUrl called with path:', path);
      
      if (!path) {
          console.log('No path, returning defaultIcon');
          return defaultIcon;
      }
      
      if (path.startsWith('http')) {
          console.log('Path is full URL, returning as-is:', path);
          return path;
      }
      
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      const finalUrl = `${supabaseUrl}/storage/v1/object/public/${cleanPath}`;
      
      console.log('Constructed Supabase URL:', finalUrl);
      return finalUrl;
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onAvatarUpload(e.target.files[0]);
    }
  };

  return (
    <div className='relative overflow-hidden bg-white border border-neutral-300 mx-auto shadow-lg rounded-2xl'>
      <div className='absolute top-4 right-4 md:text-base bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg'>
        LVL {level}
      </div>

      <div className='flex items-center gap-6 px-6 pt-6 mb-5'>
        <div className='relative'>
          <img
            src={getAvatarUrl(avatarUrl) }
            alt="avatar"
            className='w-24 h-24 md:w-40 md:h-40 rounded-full object-cover border border-neutral-300'
          />
          <button
            onClick={handleEditClick}
            className='absolute bottom-0 md:right-5 right-0 bg-orange-500 text-white rounded-full p-1.5 md:p-2 text-xs hover:bg-orange-600'
            title="Edit profile picture"
          >
            <FaPen />
          </button>
          <input
            type="file"
            accept="image/*"
            className='hidden'
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div>
          <h3 className='text-base md:text-xl font-semibold'>{username}</h3>
        </div>
      </div>

      <div className='border-t border-neutral-300 pt-5 pl-12 mb-6'>
        <div className='flex'>
          <h4 className='w-24 text-xs md:text-sm'>AGE</h4>
          <span className='text-xs md:text-sm'>{accountAge} days</span>
        </div>
        <div className='flex mt-1'>
          <h4 className='w-24 text-xs md:text-sm'>MOOD</h4>
          <span className='text-xs md:text-sm'>{mood}</span>
        </div>
        <div className='flex mt-1'>
          <h4 className='w-24 text-xs md:text-sm'>PET</h4>
          <span className='text-xs md:text-sm'>{name}</span>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
