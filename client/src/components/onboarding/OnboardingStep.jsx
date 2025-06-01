import { useState } from 'react';
import foodImage from '../../assets/food.png';
import transportImage from '../../assets/transport.png';
import trackImage from '../../assets/track.png';
import shoppingImage from '../../assets/shopping.png';
import healthImage from '../../assets/health.png';
import entertainmentImage from '../../assets/entertainment.png';
import habitImage from '../../assets/habit.png';
import impulseImage from '../../assets/impulse.png';
import outofcontrolImage from '../../assets/outofcontrol.png';

const OnboardingStep = ({ step, setStep, answers, setAnswers }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStruggle, setSelectedStruggle] = useState("");

    const categories = [
        { label: 'Food/Delivery', image: foodImage },
        { label: 'Transport', image: transportImage},
        { label: 'Shopping', image: shoppingImage},
        { label: 'Entertainment', image: entertainmentImage},
        { label: "Health & Wellness", image: healthImage}
    ];

    const struggles = [
        { label: "I don't track my spending", image: trackImage },
        { label: "I want better money habits", image: habitImage},
        { label: "I impulse buy", image: impulseImage},
        { label: "I feel out of control with money", image: outofcontrolImage},
    ]

    if (step === 1) {
    return (
        <div className='flex flex-col items-center justify-center mt-30'>
            <h1 className='font-semibold text-lg'>Where do you spend the most?</h1>
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
                        setAnswers({ ...answers, categories: selectedCategories });
                        setStep(2);
                    }}
                >
                    CONTINUE
                </button>
            </div>
        </div>
        )
    };

    if (step === 2) {
        return (
            <div className='flex flex-col items-center justify-center mt-30'>
                <h1 className='font-semibold text-lg mb-4 '>How do you feel about your money right now?</h1>
                <div>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        {struggles.map(({ label, image }) => (
                            <button
                                onClick={() => {
                                    if (selectedStruggle.includes(label)) {
                                        setSelectedStruggle(selectedStruggle.filter((s) => s !== label));
                                    } else {
                                        setSelectedStruggle([...selectedStruggle, label]);
                                    }
                                }}
                                className={`rounded-lg p-4 border-2 hover:bg-orange-50 hover:text-orange-400 ${
                                    selectedStruggle.includes(label)
                                        ? "bg-orange-100 border-orange-500 text-orange-500"
                                        : "border-gray-300"
                                }`}
                                >
                                    <img src={image} alt={label} className='h-20 w-20 mx-auto mb-2'/>
                                    <span className='text-sm font-medium'>{label}</span>
                            </button>
                        ))}
                    </div>
                    <button 
                        className={`w-full border rounded-xl py-3 shadow text-xs bg-orange-500 text-white ${
                            selectedStruggle.length > 0
                                ? "visible"
                                : "hidden"
                        }`}
                        onClick={() => {
                            setAnswers({ ...answers, struggle: selectedStruggle });
                            setStep(3);
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
