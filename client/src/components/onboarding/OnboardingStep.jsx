import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import welcomeImage from '../../assets/welcome.png';

const OnboardingStep = ({ step, setStep, answers, setAnswers }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStruggle, setSelectedStruggle] = useState("");
    const [selectedGoal, setSelectedGoal] = useState("");
    const [selectedLifestyles, setSelectedLifestyles] = useState([]);
    const navigate = useNavigate();

    const categories = [
        { id: 1, label: 'Food/Delivery', image: foodImage },
        { id: 2, label: 'Transport', image: transportImage},
        { id: 3, label: 'Shopping', image: shoppingImage},
        { id: 4, label: 'Entertainment', image: entertainmentImage},
        { id: 5, label: "Health & Wellness", image: healthImage}
    ];

    const struggles = [
        { id: 1, label: "Don't track spendings", image: trackImage },
        { id: 2, label: "Want better habits", image: habitImage},
        { id: 3, label: "Impulse spending", image: impulseImage},
        { id: 4, label: "Feel out of control", image: outofcontrolImage},
    ];

    const goal = [
        { id: 1, label: "Save monthly", image: saveImage },
        { id: 2,label: "Emergency fund", image: emergencyImage},
        { id: 3, label: "Pay off debts", image: payImage},
        { id: 4, label: "Travel or big purchase", image: travelImage},
    ];

    const lifestyles = [
        { id: 1, label: 'Eat out often', image: eatoutImage },
        { id: 2, label: 'Shop when bored', image: boredImage},
        { id: 3, label: 'Mostly just cover bills', image: billsImage},
        { id: 4, label: 'Too many subscriptions', image: subscriptionImage},
        { id: 5, label: 'Easily tempted by sales', image: salesImage},
    ];

    useEffect(() => {
        if (step === 5) {
            const token = localStorage.getItem("token");

            fetch("http://localhost:3000/api/users/preferences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                goal: answers.goal,
                struggle: answers.struggle,
                lifestyle: answers.lifestyles,
                categories: answers.categories
            })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.message);
                navigate("/dashboard");
            })
            .catch(err => console.error("Error saving preferences", err));
        }
    }, [step, answers, navigate]);

    if (step === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-20 lg:mt-30 px-6 text-center">
                <img src={welcomeImage} alt='Welcome' className='w-60 h-60'/>
                <h1 className="text-2xl font-semibold mb-4">Let's understand your money habits!</h1>
                <p className="text-gray-600 max-w-md mb-8">
                    Answer a few quick questions to get personalised quests and build better money habits.
                </p>
                <button
                    onClick={() => setStep(1)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-xl shadow"
                >
                    Get Started
                </button>
            </div>
        )
    }

    if (step === 1) {
    return (
        <div className='flex flex-col items-center justify-center mt-10 lg:mt-30'>
            <h1 className='font-semibold text-lg'>Where do you spend the most?</h1>
            <span className='text-neutral-500 mb-4 text-sm'>
                {selectedCategories.length === 0
                    ? 'Select up to 2'
                    : `Selected ${selectedCategories.length}/2`
                }
            </span>
            <div>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                    {categories.map(({ id, label, image }) => (
                        <button
                            key={id}
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
                    className={`w-full border rounded-xl py-3 shadow text-xs bg-orange-500 text-white hover:bg-orange-600 ${
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
                <h1 className='font-semibold text-lg text-center'>How do you feel about your money right now?</h1>
                <span className='text-neutral-500 mb-4 text-sm'>
                {selectedStruggle.length === 0
                    ? 'Select 1'
                    : `Selected ${selectedStruggle.length}/1`
                }
                </span>
                <div>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        {struggles.map(({ id, label, image }) => (
                            <button
                                key={id}
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
                        className={`w-full border rounded-xl py-3 shadow text-xs bg-orange-500 text-white hover:bg-orange-600 ${
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
                <h1 className='font-semibold text-lg'>What's your current money goal?</h1>
                <span className='text-neutral-500 mb-4 text-sm'>
                {selectedGoal.length === 0
                    ? 'Select 1'
                    : `Selected ${selectedGoal.length}/1`
                }
                </span>
                <div>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        {goal.map(({ id, label, image }) => (
                            <button
                                key={id}
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
                        className={`w-full border rounded-xl py-3 shadow text-xs bg-orange-500 text-white hover:bg-orange-600 ${
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
            <span className='text-neutral-500 mb-4 text-sm'>
                {selectedLifestyles.length === 0
                    ? 'Select up to 2'
                    : `Selected ${selectedLifestyles.length}/2`
                }
            </span>
            <div>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                    {lifestyles.map(({ id, label, image }) => (
                        <button
                            key={id}
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
                    className={`w-full border rounded-xl py-3 shadow text-xs bg-orange-500 text-white hover:bg-orange-600 ${
                        selectedLifestyles.length > 0
                            ? "visible"
                            : "hidden"
                    }`}
                    onClick={() => {
                        setAnswers({ ...answers, lifestyles: selectedLifestyles });
                        setStep(5);
                    }}
                >
                    CONTINUE
                </button>
            </div>
        </div>
        )
    };

    if (step === 5) {
        return (
            <div className='flex flex-col items-center justify-center mt-20 lg:mt-30'>
            <h1 className='font-semibold mb-4'>Setting things up...</h1>
            <p className='text-neutral-500'>We're building your personalised experience</p>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-300 animate-spin fill-orange-500 mt-4" viewBox="0 0 100 101">
                {/* ... loading spinner SVG ... */}
            </svg>
            <span className="sr-only">Loading...</span>
            </div>
        );
    }
};

export default OnboardingStep
