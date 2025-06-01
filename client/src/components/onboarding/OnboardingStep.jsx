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
import saveImage from '../../assets/save.png';
import emergencyImage from '../../assets/emergency.png';
import payImage from '../../assets/pay.png';
import travelImage from '../../assets/travel.png';
import eatoutImage from '../../assets/eatout.png';
import boredImage from '../../assets/bored.png';
import billsImage from '../../assets/bills.png';
import subscriptionImage from '../../assets/subscription.png';
import salesImage from '../../assets/sales.png';


const OnboardingStep = ({ step, setStep, answers, setAnswers }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStruggle, setSelectedStruggle] = useState("");
    const [selectedGoal, setSelectedGoal] = useState("");
    const [selectedLifestyles, setSelectedLifestyles] = useState([]);

    const categories = [
        { label: 'Food/Delivery', image: foodImage },
        { label: 'Transport', image: transportImage},
        { label: 'Shopping', image: shoppingImage},
        { label: 'Entertainment', image: entertainmentImage},
        { label: "Health & Wellness", image: healthImage}
    ];

    const struggles = [
        { label: "Don't track spendings", image: trackImage },
        { label: "Want better habits", image: habitImage},
        { label: "Impulse spending", image: impulseImage},
        { label: "Feel out of control", image: outofcontrolImage},
    ];

    const goal = [
        { label: "Save monthly", image: saveImage },
        { label: "Emergency fund", image: emergencyImage},
        { label: "Pay off debts", image: payImage},
        { label: "Travel or big purchase", image: travelImage},
    ];

    const lifestyles = [
        { label: 'Eat out often', image: eatoutImage },
        { label: 'Shop when bored', image: boredImage},
        { label: 'Mostly just cover bills', image: billsImage},
        { label: 'Too many subscriptions', image: subscriptionImage},
        { label: 'Easily tempted by sales', image: salesImage},
    ];

    if (step === 1) {
    return (
        <div className='flex flex-col items-center justify-center mt-10 lg:mt-30'>
            <h1 className='font-semibold text-lg'>Where do you spend the most?</h1>
            <span className='text-neutral-500 mb-4'>
                {selectedCategories.length === 0
                    ? 'Select up to 2'
                    : `Selected ${selectedCategories.length}/2`
                }
            </span>
            <div>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
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
                            <span className='text-xs lg:text-sm font-medium'>{label}</span>
                        </button>
                    ))}
                </div>
                <button 
                    className={`w-full border rounded-xl py-3 shadow text-xs bg-orange-500 text-white hover:bg-orange-800 ${
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
            <div className='flex flex-col items-center justify-center mt-10 lg:mt-30'>
                <h1 className='font-semibold text-lg mb-4 text-center'>How do you feel about your money right now?</h1>
                <div>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        {struggles.map(({ label, image }) => (
                            <button
                                onClick={() => {
                                    if (selectedStruggle.includes(label)) {
                                        setSelectedStruggle(selectedStruggle.filter((s) => s !== label));
                                    } else if (!selectedStruggle.includes(label) && selectedStruggle.length < 1) {
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
                                    <span className='text-xs lg:text-sm font-medium'>{label}</span>
                            </button>
                        ))}
                    </div>
                    <button 
                        className={`w-full border rounded-xl py-3 shadow text-xs bg-orange-500 text-white hover:bg-orange-800 ${
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
    
    if (step === 3) {
        return (
            <div className='flex flex-col items-center justify-center mt-10 lg:mt-30'>
                <h1 className='font-semibold text-lg mb-4 '>What's your current money goal?</h1>
                <div>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        {goal.map(({ label, image }) => (
                            <button
                                onClick={() => {
                                    if (selectedGoal.includes(label)) {
                                        setSelectedGoal(selectedGoal.filter((s) => s !== label));
                                    } else if (!selectedGoal.includes(label) && selectedGoal.length < 1) {
                                        setSelectedGoal([...selectedGoal, label]);
                                    }
                                }}
                                className={`rounded-lg p-4 border-2 hover:bg-orange-50 hover:text-orange-400 ${
                                    selectedGoal.includes(label)
                                        ? "bg-orange-100 border-orange-500 text-orange-500"
                                        : "border-gray-300"
                                }`}
                                >
                                    <img src={image} alt={label} className='h-20 w-20 mx-auto mb-2'/>
                                    <span className='text-xs lg:text-sm font-medium'>{label}</span>
                            </button>
                        ))}
                    </div>
                    <button 
                        className={`w-full border rounded-xl py-3 shadow text-xs bg-orange-500 text-white hover:bg-orange-800 ${
                            selectedGoal.length > 0
                                ? "visible"
                                : "hidden"
                        }`}
                        onClick={() => {
                            setAnswers({ ...answers, goal: selectedGoal });
                            setStep(4);
                        }}
                    >
                        CONTINUE
                    </button>
                </div>
            </div>
        )
    };
    if (step === 4) {
        return (
            <div className='flex flex-col items-center justify-center mt-10 lg:mt-30'>
            <h1 className='font-semibold text-lg'>What describes your lifestyle best?</h1>
            <span className='text-neutral-500 mb-4'>
                {selectedLifestyles.length === 0
                    ? 'Select up to 2'
                    : `Selected ${selectedLifestyles.length}/2`
                }
            </span>
            <div>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                    {lifestyles.map(({ label, image }) => (
                        <button
                            key={label}
                            onClick={() => {
                                if (selectedLifestyles.includes(label)) {
                                    setSelectedLifestyles(selectedLifestyles.filter((c) => c != label));
                                } else if (!selectedLifestyles.includes(label) && selectedLifestyles.length < 2) {
                                    setSelectedLifestyles([...selectedLifestyles, label]);
                                }
                            }}
                            className={`rounded-lg p-4 border-2 hover:bg-orange-50 hover:text-orange-400 ${
                                selectedLifestyles.includes(label)
                                    ? "bg-orange-100 border-orange-500 text-orange-500"
                                    : "border-gray-300"
                            }`}
                        >
                            <img src={image} alt={label} className='h-20 w-20 mx-auto mb-2' />
                            <span className='text-xs lg:text-sm font-medium'>{label}</span>
                        </button>
                    ))}
                </div>
                <button 
                    className={`w-full border rounded-xl py-3 shadow text-xs bg-orange-500 text-white hover:bg-orange-800 ${
                        selectedLifestyles.length > 0
                            ? "visible"
                            : "hidden"
                    }`}
                    onClick={() => {
                        setAnswers({ ...answers, lifestyles: selectedLifestyles });
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
