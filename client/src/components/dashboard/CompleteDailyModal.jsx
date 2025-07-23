import React from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import petCompleteDailyImage from '../../assets/petcompletedaily.png';

const CompleteDailyModal = ({ name, totalXp, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 z-[-1] flex items-center justify-center"
        >
        <div className="w-72 h-72 rounded-full bg-gradient-to-br from-yellow-200 via-orange-300 to-pink-200 opacity-60 animate-spin-slow shadow-xl" />
    </motion.div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
        <motion.img
            src={petCompleteDailyImage}
            className="w-60 mx-auto drop-shadow-xl"
            initial={{ scale: 0.5, opacity: 0, y: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
        />
        <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-2">Daily Quests Completed!</h2>
        <p className="text-gray-700 mb-4">
          {name || "Your pet"} earned a golden treat! 🍬
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

export default CompleteDailyModal;
