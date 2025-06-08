import React from 'react'
import happyPetImage from "../../assets/pet-happy.png"
import sadPetImage from "../../assets/pet-sad.png"
import excitedPetImage from "../../assets/pet-excited.png"
import neutralPetImage from "../../assets/pet-neutral.png"
import angryPetImage from "../../assets/pet-angry.png"

const PetWidget = ({ mood = "happy" }) => {
    const petMoodImages = {
        happy: happyPetImage,
        sad: sadPetImage,
        excited: excitedPetImage,
        neutral: neutralPetImage,
        angry: angryPetImage,
    };

    const petImage = petMoodImages[mood] || neutralPetImage;

    return (
        <div className='flex flex-col justify-center bg-white items-center col-span-6 rounded-2xl bg-white shadow'>
            <img src={petImage} alt={`Pet is ${mood}`} className='w-46 h-46 object-contain'/>
            <span className='text-xl font-semibold mb-2'>Fluffy</span>
        </div>
    )
}

export default PetWidget
