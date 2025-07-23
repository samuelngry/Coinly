import React from 'react';
import Confetti from 'react-confetti';
import petCompleteImage from '../../assets/petcomplete.png';

const CompleteModal = ({ name, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} />
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
        <img src={petCompleteImage} className='w-70 w-70 mx-auto'/>
        <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-2">Bonus Quests Completed!</h2>
        <p className="text-gray-700 mb-6">
          {name} is proud of you! 🐾
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

export default CompleteModal;
