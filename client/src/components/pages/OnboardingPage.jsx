import OnboardingHeader from "../onboarding/OnboardingHeader";
import OnboardingStep from "../onboarding/OnboardingStep";
import { useState } from "react";

const OnboardingPage = () => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({});

    return (
        <div className="max-w-7xl mx-auto py-10" >
            <OnboardingHeader step={step} setStep={setStep} />
            <OnboardingStep step={step} setStep={setStep} answers={answers} setAnswers={setAnswers} />
        </div>
    );
};

export default OnboardingPage;