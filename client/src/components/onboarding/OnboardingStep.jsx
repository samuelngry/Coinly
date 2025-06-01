import { useState } from 'react';
import foodImage from '../../assets/food.png';
import transportImage from '../../assets/transport.png';
import entertainmentImage from '../../assets/entertainment.png';
import shoppingImage from '../../assets/shopping.png';
import digitalImage from '../../assets/digital.png';
import healthImage from '../../assets/health.png';

const OnboardingStep = ({ step, setStep, answers, setAnswers }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = [
        { label: 'Food & Drink', image: foodImage },
        { label: 'Transport', image: transportImage},
        { label: 'Entertainment', image: entertainmentImage},
        { label: 'Shopping', image: shoppingImage},
        { label: 'Digital', image: digitalImage},
        { label: 'Health & Wellness', image: healthImage}
    ];

    if (step === 1) {
    return (
        <>
            <p>What's your biggest spending category?</p>
            <div className='grid grid-cols-3 gap-4'>
                {categories.map(({ label, image }) => (
                    <button
                        key={label}
                        onClick={() => {
                            if (selectedCategories.includes(label)) {
                                setSelectedCategories(selectedCategories.filter((c) => c != label));
                            } else {
                                setSelectedCategories([...selectedCategories, label]);
                            }
                        }}
                        className={`rounded-lg p-4 border-2 ${
                            selectedCategories.includes(label)
                                ? "bg-orange-100 border-orange-500"
                                : "border-gray-300"
                        }`}
                    >
                        <img src={image} alt={label} className='h-10 w-10 mx-auto mb-2' />
                        <span className='text-sm font-medium'>{label}</span>
                    </button>
                ))}
            </div>
        </>
        )
    };
};

export default OnboardingStep
