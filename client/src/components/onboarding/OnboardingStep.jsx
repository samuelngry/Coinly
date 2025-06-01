import React from 'react'

const OnboardingStep = ({ step, setStep, answers, setAnswers }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

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
