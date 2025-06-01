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
        <div className='flex flex-col items-center justify-center mt-30'>
            <h1 className='font-semibold text-lg'>What's your biggest spending category?</h1>
            <span className='text-neutral-500 mb-4'>
                {selectedCategories.length === 0
                    ? 'Select up to 2'
                    : `Selected ${selectedCategories.length}/2`
                }
            </span>
            <div>
                <div className='grid grid-cols-3 gap-4 mb-4'>
                    {categories.map(({ label, image }) => (
                        <button
                            key={label}
                            onClick={() => {
                                if (selectedCategories.includes(label)) {
                                    setSelectedCategories(selectedCategories.filter((c) => c != label));
                                } else if (!selectedCategories.includes(label) && selectedCategories.length < 2) {
                                    setSelectedCategories([...selectedCategories, label]);
                                }
                            }}
                            className={`rounded-lg p-4 border-2 hover:bg-orange-50 hover:text-orange-400 ${
                                selectedCategories.includes(label)
                                    ? "bg-orange-100 border-orange-500 text-orange-500"
                                    : "border-gray-300"
                            }`}
                        >
                            <img src={image} alt={label} className='h-20 w-20 mx-auto mb-2' />
                            <span className='text-sm font-medium'>{label}</span>
                        </button>
                    ))}
                </div>
                <button 
                    className={`w-full border rounded-xl py-3 shadow text-xs bg-orange-500 text-white ${
                        selectedCategories.length > 0
                            ? "visible"
                            : "hidden"
                    }`}
                    onClick={() => {
                        setStep(2);
                    }}
                >
                    CONTINUE
                </button>
            </div>
        </div>
        )
    };
};

export default OnboardingStep
