import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaStar } from 'react-icons/fa';
import petLevelUpImage from '../../assets/levelUp.png'; // celebratory pose

const LevelUpModal = ({ name, newLevel, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Confetti */}
      <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={300} />

      {/* Glowing background ring */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 z-[-1] flex items-center justify-center"
      >
        <div className="w-80 h-80 rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-300 opacity-70 shadow-xl animate-spin-slow" />
      </motion.div>

      {/* Modal content */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
        <motion.img
          src={petLevelUpImage}
          className="w-64 mx-auto drop-shadow-xl"
          initial={{ scale: 0.5, opacity: 0, y: -30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        />
        
        <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-2 flex items-center justify-center gap-2">
          <FaStar className="text-yellow-400" /> Level Up! <FaStar className="text-yellow-400" />
        </h2>
        
        <p className="text-gray-700 mb-4">
          {name || "Your pet"} has reached <span className="font-bold text-orange-500">Level {newLevel}</span> 🎉
        </p>

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

export default LevelUpModal;
