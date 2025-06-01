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
            <div>
                <button onClick={() => {
                    if (selectedCategories.includes("Food")) {
                        setSelectedCategories(selectedCategories.filter((c) => c != "Food"));
                    } else {
                        setSelectedCategories([...selectedCategories, "Food"]);
                    };
                }}>
                    Food
                </button>
            </div>

        </>
        )
    };
};

export default OnboardingStep
