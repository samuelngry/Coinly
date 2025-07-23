import React from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import petCompleteImage from '../../assets/petcomplete.png';

const CompleteModal = ({ name, totalXp, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} />
      
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
        <motion.img
          src={petCompleteImage}
          className="w-60 mx-auto"
          initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        />
        <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-2">Bonus Quests Completed!</h2>
        <p className="text-gray-700 mb-4">
          {name || "Your pet"} is proud of you! 🐾
        </p>
        <div className='border border-neutral-300 text-sm mb-6 p-4 rounded-xl text-neutral-500 flex justify-between'>
          <span className=''>XP Earned</span>
          <span className='text-orange-500'><PawPrint className='w-4.5 h-4.5 inline-block mr-1' />{totalXp}</span>
        </div>
        <button
          onClick={onClose}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md text-xs md:text-base"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default CompleteModal;
