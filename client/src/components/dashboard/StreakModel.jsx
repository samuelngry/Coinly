import React from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import fireIcon from '../../assets/fire.png'

const StreakModal = ({ streak, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
        <motion.img
          src={fireIcon}
          className="w-40 mx-auto"
          initial={{ scale: 0.8, y: 0 }}
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -5, 0],
            filter: [
              "drop-shadow(0 0 0px orange)",
              "drop-shadow(0 0 10px orange)",
              "drop-shadow(0 0 0px orange)"
            ]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <h2 className="text-xl md:text-2xl font-bold text-orange-500 mt-6 mb-2">
          {streak} Day Streak!
        </h2>
        <p className="text-gray-700 mb-4 text-sm md:text-base">
          Complete a quest every day to build your streak!
        </p>

        <button
          onClick={onClose}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md text-xs md:text-base mt-6"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default StreakModal;
 